/** @format
 *
 * NEX By Doubiest
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
  YML.NEX.TOKEN,
  YML.NEX.PREFIX,
  YML.NEX.EMOJIS,
  YML.NEX.COLOR,
  YML.NEX.TOPGGAUTH,
  YML.NEX.VOTEURI,
);
module.exports = client;
