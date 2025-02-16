/** @format
 *
 * Kyoko By Doubiest
 * Version: 6.0.0-beta
 * © 2024 Nex Hq
 */

const { ActionRowBuilder } = require("discord.js");

module.exports = {
  name: "invite",
  aliases: ["inv"],
  cooldown: "",
  category: "information",
  usage: "",
  description: "Shows bot's invite link",
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
    await message
      .reply({
        embeds: [
          new client.embed().desc(
            `**Click on the buttons mentioned below**`,
          ),
        ],
        components: [
          new ActionRowBuilder().addComponents(
            new client.button().link("Nex", client.invite.nex),
            new client.button().link("Support Server", client.invite.supp)
          ),
        ],
      })
      .catch(() => {});
  },
};
