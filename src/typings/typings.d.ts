export interface CommandOptions {
  name: string;
  description: string;
  userAvailable: boolean;
  options: ApplicationCommandOptionData[];
}
