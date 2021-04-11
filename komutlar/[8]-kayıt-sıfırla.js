const Discord = require('discord.js')//
const data = require('quick.db')//
const settings = require('../managment/settings.json')//

exports.run = async (client, message, args) => {
  
if(!message.member.roles.cache.get(settings.roller.ustyetki) && !message.member.hasPermission('ADMINISTRATOR'))
    return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
.setDescription(`Bu komutu kullanmak için <@&${settings.roller.teyitcirol}> yetkisine sahip olmalısın.`)
.setColor(settings.renk.kirmizi))
.then(x => x.delete({ timeout: 6500 }));


const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
if(!member) return message.channel.send(new Discord.MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`Bir kullanıcı belirt.`)
.setColor('#a22a2a')).then(x => x.delete({timeout: 5000}));
if(!member.roles.highest.position >= message.member.roles.highest.position) message.channel.send(new Discord.MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`Belirtilen kullanıcı sizden üst/aynı pozisyonda işleme devam edilemiyor.`)
.setColor('#a22a2a')).then(x => x.delete({timeout: 5000}));

  
data.delete(`yetkili.${message.author.id}.erkek`)
data.delete(`yetkili.${message.author.id}.toplam`)  
data.delete(`yetkili.${message.author.id}.kadin`) 

message.react('✅')

message.channel.send(new Discord.MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setColor("0x2f3136")
.setDescription(`${member} Adlı Kullanıcının data'si Silindi, <@${message.author.id}> Tarafından Sıfırlandı.`))


client.channels.cache.get(settings.kanallar.kayıtsıfırlalog).send(new Discord.MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
.setDescription(`${member} Adlı Kullanıcının data'si Silindi, <@${message.author.id}> Tarafından Sıfırlandı.`)
.setColor(settings.renk.mor))

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["sıfırla", "kayıt-sıfırla", "kayıtsıfırla ", "data-sıfırla", "dataisil", "data-sil"],
    permLevel: 0
};

exports.help = {
    name: "sıfırla"
}// beT4