import React from 'react';

import '../styles/right-panel.css';

export default class RightPanel extends React.Component {
	render() {
		return(
      <div id="right-panel-container">
					<div className="fluid-container">
						<RightTopMenu src="http://localhost:8000/assets/images"></RightTopMenu>
						<RightConent></RightConent>
					</div>
			</div>
		);
	}
}
