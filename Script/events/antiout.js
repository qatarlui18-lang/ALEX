module.exports.config = {
 name: "antiout",
 eventType: ["log:unsubscribe"],
 version: "0.0.1",
 credits: "𝙆𝙞𝙣𝙜 𝘾𝙝𝙖𝙩 𝘽𝙤𝙩",
 description: "Listen events"
};

module.exports.run = async({ event, api, Threads, Users }) => {
 let data = (await Threads.getData(event.threadID)).data || {};
 if (data.antiout == false) return;
 if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
 const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);
 const type = (event.author == event.logMessageData.leftParticipantFbId) ? "self-separation" : "Koi Ase Pichware Mai Lath Marta Hai?";
 if (type == "self-separation") {
  api.addUserToGroup(event.logMessageData.leftParticipantFbId, event.threadID, (error, info) => {
   if (error) {
    api.sendMessage(`𝙊𝙥𝙥𝙨, ${name} 𝙄𝙨𝙠𝙤 𝙖𝙙𝙙 𝙣𝙝𝙞 𝙠𝙖𝙧 𝙥𝙖𝙪𝙣𝙜𝙖 𝙮𝙧𝙧𝙧 :( 
𝙎𝙖𝙮𝙖𝙙 𝙨𝙚 𝙐𝙣 𝙝𝙤𝙣𝙚 𝙃𝙖𝙢𝙖𝙧𝙚 𝘿𝙞𝙡 𝙆𝙤 𝘽𝙡𝙤𝙘𝙠 𝙆𝙖𝙧 𝘿𝙞𝙮𝙖 𝙃𝙖𝙞𝙣 
\n──────꯭─⃝‌𝙆𝙞𝙣𝙜  𝐂𝐡𝐚𝐭 𝐁𝐨𝐭─────`, event.threadID)
   } else api.sendMessage(`𝙎𝙪𝙣 𝙧𝙚 𝙥𝙖𝙜𝙡𝙞, ${name}, 𝙆𝙞𝙪 𝙍𝙚 𝙈𝙖𝙩𝙝𝙖𝙧𝙩𝙤𝙡𝙙 𝙆𝙖𝙝𝙖 𝘽𝙝𝙖𝙜 𝙧𝙝𝙖 𝙝𝙖𝙞𝙣 𝙃𝙖𝙝𝙖𝙝𝙖𝙝𝙖𝙝𝙖 
\n──────꯭─⃝‌𝙆𝙞𝙣𝙜 𝐂𝐡𝐚𝐭 𝐁𝐨𝐭─────`, event.threadID);
  })
 }
}
