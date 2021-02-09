import React from 'react';
import { GenericCall } from '@polkadot/types/generic/Call';
import { Struct } from '@polkadot/types/codec';
import { proxiedTx, txMethodName } from '@polkadot-tx-parser/common';
import Address from './Address';
import TxArgList from './TxArgList';
import styles from './Tx.module.css';

interface IProps {
  tx: GenericCall;
  displayHash: boolean;
  aliases: Map<string, string>;
}

class Tx extends React.Component<IProps> {
  displayableTxHash(hash: string) {
    return (
      <div className={styles.Hash}>
        <div className={styles.HashTitle}>Hash:</div>
        <div className={styles.HashValue}>{hash}</div>
      </div>
    );
  }

  displayableTxName(tx: GenericCall, proxy: string | undefined = undefined) {
    return (
      <div className={styles.Name}>
        {txMethodName(tx)}{' '}
        {proxy ? (
          <div className={styles.ProxyTitle}>
            (Proxy for <Address aliases={new Map()} address={proxy} />)
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }

  render() {
    const { tx, proxy } = proxiedTx(this.props.tx);
    const txHash = this.displayableTxHash(tx.hash.toHex());
    const txName = this.displayableTxName(tx, proxy);
    const txArgs = <TxArgList args={tx.get('args') as Struct} aliases={this.props.aliases} />;

    return (
      <div className={styles.Tx}>
        {this.props.displayHash ? txHash : ''}
        {txName}
        {txArgs}
      </div>
    );
  }
}

export default Tx;
