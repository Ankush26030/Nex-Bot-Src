/** @format
 *
 * Kyoko By Doubiest
 * Version: 6.0.0-beta
 * © 2024 Nemesis Dev
 */

const { ActionRowBuilder } = require("discord.js");

module.exports = {
  name: "vote",
  aliases: [],
  cooldown: "",
  category: "config",
  usage: "",
  description: "Shows bot's vote link",
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
    const row = new ActionRowBuilder().addComponents(
      new client.button().link(
        "Click here to vote for me",
        client.vote || client.support,
      ),
    );
    await message.reply({
      embeds: [
        new client.embed().desc(
          `<:voter:1251516626172641300> [**You can cast your vote for me by clicking here, or by using the button below.**](https://top.gg/bot/1272058924547178581)`,
        ),
      ],
      components: [row],
    });
  },
};
