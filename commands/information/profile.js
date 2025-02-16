/** @format
 *
 * Kyoko By Doubiest
 * Version: 6.0.0-beta
 * © 2024 Nex Hq
 */

module.exports = {
  name: "profile",
  aliases: ["pr"],
  cooldown: "",
  category: "information",
  usage: "",
  description: "See server configs",
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
    let [pfx, premiumUser, dev, admin, moderator, team] = await Promise.all([
      await client.db.pfx.get(`${client.user.id}_${message.author.id}`),
      await client.db.premium.get(`${client.user.id}_${message.author.id}`),
      await client.owners.find((x) => x === message.author.id),
      await client.admins.find((x) => x === message.author.id),
    ]);

    let premium =
      premiumUser == true
        ? "Lifetime"
        : premiumUser
          ? `Expiring <t:${`${premiumUser}`?.slice(0, -3)}:R>`
          : `\`Not Activated\``;

    await message
      .reply({
        embeds: [
          new client.embed()

            .setAuthor({
              name: `Profile Overview`,
              iconURL: client.user.displayAvatarURL(),
            })
            .desc(
                `**Acknowledgement/(s) :**\n\n` +
                `${dev ? `${emoji.dev} - **Developer**\n` : ``}` +
                `${admin ? `${emoji.admin} - **Administrator**\n` : ``}` +
                `${
                  premiumUser ? `${emoji.premium} - **Premium Subscriber**\n` : ``
                }` +
                `<a:music:1290156846887473266> - **${client.user.username} User**\n\n` +
                `**Premium : ${premium}**\n` +
                `**Custom Prefix : ${pfx ? `\`${pfx}\`` : `\`Not set\``}**\n\n` 
            )

            .thumb(message.member.displayAvatarURL())
        ],
      })
      .catch(() => {});
  },
};
