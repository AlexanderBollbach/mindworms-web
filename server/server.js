const path = require("path");

var express = require("express");
var app = express();

const s3 = require("./S3-Manager");
const mongo = require("./MongoManager");

var bodyParser = require("body-parser");

var jsonParser = bodyParser.json({
  limit: 1024 * 1024 * 20,
  type: "application/json"
});
var urlencodedParser = bodyParser.urlencoded({
  extended: true,
  limit: 1024 * 1024 * 20,
  type: "application/x-www-form-urlencoding"
});

var morgan = require("morgan");

morgan.token("id", function getId(req) {
  return req.id;
});

// let morganMiddleware = morgan(function (tokens, req, res) {
//   return [
//     // tokens.method(req, res),
//     tokens.url(req, res),
//     res
//     // tokens.status(req, res),
//     // tokens.res(req, res, 'content-length'), '-',
//     // tokens['response-time'](req, res), 'ms'
//   ].join(' ')
// })

app.use(morgan(":id :method :url"));

// app.use(morganMiddleware)

app.use(jsonParser);
app.use(urlencodedParser);

var multer = require("multer");

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "/tmp");
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + ".mp4");
  }
});
var upload = multer({ storage: storage });

const statDir = path.resolve(__dirname + "/../web-client/dist/");
console.log(statDir);
app.use(express.static(statDir));

// =================================================== update video for project =================================
app.post(
  "/projects/:projectName/updateVideo",
  upload.single("mindwormsUploadField"),
  (req, res) => {
    const { projectName } = req.params;

    s3.upload(req.file.path, projectName).then(val => {
      res.send(200);
    });
  }
);

// ============================================================  get projects =============
app.get("/projects", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  mongo.loadProjects().then(val => {
    res.send(val);
  });
});

// ===========================================================  get project ids ================================
app.get("/projects/ids", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  mongo.loadProjects().then(projects => {
    let result = projects.map(project => project.name);
    res.json(result);
  });
});

// ========================================================= Post Project ===================
app.post("/project", function(req, res) {
  mongo.saveProject(req.body).then(value => {
    res.send(200);
  });
});

// ========================================================= Get Project ===================
app.get("/project/:id", function(req, res) {
  const { id } = req.params;

  mongo.getProject(id).then(value => {
    res.send(value[0]);
  });
});

// ======================================================== Delete Projects
app.delete("/projects", function(req, res) {
  let d1 = mongo.clear();
  let d2 = s3.clear();

  Promise.all([d1, d2]).then(vals => {
    res.send(vals);
  });
});

app.listen(8084);
console.log("running on port 8080");
