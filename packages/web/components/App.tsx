import React, { useEffect, useState } from 'react';
import { polkadotApi } from '@polkadot-tx-parser/common';

import Decoder from '~/components/Decoder';
import Loader from '~/components/Loader';
import useAsync from '~/hooks/useAsync';
import styles from './App.module.css';

export default function App() {
  const [aliases, setAliases] = useState<Map<string, string>>(new Map());
  const [api, apiError, loading] = useAsync(() => polkadotApi('wss://rpc.polkadot.io'), []);

  useEffect(() => {
    console.log(apiError);
  }, [apiError]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem('aliases');
      if (raw) {
        const unparsed = JSON.parse(raw) as { [key: string]: string };
        setAliases(new Map(Object.entries(unparsed)));
      }
    } catch (error) {
      console.log('Error parsing aliases...');
      console.log(error);
    }
  }, []);

  return (
    <div className={styles.App}>
      <Loader loading={loading} />
      <div className={loading ? styles.Hidden : styles.Container}>
        <div className={styles.Decoder}>
          <div className={styles.Title}>POLKADOT TX PARSER</div>
          <Decoder api={api} aliases={aliases} />
        </div>
      </div>
    </div>
  );
}
