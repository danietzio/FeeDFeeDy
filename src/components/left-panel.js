import React from 'react';
import Logo from '../components/logo.js';
import Category from '../components/category.js';

import '../styles/left-panel.css';

export default class LeftPanel extends React.Component {
	render() {
		return(
					<div id="left-panel-container">

						<ul id="left-panel">

							<li id="logo-header"><Logo src="http://localhost:8000" descp="Company logo" /></li>

							<li><Category feeds={ this.props.feeds } changeFeed = { this.props.changeFeed }/></li>

							<li className="button" id="add-feed">
									<span>
										<span>
											<i className="fa fa-plus" aria-hidden="true"></i>
										</span>
										<a onClick={ () => this.props.addFeed() }>ADD New Feed</a>
									</span>
							</li>
						</ul>

					</div>
		);
	}
}
