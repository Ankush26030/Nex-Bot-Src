/** @format
 *
 * Kyoko By Doubiest
 * Version: 6.0.0-beta
 * © 2024 Nemesis Dev
 */

const genCommandList = require("@gen/commandList.js");
const { ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");

module.exports = {
  name: "help",
  aliases: ["h"],
  cooldown: "",
  category: "information",
  usage: "",
  description: "Shows bot's help menu",
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
    let categories = await client.categories.filter((c) => c != "owner");
    categories = categories.sort((b, a) => b.length - a.length);
    let cat = categories
      .map(
        (c) =>
          `> **${emoji[c]} • ${
            c.charAt(0).toUpperCase() + c.slice(1)
          } Commands**\n`,
      )
      .join("");

    const embed = new client.embed()
      .setAuthor({
        name: `A minimalistic music bot`,
        iconURL: client.user.displayAvatarURL(),
      }).setThumbnail(client.user.displayAvatarURL())
      .desc(`[Kyoko](https://discord.com/oauth2/authorize?client_id=1213733327593275432) - Your rich quality music! 🎵
            Hello ${message.author}! I am a Music Bot That Only Works With Prefix. You Can Se My Categories Below.
            
> Want To Know **Prefix:** \`${client.prefix}\`
            
**Command Categories**
> <:music:1243202360533057596> • Music Commands
> <:settings:1243199831321870456> • Config Commands
> <:filter:1243202628142501969> • Filter Commands
> <:info:1243202907688402944> • Information Commands

**Join Support Now:** https://discord.gg/h1ontop`)
      .thumb(client.user.displayAvatarURL())
      .setFooter({
        text: `Your Angel | Use (cmd -h) for command info`,
        //text: `Your Angel | By Doubiest`,
      });

    let arr = [];
    for (cat of categories) {
      cmnds = client.commands.filter((c) => c.category == cat);
      arr.push(cmnds.map((c) => `\`${c.name}\``));
    }
    let allCmds = await categories.map(
      (cat, i) =>
        `${emoji[cat]} **[${cat.charAt(0).toUpperCase() + cat.slice(1)}](${
          client.support
        })\n ${arr[i].join(", ")}**`,
    );
    desc = allCmds.join("\n\n");

    const all = new client.embed().desc(desc).setFooter({
      text: `Your Angel | By Doubiest`,
    });

    let menu = new StringSelectMenuBuilder()
      .setCustomId("menu")
      .setMinValues(1)
      .setMaxValues(1)
      .setPlaceholder("Select category to view commands")
      .addOptions([
        {
          label: "Go to homepage",
          value: "home",
        },
      ]);
    const selectMenu = new ActionRowBuilder().addComponents(menu);

    categories.forEach((category) => {
      menu.addOptions({
        label:
          category.charAt(0).toUpperCase() + category.slice(1) + ` commands`,
        value: category,
        emoji: `${emoji[category]}`,
      });
    });

    menu.addOptions([
      {
        label: "Show all commands",
        value: "all",
      },
    ]);

    const m = await message.reply({
      embeds: [embed],
      components: [selectMenu],
    });

    const filter = async (interaction) => {
      if (interaction.user.id === message.author.id) {
        return true;
      }
      await interaction.message.edit({
        components: [selectMenu],
      });
      await interaction
        .reply({
          embeds: [
            new client.embed().desc(
              `Only **${message.author.tag}** can use this`,
            ),
          ],
          ephemeral: true,
        })
        .catch(() => {});
      return false;
    };
    const collector = m?.createMessageComponentCollector({
      filter: filter,
      time: 60000,
      idle: 60000 / 2,
    });

    collector?.on("collect", async (interaction) => {
      if (!interaction.deferred) await interaction.deferUpdate();

      const category = interaction.values[0];
      switch (category) {
        case "home":
          await m
            .edit({
              embeds: [embed],
            })
            .catch(() => {});
          break;

        case "all":
          await m
            .edit({
              embeds: [all],
            })
            .catch(() => {});
          break;

        default:
          await m
            .edit({
              embeds: [
                new client.embed()
                  .desc(await genCommandList(client, category))
                  .title(
                    `${
                      category.charAt(0).toUpperCase() + category.slice(1)
                    } - related Commands`,
                  )
                  .setFooter({
                    text: `Your Angel | By Doubiest`,
                  }),
              ],
            })
            .catch(() => {});
          break;
      }
    });

    collector?.on("end", async () => {
      await m.edit({ components: [] }).catch(() => {});
    });
  },
};
