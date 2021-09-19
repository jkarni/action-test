const core = require('@actions/core');
const github = require('@actions/github');

try {
  const url = core.getInput('url');
  console.log(`Querying ${url}!`);
  let request = new Request(url);
  let result = "success";
  fetch(request)
        .then((response) => {
            if(!response.ok) {
                response.text().then((t) => core.notice(t));
                result = "failure";
                core.setFailed("Server says bad!")
            } else {
                response.text().then((t) => core.info(t));
            }
        })
  core.setOutput("result", result);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
