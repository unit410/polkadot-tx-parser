import chalk from "chalk";

export default function Address(
  address: string,
  aliases: Map<string, string>
): string {
  const name = aliases.get(address) || address;
  return chalk.bold.cyan(name);
}
