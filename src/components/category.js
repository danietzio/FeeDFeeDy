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
		
		// Categorized Items
		let categorizedFeeds = categories.filter((value) => {
			return value.categorized;
		});

		categorizedFeeds = categorizedFeeds.map((value) => {
			return (
				<li key = { value.id }>
					<span>
						<i className={ "fa fa-" + value.icon } aria-hidden="true"></i>
					</span>
					<a onClick={ this.props.changeFeed(value.id)}>{ value.name }</a>
				</li>
			)
		});

		// Uncategorized Items
		let unCategorizedFeeds = categories.filter((value) => {
			return !(value.categorized);
		});

		unCategorizedFeeds = unCategorizedFeeds.map((value) => {
			return (
				<li key = { value.id }>
					<span>
						<i className={ "fa fa-" + value.icon } aria-hidden="true"></i>
					</span>
					<a onClick={ () => this.props.changeFeed(value.id)}>{ value.name }</a>
				</li>
			)
		});


		// main titles for left panel links
		const panelTitrs = [
			<li key = { "all-items" }><span><i className="fa fa-newspaper-o" aria-hidden="true"></i>All Items</span></li>,
			<li key = { "starred-items" }><span><i className="fa fa-star" aria-hidden="true"></i>Starred Items</span></li>,
			<li key = { "categorized"}>
				<span><i className="fa fa-address-book" aria-hidden="true"></i>Categorized</span>
				<div>
					<ul>
						{ categorizedFeeds }
					</ul>
				</div>
			</li>,
			<li key = { "Uncategorized" }>
				<span><i className="fa fa-address-card" aria-hidden="true"></i>Uncategorized</span>
				<div>
					<ul>
						{ unCategorizedFeeds }
					</ul>
				</div>
			</li>,
		];


		return(
			panelTitrs
		);

	}

}
