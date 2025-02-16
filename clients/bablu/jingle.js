/** @format
 *
 * Kyoko By Doubiest
 * Version: 6.0.0-beta
 * © 2024 Nex Hq
 */

const YML = require("js-yaml").load(
  require("fs").readFileSync("./config.yml", "utf8"),
);
const bot = require("../../main/extendedClient");

const client = new bot();
require("@utils/antiCrash")(client);
client.connect(
  YML.JINGLE.TOKEN,
  YML.JINGLE.PREFIX,
  YML.JINGLE.EMOJIS,
  YML.JINGLE.COLOR,
  YML.JINGLE.TOPGGAUTH,
  YML.JINGLE.VOTEURI,
);
module.exports = client;
