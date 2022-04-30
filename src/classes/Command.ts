import {
  ApplicationCommandOptionData,
  ButtonInteraction,
  CommandInteraction,
  MessageActionRow,
  MessageEmbed,
  SelectMenuInteraction,
} from "discord.js";
import { CommandOptions } from "../typings/typings";
import Logger from "../utils/Logger";
import Bot from "./Bot";

class Command {
  client: Bot;
  config: {
    name: string;
    description: string;
    userAvailable: boolean;
    options: ApplicationCommandOptionData[];
  };
  help: { name: string; description: string; userAvailable: boolean };
  Logger: Logger;
  data: {
    name: string;
    description: string;
    options: ApplicationCommandOptionData[];
  };
  reply: (
    interaction: CommandInteraction | ButtonInteraction | SelectMenuInteraction,
    input: string | MessageEmbed | MessageEmbed[],
    ephemeral: boolean,
    components?: MessageActionRow | undefined
  ) => Promise<void>;
  constructor(
    client: Bot,
    {
      name = "Beispiel Command",
      description = "",

      userAvailable = true,

      options = [],
    }: CommandOptions
  ) {
    this.client = client;

    this.config = { name, description, userAvailable, options };
    this.help = { name, description, userAvailable };
    this.data = {
      name: this.help.name,
      description: this.help.description,
      options: this.config.options,
    };
    this.Logger = client?.Logger;

    this.reply = this.response;
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

  async run(interaction: CommandInteraction, client: Bot): Promise<void> {
    this.Logger.warn(
      "Ended up in command.js [" +
        JSON.stringify(client.config) +
        " - " +
        interaction.id +
        "]"
    );
  }

  async response(
    interaction: CommandInteraction | ButtonInteraction | SelectMenuInteraction,
    input: string | MessageEmbed | MessageEmbed[],
    ephemeral: boolean,
    components?: MessageActionRow
  ): Promise<void> {
    if (typeof input === "string") {
      return await interaction
        .reply({
          content: input,
          ephemeral: ephemeral,
          components: components?.components ? [components] : [],
        })
        .catch(this.client.Logger.error);
    } else if (Array.isArray(input)) {
      return await interaction
        .reply({
          embeds: input,
          ephemeral: ephemeral,
          components: components?.components ? [components] : [],
        })
        .catch(this.client.Logger.error);
    } else if (input.description || input.title) {
      return await interaction
        .reply({
          embeds: [input],
          ephemeral: ephemeral,
          components: components?.components ? [components] : [],
        })
        .catch(this.client.Logger.error);
    }
  }

  async error(interaction: CommandInteraction, text: string): Promise<any> {
    return await interaction.editReply({
      embeds: [
        new MessageEmbed().setColor("#ff0000").setDescription(":x: " + text),
      ],
    });
  }
}

export default Command;
