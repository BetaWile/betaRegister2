const { MessageEmbed } = require('discord.js');
const Settings = require('../Settings/Config.json');

exports.beta = async (client, message, args) => {

  if (!message.member.hasPermission("ADMINISTRATOR") && !message.member.roles.cache.has(Settings.Roles.ustyetki)) return;

  let users = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if(!users) return message.channel.send(embedx.setDescription(`Bir Üye Etiketlemelisin.`).setTimestamp().setColor("RED"))
  const unregister = message.guild.roles.cache.find(r => r.id === (Settings.Roles.Unregister))

users.setNickname(Settings.Welcome.WelcomeName)
users.roles.add(Settings.Roles.Booster);
users.roles.add(Settings.Roles.Unregister);
users.roles.cache.forEach(r => {
users.roles.remove(r.id)
});

  message.channel.send(new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL()).setDescription(`${users} Adlı Kullanıcı Başarıyla Kayıtsız'a Atıldı.`).setTimestamp().setColor("RED")).then(x => x.delete({ timeout: 4000 }));
};

module.exports.config = { 
  name: 'kayıtsız',
  aliases: ['kayıtsız', 'unregister']
};