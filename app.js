"use strict";

const { Client,MessageAttachment } = require("discord.js");
const client = new Client();
var alreadyEdited = {};
const TextOnGif = require('text-on-gif');
const commands = {
    eat:{gif:"eat",max:1},
    pat:{gif:"pat",max:1},
    vibe:{gif:"vibe",max:2},
    run:{gif:"run",max:2},
    dance:{gif:"dance",max:6},
    kick:{gif:"kick",max:3},
    push:{gif:"push",max:1},
    hatsaale:{gif:"hatsaale",max:1},
    dodge:{gif:"dodge",max:1},
    kiss:{gif:"kiss",max:3},
    maskoff:{gif:"maskoff",max:1},
    kill:{gif:"kill",max:1},
    cute:{gif:"cute",max:2},
    angry:{gif:"angry",max:1},
    sleep:{gif:"sleep",max:1},
    tease:{gif:"tease",max:1},
    threaten:{gif:"threaten",max:3},
    drink:{gif:"tea",max:1},
    sip:{gif:"tea",max:1},
    spit:{gif:"spit",max:1},
    spin:{gif:"spin",max:3},
    sad:{gif:"sad",max:1},
    cry:{gif:"sad",max:1},
    depressed:{gif:"sad",max:1},
    thug:{gif:"thug",max:1},
    smelly:{gif:"smelly",max:1},
    chase:{gif:"chase",max:1},
    wee:{gif:"wee",max:1},
    weee:{gif:"wee",max:1},
    weeee:{gif:"wee",max:1},
    weeeee:{gif:"wee",max:1},
    gay:{gif:"gay",max:1},
    blind:{gif:"blind",max:1},
    fixhair:{gif:"fixhair",max:1},
    fuck:{gif:"fuck",max:1},
    molest:{gif:"fuck",max:1},
    violate:{gif:"fuck",max:1},
    bathe:{gif:"bathe",max:1},
    bye:{gif:"bye",max:1},
}

var gif;

async function init(){
    gif = new TextOnGif({
        file_path: Math.random() > 0.1 ?  "gifs/cool.gif" : "https://media0.giphy.com/media/kFgzrTt798d2w/giphy.gif",
    });

    gif.font_color = "#FFF"

    gif.on('extraction complete',()=>{
        client.once("ready",()=>{
            client.user.setActivity("call me MC'nuggets i be dippin in sauce");
            console.log("bot is online");
        });
    });
}

client.on("message",message => {
    if(!message.author.bot){
        var msg = message.content;
        var temp = msg.toLocaleLowerCase();
        if(temp.includes("levi") && message.author.id == "694922150779420793"){
            msg = "levi say bich dont u fucking ping me again u ugly slut";
        }
        var firstWordIndex = msg.indexOf(" ");
        if(firstWordIndex>0){
            var firstWord = msg.substr(0,firstWordIndex);
        }else{
            var firstWord = msg.toLocaleLowerCase();
        }
        if(firstWord=="levi"){
            var msg = msg.replace("levi ","");
            var firstWordIndex = msg.indexOf(" ");
            if(firstWordIndex>0){
                var command = msg.substr(0,firstWordIndex);
            }else{
                var command = msg;
            }
            if((command.toLocaleLowerCase())!="say"){
                if(commands[command]){
                    var noOfGifs = commands[command].max;
                    var gifNo = Math.ceil(Math.random()*noOfGifs);
                    message.channel.send({files:[`${__dirname}/gifs/${commands[command].gif}${gifNo}.gif`]});
                }
            }else{
                var customMsg = msg.replace(command,"");
                if(customMsg==""){
                    customMsg = ("include what you want me to say baka");
                }
                if(alreadyEdited[customMsg]!=null){
                    message.channel.send(alreadyEdited[customMsg]);
                }else{
                    message.channel.startTyping();
                    writeOnGifCaller(message,customMsg);
                }
            }
            console.log(command);
        }
    }
});

async function writeOnGifCaller(message,customMsg){
    const buffer = await gif.textOnGif({text: customMsg,get_as_buffer: true});
    const attachment = new MessageAttachment(buffer,"nigga.gif");
    const data = await message.channel.send(attachment);
    data.attachments.forEach(function(eeeee){
        alreadyEdited[customMsg] = eeeee.url;
    });
    message.channel.stopTyping();
}

client.login(process.env.TOKEN); 
init();
