import { ApiPromise } from "@polkadot/api";
import { polkadotApi, decodeTx } from "@polkadot-tx-parser/common";
import Tx from "./Tx";
import chalk from "chalk";
import { Command } from "commander";
import * as yaml from "js-yaml";
import * as fs from "fs";

async function run(args: string[]) {
  const program = new Command();
  program.requiredOption("--tx <string>", "Call data to parse");
  program.option("--endpoint <string>", "Endpoint to connect to");
  program.option(
    "--aliasesFile <string>",
    "File containing aliases for relevant addresses"
  );
  program.parse(args);

  console.log(banner());

  const aliases = fetchAliasesFile(program.aliasesFile);

  const api = await connect(program.endpoint);

  try {
    const tx = decodeTx(api, program.tx);
    console.log(Tx(tx, aliases));
    console.log();
  } catch (err) {
    console.log(`${chalk.red("Error:")} Couldn't decode transaction`);
  }
}

async function connect(endpoint: string | undefined): Promise<ApiPromise> {
  if (!endpoint) {
    endpoint = "wss://rpc.polkadot.io";
  }

  console.log(`Connecting to ${endpoint}...`);

  try {
    const api = await polkadotApi(endpoint);
    console.log("Connected!");
    return api;
  } catch (err) {
    console.log(chalk.red(`Error connecting to ${endpoint}. Exiting...`));
    process.exit(1);
  }
}

function fetchAliasesFile(
  aliasesFile: string | undefined
): Map<string, string> {
  if (!aliasesFile) {
    return new Map();
  }

  try {
    const content = fs.readFileSync(aliasesFile, "utf-8");
    const aliasesObject = yaml.safeLoad(content) as { [key: string]: string };
    return new Map(Object.entries(aliasesObject));
  } catch (err) {
    return new Map();
  }
}

function banner(): string {
  return `

██████╗░░█████╗░██╗░░░░░██╗░░██╗░█████╗░██████╗░░█████╗░████████╗  ████████╗██╗░░██╗  ██████╗░░█████╗░██████╗░░██████╗███████╗██████╗░
██╔══██╗██╔══██╗██║░░░░░██║░██╔╝██╔══██╗██╔══██╗██╔══██╗╚══██╔══╝  ╚══██╔══╝╚██╗██╔╝  ██╔══██╗██╔══██╗██╔══██╗██╔════╝██╔════╝██╔══██╗
██████╔╝██║░░██║██║░░░░░█████═╝░███████║██║░░██║██║░░██║░░░██║░░░  ░░░██║░░░░╚███╔╝░  ██████╔╝███████║██████╔╝╚█████╗░█████╗░░██████╔╝
██╔═══╝░██║░░██║██║░░░░░██╔═██╗░██╔══██║██║░░██║██║░░██║░░░██║░░░  ░░░██║░░░░██╔██╗░  ██╔═══╝░██╔══██║██╔══██╗░╚═══██╗██╔══╝░░██╔══██╗
██║░░░░░╚█████╔╝███████╗██║░╚██╗██║░░██║██████╔╝╚█████╔╝░░░██║░░░  ░░░██║░░░██╔╝╚██╗  ██║░░░░░██║░░██║██║░░██║██████╔╝███████╗██║░░██║
╚═╝░░░░░░╚════╝░╚══════╝╚═╝░░╚═╝╚═╝░░╚═╝╚═════╝░░╚════╝░░░░╚═╝░░░  ░░░╚═╝░░░╚═╝░░╚═╝  ╚═╝░░░░░╚═╝░░╚═╝╚═╝░░╚═╝╚═════╝░╚══════╝╚═╝░░╚═╝
`;
}

run(process.argv)
  .catch(console.error)
  .finally(() => process.exit());
