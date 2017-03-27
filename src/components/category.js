import React from 'react';

import '../styles/categories.css';

export default class Category extends React.Component {
	constructor() {
		//calling upper constructor
		super();

		// set intial categories
		this.state = {
			categories : [{ id : 1 , descp : 'All Items', 'icon' : 'server'},
										{ id : 2 , descp : 'Starred Items' , 'icon' : 'star'},
										{ id : 3 , descp : 'Categorized', 'icon' : 'circle-o'}
									 ]
		}
	}
	render() {
		const list = this._getComments();
		return(
			<ul id="category-list">{ list }</ul>
		);
	}

	_getComments() {
		return this.state.categories.map((value) => {
				return(
					<li key={ value.id }>
						<span>
							<i className={ "fa fa-" + value.icon } aria-hidden="true"></i>
						</span>
						<a>{ value.descp }</a>
					</li>
			);
		});

	}
}
