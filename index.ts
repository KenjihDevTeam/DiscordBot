import { Intents } from "discord.js";
import commandDeployer from "./commandDeployer";
import Bot from "./src/classes/Bot";
import register from "./src/functions/register";

async function init() {
  const client = new Bot({
    partials: ["MESSAGE", "CHANNEL"],
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_PRESENCES,
      Intents.FLAGS.GUILD_MEMBERS,
      Intents.FLAGS.GUILD_VOICE_STATES,
      Intents.FLAGS.DIRECT_MESSAGES,
    ],
  });

  await register.registerEvents(client, "/src/events");
  await register.registerCommands(client, "/src/commands");
  client.Logger.info(`Registered ${client.commands.size} commands`, "COMMANDS");

  client.on("ready", () => {
    console.log("ready");
  });

  await client.login(client.config.token);

  setTimeout(() => {
    // console.log(client.commands);
    //commandDeployer(client.commands, client.application?.id || "", client.config.token)
  }, 1000);
}

init();
