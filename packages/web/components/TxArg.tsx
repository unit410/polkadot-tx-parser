import React from 'react';
import { GenericCall } from '@polkadot/types/generic/Call';
import { Struct } from '@polkadot/types';
import { Codec } from '@polkadot/types/types';
import { Balance, Perbill } from '@polkadot/types/interfaces';
import { Compact } from '@polkadot/types/codec';
import Tx from './Tx';
import TxArgList from './TxArgList';
import Address from './Address';
import styles from '~/components/TxArg.module.css';
import { formatBalance, formatPerbill } from '@polkadot-tx-parser/common';

interface IProps {
  name: string;
  arg: Codec;
  aliases: Map<string, string>;
}

class TxArg extends React.Component<IProps> {
  displayableArgValue(arg: Codec) {
    if (arg instanceof GenericCall) {
      return <Tx tx={arg} displayHash={false} aliases={this.props.aliases} />;
    } else if (arg instanceof Struct) {
      return <TxArgList args={arg} aliases={this.props.aliases} />;
    }

    return (
      <div>
        <span className={styles.Name}>{this.props.name}: </span>
        <span className={styles.Value}>{this.formatArgValue(arg, this.props.aliases)}</span>
      </div>
    );
  }

  formatArgValue(arg: Codec, aliases: Map<string, string>) {
    const argMaybeUnwrapped = arg instanceof Compact ? arg.unwrap() : arg;

    switch (argMaybeUnwrapped.toRawType()) {
      case 'Balance':
        return formatBalance(argMaybeUnwrapped as Balance);
      case 'Perbill':
        return formatPerbill(argMaybeUnwrapped as Perbill);
      case 'AccountId':
        return <Address address={argMaybeUnwrapped.toString()} aliases={aliases} />;
    }
  }

  render() {
    const arg = this.props.arg;
    return <li key={this.props.name}>{this.displayableArgValue(arg)}</li>;
  }
}

export default TxArg;
