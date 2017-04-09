import React from 'react';
import $ from 'jquery';

import LeftPanel from '../components/left-panel.js';
import RightPanel from '../components/right-panel.js';

import '../styles/layout.css';

export default class Layout extends React.Component {
	constructor() {
		super();
		// binding This to getFeedByID Function
		this._getFeedByID = this._getFeedByID.bind(this);

		// binding This to Change Default Feed function
		this._changeFeed = this._changeFeed.bind(this);

		// binding This to Unsubscribe Function
		this._unSubscribe = this._unSubscribe.bind(this);

	}

	componentWillMount() {
			this.state = {
				defaultFeedId : 1,
				feeds : []
			}
	}

	render() {
		const feeds = this.state ? this.state.feeds : [];
		const feed = this.state ?  this._getFeedByID( this.state.defaultFeedId ) : { };

		return(
			<div className="fluid-container">
					<LeftPanel feeds = { feeds } changeFeed = { this._changeFeed }></LeftPanel>
					<RightPanel feed = { feed } unsub = { this._unSubscribe }></RightPanel>
			</div>
		);
	}

	componentDidMount() {
			setInterval(() => {
				this._fetchAllFeeds()
					.then((chunks) => {
							this.setState({
								feeds : chunks
							});
				}).catch((err) => {
					if(err.message == "Not Founded")  {
						this.setState({
							defaultFeedId : 1,
							feeds : []
						});
					}
					else {
						console.log(err);
						throw err;
					}
				});
			}, 4000);
	}

	// Get all Feeds from server
	_fetchAllFeeds() {
			return  new Promise((resolve, reject) => {

				// Sending Request To get all of the feeds
				$.ajax({
					type : 'GET',
		      url : `http://localhost:8080/feeds`,
		      data : ''
				})
					.error((err) => {
						 if(err) reject(new Error("Request Error"));
					})
					.success((chunk) => {
						if(chunk.error) {
							reject(new Error("Not Founded"));
						}
						resolve(JSON.parse(chunk.data));
					})
			});
	}

	// Get Feed by id
	_getFeedByID(id) {

		// Get Information Of all Feeds
		const feeds = this.state && this.state.feeds;
		
		// find feed by given id
		let feed = [];

		if(feeds) {
			feeds.map((value) => {
				if(value.id == id) {
					feed = value;
				}
			});
		}

		//returning Specified feed's Information
		return feed;
	}

	// Changing Default Feed ID when use click on left panel links
	_changeFeed(id) {
		this.setState({ defaultFeedId : id });
	}

	// unsubscribe feed by ID
	_unSubscribe(id) {

		const temp = this.state && this.state.feeds;
		if(temp && confirm("Do you want to unsub " + this.state.feeds[id - 1].name)) {
				$.ajax({
					type : 'DELETE',
					url : 'http://localhost:8080/feed/' + id
				})
					.error((err) => {
						console.log("We Can't Now UnSub This, Check Your Connections!");
						throw err;
					})
					.success((chunk) => {
						temp.splice(id - 1,1);
						this.setState({
								defaultFeedId : chunk.data,
							feeds : temp
						});
					})
		}
	}
}
