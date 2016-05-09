var _ = require('lodash');
var Promise = require('bluebird');
var nytTop = require('nyt-top');
require('dotenv').config();

nytTop.key(process.env.NYT_KEY);

nytTop.section('world', function (err, data) {
  if (err) {
    console.log(err);
  } else {
    _(data.results)
      .map(condenseNews)
      .filter(function (news) {
        return !!news.image;
      })
      .take(10)
      .forEach(function (item, index) {
        console.log(
          (item.image ? '(img) ' : '      ') +
          (index+1) + '. ' + item.title
        );
      });
  }
});

// - Get top news
// - Get images of top news

function condenseNews(news) {
  return {
    title: news.title,
    abstract: news.abstract,
    image: _.get(_.last(news.multimedia), 'url', null)
  };
}
