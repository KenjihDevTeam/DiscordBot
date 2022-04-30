import Chart from "../utils/Chart";
import { CommandInteraction, MessageAttachment } from "discord.js";
import Bot from "../classes/Bot";
import Command from "../classes/Command";

class MembercountCommand extends Command {
  constructor(client: Bot) {
    super(client, {
      name: "membercount",
      description: "Zeigt den Member Count",
      userAvailable: true,
      options: [],
    });
  }

  async run(interaction: CommandInteraction, client: Bot): Promise<any> {
    const members = await interaction.guild?.members.fetch();
    const start = interaction.guild?.createdTimestamp;
    if (!members || !start) return;

    const chart = new Chart(1500, 500);

    const perDay = 864e5;
    const memberArray = [];
    let day = 0;
    while ((day + 1) * perDay + start <= Date.now()) {
      const l = members.filter(
        (e) => (e.joinedTimestamp || 1) <= day * perDay + start
      );
      memberArray.push(l.size), day++;
    }
    const labels = [];
    for (let i = 0; i <= memberArray.length; i++) labels.push(i.toString());

    chart
      .setDatasets([
        {
          data: memberArray,
          label: "Member im Zeitverlauf",
          borderColor: "#5157ff",
          borderWidth: 3,
          pointRadius: 0,
          fill: true,
        },
      ])
      .setType("line")
      .setBackgroundColor("#ffffff")
      .setOptions({
        legend: {
          labels: {
            fontColor: "#000000",
            fontSize: 26,
          },
        },
      })
      .setLabels(labels);

    await interaction.editReply({
      files: [
        new MessageAttachment(await chart.generateStream(), "memberChart.png"),
      ],
      embeds: [
        this.embed
          .setImage("attachment://memberChart.png")
          .setTitle(
            `Es sind aktuell **${interaction.guild.memberCount.toLocaleString()}** Leute auf dem Discord. :blue_heart:`
          ),
      ],
    });
  }
}

export default MembercountCommand;
