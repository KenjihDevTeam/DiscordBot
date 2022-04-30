import { MessageEmbed } from "discord.js";
import Bot from "./Bot";

export default class Event {
  name: string;
  client: Bot;
  constructor(name: string, client: Bot) {
    this.name = name;
    this.client = client;
  }

  async run(client: Bot, arg1: any, arg2: any, arg3: any): Promise<any> {
    client.Logger.warn("Base Event");
  }

  get embed(): MessageEmbed {
    const embed = new MessageEmbed().setTimestamp().setFooter({
      text: "Kenjih",
      iconURL:
        "https://cdn.discordapp.com/icons/445308722168987648/0562fc49b47c5200ba67236ab61efcd6.webp?size=256",
    });

    embed.color = 4605931;
    return embed;
  }
}
