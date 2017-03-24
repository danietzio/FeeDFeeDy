import React from 'react';
import ReactDom from 'react-dom';
import jQuery from 'jquery';

import Layout from './layouts/layout.js';

jQuery(function() {
	ReactDom.render(
		<Layout />,
		document.getElementById('main-container'),
		function() {
			console.log("Rendered !!!");
		}
	);
});