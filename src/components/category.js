import React from 'react';

import '../styles/categories.css';

export default class Category extends React.Component {
	constructor() {
		//calling upper constructor
		super();

	}
	render() {
		const list = this._getComments();
		return(
			<ul id="category-list">{ list }</ul>
		);
	}

	_getComments() {
		// get all of the feeds
		const  categories = this.props.feeds;

		// unCategorized Items

		// Categorized Items

		return categories.map((value) => {
				return(
					<li key={ value.id }>
						<span>
							<i className={ "fa fa-" + value.icon } aria-hidden="true"></i>
						</span>
						<a onClick={ this.props.feedClicked(value.id)}>{ value.name }</a>

						 {/* Position Of the subfiled for categorized and unCategorized feeds */}
					</li>
			);
		});

	}

}
