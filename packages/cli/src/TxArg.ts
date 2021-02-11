import { Codec } from "@polkadot/types/types";
import { GenericCall } from "@polkadot/types/generic/Call";
import { Struct } from "@polkadot/types";
import { Balance, Perbill } from "@polkadot/types/interfaces";
import { Compact } from "@polkadot/types/codec";
import chalk from "chalk";
import Tx from "./Tx";
import TxArgList from "./TxArgList";
import Address from "./Address";
import {
  buildPrefix,
  formatBalance,
  formatPerbill,
} from "@polkadot-tx-parser/common";

export default function TxArg(
  name: string,
  arg: Codec,
  aliases: Map<string, string>,
  level: number
): string {
  if (arg instanceof GenericCall) {
    return Tx(arg, aliases, false, level);
  } else if (arg instanceof Struct) {
    const components = [];
    components.push(buildPrefix(level));
    components.push(chalk.bold(`${name}: `));
    components.push(TxArgList(arg, aliases, level + 1));
    return components.join("");
  } else {
    const components = [];
    components.push(buildPrefix(level));
    components.push(chalk.bold(`${name}: `));
    components.push(formatArgValue(arg, aliases));
    return components.join("");
  }
}

function formatArgValue(arg: Codec, aliases: Map<string, string> = new Map()) {
  const argMaybeUnwrapped = arg instanceof Compact ? arg.unwrap() : arg;

  switch (argMaybeUnwrapped.toRawType()) {
    case "Balance":
      return formatBalance(arg as Balance);
    case "Perbill":
      return formatPerbill(arg as Perbill);
    case "AccountId":
      return Address(arg.toString(), aliases);
  }

  return arg.toString();
}
