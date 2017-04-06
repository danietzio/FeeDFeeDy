import  express  from 'express';
import  client from './lib/redis.js';

// Body parser intilization
import bodyParser from 'body-parser';
import rssFinder from 'rss-finder';
import feed from 'feed-read';


// define express app
let app = express();

// intilizing redis client data
let initFeeds = [
      { id : '1' , icon : 'circle-o', name : 'ZoomIT' , link : 'https://www.entrepreneur.com', categorized : false , category : '' , starred : false },
      { id : '2' , icon : 'circle-o', name : 'Techrunch', link : 'https://www.techcrunch.com', categorized : false , category : '', starred : false},
      { id : '3' , icon : 'circle-o', name : 'GeekWire' , link : 'https://www.geekwire.com' , categorized : false , category : '', starred : false}
];

client.lpush('feeds', JSON.stringify(initFeeds), (err) => {
  if(err) throw err;
});

// intilizing bodyParser setting
let urlEncoder = bodyParser.urlencoded({
  extended : false
});

// GET request for sending
app.get('/feeds', urlEncoder, (req, res) => {
    client.lrange('feeds', 0, -1, (err, chunks) => {
        if(err) {
          res.status(404).json({ error: true, data: "Not Founded!"});
        }
        
        // Sending all of the user subscribed feeds
        res.status(200).json({error : false, data: chunks});
    });
});

// GET request for getting feeds by website links
app.get('/feed/:name', urlEncoder, (req, res) => {

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
          console.log(err);
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
        }
        resolve(articles);
      });
  });
}
export { app };
