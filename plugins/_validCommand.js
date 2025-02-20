export async function before(m) {
  if (!m.text || !global.prefix.test(m.text)) {
    return;
  }

  const usedPrefix = global.prefix.exec(m.text)[0];
  const command = m.text.slice(usedPrefix.length).trim().split(' ')[0].toLowerCase();

  const validCommand = (command, plugins) => {
    for (let plugin of Object.values(plugins)) {
      if (plugin.command && (Array.isArray(plugin.command) ? plugin.command : [plugin.command]).includes(command)) {
        return true;
      }
    }
    return false;
  };

  if (command === "bot") {
    return;
    }
  if (validCommand(command, global.plugins)) {
    let chat = global.db.data.chats[m.chat];
    let user = global.db.data.users[m.sender];
    
    if (chat.isBanned) {
      const avisoDesactivado = `𓈒ㅤׂㅤ𐙚  ࣪ ⭒El bot *${botname}* está desactivado en este grupo.\n\n>  Un *administrador* puede activarlo con el comando:\n> » *${usedPrefix}bot on*`;
      await m.reply(avisoDesactivado);
      return;
    }
    
    if (!user.commands) {
      user.commands = 0;
    }
    user.commands += 1;
  } else {
    const comando = m.text.trim().split(' ')[0];
    await m.reply(`𓈒ㅤׂㅤ𐙚  ࣪ ⭒ ꫀׁׅܻ݊́ᥣׁׅ֪ ᝯׁ֒ᨵׁׅׅꩇׁׅ֪݊ ɑׁׅ݊ꪀժׁׅ݊ᨵׁׅׅ *${comando}* ݊ꪀᨵׁׅׅ ꫀׁׅܻ݊᥊ׁׅꪱׁׁׁׅׅׅׅ꯱tׁׅꫀׁׅܻ݊.\n𝙿𝚊𝚛𝚊 𝚟𝚎𝚛 𝚕𝚊 𝚕𝚒𝚜𝚝𝚊 𝚍𝚎 𝚌𝚘𝚖𝚊𝚗𝚍𝚘𝚜 𝚞𝚜𝚊:\n» */Ｍｅｎｕ*`);
  }
}
