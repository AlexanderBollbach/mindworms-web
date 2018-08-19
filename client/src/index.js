import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

import ProjectsPage from "./ProjectsPage";
import ProjectDetailPage from './ProjectDetailPage'



ReactDOM.render(
	<Router>
		<div>
			<Route exact path="/" component={ProjectsPage} />
			<Route path="/projects/:name" component={ProjectDetailPage} />
		</div>
	</Router>,
	document.getElementById("index")
);
