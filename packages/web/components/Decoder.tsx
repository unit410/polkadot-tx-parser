import React, { useState, useRef, useEffect } from 'react';
import { ApiPromise } from '@polkadot/api';
import { GenericCall } from '@polkadot/types/generic/Call';
import { decodeTx } from '@polkadot-tx-parser/common';
import Tx from './Tx';
import styles from './Decoder.module.css';

interface IProps {
  aliases: Map<string, string>;
  api: ApiPromise | undefined;
}

export default function Decoder(props: IProps) {
  const [error, setError] = useState<boolean>(false);
  const [call, setCall] = useState<GenericCall | undefined>(undefined);
  const [value, setValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [error]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
    setError(false);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      if (props.api) {
        const call = decodeTx(props.api, value);
        setCall(call);
      }
    } catch (err) {
      console.log('Error!');
      const error = value === '' ? false : true;
      setCall(undefined);
      setError(error);
    }
  }

  return (
    <div className={styles.Decoder}>
      <form onSubmit={handleSubmit} className={error ? styles.Error : ''}>
        <input
          autoFocus
          type="text"
          placeholder="Data..."
          onChange={handleChange}
          value={value}
          className={styles.Data}
          ref={inputRef}
        />
        <input className={styles.Button} type="submit" value="PARSE" />
      </form>
      {call && (
        <div className={styles.TxContainer}>
          <Tx displayHash={true} tx={call} aliases={props.aliases} />
        </div>
      )}
    </div>
  );
}
