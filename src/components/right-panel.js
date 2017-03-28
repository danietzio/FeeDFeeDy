import React from 'react';

import '../styles/right-panel.css';

export default class RightPanel extends React.Component {
	render() {
		return(
      <div id="right-panel-container">
					<div className="fluid-container">
						<div className="row" id="right-setting-panel">
								<div className="col-xs-3 col-sm-3 col-md-3 middleDiv">
											<img className="icons" src={ this.props.src + "/refresh.png" } />
											<img className="icons" src={ this.props.src + "/down-arrow-white.png" } />
								</div>
								<div className="col-xs-5 col-sm-7 col-md-7 middleDiv">
									<div id="bk_search">
											<i className="fa fa-2x fa-search" aria-hidden="true"></i>
											<input placeholder="Search Here..." type="text"></input>
									</div>
								</div>
								<div className="col-xs-4 col-sm-2 col-md-2 middleDiv">
									<div id="bk_profile">
											<span>Dani Nasiri</span>
											<a href="#"><div></div></a>
									</div>
								</div>
						</div>

						<div className="row" id="right-main-panel">

						</div>
					</div>
			</div>
		);
	}
}
