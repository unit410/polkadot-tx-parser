import React from 'react';
import styles from './Loader.module.css';

interface IProps {
  loading: boolean;
}

class Loader extends React.Component<IProps> {
  render() {
    return <div className={this.props.loading ? styles.Loader : styles.Hidden}></div>;
  }
}

export default Loader;
