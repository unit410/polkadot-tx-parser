import { GenericCall } from "@polkadot/types/generic/Call";
import chalk from "chalk";

import TxArgList from "./TxArgList";
import Address from "./Address";
import {
  proxiedTx,
  buildPrefix,
  txMethodName,
} from "@polkadot-tx-parser/common";

export default function Tx(
  raw: GenericCall,
  aliases: Map<string, string>,
  exterior: boolean = true,
  level: number = 0
): string {
  const { tx, proxy } = proxiedTx(raw);

  let components = [];

  if (exterior) {
    components.push(displayableTxHash(raw.hash.toHex()));
  }

  components.push(displayableTxName(tx, proxy, aliases, level));
  components.push(TxArgList(tx.get("args") as any, aliases, level + 1));
  return components.join("");
}

function displayableTxHash(hash: string): string {
  const components = [];
  components.push("\n");
  components.push(chalk.bold("Tx Hash: "));
  components.push(hash);
  components.push("\n");
  return components.join("");
}

function displayableTxName(
  tx: GenericCall,
  proxy: string | undefined = undefined,
  aliases: Map<string, string>,
  level: number
): string {
  const components = [];
  components.push(buildPrefix(level));
  components.push(chalk.bold(`${txMethodName(tx)}`));
  if (proxy) {
    const address = Address(proxy, aliases);
    components.push(` (Proxy for ${address})`);
  }
  return components.join("");
}
