'use client'

import { useState } from 'react';
import { useWallet } from '@/hooks/useWallet';
import { useTransactions } from '@/hooks/useTransactions';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export function TransactionForm() {
  const { keypair } = useWallet();
  const { sendSOL } = useTransactions();
  
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [token, setToken] = useState('SOL');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keypair || !toAddress || !amount) return;

    try {
      setLoading(true);
      const signature = await sendSOL(
        keypair,
        toAddress,
        parseFloat(amount)
      );
      
      console.log('Transaction successful:', signature);
      // Reset form
      setToAddress('');
      setAmount('');
      
    } catch (error) {
      console.error('Transaction failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Send Transaction</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Recipient Address</label>
            <Input
              placeholder="Enter recipient address"
              value={toAddress}
              onChange={(e) => setToAddress(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Amount</label>
            <div className="flex space-x-2">
              <Input
                type="number"
                step="0.000000001"
                min="0"
                placeholder="0.0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <Select value={token} onValueChange={setToken}>
                <SelectTrigger className="w-32">
                  <SelectValue>{token}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SOL">SOL</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            type="submit"
            disabled={loading || !keypair || !toAddress || !amount}
            className="w-full"
          >
            {loading ? 'Sending...' : 'Send'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
