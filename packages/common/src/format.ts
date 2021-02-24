import { GenericCall } from "@polkadot/types/generic/Call";
import { Balance, Perbill } from "@polkadot/types/interfaces";
import BN from "bn.js";

const ONE_BILLION = 1_000_000_000;
const DOT_DECIMALS = 10;

// Spacing for the CLI
export function buildPrefix(level: number): string {
  let prefix = `\n| `;
  prefix += "  ".repeat(level);
  return prefix;
}

export function txMethodName(tx: GenericCall): string {
  return `${tx.section}.${tx.method}`;
}

// TODO: This should be calculated by fetching balances from the chain
// https://github.com/polkadot-js/common/blob/81acc81ef75e30cc191923e73503ddb5b5aa5992/packages/util/src/format/formatBalance.spec.ts
export function formatBalance(balance: Balance): string {
  const power = new BN(DOT_DECIMALS, 10);
  let divisor = new BN(10, 10);
  divisor = divisor.pow(power);

  const amount = balance.toBn().div(divisor);
  return `${amount} DOTs`;
}

// Parts-per-billion expressed as a %
export function formatPerbill(perbill: Perbill): string {
  let decimal = perbill.toNumber() / ONE_BILLION;
  decimal = decimal * 100;
  return `${decimal}%`;
}
