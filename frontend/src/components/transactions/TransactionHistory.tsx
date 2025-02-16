'use client'

import { useEffect, useState } from 'react';
import { useWallet } from '@/hooks/useWallet';
import { Connection, PublicKey } from '@solana/web3.js';
import { Card, CardContent } from '../ui/card';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';

interface Transaction {
  signature: string;
  type: 'send' | 'receive';
  amount: number;
  address: string;
  timestamp: number;
  status: 'confirmed' | 'pending';
}

export function TransactionHistory() {
  const { keypair } = useWallet();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!keypair) return;

    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const connection = new Connection('https://api.mainnet-beta.solana.com');
        
        const signatures = await connection.getSignaturesForAddress(
          keypair.publicKey,
          { limit: 10 }
        );

        const txs = await Promise.all(
          signatures.map(async (sig) => {
            const tx = await connection.getTransaction(sig.signature);
            if (!tx) return null;

            // Determine if this is a send or receive transaction
            const type = tx.transaction.message.accountKeys[0].equals(keypair.publicKey) 
              ? 'send' 
              : 'receive';

            return {
              signature: sig.signature,
              type,
              amount: tx.meta?.postBalances[0] 
                ? (tx.meta.postBalances[0] - tx.meta.preBalances[0]) / 1e9 
                : 0,
              address: type === 'send' 
                ? tx.transaction.message.accountKeys[1].toString()
                : tx.transaction.message.accountKeys[0].toString(),
              timestamp: sig.blockTime || 0,
              status: 'confirmed'
            };
          })
        );

        setTransactions(txs.filter((tx): tx is Transaction => tx !== null));
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [keypair]);

  if (loading) {
    return <div>Loading transactions...</div>;
  }

  if (!keypair) {
    return <div>Please connect your wallet to view transactions</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Transaction History</h2>
      {transactions.length === 0 ? (
        <div>No transactions found</div>
      ) : (
        <div className="space-y-2">
          {transactions.map((tx) => (
            <Card key={tx.signature}>
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <div className="flex items-center space-x-2">
                    {tx.type === 'send' ? (
                      <ArrowUpRight className="text-red-500" />
                    ) : (
                      <ArrowDownLeft className="text-green-500" />
                    )}
                    <span className="font-medium">
                      {tx.type === 'send' ? 'Sent' : 'Received'}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {tx.address}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    {tx.type === 'send' ? '-' : '+'}{Math.abs(tx.amount)} SOL
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(tx.timestamp * 1000).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}