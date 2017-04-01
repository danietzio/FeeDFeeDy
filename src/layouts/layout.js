import React from 'react';
import LeftPanel from '../components/left-panel.js';
import RightPanel from '../components/right-panel.js';

import '../styles/layout.css';

export default class Layout extends React.Component {
	constructor() {
		super();

		// initlize Default Feed ID
		this.state.defaultFeedId = '';

		// binding This to getFeedByID Function
		this._getFeedByID = this._getFeedByID.bind(this);

		// binding This to Change Default Feed function
		this._changeFeed = this._changeFeed.bind(this);
	}

	render() {
		return(
			<div className="fluid-container">
					<LeftPanel feeds = { this._getFeeds() } changeFeed = { this._changeFeed }></LeftPanel>
					<RightPanel
						feed = { this._getFeedByID( this.state.defaultFeedId )}
					></RightPanel>
			</div>
		);
	}

	//Get Information Of Current User Feeds
	_getFeeds() {

		// inja miaim va feed haro load mikonim
		const feeds = [
					{ id : '1' , icon : 'newspaper-o', name : 'All Items' , link : '#', categorized : false , category : '' , starred : false },
					{ id : '2' , icon : 'circle-o', name : 'ZoomIT' , link : '#', categorized : false , category : '' , starred : false },
					{ id : '3' , icon : 'circle-o', name : 'Techrunch', link : '#', categorized : false , category : '', starred : false},
					{ id : '4' , icon : 'circle-o', name : 'IT News' , link : '#' , categorized : false , category : '', starred : false}
		];

		return feeds;
	}

	// Get Feed by id
	_getFeedByID(id) {

		// Get Information Of all Feeds
		const feeds = this._getFeeds();

		// find feed by given id
		const feed = feeds[id];

		//returning Specified feed's Information
		return feed;
	}

	// Changing Default Feed ID when use click on left panel links
	_changeFeed(id) {
		this.setState({ defaultFeedId : id });
	}
}
