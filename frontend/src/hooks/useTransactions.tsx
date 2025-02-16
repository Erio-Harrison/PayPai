import { useCallback } from 'react';
import { 
  Connection, 
  PublicKey, 
  Transaction, 
  SystemProgram,
  sendAndConfirmTransaction,
  Keypair,
} from '@solana/web3.js';
import { 
  createTransferInstruction,
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  getAccount,
  TOKEN_PROGRAM_ID,
  getMint,
} from '@solana/spl-token';

const connection = new Connection('https://api.mainnet-beta.solana.com');

export function useTransactions() {
  const sendSOL = useCallback(async (
    fromKeypair: Keypair,
    toAddress: string,
    amount: number
  ) => {
    try {
      const toPublicKey = new PublicKey(toAddress);
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: fromKeypair.publicKey,
          toPubkey: toPublicKey,
          lamports: amount * 1e9,
        })
      );

      const signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [fromKeypair]
      );

      return signature;
    } catch (error) {
      console.error('Error sending SOL:', error);
      throw error;
    }
  }, []);

  const sendToken = useCallback(async (
    fromKeypair: Keypair,
    toAddress: string,
    tokenMintAddress: string,
    amount: number
  ) => {
    try {
      const toPublicKey = new PublicKey(toAddress);
      const mintPublicKey = new PublicKey(tokenMintAddress);

      // Get the mint info to get decimals
      const mintInfo = await getMint(connection, mintPublicKey);

      // Get the associated token accounts for sender and receiver
      const fromATA = await getAssociatedTokenAddress(
        mintPublicKey,
        fromKeypair.publicKey
      );

      const toATA = await getAssociatedTokenAddress(
        mintPublicKey,
        toPublicKey
      );

      // Create transaction
      const transaction = new Transaction();

      // Check if sender token account exists
      try {
        await getAccount(connection, fromATA);
      } catch (error) {
        transaction.add(
          createAssociatedTokenAccountInstruction(
            fromKeypair.publicKey,
            fromATA,
            fromKeypair.publicKey,
            mintPublicKey
          )
        );
      }

      // Check if receiver token account exists
      try {
        await getAccount(connection, toATA);
      } catch (error) {
        transaction.add(
          createAssociatedTokenAccountInstruction(
            fromKeypair.publicKey,
            toATA,
            toPublicKey,
            mintPublicKey
          )
        );
      }

      // Add transfer instruction
      transaction.add(
        createTransferInstruction(
          fromATA,
          toATA,
          fromKeypair.publicKey,
          amount * Math.pow(10, mintInfo.decimals)
        )
      );

      // Send and confirm transaction
      const signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [fromKeypair]
      );

      return signature;
    } catch (error) {
      console.error('Error sending token:', error);
      throw error;
    }
  }, []);

  return {
    sendSOL,
    sendToken,
  };
}