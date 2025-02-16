/** @format
 *
 * Kyoko By Doubiest
 * Version: 6.0.0-beta
 * © 2024 Nex Hq
 */

const voucher_codes = require("voucher-code-generator");
const { ActionRowBuilder } = require("discord.js");

module.exports = {
  name: "premium",
  aliases: ['shop'],
  cooldown: "",
  category: "premium",
  usage: "",
  description: "Shows your premium status",
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
    
    let [premiumUser, premiumGuild, owner, admin] = await Promise.all([
      await client.db.premium.get(`${client.user.id}_${message.author.id}`),
      await client.db.premium.get(`${client.user.id}_${message.guild.id}`),
      await client.owners.find((x) => x === message.author.id),
      await client.admins.find((x) => x === message.author.id),
    ]);
    const row = new ActionRowBuilder().addComponents(
      new client.button().link("Click here", client.patreon),
    );
    const cmd = args[0] ? args[0].toLowerCase() : null;
    const type = args[1] ? args[1].toLowerCase() : null;

    switch (cmd) {
      case "gen":
        if (!owner && !admin)
          return await message.reply({
            embeds: [
              new client.embed().desc(
                `${emoji.admin} **Only my Owner/s and Admin/s can use this command**`,
              ),
            ],
          });
        let code;
        switch (type) {
          case "guild":
            code = voucher_codes.generate({
              pattern: `F3L1N3-####-GUILD-DUR${args[2] || 14}`,
            });
            code = code[0].toUpperCase();
            await client.db.vouchers.set(code, true);
            break;
          default:
            code = voucher_codes.generate({
              pattern: `F3L1N3-#####-USER-DUR${args[2] || 14}`,
            });
            code = code[0].toUpperCase();
            await client.db.vouchers.set(code, true);
            break;
        }
        await message
          .reply({
            embeds: [
              new client.embed().desc(
                `${emoji.free} **Here's your generated code**\n` +
                  `${emoji.rich} | ||${code}||\n`,
              ),
            ],
          })
          .catch(() => {});
        break;
      default:
        await message
          .reply({
            embeds: [
              new client.embed()
                .setAuthor({
                  name: `Want my premium ?`,
                  iconURL: client.user.displayAvatarURL(),
                })
                .desc("**Enhance your Discord journey with Nex's premium subscription! Unlock a realm of exclusive features, indulge in priority support, and revel in an ad-free sanctuary!**"),
            ],
            components: [row],
          })
          .catch(() => {});
        break;
    }
  },
};
