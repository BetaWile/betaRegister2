const Discord = require('discord.js')//
const db = require('quick.db')//
const settings = require('../managment/settings.json')//

exports.run = async (client, message, args) => {

    if(!message.member.roles.cache.some(r => ["ROL ID", "ROL ID"].includes(r.id)) && (!message.member.hasPermission("ADMINISTRATOR")))
    return message.reply("Bu Komutu Kullanmak İçin Yetkiniz Bulunmamakta.")
 
 let kullanıcı = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    
 
if(!kullanıcı) {

let erkek = db.fetch(`yetkili.${message.author.id}.erkek`);
let kadın = db.fetch(`yetkili.${message.author.id}.kadin`);
let kayıtlar = db.fetch(`yetkili.${message.author.id}.toplam`); 
if(erkek === null) erkek = "0"  
if(erkek === undefined) erkek = "0"
if(kadın === null) kadın = "0"
if(kadın === undefined) kadın = "0"
if(kayıtlar === null) kayıtlar = "0"
if(kayıtlar === undefined) kayıtlar = "0"
  
const sorgu1 = new Discord.MessageEmbed()
.setThumbnail(message.author.avatarURL({ dynamic: true}))
.setAuthor(message.author.username, message.author.avatarURL)
.setDescription(`\`˃\` Toplam Kayıtların: \`${kayıtlar}\`
\`˃\` Toplam Erkek Kayıtların: \`${erkek}\`
\`˃\` Toplam Kadın Kayıtların: \`${kadın}\``)
.setColor(settings.renk.mavi)
 return message.channel.send(sorgu1)
};
  
if(kullanıcı) {  
let erkek1 = db.fetch(`yetkili.${kullanıcı.id}.erkek`);
let kadın1 = db.fetch(`yetkili.${kullanıcı.id}.kadin`);
let kayıtlar1 = db.fetch(`yetkili.${kullanıcı.id}.toplam`); 
if(erkek1 === null) erkek1 = "0"  
if(erkek1 === undefined) erkek1 = "0"
if(kadın1 === null) kadın1 = "0"
if(kadın1 === undefined) kadın1 = "0"
if(kayıtlar1 === null) kayıtlar1 = "0"
if(kayıtlar1 === undefined) kayıtlar1 = "0"
  
const sorgu2 = new Discord.MessageEmbed()
.setThumbnail(kullanıcı.user.avatarURL({ dynamic: true})) 
.setAuthor(`${kullanıcı.user.username}`)
.setDescription(`\`˃\` Toplam Kayıtların: \`${kayıtlar1}\`
\`˃\` Toplam Erkek Kayıtların: \`${erkek1}\`
\`˃\` Toplam Kadın Kayıtların: \`${kadın1}\``)
.setColor(settings.renk.special)
 return message.channel.send(sorgu2)
  
};
  
  };

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["kayıtlarım", "kayıtlar", "kayıt-kontrol", "kstat"],
    permLvl: 0,
}
  
exports.help = {  
  name: "kayıt"
}// beT4