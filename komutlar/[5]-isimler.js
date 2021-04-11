const { MessageEmbed } = require('discord.js')//
const db = require('quick.db')//
const moment = require('moment')//
const settings = require('../managment/settings.json')//
exports.run = async (client, message, args) => {

if(!message.member.roles.cache.get(settings.roller.teyitcirol) && !message.member.hasPermission('ADMINISTRATOR'))
return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
.setDescription(`Bu komutu kullanmak için <@&${settings.roller.teyitcirol}> yetkisine sahip olmalısın.`)
.setColor(settings.renk.kirmizi))

let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!user) return message.channel.send(new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setDescription(`Bir kullanıcı belirt.`).setColor(settings.renk.kirmizi))
var sayi = 1
let data = db.get(`isim.${user.id}`)

if(!data) return message.channel.send(new MessageEmbed()
.setAuthor(`Veritabanına kayıtlı isimler`)  
.setDescription(`${settings.durumlar.yanlis} Kullanıcısının veri tabanında kayıtlarına ulaşılamadı.`)
.setFooter(message.author.tag, message.author.avatarURL({dynamic:true}))   
.setColor(settings.renk.kirmizi))
let isimler = data.filter(x => x.userID === user.id).map(x => `${sayi++}- \`${x.isimleri}\`  (<@&${x.role}>)`).join("\n")
if(isimler === null) isimler = "Kullanıcı hiç kayıt olmamış"
if(isimler === undefined) isimler = "Kullanıcı hiç kayıt olmamış"
let yazı = 'tarafından istendi'
const embed = new MessageEmbed()
.setAuthor(`Veritabanına kayıtlı isimler`)  
.setDescription(`${settings.durumlar.dogru} Veri tabanında kullanıcının eski kayıtlı isimleri bulundu:  \n\n${isimler}`)
.setFooter(message.author.tag, message.author.avatarURL({dynamic:true}))  
.setColor(settings.renk.altin)
message.channel.send(embed)}
  
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['isimler', 'eski-isim'],
    permLevel: 0,
  }
  
  exports.help = {
        name: "isimler"
    
  }// beT4