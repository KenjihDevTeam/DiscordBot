import Event from "../classes/Event";
import { Message } from "discord.js";
import Bot from "../classes/Bot";

class MessageEvent extends Event {
  constructor(client: Bot) {
    super("messageCreate", client);
  }

  async run(client: Bot, msg: Message) {
    if (msg.author.bot) return;
  }
}

export default MessageEvent;
