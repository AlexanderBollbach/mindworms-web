
import React from "react";
import ReactDOM from "react-dom";
import { FlexLayout, Title, AppLayout } from './CustomStyledComponents'
import { Link } from "react-router-dom";

const ProjectDetailPage = ({ match }) => {
	return (
		<AppLayout>
			<Title standard>{match.params.name}</Title>
			<ProjectDetail name={match.params.name} />
		</AppLayout>
	);
};

const ProjectDetail = ({ name }) => {
	let url = `https://s3.amazonaws.com/mindworms/${name}`;

	return (
		<div>
			<video width="320" height="240" controls>
				<source src={url} type="video/mp4" />
			</video>
		</div>
	);
};

export default ProjectDetailPage