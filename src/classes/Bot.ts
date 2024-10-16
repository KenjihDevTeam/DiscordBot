import { Client, ClientOptions, Collection } from "discord.js";
import Command from "./Command";
import Logger from "../utils/Logger";
import config from "../../config/config";

class Bot extends Client {
  Logger: Logger;
  commands: Collection<string, Command>;
  config: typeof config;

  constructor(options: ClientOptions) {
    super(options);

    this.Logger = new Logger();

    this.commands = new Collection();

    this.config = config;
  }
}

export default Bot;
