import React from 'react';
import '../styles/feed-article.css';

export default class Article extends React.Component {
  constructor() {
    super();

  }
  render() {
    return(
      <article>
        <div className="article-container">
          <div className="article-title-container">
            <span className="column-description">{this.props.value.feed.name}</span>
          </div>
          <div className="article-data-container">
            <span className="column-description article-data-description">
              <span>{this.props.value.title}</span>
              <span>{this.props.value.content}</span>
            </span>
          </div>
          <div className="article-metadata-container">
            <span className="column-description"> {this.props.value.published}</span>
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
          <h1> {this.props.value.title} </h1>
          <div className="article-image-container">
            <img src={this.props.value.img} />
          </div>
          <div  className="article-expand-descp">
            <span>
               {this.props.value.content}
            </span>
          </div>
        </div>
      </article>
    );
  }
}
