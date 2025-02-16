'use client'

import { useState, useCallback } from 'react';
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import * as bip39 from 'bip39';

export function useWallet() {
  const [keypair, setKeypair] = useState<Keypair | null>(null);
  const [mnemonic, setMnemonic] = useState<string>('');

  // 创建新钱包
  const createWallet = useCallback(() => {
    const newMnemonic = bip39.generateMnemonic();
    const seed = bip39.mnemonicToSeedSync(newMnemonic);
    const newKeypair = Keypair.fromSeed(seed.slice(0, 32));

    setKeypair(newKeypair);
    setMnemonic(newMnemonic);

    return { mnemonic: newMnemonic, address: newKeypair.publicKey.toString() };
  }, []);

  // 导入钱包
  const importWallet = useCallback((importedMnemonic: string) => {
    try {
      const seed = bip39.mnemonicToSeedSync(importedMnemonic);
      const importedKeypair = Keypair.fromSeed(seed.slice(0, 32));

      setKeypair(importedKeypair);
      setMnemonic(importedMnemonic);

      return { address: importedKeypair.publicKey.toString() };
    } catch (error) {
      throw new Error('Invalid mnemonic phrase');
    }
  }, []);

  return {
    keypair,
    mnemonic,
    createWallet,
    importWallet,
  };
}