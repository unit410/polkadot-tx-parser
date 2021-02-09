import { GenericCall } from "@polkadot/types/generic/Call";
import { ApiPromise, WsProvider } from "@polkadot/api";

export function polkadotApi(endpoint: string): Promise<ApiPromise> {
  const ws = new WsProvider(endpoint);
  return ApiPromise.create({ provider: ws });
}

export function decodeTx(api: ApiPromise, tx: string): GenericCall {
  return api.registry.createType("Call", tx);
}
