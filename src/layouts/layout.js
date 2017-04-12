import React from 'react';
import $ from 'jquery';
import validUrl from 'valid-url';

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
					<LeftPanel addFeed = { this._addFeed } feeds = { feeds } changeFeed = { this._changeFeed }></LeftPanel>
					<RightPanel feed = { feed } unsub = { this._unSubscribe }></RightPanel>
			</div>
		);
	}

	componentDidMount() {
			this._getFeedsCont();

			setInterval(() => {
				this._getFeedsCont();
			}, 30000);
	}

	_getFeedsCont() {
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
	}

	// feed adding functionionality
	_addFeed() {
		let url = prompt('Please Enter Website url');

		if(url) {
			while( !validUrl.isUri(url) ) {
				url = prompt('Please Enter Valid Website Url!');
			}

			$.ajax({
				type : 'POST',
				url  : 'http://localhost:8080/add',
				data : { url : url.toString() }
			})
				.error( (err) => {
					if(err) console.log("Request Error");
				})
				.success( (chunk) => {
					if(chunk.error) {
						console.log("Server can't to add new feed, Please Try Later!");
					} else {
						console.log(url + " Has Added Successfully!");
					}
				});
		}
	}

	// Get all Feeds from server
	_fetchAllFeeds() {
			return  new Promise((resolve, reject) => {

				// Sending Request To\ get all of the feeds
				$.ajax({
					type : 'GET',
		      url : `http://localhost:8080/feeds`,
		      data : ''
				})
					.error((err) => {
						 if(err) {
							 this._getFeedsCont();
							 reject(new Error("Request Error"));
						 }
					})
					.success((chunk) => {
						if(chunk.error) {
							reject(new Error("Not Founded"));
						}
						else {
							resolve(JSON.parse(chunk.data));
						}
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
