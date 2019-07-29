import { Application } from 'probot' // eslint-disable-line no-unused-vars
import { WebhookPayloadPullRequest } from '@octokit/webhooks'
const { WebClient } = require('@slack/web-api')
const web = new WebClient(process.env.Slack_Token)

module.exports = (app : Application) => {
  app.log('***** This is my app ')

  app.on('pull_request.opened', async (context) => {
    console.log('PR************')
    const payload: WebhookPayloadPullRequest = context.payload
    console.log(JSON.stringify(payload))
    const issueComment = context.issue({body: 'PR opened'})//{ body: `Thanks for opening this pull request with the title ${payload.pull_request.title}, ${payload.pull_request.user.login}!!! The contents of head are:` + '\n\n\n```json\n' + JSON.stringify(payload.pull_request.head, null, 2) + '\n```\n' + 'The sender is:\n\n\n```json\n' + JSON.stringify(payload.sender, null, 2) + '\n```\n' })
    await context.github.issues.createComment(issueComment)
  })

  app.on('issues.opened', async (context) => {
    app.log('***** start ')
    const issueComment = context.issue({ body: 'Thanks for opening this issue!' });
    await context.github.issues.createComment(issueComment);
    //Start
    (async () => {
      // Use the `auth.test` method to find information about the installing user
      const res = await web.auth.test()
      // Find your user id to know where to send messages to
      const userId = res.user_id

      const response = await web.channels.list({});
      for (let i of response.channels){
        //console.log(i.name);
      }

      console.log("********");

      const response2 = await web.groups.list({});

      for (let i of response2.groups){
        console.log(i.name);
        /*if(i.name=="mpdm-manel.tahari--mbelhaouane--ahlem.zebda-1"){
          // Use the `chat.postMessage` method to send a message from this app
          await web.chat.postMessage({
            channel: i.id,
            text: `This is a test message`,
          });
        }*/
      }
    })();
  })

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}
