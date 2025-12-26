module.exports.config = {
  name: "leave",
  eventType: ["log:unsubscribe"],
  version: "1.0.0",
  credits: "𝙆𝙞𝙣𝙜 𝘾𝙝𝙖𝙩 𝘽𝙤𝙩",
  description: "Thông báo bot hoặc người rời khỏi nhóm",
  dependencies: {
    "fs-extra": "",
    "path": ""
  }
};

module.exports.run = async function({ api, event, Users, Threads }) {
  if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;

  const { createReadStream, existsSync, mkdirSync } = global.nodemodule["fs-extra"];
  const { join } = global.nodemodule["path"];
  const { threadID } = event;

  const data = global.data.threadData.get(parseInt(threadID)) || (await Threads.getData(threadID)).data;
  const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);

  const type = (event.author == event.logMessageData.leftParticipantFbId)
    ? " 𝘼𝙧𝙚 𝙢𝙖𝙨𝙖𝙠𝙖𝙡𝙞 𝙠𝙖𝙝𝙖 𝙘𝙝𝙖𝙡𝙞 𝙯𝙖𝙧𝙖 𝙝𝙖𝙢𝙚 𝙫𝙞 𝙡𝙚 𝙘𝙝𝙖𝙡 \n✦─────꯭─⃝‌‌𝙆𝙞𝙣𝙜 𝐂𝐡𝐚𝐭 𝐁𝐨𝐭────✦"
    : "𝘾𝙝𝙖𝙡𝙩𝙞 𝙝𝙖 𝙠𝙮𝙖 𝙥𝙖𝙜𝙡𝙞 🤪 WELLCOME REMOVE🤧\n✦─────꯭─⃝‌‌𝙆𝙞𝙣𝙜 𝐂𝐡𝐚𝐭 𝐁𝐨𝐭────✦";

  const path = join(__dirname, "𝙆𝙞𝙣𝙜 𝙍𝙞𝙩𝙞𝙠", "leaveGif");
  const gifPath = join(path, `leave1.gif`);

  if (!existsSync(path)) mkdirSync(path, { recursive: true });

  let msg = (typeof data.customLeave == "undefined")
    ? "𝙎𝙖𝙙 {name} {type} "
    : data.customLeave;

  msg = msg.replace(/\{name}/g, name).replace(/\{type}/g, type);

  const formPush = existsSync(gifPath)
    ? { body: msg, attachment: createReadStream(gifPath) }
    : { body: msg };

  return api.sendMessage(formPush, threadID);
};
