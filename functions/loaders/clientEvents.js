/** @format
 *
 * Kyoko By Doubiest
 * Version: 6.0.0-beta
 * © 2024 Nex Hq
 */

const { readdirSync } = require("fs");
module.exports = async (client) => {
  let count = 0;
  readdirSync("./events/client").forEach((file) => {
    const event = require(`${process.cwd()}/events/client/${file}`);
    client.on(event.name, (...args) => {
      event.run(client, ...args);
    });
    count++;
  });
  return count;
};
