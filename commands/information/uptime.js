/** @format
 *
 * Kyoko By Doubiest
 * Version: 6.0.0-beta
 * © 2024 Nex Hq
 */

const genGraph = require("@gen/pingGraph.js");
const { ActionRowBuilder } = require("discord.js");

module.exports = {
  name: "uptime",
  aliases: ["up"],
  cooldown: "",
  category: "information",
  usage: "",
  description: "Shows bot's uptime stats",
  args: false,
  vote: false,
  new: false,
  admin: false,
  owner: false,
  botPerms: [],
  userPerms: [],
  player: false,
  queue: false,
  inVoiceChannel: false,
  sameVoiceChannel: false,
  execute: async (client, message, args, emoji) => {
    // Get current time in seconds
    const currentTime = Math.floor(Date.now() / 1000);

    // Calculate bot's uptime in seconds
    const uptimeSeconds = Math.floor(client.uptime / 1000);

    // Calculate the timestamp for bot's online time
    const onlineTimestamp = currentTime - uptimeSeconds;

    // Create an embed to display the uptime
    const embed = new client.embed()
      .setDescription(`<:timerr:1252967663261581352> **I Am Alive Since** <t:${onlineTimestamp}:R>`); // `<t:${timestamp}:R>` format for relative time

    // Send the embed
    let wait = await message.reply({ embeds: [embed] });

    // Catch any errors that might occur during editing the message
    wait.edit({ embeds: [embed] }).catch(() => {});
  },
};