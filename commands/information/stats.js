/** @format
 *
 * Kyoko By Doubiest
 * Version: 6.0.0-beta
 * © 2024 Nex Hq
 */

const genGraph = require("@gen/pingGraph.js");
const { ActionRowBuilder } = require("discord.js");

module.exports = {
  name: "stats",
  aliases: ["shard", "status", "stat"],
  cooldown: "",
  category: "information",
  usage: "",
  description: "Shows bot's shard stats",
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
    let e = new client.embed().desc(
      ` ${emoji.cool} **Fetching details please wait . . . **`,
    );
    let wait = await message.reply({ embeds: [e] });

    let v = await client.cluster.broadcastEval(async (x) => {
      let cpu = "[ N/A ]";
      await new Promise(async (resolve, reject) => {
        require("os-utils").cpuUsage((v) => {
          resolve(v);
        });
      }).then((value) => {
        cpu = value.toFixed(2);
      });

      let stats =
        `[**__ Basic Info__**](${x.support})\n` +
        `**⠀• Ping : **\`${x.ws.ping} ms\`\n` +
        `**⠀• Uptime : **\`${x.formatTime(x.uptime)}\`\n` +
        `[**__ Resources__**](${x.support})\n` +
        `**⠀• RAM : **\`${x.formatBytes(
          process.memoryUsage().heapUsed,
        )}\`\n` +
        `**⠀• CPU : **\`${cpu} %vCPU\`\n` +
        `[**__ Size & Stats__**](${x.support})\n` +
        `**⠀• Players: **\`${
          [...x.manager.players.values()].filter((p) => p.playing).length
        }/${[...x.manager.players.values()].length}\`\n` +
        `**⠀• Servers: **\`${x.guilds.cache.size / 1000}K\`\n` +
        `**⠀• Users : **\`${
          (await x.guilds.cache.reduce(
            (total, guild) => total + guild.memberCount,
            0,
          )) / 1000
        }K\`\n`;

      return stats;
    });

    let statsEmbed = new client.embed()
      .setAuthor({
              name: `${client.user.username} - Stats :`,
              iconURL: client.user.displayAvatarURL(),
            })

    for (let i = 0; i < v.length; i++) {
      statsEmbed.addFields({
        name: `Cluster [${i}] :`,
        value: v[i],
        inline: true,
      });
    }

    wait.edit({ embeds: [statsEmbed] }).catch(() => {});
  },
};