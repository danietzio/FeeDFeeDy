import React from 'react';
import LeftPanel from '../components/left-panel.js';
import RightPanel from '../components/right-panel.js';

import '../styles/layout.css';

export default class Layout extends React.Component {
	render() {
		return(
			<div className="fluid-container">
					<LeftPanel></LeftPanel>
					<RightPanel></RightPanel>
			</div>
		);
	}
}
