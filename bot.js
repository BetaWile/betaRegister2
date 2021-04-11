const Discord = require('discord.js');//
const client = new Discord.Client();//
const ayarlar = require('./ayarlar.json');//
const chalk = require('chalk');//
const moment = require('moment');//
var Jimp = require('jimp');//
const { Client, Util } = require('discord.js');//
const fs = require('fs');//
const db = require('quick.db');//
const express = require('express');//
require('./util/eventLoader.js')(client);//
const path = require('path');//
const snekfetch = require('snekfetch');//
const settings = require('./managment/settings.json');//

var prefix = ayarlar.prefix;

const log = message => {console.log(`${message}`);};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
if (err) console.error(err);
log(`Toplam ${files.length} Destekçi Ve Komut Yükleniyor...`);
files.forEach(f => {
let props = require(`./komutlar/${f}`);
log(`BOT | ${props.help.name} Komutu Yüklendi.`);
client.commands.set(props.help.name, props);
props.conf.aliases.forEach(alias => {client.aliases.set(alias, props.help.name);});});});

client.reload = command => {return new Promise((resolve, reject) => {try {delete require.cache[require.resolve(`./komutlar/${command}`)];
let cmd = require(`./komutlar/${command}`);
client.commands.delete(command);
client.aliases.forEach((cmd, alias) => {if (cmd === command) client.aliases.delete(alias);});
client.commands.set(command, cmd);
cmd.conf.aliases.forEach(alias => {client.aliases.set(alias, cmd.help.name);});resolve();} catch (e) {reject(e);}});};

client.load = command => {return new Promise((resolve, reject) => {try {let cmd = require(`./komutlar/${command}`);
client.commands.set(command, cmd);
cmd.conf.aliases.forEach(alias => {client.aliases.set(alias, cmd.help.name);});resolve();} catch (e) {reject(e);}});};

client.unload = command => { return new Promise((resolve, reject) => { try {delete require.cache[require.resolve(`./komutlar/${command}`)];
let cmd = require(`./komutlar/${command}`);
client.commands.delete(command);
client.aliases.forEach((cmd, alias) => {if (cmd === command) client.aliases.delete(alias);});resolve();} catch (e) {reject(e);}});};

client.on("ready", async () => {
  let botVoiceChannel = client.channels.cache.get(ayarlar.botVoiceChannelID);
  if (botVoiceChannel) botVoiceChannel.join().catch(err => console.error("Bot ses kanalına bağlanamadı!"));
});

client.elevation = message => {
if (!message.guild) {return;}
let permlvl = 0;
if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
if (message.author.id === ayarlar.sahip) permlvl = 4; return permlvl;};
var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
client.on('warn', e => {console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));});
client.on('error', e => {console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));});
client.login(ayarlar.token);

client.on("guildMemberAdd", member => {
member.roles.add(settings.roller.kayıtsızrol)
})

client.on("guildMemberAdd", member => {
    require("moment-duration-format")
      var üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
      var üs = üyesayısı.match(/([0-9])/g)
      var tag = '▽'; // TAG
      üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
      if(üs) {
        üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
          return {
            '0': `0`,
            '1': `1`,
            '2': `2`,
            '3': `3`,
            '4': `4`, // HARAKETLİ EMOJİDE KOYABİLİRSİNİZ
            '5': `5`,
            '6': `6`,
            '7': `7`,
            '8': `8`,
            '9': `9`}[d];})}
    const kanal = member.guild.channels.cache.find(r => r.id === ""); // HOŞGELDİNİZ KANAL İD
    let user = client.users.cache.get(member.id);
    require("moment-duration-format");
      const kurulus = new Date().getTime() - user.createdAt.getTime();  
     const gecen = moment.duration(kurulus).format(` YY **[Yıl]** DD **[Gün]** HH **[Saat]** mm **[Dakika,]**`) 
    var kontrol;
  if (kurulus < 1296000000) kontrol = `hesabın güvenilir gözükmüyor. ${settings.durumlar.yanlis}`
  if (kurulus > 1296000000) kontrol = `hesabın güvenilir gözüküyor. ${settings.durumlar.dogru}`
    moment.locale("tr");
    kanal.send(`
Sunucumuza hoşgeldin <@`+ member + `> (\``+member+`\`)
    
Hesabın \``+gecen+`\` önce oluşturulduğu için `+kontrol+` 

Sunucumuzun kanalındaki <#${settings.kanallar.kurallar}> kurallara göz atmayı unutma ! 

Herhangi bir sorun yaşarsan yetkililerimize danışabilirsin ! Sorun çözme odalarında bekleyebilirsin.
    
Seninle birlikte **`+üyesayısı+`** kişiye ulaştık ! Tagımızı (\`${tag}\`) alarak bizlere destek olabilirsin ! Kayıt olmak için teyit odalarına girip ses teyit vermen gerekiyor yetkililerimiz seninle ilgilenecektir. İyi eğlenceler.`)});
  


client.on("guildMemberAdd", member => {
  var moment = require("moment")
  require("moment-duration-format")
  moment.locale("tr")
   var {Permissions} = require('discord.js');
   var x = moment(member.user.createdAt).add(7, 'days').fromNow()
   var user = member.user
   x = x.replace("birkaç saniye önce", " ")
   if(!x.includes("önce") || x.includes("sonra") ||x == " ") {
  const kytsz = member.guild.roles.cache.get(settings.roller.kayıtsızrol) 
   var rol = member.guild.roles.cache.get(settings.roller.karantinarol)
   var kayıtsız = member.guild.roles.cache.get(kytsz) 
   member.roles.add(rol)
   member.roles.remove(kytsz)

member.user.send('Selam Dostum Ne Yazık ki Sana Kötü Bir Haberim Var Hesabın 1 Hafta Gibi Kısa Bir Sürede Açıldığı İçin Fake Hesap Katagorisine Giriyorsun Lütfen Bir Yetkiliyle İletişime Geç Onlar Sana Yardımcı Olucaktır.')
setTimeout(() => {

}, 1000)


   }
        else {

        }
    });

    client.on("userUpdate", async (message, member) => {
      var sunucu = client.guilds.cache.get('830524739255533609'); // SUNUCU İD
      var uye = sunucu.members.cache.get(member.id);
      var tag = ""; // TAG
      var tagrol = "830524739368910899"; // TAG ROL İD
      var logKanali = ""; // LOG KANAL İD
    
      if (!sunucu.members.cache.has(member.id) || member.bot || message.username === member.username) return;
      
      if ((member.username).includes(tag) && !uye.roles.cache.has(tagrol)) {
        try {
          await uye.roles.add(tagrol);
          await uye.send(`Tagımızı aldığın için teşekkürler! Aramıza hoş geldin.`);
          await client.channels.cache.get(logKanali).send(new Discord.MessageEmbed().setColor('GREEN').setDescription(`${member} adlı üye tagımızı alarak aramıza katıldı!`));
        } catch (err) { console.error(err) };
      };
      
      if (!(member.username).includes(tag) && uye.roles.cache.has(tagrol)) {
        try {
          await uye.roles.remove(uye.roles.cache.filter(rol => rol.position >= sunucu.roles.cache.get(tagrol).position));
          await uye.send(`Tagımızı bıraktığın için ekip rolü ve yetkili rollerin alındı! Tagımızı tekrar alıp aramıza katılmak istersen;\nTagımız: **${tag}**`);
          await client.channels.cache.get(logKanali).send(new Discord.MessageEmbed().setColor('RED').setDescription(`${member} adlı üye tagımızı bırakarak aramızdan ayrıldı!`));
        } catch(err) { console.error(err) };
      };
    });
    
    //----------------------TAG-KONTROL----------------------\\     
    
    client.on("guildMemberAdd", member => {
      let tag = ""; //TAG
      let rol = ""; // TAG ROL İD
    if(member.user.username.includes(tag)){
    member.roles.add(rol)
      const tagalma = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setDescription(`<@${member.id}> adlı kişi sunucumuza taglı şekilde katıldı, o doğuştan beri bizden !`)
          .setTimestamp()
         client.channels.cache.get('').send(tagalma) // TAG LOG KANAL İD
    }
    })


// B$T4 TARAFINDAN KODLANMIŞTIR \\
// GÜLE GÜLE KULLANIN :)