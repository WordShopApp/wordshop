const AWS = require('aws-sdk');

function s3Client () {
  return new AWS.S3({
    apiVersion: '2006-03-01',
    region: 'us-east-1'
  });
}

function get (params) {
  return new Promise((resolve, reject) => {
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#getObject-property
    s3Client().getObject(params, (err, data) => {
      if (err) return reject(err);
      let body = data.Body.toString('utf-8');
      resolve(body);
    });
  });
}

function put (params) {
  return new Promise((resolve, reject) => {
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
    s3Client().putObject(params, (err, data) => {
      if (err) return reject(err)
      resolve(data);
    });
  });
}

function del (params) {
  return new Promise((resolve, reject) => {
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#deleteObjects-property
    s3Client().deleteObjects(params, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function lst (params) {
  return new Promise((resolve, reject) => {
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#listObjectsV2-property
    s3Client().listObjectsV2(params, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
}

module.exports = {
  del: del,
  get: get,
  put: put,
  lst: lst
};