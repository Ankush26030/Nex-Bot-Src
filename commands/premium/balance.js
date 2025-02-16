/** @format
 *
 * Kyoko By Doubiest
 * Version: 6.0.0-beta
 * © 2024 Nex Hq
 */
const { ActionRowBuilder } = require("discord.js");

module.exports = {
  name: "balance",
  aliases: ["bal"],
  cooldown: "",
  category: "owner",
  usage: "",
  description: "Check balance",
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
    let coins = parseInt(
      (await client.db.coins.get(`${message.author.id}`)) || 0,
    );
    const row = new ActionRowBuilder().addComponents(
      new client.button().link("Click here", client.support),
    );
    const m = await message
      .reply({
        embeds: [
          new client.embed()
            .desc(
              `**${emoji.coin} You currently have a total of __${
                coins || `0`
              }__ pennies**\n\n` +
                `**Need pennies ? Join the Support Server by clicking the button below !:**\n\n` 
                
            ),
            
        ],
        components: [row],
      })
      .catch(() => {});
  },
};
