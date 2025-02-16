/** @format
 *
 * Kyoko By Doubiest
 * Version: 6.0.0-beta
 * © 2024 Nex Hq
 */
const { ActionRowBuilder } = require("discord.js");

module.exports = {
  name: "mention",
  run: async (client, message) => {
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////// Reply when bot is mentioned ////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    const row = new ActionRowBuilder()
      .addComponents(
        new client.button().link("Premium", client.voting),
        new client.button().link("Support Server", client.support)
      );
    const embed = new client.embed()
    .setAuthor({
      name: `Hey I am ${client.user.username} !`,
      iconURL: client.user.displayAvatarURL(),
    })
      .addFields({
        name: `About Me`,
        value:
          `⠀I'm an Dynamic Music Bot with Upmost Superior Quality Sound System\n` +
          `⠀To get started use : ${client.prefix}help\n`,
      })
      
      .setTimestamp();
      await message.reply({
        embeds: [embed],components: [row] // Add the action rows with buttons here
      }).catch(() => {});
    },
  };