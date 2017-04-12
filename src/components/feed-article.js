import React from 'react';

import '../styles/feed-article.css';

export default class Article extends React.Component {
  constructor() {
    super();

    // Binding this to toggleStyle function
    this._toggleStyle = this._toggleStyle.bind(this);

    this.state = {
      articleExpandedClass : "article-expand-container article-hidden",
      articleDisplayClassInd : 0,
      articleDisplayClasses : ['article-expand-container article-expanded',
                               'article-expand-container article-hidden']
    }
  }
  render() {
    // Making images appear only when feed send image link for us
    const imgTag = this.props.value.imgSrc ?
                    <img src={ this.props.value.imgSrc } /> : [];

    return(
      <article onClick={ () => this._toggleStyle() }>
        <div className="article-container">
          <div className="article-title-container">
            <span className="column-description">{this.props.value.feed.name}</span>
          </div>
          <div className="article-data-container">
            <span className="column-description article-data-description">
              <span>{this.props.value.title}</span>
              <span>{this.props.value.descp}</span>
            </span>
          </div>
          <div className="article-metadata-container">
            <span className="column-description"> {this.props.value.newDate}</span>
          </div>
          <div className="article-actions-container">
            <span className="column-description">
              <a><i className='fa fa-check' aria-hidden='true'></i></a>
              <a><i className='fa fa-check' aria-hidden='true'></i></a>
              <a><i className='fa fa-check' aria-hidden='true'></i></a>
            </span>
          </div>
        </div>
        <div className={  this.state.articleExpandedClass }>
          <h2> {this.props.value.title} </h2>
          <div  className="article-expand-descp">
            <div dangerouslySetInnerHTML={{__html: this.props.value.content}}>

            </div>
          </div>
        </div>
      </article>
    );
  }

  _toggleStyle() {
    let classes = this.state.articleDisplayClasses;
    let index = this.state.articleDisplayClassInd++ % 2;
    console.log(this.state.articleExpandedClass)
    console.log(index);
    this.setState({
       articleExpandedClass : classes[index],
       articleExpandedInd : index,
    });
  }
}
