import React from 'react';
import { Vec, Struct } from '@polkadot/types/codec';
import TxArg from './TxArg';
import styles from './TxArgList.module.css';

interface IProps {
  args: Struct;
  aliases: Map<string, string>;
}

class TxArgList extends React.Component<IProps> {
  render() {
    const toDisplay: JSX.Element[] = [];
    this.props.args.forEach((value, key) => {
      if (value instanceof Vec) {
        value.toArray().forEach((v, i) => {
          const argKey = `${key}-${i.toString()}`;
          toDisplay.push(<TxArg name={argKey} key={argKey} arg={v} aliases={this.props.aliases} />);
        });
      } else {
        toDisplay.push(<TxArg name={key} key={key} arg={value} aliases={this.props.aliases} />);
      }
    });

    return <ul className={styles.Root}>{toDisplay}</ul>;
  }
}

export default TxArgList;
