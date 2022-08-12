const postUrl = ''; // slackの通知先チャンネルのURL
const username = '';  // 通知時に表示されるユーザー名
const icon = '';  // 通知時に表示されるアイコン

function publishToSlack(message) {
  const payload = JSON.stringify({
    "username" : username,
    "icon_emoji": icon,
    "text" : message
  });

  const options = {
    "method" : "post",
    "contentType" : "application/json",
    "payload" : payload
  };

  UrlFetchApp.fetch(postUrl, options);
}

export default publishToSlack;
