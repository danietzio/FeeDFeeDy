import React from 'react';
import Article from '../components/feed-article.js';
import $ from 'jquery';
import '../styles/right-content.css';
import '../styles/right-content-loader.css';

var token = false;
var previousFeed = 0;

export default class RightContent extends React.Component {
  constructor() {
    super();

    this._setDataTempelate = this._setDataTempelate.bind(this);

  }

  componentWillMount() {
    this.state = {
      articles : []
    }

    if(Object.keys(this.props.feed || {}).length !== 0 && this.props.feed.constructor === Object) {
      this._getReqFeedArticles(this.props.feed['link']);
    }
  }

  render() {
    let loadedDiv = '';
    console.log("In render" , previousFeed, this.props.feed['id']);
    if( ( this.state.articles == [] ) ||
          previousFeed !== ( this.props.feed && this.props.feed['id'] ) ) {

            //Fetch Data
            this._getFeedDataCont();

            //Initlize Loaded Div
       loadedDiv = (
                    <div className="row loader-container feed-content-container">
                      <div className="loader">
                      <div className="loader__bar"></div>
                      <div className="loader__bar"></div>
                      <div className="loader__bar"></div>
                      <div className="loader__bar"></div>
                      <div className="loader__bar"></div>
                      <div className="loader__ball"></div>
                      <span> Loading ... </span>
                      </div>
                    </div>
                  );
    } else {
       loadedDiv = (
                   <div className="row feed-content-container">
                       { this.state && this.state.articles }
                   </div>
                  );
    }

    return(
      <div className="row" id="feed-container">
        <div className="fluid-container">
          <div className="feed-header-container">
            <div className="feed-header-left-container">
              <i className="fa fa-newspaper-o" aria-hidden="true"></i>
                <span id="title">{ this.props.feed && this.props.feed['name'] }</span>
            </div>
            <div className="feed-header-right-container">
              <button className="feed-header-right-btn" onClick = { () => { if(this.props.feed) this.props.unsub(this.props.feed.id) } }>Unsubscribe</button>
              <button className="feed-header-right-btn">Show Unread</button>
              <button className="feed-header-right-btn">Mark All As Unread</button>
            </div>
          </div>
          { loadedDiv }
        </div>
      </div>
    );
  }

  componentDidMount() {
          this._getFeedDataCont();
  }

  _getFeedDataCont() {
    if(!token) {
        token = true;
        this._getReqFeedArticles((this.props.feed && this.props.feed['link'])
                                  || 'Empty');
    }
  }

  _setDataTempelate(articles) {
    const articlesTag = [];
    for(var i in articles) {
      const article = articles[i];

      // Making Article data Clear
      // Removing Extra tags from description
      const contentStr = article.content;

      // finding images src
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = contentStr;

      const tempData = $(tempDiv).text();


      let tempImgSrc = tempDiv.querySelector('img');
      tempImgSrc = tempImgSrc &&  tempImgSrc.getAttribute('src');

      // inja mitonim "srcSet" ro ham be dast birarim va responsive tar dorost konim.
      // Removing query parametrs from image links
      tempImgSrc = tempImgSrc && tempImgSrc.split("?")[0];

      // Converting Date String To Correct syntax
      const tempDate = new Date(article.published);
      let todayDate = new Date();
      var yesterdayDate = new Date(todayDate.setDate(todayDate.getDate()-1));
      let tempDateStr = "";
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

      // reinitilizing the today date
      todayDate = new Date();

      if(tempDate.setHours(0,0,0,0) == todayDate.setHours(0,0,0,0)) {
        tempDateStr = "Today";
      } else if(tempDate.setHours(0,0,0,0) == yesterdayDate.setHours(0,0,0,0) ) {
        tempDateStr = "Yesterday"
      } else {
        tempDateStr = monthNames[tempDate.getMonth()].toString()
                      + " " + tempDate.getDay().toString();
      }


      // Creating new properties for each feed content
      article.descp = tempData;
      article.imgSrc = tempImgSrc;
      article.newDate = tempDateStr;

      articlesTag.push(<Article value= { articles[i] } />);
    }


    // save previous rendered feed
    previousFeed = this.props.feed && this.props.feed['id'];

    this.setState({
      articles : articlesTag
    });
  }

  _getReqFeedArticles(url) {
    console.log(url);
    const decodedUrl = encodeURIComponent(url);

    $.ajax({
      type : 'GET',
      url : `http://localhost:8080/feed/${decodedUrl}`,
      data : ''
    }).error( (err) => {
            this._getFeedDataCont();
          console.log('error Occuered', err);
          token = false;

        })
        .success( (data) => {
          console.log('Data Recieved', data);
            this._setDataTempelate(data);
            token = false;

            // save previous rendered feed
            previousFeed = this.props.feed && this.props.feed['id'];

        });
  }
}
