const MongoClient = require("mongodb").MongoClient;
const user = "mindwormsuser";
const password = "rhapsody";
const dbName = "mindworms";
const url = `mongodb://${user}:${password}@ds241059.mlab.com:41059/${dbName}`;

function projects() {
	let foo = MongoClient.connect(url).then(val => {
		return val.db(dbName).collection("projects");
	});
	return foo;
}

function saveProject(project) {
	return projects().then(c => {
		return c.update({ name: project.name }, project, { upsert: true });
	});
}

function clear() {
	return projects().then(val => {
		return val.deleteMany({});
	});
}

function loadProjects() {
	return projects().then(c => {
		return c
			.find()
			.toArray()
			.then();
	});
}

function getProject(projectId) {
	return projects().then(c => {
		return c
			.find({ name: projectId }) // temp using name as id
			.toArray()
			.then();
	});
}

let myExports = {
	saveProject: saveProject,
	loadProjects: loadProjects,
	getProject: getProject,
	clear: clear
};

module.exports = myExports;
