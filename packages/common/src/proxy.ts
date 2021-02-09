import { GenericCall } from "@polkadot/types/generic/Call";
import { txMethodName } from "./format";

export type ProxiedTx = {
  tx: GenericCall;
  proxy?: string;
};

const PROXY_PROXY = "proxy.proxy";

export function proxiedTx(tx: GenericCall): ProxiedTx {
  if (txMethodName(tx) === PROXY_PROXY) {
    return {
      tx: tx.args[2] as GenericCall,
      proxy: tx.args[0].toString(),
    };
  }

  return { tx };
}
