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
  YML.KYOKO.TOKEN,
  YML.KYOKO.PREFIX,
  YML.KYOKO.EMOJIS,
  YML.KYOKO.COLOR,
  YML.KYOKO.TOPGGAUTH,
  YML.KYOKO.VOTEURI,
);
module.exports = client;
