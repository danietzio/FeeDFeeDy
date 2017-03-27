import React from 'react';

import '../styles/logo.css';


export default class Logo extends React.Component {
	render() {
		return(
			<div>
				<img src={ this.props.src + "/assets/images/logo.png" } />
				<p> { this.props.descp }</p>
			</div>
		)
	};
}
