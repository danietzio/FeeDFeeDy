import React from 'react';
import Article from '../components/feed-article.js';

import '../styles/right-content.css';

export default class RightContent extends React.Component {
  constructor() {
    super();

    this._getComments = this._getComments.bind(this);
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
              { this._getComments() }
          </div>
        </div>
      </div>
    );
  }

  _getComments() {
    const articles = this._getReqFeedArticles();

    return articles.map((article) => {
      return <Article key = { article.key} value= { article } />
    });
  }

  _getReqFeedArticles() {
    // felan chon feed haye mokhtalef nadarim, nemitonim request vagheyi bedim
    // va emkan dare ke function varible vorodi masalan "Feeed name" dashte bashe

    
    const articles = [
      { key : 'artc-1', feed : 'ZoomiIT' ,title : 'Article 1', descp : 'This is Article 1 , And Article is about everything that you can think', date : '10:40PM', img : 'http://cdn01.zoomit.ir/2017/3/01b5487f-44cf-42be-bc74-5c38c4189356.jpg'},
      { key : 'artc-2', feed : 'ZoomiIT' ,title : 'Article 2', descp : 'This is Article 2 , And Article is about everything that you can think', date : '10:40PM', img : 'https://tctechcrunch2011.files.wordpress.com/2017/03/gold-iphone-shot1.png?w=680'},
      { key : 'artc-3', feed : 'ZoomiIT' ,title : 'Article 3', descp : 'This is Article 3 , And Article is about everything that you can think', date : '10:40PM', img : 'https://tctechcrunch2011.files.wordpress.com/2016/09/4715498386_3bf830783c_b.jpg?w=680'},
      { key : 'artc-4', feed : 'ZoomiIT' ,title : 'Article 4', descp : 'This is Article 4 , And Article is about everything that you can think', date : '10:40PM', img : 'https://tctechcrunch2011.files.wordpress.com/2017/03/jl-2.png?w=680'},
      { key : 'artc-5', feed : 'ZoomiIT' ,title : 'Article 5', descp : 'This is Article 5 , And Article is about everything that you can think', date : '10:40PM', img : 'https://tctechcrunch2011.files.wordpress.com/2017/03/10_matternet_m2_drone_lugano_switzerland.jpg?w=680'},
    ];

    return articles;
  }


}
