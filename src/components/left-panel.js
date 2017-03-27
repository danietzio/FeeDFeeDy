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

							<li><Category /></li>

							<li className="button" id="add-feed">
									<span>
										<i className="fa fa-plus" aria-hidden="true"></i>
									</span>
									<a>Add New Feed</a>
							</li>

							<li className="button" id="setting">
								<span>
									<i className="fa fa-cog" aria-hidden="true"></i>
								</span>
								<a>Setting</a>
							</li>
						</ul>

					</div>
		);
	}
}
