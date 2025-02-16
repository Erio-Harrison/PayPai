// frontend/src/components/wallet/WalletImport.tsx
'use client'

import { useState } from 'react';
import { useWallet } from '@/hooks/useWallet';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';

export function WalletImport() {
  const { importWallet } = useWallet();
  const [mnemonic, setMnemonic] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [importedAddress, setImportedAddress] = useState<string | null>(null);

  const handleImport = () => {
    try {
      setError(null);
      const result = importWallet(mnemonic.trim());
      setImportedAddress(result.address);
      setMnemonic('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to import wallet');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Import Wallet</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Recovery Phrase</label>
          <Input
            placeholder="Enter your 12 or 24 word recovery phrase"
            value={mnemonic}
            onChange={(e) => setMnemonic(e.target.value)}
            className="font-mono"
          />
          <p className="text-sm text-muted-foreground">
            Please enter your recovery phrase separated by spaces
          </p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Button 
          onClick={handleImport}
          disabled={!mnemonic.trim()}
          className="w-full"
        >
          Import Wallet
        </Button>

        {importedAddress && (
          <div className="p-4 bg-muted rounded-lg">
            <p className="font-medium">Imported Address:</p>
            <p className="mt-1 break-all font-mono text-sm">
              {importedAddress}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}