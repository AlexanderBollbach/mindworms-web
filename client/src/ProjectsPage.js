import React from "react";
import ReactDOM from "react-dom";
import { FlexLayout, Title, AppLayout } from "./CustomStyledComponents";
import { Link } from "react-router-dom";

const ProjectsPage = () => {
	return (
		<AppLayout>
			<Title standard>{"Projects"}</Title>
			<ProjectsContainer />
		</AppLayout>
	);
};

class ProjectsContainer extends React.Component {
	componentDidMount() {
		fetch("http://localhost:8080/projects")
			.then(res => {
				return res.json();
			})
			.then(parsed => {
				this.setState({ projects: parsed });
			});
	}

	render() {
		if (this.state && this.state.projects != null) {
			return <ProjectsList projects={this.state.projects} />;
		} else {
			return <div> no projects </div>;
		}
	}
}

const ProjectsList = ({ projects }) => {
	return (
		<FlexLayout>
			{projects.map((project, index) => (
				<ProjectItem key={index} project={project} />
			))}
		</FlexLayout>
	);
};

const ProjectItem = ({ project }) => {
	let url = `/projects/${project.name}`;

	return (
		<Link to={url}>
			<Title>{project.name}</Title>
		</Link>
	);
};

export default ProjectsPage;
