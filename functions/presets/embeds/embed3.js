/** @format
 *
 * Kyoko By Doubiest
 * Version: 6.0.0-beta
 * © 2024 Nex Hq
 */

const genButtons = require("@gen/playerButtons.js");
const { AttachmentBuilder } = require("discord.js");

module.exports = async (data, client, player) => {
  /*
  const title = data.title;
  const author = data.author;
  const thumbnail = data.thumbnail;
  const duration = data.duration;
  const color = data.color;
  const progress = data.progress;
  const source = data.source;
  */

  const title = data.title;
  const author = data.author;
  const duration = data.duration;
  const thumbnail = data.thumbnail;

  const embed = new client.embed()
    .addFields([
      {
        name: `**Now Playing..**`,
        value:
          `. **Song :** ${title.substring(0, 20)}...\n` +
          `. **Author :** ${author}\n` +
          `. **Duration: **${duration}\n` +
          `. **Requester: **${player.queue.current.requester}`,
        inline: true,
      },
    ])
    .thumb(thumbnail)
    .img(
      "https://media.discordapp.net/attachments/1117448438183907348/1136946440413913118/Tumblr_l_23352728218017.jpg",
    );

  return [[embed], [], [genButtons(client, player, 5)[0]]];
};
