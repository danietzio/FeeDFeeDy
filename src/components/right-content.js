import React from 'react';
import Article from '../components/feed-article.js';
import $ from 'jquery';
import '../styles/right-content.css';

export default class RightContent extends React.Component {
  constructor() {
    super();

    this._getComments = this._getComments.bind(this);

    this.state = {
      articles : []
    };
  }

  componentWillMount() {
    this._getComments();
  }

  render() {

    return(
      <div className="row" id="feed-container">
        <div className="fluid-container">
          <div className="feed-header-container">
            <div className="feed-header-left-container">
              <i className="fa fa-newspaper-o" aria-hidden="true"></i>
                <span id="title">{ this.props.feed['name'] }</span>
            </div>
            <div className="feed-header-right-container">
              <button className="feed-header-right-btn" onClick = { () => this.props.unsub(this.props.feed.id) }>Unsubscribe</button>
              <button className="feed-header-right-btn">Show Unread</button>
              <button className="feed-header-right-btn">Mark All As Unread</button>
            </div>
          </div>
          <div className="row feed-content-container">
              { this.state.articles }
          </div>
        </div>
      </div>
    );
  }

  _getComments() {
    const articlesTag = [];

    this._getReqFeedArticles(this.props.feed['link'])
        .then((articles) => {
          console.log("HIHIHIHHIHHI");
          for(var article in articles) {
            articlesTag.push(<Article value= { articles[article] } />);
          }
          this.setState({ articles : articlesTag })
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
  }

  _getReqFeedArticles(url) {
    const decodedUrl = encodeURIComponent(url);

    return new Promise(function(resolve, reject) {

      $.ajax({
        type : 'GET',
        url : `http://localhost:8080/feed/${decodedUrl}`,
        data : ''
      }).error( (err) => {
            console.log('error Occuered', err);
            reject(err);
          })
          .success( (data) => {
            console.log('Data Recieved', data);
            resolve(data)
          });

    });
  }
}
