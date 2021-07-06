const { MessageEmbed, Client, Message, DiscordAPIError } = require("discord.js");
const db = require("quick.db");
const Main = require('../../src/Settings/Settings.json');
const config = require('../../src/Settings/Config.json');
const moment = require("moment");
exports.beta = async (client, message, args) => {
  
  if (!message.member.hasPermission("ADMINISTRATOR") && !message.member.roles.cache.has(Settings.Roles.Registerer)) return message.channel.send(new MessageEmbed().setAuthor("Yetersiz Yetki").setDescription(`**\`»\`** Bu komutu kullanabilmek için \`Admin\` veya \`Kayıt Sorumlusu\` yetkisine sahip olman gerekmekte.`).setColor(Settings.Colors.Red)).then(x => x.delete({ timeout: 6500 }));

  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
  if (!user) return message.channel.send(new MessageEmbed().setDescription("Bir üyeyi etiketlemelisin.")).then(x => x.delete({ timeout: 4000 }));
  let check = await db.has(`${message.author.id}.toplam`)
  if (check === false) return message.channel.send(new MessageEmbed().setAuthor(user.user.username, user.user.avatarURL({ dynamic: true })).setColor("RED").setDescription("Bu üyenin herhangi bir kayıt verisine ulaşamadım."))

  let kadınsayı = await db.get(`${message.author.id}.kadın`)
  let erkeksayı = await db.get(`${message.author.id}.erkek`)
  let toplam = await db.get(`${message.author.id}.toplam`)

  const embed = new MessageEmbed()
   .setAuthor(user.user.username, user.user.avatarURL({ dynamic: true }))
  .setDescription(`• Toplam Kaydettiği Kişi: **${toplam || "0"}**
  • Toplam Kaydettiği Kadın: **${kadınsayı || "0"}**
  • Toplam Kaydettiği Erkek: **${erkeksayı || "0"}**`)
  .setTimestamp()
  .setColor(Settings.Colors.Gold)
  message.channel.send(embed)
};

module.exports.config = { 
  name: 'stat',
  aliases: ['stat']
};
