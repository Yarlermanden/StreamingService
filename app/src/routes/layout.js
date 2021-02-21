import {Link, Route } from 'react-router-dom'
import StreamPage from './streamPage'
import React, { useState } from 'react';

function Layout() {
	return (
		<div className="page">
			<h1> Streaming Service </h1>
			<div className="navigation">
				<Link to="/streamPage"> Stream now </Link>
			</div>
			<div className="body">
				<Route
					path="/streamPage"
					render={(props) => (
						<StreamPage {...props} />
					)}
				/>
			</div>
			<div className="footer">
			</div>
		</div>
	);
}

export default Layout;
