const http = require('../services/utils');
const projectService = require('../services/projectService');

function handleException (err, res, desc) {
  if (err.code === 'AccessDeniedException') {
    console.log(desc, 'unauthorized', err);
    res.status(http.codes.unauthorized).send({ 
      message: 'unauthorizied' 
    });
  } else {
    console.log(desc, 'internal_server_error', err);
    res.status(http.codes.internal_server_error).send({ 
      message: 'internal_server_error' 
    });
  }
}

module.exports.projectCreate = (req, res) => {
  let desc = 'POST /projects';
  let newProjData = req.body;
  console.log(desc, 'newProjData', newProjData);
  projectService.add(req.user, newProjData).then(proj => {
    console.log(desc, 'Created', proj);
    res.status(http.codes.created).send(proj);
  }).catch(err => {
    handleException(err, res, desc);
  });
};

module.exports.projectMine = (req, res) => {
  let desc = 'GET /projects/mine';
  projectService.all(req.user.user_id).then(projs => {
    console.log(desc, 'Projects', projs);
    res.status(http.codes.ok).send(projs);
  }).catch(err => {
    handleException(err, res, desc);
  });
};

module.exports.projectShow = (req, res) => {
  let desc = `GET /projects/${req.params.project_id}`;
  projectService.get(req.params.project_id).then(proj => {
    console.log(desc, 'Project', proj);
    res.status(http.codes.ok).send(proj);
  }).catch(err => {
    handleException(err, res, desc);
  });
};

module.exports.projectUpdate = (req, res) => {
};

module.exports.projectDelete = (req, res) => {
};
