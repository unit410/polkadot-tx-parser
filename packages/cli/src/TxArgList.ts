import { Vec, Struct } from "@polkadot/types/codec";

import TxArg from "./TxArg";

export default function TxArgListString(
  args: Struct,
  aliases: Map<string, string>,
  level: number
): string {
  const components: string[] = [];
  args.forEach((value, key) => {
    if (value instanceof Vec) {
      value.toArray().forEach((v, i) => {
        components.push(TxArg(`${key}-${i.toString()}`, v, aliases, level));
      });
    } else {
      components.push(TxArg(key, value, aliases, level));
    }
  });
  return components.join("");
}
