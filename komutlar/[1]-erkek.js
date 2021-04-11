const { MessageEmbed } = require('discord.js')//
const data = require('quick.db')//
const settings = require('../managment/settings.json')//
exports.run = async (client, message, args) => {
if(!message.member.roles.cache.get(settings.roller.teyitcirol) && !message.member.hasPermission('ADMINISTRATOR'))
return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
.setDescription(`Bu komutu kullanmak için <@&${settings.roller.teyitcirol}> yetkisine sahip olmalısın.`)
.setColor(settings.renk.kirmizi))
.then(x => x.delete({ timeout: 6500 }));
const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
let Name = args[1]
let Age = args[2]
if(!member) return message.channel.send(new MessageEmbed().setDescription(`Geçerli bir kullanıcı/ID belirtmelisin.`).setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor(settings.renk.kirmizi)).then(x => x.delete({timeout: 6500}));
if(!Name || !Age) return message.channel.send(new MessageEmbed().setDescription(`Geçerli bir yaş belirtmelisin.`).setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor(settings.renk.kirmizi)).then(x => x.delete({timeout: 6500}));
if(Age < 13) return message.channel.send(new MessageEmbed().setDescription(`13 yaşından küçük üyeler kayıt edilemez.`).setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor(settings.renk.kirmizi)).then(x => x.delete({timeout: 6500}));
if(member.id === message.author.id) return message.channel.send(new MessageEmbed().setDescription(`Kendini kayıt edemezsin.`).setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor(settings.renk.kirmizi)).then(x => x.delete({timeout: 6500}));
if(member.id === message.guild.OwnerID) return message.channel.send(new MessageEmbed().setDescription(`Sunucu sahibine bu komutu kullanamazsın.`).setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor(settings.renk.kirmizi)).then(x => x.delete({timeout: 6500}));
if(member.id === client.user.id) return message.channel.send(new MessageEmbed().setDescription(`Bir bota bu komutu kullanamazsın.`).setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor(settings.renk.kirmizi)).then(x => x.delete({timeout: 6500}));
if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(new MessageEmbed().setDescription(`Bu kullanıcı sizden üst/aynı pozisyonda.`).setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor(settings.renk.kirmizi)).then(x => x.delete({timeout: 6500}));
data.add(`yetkili.${message.author.id}.erkek`, 1)
data.add(`yetkili.${message.author.id}.toplam`, 1)
let kayıtlar = data.fetch(`yetkili.${message.author.id}.toplam`)
const Tagisim = `${member.user.username.includes(settings.taglar.servertag) ? settings.taglar.servertag : settings.taglar.untag} ${Name} | ${Age}`;
member.setNickname(`${Tagisim}`)
member.roles.add(settings.roller.erkekrol1)
member.roles.add(settings.roller.erkekrol2)
member.roles.add(settings.roller.erkekrol3)
member.roles.remove(settings.roller.kayıtsızrol)
member.roles.remove(settings.roller.karantinarol)
message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
.setDescription(`${member} üyesi ${message.author} tarafından kayıt edildi. \n\nÜye artık <@&${settings.roller.erkekrol1}>, <@&${settings.roller.erkekrol2}>, <@&${settings.roller.erkekrol3}> rollerine sahip. \nKullanıcının ismi \`${Tagisim}\` olarak güncellendi.`)
.setFooter(`Toplam kayıtların: ${kayıtlar}`)
.setColor(settings.renk.mavi))

client.channels.cache.get(settings.kanallar.registerlog).send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
.setDescription(`• Yetkili: ${message.author} | \`${message.author.id}\`\n• Kullanıcı: ${member} | \`${member.id}\`\n• Güncel İsim: \`${Tagisim}\`\n • Roller: <@&${settings.roller.erkekrol1}>, <@&${settings.roller.erkekrol2}>, <@&${settings.roller.erkekrol3}> \n• Toplam Kayıtları: \`${kayıtlar}\` `)
.setColor(settings.renk.mavi))


client.channels.cache.get(settings.kanallar.genelchat).send(`${member} aramıza katıldı.`)

data.push(`isim.${member.id}`,{userID: member.id, isimleri: Tagisim, role: settings.roller.erkekrol1, teyitciid: message.author.id, teyitcisim: message.author.username})}

exports.conf = {enabled: true, guildOnly: true, aliases: ["erkek", "e"]};
exports.help = {name: 'erkek'};// BeT4