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

nytTop.section('world', function (err, data) {
  if (err) {
    console.log(err);
  } else {
    var news = _(data.results)
      .map(condenseNews)
      .filter(function (news) {
        return !!news.image;
      })
      .take(9)
      .forEach(function (item, index) {
        console.log(
          (item.image ? '(img) ' : '      ') +
          (index+1) + '. ' + item.title +
          ': ' + sentiment(item.abstract).score
        );
        console.log(
          '      ' +
          item.image
        );
      });

    var width = height = 2100;
    lwip.create(width, height, 'magenta', function (err, output) {
      downloadFile(_(news).first().image, function (name) {
        lwip.open('./' + name, function (err, img) {
          if (err) { console.log('Err:', err); }

          output.batch().paste(0, 0, img).exec(function () {
            output.writeFile('output.jpg', function (aa) {
              console.log(aa);
            });
          });
        });
      });




      // news.forEach(function (news) {
      //   lwip.open(news.image, function (err, img) {
      //     output.paste(0, 0, img);
      //   });
      // });

      // output.writeFile('output.jpg', function (err) {
      // });
    });
  }
});

function downloadFile(url, callback) {
  var name = path.basename(url);
  var file = fs.createWriteStream(name);
  request(url)
    .pipe(file)
    .on('finish', function () {
      callback(name);
    });
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
