/** @format
 *
 * Kyoko By Doubiest
 * Version: 6.0.0-beta
 * © 2024 Nex Hq
 */

const YML = require("js-yaml").load(
  require("fs").readFileSync("./config.yml", "utf8"),
);

const { ClusterManager } = require("discord-hybrid-sharding");
[
  {
    file: "./clients/bablu/nex.js",
    token: YML.NEX.TOKEN,
    shards: YML.NEX.SHARDS,
    perCluster: YML.NEX.PER_CLUSTER,
  },
  {
    file: "./clients/bablu/jingle.js",
    token: YML.JINGLE.TOKEN,
    shards: YML.JINGLE.SHARDS,
    perCluster: YML.JINGLE.PER_CLUSTER,
  },
  {
    file: "./clients/bablu/kyoko.js",
    token: YML.KYOKO.TOKEN,
    shards: YML.KYOKO.SHARDS,
    perCluster: YML.KYOKO.PER_CLUSTER,
  },
].forEach((client) => {
  new ClusterManager(client.file, {
    restarts: {
      max: 5,
      interval: 1000,
    },
    respawn: true,
    mode: "worker",
    token: client.token,
    totalShards: client.shards || "auto",
    shardsPerClusters: parseInt(client.perCluster) || 2,
  })

    .on("shardCreate", (cluster) => {
      require("@plugins/logger").log(
        `Launched cluster ${cluster.id}`,
        "cluster",
      );
    })
    .on("debug", (info) => {
      require("@plugins/logger").log(`${info}`, "cluster");
    })
    .spawn({ timeout: -1 });
});

require("child_process").exec("java -jar Lavalink.jar");
