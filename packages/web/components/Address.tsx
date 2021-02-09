import React, { ReactElement } from 'react';
import styles from '~/components/Address.module.css';

interface IProps {
  aliases: Map<string, string>;
  address: string;
}

class Address extends React.Component<IProps> {
  displayName() {
    if (this.props.aliases && this.props.aliases.get(this.props.address)) {
      return this.props.aliases.get(this.props.address);
    }

    return `${this.props.address.substring(0, 4)}...${this.props.address.substring(
      this.props.address.length - 4,
    )}`;
  }

  render(): ReactElement {
    return (
      <a
        className={styles.Root}
        href={'https://polkascan.io/polkadot/account/' + this.props.address}
      >
        {this.displayName()}
      </a>
    );
  }
}

export default Address;
