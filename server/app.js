import  express  from 'express';
import  {client} from './lib/redis.js';

// Body parser intilization
import bodyParser from 'body-parser';
import rssFinder from 'rss-finder';
import feed from 'feed-read';

// define express app
let app = express();

// intilizing redis client data
let initFeeds = [
      { id : 1 , icon : 'circle-o', name : 'ZoomIT' , link : 'https://www.entrepreneur.com', categorized : false , category : '' , starred : false },
      { id : 2 , icon : 'circle-o', name : 'Techrunch', link : 'https://www.techcrunch.com', categorized : false , category : '', starred : false},
      { id : 3 , icon : 'circle-o', name : 'GeekWire' , link : 'https://www.geekwire.com' , categorized : false , category : '', starred : false}
    ];

client.lpush('feeds', JSON.stringify(initFeeds), (err) => {
  if(err) throw err;
});

// intilizing bodyParser setting
let urlEncoder = bodyParser.urlencoded({
  extended : false
});


// Setting "Access-Control-Allow-Origin" to all responses
app.use((req, res, next) => {
  res.set({
    "Access-Control-Allow-Methods" : "PUT, GET, DELETE",
    "Access-Control-Allow-Origin" : "*"
  });
  next();
});

// GET request for sending
app.get('/feeds', urlEncoder, (req, res) => {
    client.lrange('feeds', 0, -1, (err, chunks) => {
        if(err) {
          res.status(404).json({ error: true, data: "Not Founded!"}).end();
        }

        // Sending all of the user subscribed feeds
        res.status(200).json({error : false, data: chunks[0]} );
    });
});

// GET request for getting feeds by website links
app.get('/feed/:name', urlEncoder, (req, res) => {
  // Decode Website feed url
  let url = decodeURIComponent(req.params.name);

  req.on('cancel', () => {
    console.log(url,'canceled');
  });

  // Find Rss link
  rssFinder(url)
    .then((feedLinkData) => {

      _getFeedData(feedLinkData.feedUrls[0].url)
        .then((feedContentData) => {
          res.status(200).json(feedContentData);
        })
        .catch((err) => {
          console.log(err);
          res.status(404).end()
        });
    })
    .catch((err) => {
      res.status(404).end();
    });

});

// Delete Feed By ID
app.delete('/feed/:id', urlEncoder, (req, res) => {
    const id = req.params.id;
    client.lrange('feeds', 0, -1, (err, chunks) => {
        let chunk = JSON.parse(chunks[0]);
        if(err) {
          res.status(404).json({ error: true, data: "Not Founded!"}).end();
        }

        const editedArray = chunk.filter((value) => {
          return value.id != id;
        });

        console.log(editedArray);
        client.lpush('feeds', JSON.stringify(editedArray), (err) => {
          if(err) throw err;
          res.status(200).json({ error : false, data : editedArray[0].id });
        })
    });
});

// Adding new feed
app.post('/add', urlEncoder, (req, res) => {
    const url = req.body.url;

    rssFinder(url)
      .then( (feedInfo) => {
          const maxTitleLength = feedInfo ?
                              ( feedInfo.site.title.length > 26 ? 26 : feedInfo.site.title.length )
                              : 0;
          client.lrange('feeds', 0, -1, (err, chunks) => {
            let chunk = JSON.parse(chunks[0]);
            chunk.push({
              id: chunks[0].length,
              icon : 'circle-o',
              name : feedInfo.site.title.substr(0,26),
              link : url,
              categorized : false,
              category : '',
              starred : false
            });

            client.lpush('feeds', JSON.stringify(chunk), (err) => {
              if(err) {
                console.log(chunk, "We Can't push new feed in the DB");
              } else {
                console.log(chunk, "We Pushed new feed in DB Successfully");
              }
            })
          });
      });
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
