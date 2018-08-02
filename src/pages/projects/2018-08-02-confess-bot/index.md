---
title: "Discord Bot: confess-bot"
repo: https://github.com/washingtonsteven/confess-bot
path: /confess-bot/
featured: false
published: false
date: 2018-08-02
# featured_image: ./featured_alpha_20180325.gif
tags:
  - javascript
  - discord
  - api
  - fun
---

ConfessionBot is an automated bot for posting anonymous messages to a Discord Server

## Technology

### discord.js

[Discord.js](discordjs) is a Javascript library implementing Discord's [Bot API](discordbot). It is installed as a node module and lets you connect to any Discord servers that your bot user is a member of.

## Development

### Concept

ConfessionBot allows users in a Discord server to vent, and talk anonymously (for better or for worse). This works by having a user direct message the bot, and the bot will take that message and repost it in a specially-made channel in the Discord server that the bot and the user, stripped of any identifying information. In the case that the bot and the user share multiple servers, the user will be asked to specify one and resubmit their confession

### Command Parsing

By default, ConfessionBot sees every public message sent to every server that it is a part of, in addition to all direction messages (DMs) sent to it. As such, most messages are ignored by the bot, as most of the time common users aren't holding conversations with it (thoug chatbots are a thing!). There is a special flag to start a message that will indicate that the bot should not ignore the message, and instead form a response.

In this case, the chosen flag is `--[COMMAND NAME]`. Any message that starts with `--` will signal that this is a command for the bot, and it should respond.

A command is broken up into two parts: the actual command, which is the string directly following `--` up until the first-encountered whitespace, and the arguments, which is the rest of the message string. This is parsed by a [RegEx](regex) which splits the two using `String.prototype.match`.

### Running Commands

Once the command is figured out, the bot check to see if it is a valid command. Since commands can be set as separate node modules, we can use the file system `fs` to check if a command is valid. Each command module lives in `./commands/[COMMAND NAME].js` and exports a function that takes in the Discord bot client, the message object that triggered the command, and the arguments part of the command. If the file doesn't exist, the function fails gracefully, letting the user know that the command doesn't exist.

### `--confess`

The `--confess` command (in `./commands/confess.js`) is simple. It takes the args (which is the content of the confession), and posts it to the proper channel. First the bot needs to ascertain the correct server (known as a "guild" in `discord.js`) and channel. 

Currently, the bot targets one specific server (with a backup to a private debug server). 

#### Ideal Server selection

The server is selected by finding a common one with the user. Unfortunately, the API doesn't allow a bot to query a user for servers that they are in, so we have to go the long way: Looping through members of every server the bot is a part of until it finds all the servers the user is a part of. If the user and bot only share one server, then that one is set as the target. If they share more than one server, the bot will ask the user to resubmit their confession with the server specified.

#### Channel Selection

Currently, the bot will only post in a channel called `#confessions`, complaining if it can't find such a channel in the target server. In an ideal world, the server admins can specify a "confession" channel in which the bot will post. This will require some persistent storage about each server the bot is a part of in order to manage this properly.

Once the channel and server are selected, it sends a plain text message to that channel, and replies to the user in the DM to confirm that the message was sent.

### `--pconfess`

`pconfess` is an alternate confess option that allows the user to do a "public confession," for whatever reason. This can be useful for comments on anonymous confessions, as a common setup is to have the #confessions channel be locked out to normal messages.

This command, despite having a separate file, actually uses the base of `confess.js` to run, sending an extra flag to its function to indicate the it should be a public confession. In this sense `pconfess` is basically just a passthrough! Implementation was super easy!

### Current State

Right now the bot handles confessions, but some updates can be made to allow for ideal guild and channel selection. 

## Links

Source: https://github.com/washingtonsteven/confess-bot
(See Readme for link to invite the bot to your server)



[discordjs]: http://discord.js.org
[discordbot]: https://discordapp.com/developers/docs/intro

<!-- code links -->
[regex]: https://github.com/washingtonsteven/confess-bot/commit/481386b16319a2ba5dc165d42e9cf431b7f295a6#diff-168726dbe96b3ce427e7fedce31bb0bcR9