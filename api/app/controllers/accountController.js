const AWS = require('aws-sdk');
const moment = require('moment');
const shortid = require('shortid');
const http = require('../services/utils');

const { IS_OFFLINE } = process.env;

function log (msg, obj) {
  console.log('WordShop API: ' + msg);
  if (obj) console.log(obj);
}

// http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html
function dynamodbDocumentClient () {
  let ddbc;
  if (IS_OFFLINE === 'true') {
    ddbc = new AWS.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000',
      apiVersion: '2012-08-10'
    });
  } else {
    ddbc = new AWS.DynamoDB.DocumentClient({
      region: 'us-east-1',
      apiVersion: '2012-08-10'
    });
  }
  return ddbc;
}

function fetchUserParams (email) {
  return {
    TableName: 'ws_users',
    IndexName: 'email-index',
    KeyConditionExpression: 'email = :email',
    ExpressionAttributeValues: {
      ':email': email
    }
  };
}

function createUserParams (user) {
  return {
    TableName: 'ws_users',
    Item: {
      user_id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      created: user.created,
      updated: user.updated
    }
  };
}

function fetchItem (awsCreds, queryParams) {
  return new Promise(function (resolve, reject) {
    //http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#query-property
    dynamodbDocumentClient().query(queryParams, function (err, res) {
      if (err) return reject(err);

      var item = res && res.Items && res.Items[0];
      if (!item) return reject({ code: 'ResourceNotFoundException' });

      resolve(item);
    });
  });
}

function saveItem (params) {
  return new Promise(function (resolve, reject) {
    //http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property
    dynamodbDocumentClient().put(params, function (err, res) {
      if (err) return reject(err);
      resolve(res);
    });
  });
}

function createItem (params, awsCreds) {
  return new Promise(function (resolve, reject) {
    //http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property
    dynamodbDocumentClient().put(params, function (err, res) {
      if (err) return reject(err);
      resolve(res);
    });
  });
}

function createUser (user, awsCreds) {
  return new Promise(function (resolve, reject) {
    createItem(createUserParams(user), awsCreds).then(function (res) {
      resolve(user);
    }).catch(reject);
  });
}

function scanItems (params) {
  return new Promise(function (resolve, reject) {
    //http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#scan-property
    dynamodbDocumentClient().scan(params, function (err, res) {
      if (err) return reject(err);
      resolve(res);
    });
  });
}

function updateItem (params) {
  return new Promise(function (resolve, reject) {
    //http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#update-property
    dynamodbDocumentClient().update(params, function (err, res) {
      if (err) return reject(err);
      resolve(res);
    });
  });
}

function fetchUser (email) {
  return new Promise ((resolve, reject) => {
    fetchItem(fetchUserParams(email)).then(resolve).catch(reject);
  });
}

function genTimestamp () {
  // http://momentjs.com/docs/#/displaying/unix-timestamp-milliseconds/
  return moment().valueOf();
}

function genUserId () {
  // https://github.com/dylang/shortid
  return shortid.generate();
}

function genUserName (email) {
  // https://stackoverflow.com/a/20864946
  let name = email.split('@')[0].replace(/[\W_]+/g,'');
  return `${name}{genTimestamp()}`;
}

function createNewUser (user) {
  return new Promise((resolve, reject) => {
    user.id = genUserId();
    createUser(user).then(resolve).catch(err => {
      if (err.code === 'TODO: some error code for duplicate userId') {
        createNewUser(user).then(resolve).catch(reject);
      } else {
        reject(err);
      }
    });
  });
}

function formatNewUser (data) {
  let now = genTimestamp();
  return {
    name: genUserName(data.email),
    email: data.email,
    avatar: data.avatar,
    subscription: data.subscription,
    joinMailingList: data.joinMailingList,
    created: now,
    updated: now
  }
}

module.exports.profileCreate = (req, res) => {
  let newUser = formatNewUser(req.body);
  fetchUser(newUser.email).then(user => {
    console.log('POST /profile', 'exists', user);
    res.status(http.codes.ok).send(user);
  }).catch(err => {
    if (err.code === 'AccessDeniedException') {
      console.log('POST /profile', 'unauthorized', err);
      res.status(http.codes.unauthorized).send({ message: 'unauthorizied' });
    } else if (err.code === 'ResourceNotFoundException') {

      createNewUser(newUser).then(user => {
        console.log('POST /profile', 'created', user);
        res.status(http.codes.created).send(user);
      }).catch(err => {
        if (err.code === 'AccessDeniedException') {
          console.log('POST /profile', 'unauthorized', err);
          res.status(http.codes.unauthorized).send({ message: 'unauthorizied' });
        } else {
          console.log('POST /profile', 'internal_server_error', err);
          res.status(http.codes.internal_server_error).send({ message: 'internal_server_error' });
        }
      });

    } else {
      console.log('POST /profile', 'internal_server_error', err);
      res.status(http.codes.internal_server_error).send({ message: 'internal_server_error' });
    }
  });
};

module.exports.profileShow = (req, res) => {
  fetchUser(identityId, awsCreds).then(user => {

    console.log('GET /profile', 'found', user);
    res.status(http.codes.ok).send(user);

  }).catch(err => {
    if (err.code === 'AccessDeniedException') {
      console.log('GET /profile', 'unauthorizied', err);
      res.status(http.codes.unauthorized).send({ message: 'unauthorizied' });
    } else if (err.code === 'ResourceNotFoundException') {
      console.log('GET /profile', 'profile_does_not_exist', err);
      res.status(http.codes.not_found).send({ 
        message: 'profile_does_not_exist'
      });
    } else {
      console.log('GET /profile', 'internal_server_error', err);
      res.status(http.codes.internal_server_error).send({ message: 'internal_server_error' });
    }
  });
};