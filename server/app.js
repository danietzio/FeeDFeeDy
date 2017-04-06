import  express  from 'express';

// Body parser intilization
import bodyParser from 'body-parser';
import rssFinder from 'rss-finder';
import feed from 'feed-read';

// define express app
let app = express();

// intilizing bodyParser setting
let urlEncoder = bodyParser.urlencoded({
  extended : false
});

// GET request for getting feeds by website links
app.get('/feed/:name', urlEncoder, (req, res, next) => {

  // Decode Website feed url
  let url = decodeURIComponent(req.params.name);

  // Find Rss link
  rssFinder(url)
    .then((feedLinkData) =>{

      _getFeedData(feedLinkData.feedUrls[0].url)
        .then((feedContentData) => {
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.status(200).json(feedContentData);
        })
        .catch((err) => {
          console.log(err)
          res.status(404).json(error : err);
        });
    })
    .catch((err) => console.log(err));

});


function _getFeedData(url) {
  return new Promise(function(resolve, reject) {
      feed(url, (err, articles) => {
        if(err) {
          reject("We Couldn't Find Feed Contents!");
          return;
        }
        resolve(articles);
      });
  });
}
export { app };
