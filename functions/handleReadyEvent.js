/** @format
 *
 * Kyoko By Doubiest
 * Version: 6.0.0-beta
 * © 2024 Nex Hq
 */

module.exports = async (client) => {
  await client.user.setPresence({
    activities: [
      {
        name: `Creating musical vibes | ${client.prefix}help`,
        type: require("discord.js").ActivityType.Custom,
      },
    ],
    status: "idle",
  });

  let mcount = 0;
  let gcount = client.guilds.cache.size;
  client.guilds.cache.forEach((g) => {
    mcount += g.memberCount;
  });

  let eventsSize = {};
  let commandsSize = {};
  commandsSize.slash = {};
  [
    eventsSize.client,
    eventsSize.node,
    eventsSize.player,
    eventsSize.custom,
    commandsSize.message,
  ] = await Promise.all([
    await require("@loaders/clientEvents.js")(client),
    await require("@loaders/nodeEvents")(client),
    await require("@loaders/playerEvents")(client),
    await require("@loaders/customEvents.js")(client),
    await require("@loaders/commands.js")(client),
  ]);

  client.invite = {
    nex: `https://discord.com/api/oauth2/authorize?client_id=1272058924547178581&permissions=8&scope=bot`,
    kyoko: `https://discord.com/api/oauth2/authorize?client_id=1191947530225848400&permissions=8&scope=bot`,
    jingle: `https://discord.com/api/oauth2/authorize?client_id=1248610951050035322&permissions=8&scope=bot`,
    supp: `https://discord.gg/nexhq`,
  };

  client.endEmbed = new client.embed()
    .desc(
      `**Enjoying Music with me ?**\n` +
        `If yes, Consider [Buying Premium](${client.voting})`,
    )
    .thumb(client.user.displayAvatarURL())
    .setAuthor({
      iconURL: client.user.displayAvatarURL(),
      name: client.user.username,
    })
    .setFooter({ text: "Powered by Nex Team" });

  client.log(
    `Loaded ` +
      ` Client: ${eventsSize.client} ` +
      ` Node: ${eventsSize.node} ` +
      ` Player: ${eventsSize.player} ` +
      ` Custom: ${eventsSize.custom} `,
    "event",
  );
  client.log(`Loaded ` + ` Message: ${commandsSize.message} `, "cmd");
  client.log(`Ready for ${gcount} Servers | ${mcount} Users`, "ready");
};
