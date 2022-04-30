import Event from "../classes/Event";
import { Message, Util } from "discord.js";
import Bot from "../classes/Bot";

class MessageEvent extends Event {
  constructor(client: Bot) {
    super("messageDelete", client);
  }

  async run(client: Bot, msg: Message) {
    if (msg.author.bot) return;

    const log = await client.channels
      .fetch(client.config.logging.modlog)
      .catch(client.Logger.error);
    if (log && log.isText())
      log.send({
        embeds: [
          this.embed
            .setAuthor({
              name: msg.author.tag + " (" + msg.author.id + ")",
              iconURL: msg.author.avatarURL({ dynamic: true }) || undefined,
            })
            .setDescription(
              "<@!" +
                msg.author.id +
                "> - <#" +
                msg.channel.id +
                ">\n```\n" +
                Util.escapeCodeBlock(msg.content) +
                "```"
            ),
        ],
      });
  }
}

export default MessageEvent;
