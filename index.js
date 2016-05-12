var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var request = require('request').defaults({ encoding: null });
var http = require('http-request');
var Promise = require('bluebird');
var nytTop = require('nyt-top');
require('dotenv').config();
var lwip = require('lwip');
var sentiment = require('sentiment');

nytTop.key(process.env.NYT_KEY);

getImages()
  .then(analyseAndSortNews)
  .then(doCollage)
  .catch(function (err) {
    console.log('Something was wrong:', err);
  });

/**
 *
 */

function pointInSpace(max) {
  return Math.floor(Math.random() * max);
}

function tilt() {
  return Math.random() * 45 * plusOrMinus();
}

function plusOrMinus() {
  return Math.round(Math.random()) * 2 - 1;
}

function downloadFile(url) {
  return new Promise(function (resolve) {
    var name = path.basename(url);
    var dest = './tmp/' + name;
    var file = fs.createWriteStream(dest);

    request(url)
      .pipe(file)
      .on('finish', function () {
        resolve(dest);
      });
  });
}

function openImage(dest) {
  return new Promise(function (resolve, reject) {
    lwip.open(dest, function (err, img) {
      if (err) { reject(err); }

      resolve(img);
    });
  });
}

function sentimentScore(abstract) {
  return sentiment(abstract).score;
}

function downloadImage(url, callback) {
  http.get(url, function (err, res) {
    console.log(res.headers);
    callback(res.buffer);
  });
  // request(url, function (err, response, buffer) {
  //   if (!err && response.statusCode == 200) {
  //     callback(buffer);
  //   }
  // });
}

// [x] Get top news
// [x] Get images of top news
// [x] News sentiment
// [ ] Save image
// [ ] Resize image according to sentiment

function condenseNews(news) {
  return {
    title: news.title,
    abstract: news.abstract,
    image: _.get(_.last(news.multimedia), 'url', null)
  };
}


/**
 * New version
 */

/**
 * Fetches images and returns only the necessary fields.
 * @return {[type]} [description]
 */
function getImages() {
  return new Promise(function (resolve, reject) {
    nytTop.section('world', function (err, data) {
      if (err) { reject(err); }

      resolve(data.results);
    });
  });
}

/**
 * Analyses the images received and sorts them accordingly.
 */
function analyseAndSortNews(news) {
  return new Promise(function (resolve) {
    resolve(
      _(news)
        .map(condenseNews)
        .filter(function (news) {
          return !!news.image;
        })
        .take(9)
        .forEach(function (item, index) {
          console.log(
            (item.image ? '(img) ' : '      ') +
            index + '. ' + item.title +
            ': ' + sentiment(item.abstract).score
          );
          console.log(
            '      ' +
            item.image
          );
        })
    );
  });
}

/**
 * Transforms an image and puts it on our canvas.
 */
function doCollage(news) {
  return new Promise(function (resolve) {
    var width = 2100;
    var height =  width;
    var frame = width / 3;

    lwip.create(width, height, 'white', function (err, out) {
      var batch = out.batch();

      return Promise.map(news, function (singleNews, i) {
        return downloadFile(singleNews.image)
          .then(openImage)
          .then(function (img) {
            return new Promise(function (resolve, reject) {
              var deltaFeeling = sentimentScore(singleNews.abstract);

              img.batch()
                .cover(frame, frame)
                .hue(deltaFeeling)
                .saturate(deltaFeeling / 10)
                .lighten(deltaFeeling / 10)
                .exec(function (err, imp) {
                  if (err) { reject(err); }

                  batch
                    .paste(
                      frame * Math.floor(i / 3),
                      frame * (i % 3),
                      imp
                    );

                  resolve(batch);
                });
              });
          });
      }).then(function () {
        batch.exec(function () {
          out.writeFile('output.jpg', function () {});
        });
      });
    });

    resolve();
  });

  // var width = height = 2100;
  // lwip.create(width, height, 'magenta', function (err, output) {
  //   downloadFile(_(news).first().image, function (name) {
  //     lwip.open('./tmp/' + name, function (err, img) {
  //       if (err) { console.log('Err:', err); }

  //       var width  = img.width();
  //       var height = img.height();

  //       output
  //         .batch()
  //         .paste(0, 0, img)
  //         .exec(function () {
  //           output.writeFile('output.jpg', function () {
  //             console.log('Done!');
  //           });
  //         });
  //     });
  //   });
  // });
}
