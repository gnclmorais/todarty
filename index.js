var _ = require('lodash');
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

    var width = height = 1000;
    lwip.create(width, height, 'magenta', function (err, output) {
      lwip.open(_(news).first().image, function (err, img) {
        output.batch().paste(0, 0, img).exec(function () {
          output.writeFile('output.jpg', function (err) {
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
