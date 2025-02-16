'use client'

import { useWallet } from '@/hooks/useWallet';
import { Button } from '../ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { useState } from 'react';

export function WalletCreate() {
  const { createWallet } = useWallet();
  const [walletInfo, setWalletInfo] = useState<{
    mnemonic: string;
    address: string;
  } | null>(null);

  const handleCreateWallet = () => {
    const newWallet = createWallet();
    setWalletInfo(newWallet);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Wallet</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={handleCreateWallet}>
          Create Wallet
        </Button>
        
        {walletInfo && (
          <div className="space-y-2">
            <div className="p-4 bg-muted rounded-lg">
              <p className="font-medium">Backup Phrase:</p>
              <p className="mt-1 break-all">{walletInfo.mnemonic}</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="font-medium">Address:</p>
              <p className="mt-1 break-all">{walletInfo.address}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}