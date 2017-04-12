import React from 'react';

import RightTopMenu from '../components/right-top-menu.js';
import RightContent from '../components/right-content.js';

import '../styles/right-panel.css';

export default class RightPanel extends React.Component {
	render() {
		return(
      <div id="right-panel-container">
					<div className="fluid-container">
						<RightTopMenu src="http://localhost:8000/assets/images"></RightTopMenu>
						<RightContent feed = { this.props.feed } unsub = { this.props.unsub }></RightContent>
					</div>
			</div>
		);
	}
}
