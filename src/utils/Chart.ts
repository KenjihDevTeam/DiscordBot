import { ChartJSNodeCanvas } from "chartjs-node-canvas";
import Chart, {
  ChartConfiguration,
  ChartDataSets,
  ChartOptions,
  ChartType,
  PluginServiceRegistrationOptions,
} from "chart.js";
import { Readable } from "stream";
import { PathLike, createWriteStream } from "fs";

export default class ChartGenerator {
  configuration: ChartConfiguration;
  chart: ChartJSNodeCanvas;

  constructor(width: number, height: number, chartConfig?: ChartConfiguration) {
    this.configuration = chartConfig || {};
    this.chart = new ChartJSNodeCanvas({ width, height });
  }

  public async generateStream(): Promise<Readable> {
    this.checkConfig();

    return this.chart.renderToStream(this.configuration);
  }

  public async generateImage(path: PathLike) {
    const imagefile = createWriteStream(path);
    const stream = await this.generateStream();

    stream.on("data", (chunk) => {
      imagefile.write(chunk);
    });

    stream.on("end", () => {});

    return path;
  }

  public setLabels(labels: string | string[]): this {
    this.checkConfig();

    if (!this.configuration.data) return this;
    this.configuration.data.labels =
      typeof labels === "string" ? [labels] : labels;

    return this;
  }

  public setBackgroundColor(
    color: string | CanvasGradient | CanvasPattern
  ): this {
    this.checkConfig();
    const plugin = {
      id: "custom_canvas_background_color",
      beforeDraw: (chart: Chart) => {
        if (!chart || !chart.canvas || !chart.width || !chart.height) return;
        const ctx = chart.canvas.getContext("2d");
        if (!ctx) return;
        ctx.save();
        ctx.globalCompositeOperation = "destination-over";
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
      },
    };

    this.configuration.plugins?.push(plugin);

    return this;
  }

  public setDatasets(datasets: ChartDataSets | ChartDataSets[]): this {
    this.checkConfig();

    if (!this.configuration.data) return this;
    if (Array.isArray(datasets)) {
      this.configuration.data.datasets = datasets;
    } else {
      this.configuration.data.datasets = [datasets];
    }

    return this;
  }

  public setType(type: ChartType): this {
    this.checkConfig();

    this.configuration.type = type;

    return this;
  }

  public setOptions(options: ChartOptions): this {
    this.checkConfig();

    this.configuration.options = options;

    return this;
  }

  public setPlugins(
    plugins:
      | PluginServiceRegistrationOptions
      | PluginServiceRegistrationOptions[]
  ): this {
    this.checkConfig();

    if (Array.isArray(plugins)) {
      this.configuration.plugins = plugins;
    } else {
      this.configuration.plugins = [plugins];
    }

    return this;
  }

  private checkConfig(): void {
    if (!this.configuration?.data) this.configuration["data"] = {};

    if (!this.configuration.data?.datasets)
      this.configuration.data["datasets"] = [];

    if (!this.configuration.data?.labels)
      this.configuration.data["labels"] = [];

    if (!this.configuration?.options) this.configuration["options"] = {};

    if (!this.configuration?.plugins) this.configuration["plugins"] = [];

    if (!this.configuration?.type) this.configuration["type"] = "bar";
  }
}
