import React from 'react';
import '../styles/right-content.css';

export default class RightContent extends React.Component {
  constructor() {
    super();

  }
  render() {
    return(
      <div className="row" id="feed-container">
        <div className="fluid-container">
          <div className="feed-header-container">
            <div className="feed-header-left-container">
              <i className="fa fa-newspaper-o" aria-hidden="true"></i>
              <span id="title">IT News - Zoomit Feed</span>
            </div>
            <div className="feed-header-right-container">
              <button className="feed-header-right-btn">Unsubscribe</button>
              <button className="feed-header-right-btn">Show Unread</button>
              <button className="feed-header-right-btn">Mark All As Unread</button>
            </div>
          </div>
          <div className="row feed-content-container">
              <article>
                <div className="article-container">
                  <div className="article-title-container">
                    <span className="column-description">ZoomIT News</span>
                  </div>
                  <div className="article-data-container">
                    <span className="column-description article-data-description">
                      <span>This is new story</span>
                      <span>this story is about oaddsagsdgdsgwne young man that is very popular,he live in
                      america, he love ...</span>
                    </span>
                  </div>
                  <div className="article-metadata-container">
                    <span className="column-description"> 10:40 PM </span>
                  </div>
                  <div className="article-actions-container">
                    <span className="column-description">
                      <a><i className='fa fa-check' aria-hidden='true'></i></a>
                      <a><i className='fa fa-check' aria-hidden='true'></i></a>
                      <a><i className='fa fa-check' aria-hidden='true'></i></a>
                    </span>
                  </div>
                </div>
                <div className="article-expand-container">
                  <h1> Apple surface is very nice </h1>
                  <div className="article-image-container">
                    <img src="http://cdn01.zoomit.ir/2017/3/01b5487f-44cf-42be-bc74-5c38c4189356.jpg" />
                  </div>
                  <div  className="article-expand-descp">
                    <span>
                       In the recruiting wars, a cool office is critical. Not just for scrappy startups, but big businesses with regional HQs, as well. So while WeWork signs questionable 20-year leases to provide desks for twenty-something engineers, Industrious is taking a more classy and conservative approach to coworking space.
                    </span>
                  </div>
                </div>
              </article>
          </div>
        </div>
      </div>
    );
  }
}
