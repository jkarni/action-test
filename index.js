const core = require('@actions/core');
const github = require('@actions/github');
const request = require('request');

try {
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);

  github.context.repo.owner
  const baseUrl = core.getInput('url');
  const url = baseUrl + github.context.repo.owner + "/"
         + github.context.repo.repo + "/commit/" + github.context.sha;
  console.log(`Querying ${url}!`);
  let result = "success";
  request.post(url, (err, response, body) => {
    if(response.statusCode != 200) {
      core.notice(body);
      result = "failure";
      core.setFailed("Server says bad!")
    } else {
      response.text().then((t) => core.info(t));
    }
  })
  core.setOutput("result", result);
} catch (error) {
  core.setFailed(error.message);
}
