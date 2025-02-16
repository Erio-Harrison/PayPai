"use client"

import { useAssets } from '@/hooks/useAssets';
import { Card, CardContent } from '../ui/card';
import { useWallet } from '@/hooks/useWallet';

export function AssetList() {
  const { keypair } = useWallet();
  const { data: assets, isLoading } = useAssets(
    keypair?.publicKey.toString() ?? null
  );

  if (isLoading) {
    return <div>Loading assets...</div>;
  }

  if (!assets) {
    return <div>No wallet connected</div>;
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">SOL</h3>
              <p className="text-sm text-muted-foreground">Native Token</p>
            </div>
            <p className="font-medium">{assets.sol.toFixed(4)} SOL</p>
          </div>
        </CardContent>
      </Card>

      {assets.tokens.map((token) => (
        <Card key={token.mint}>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{token.symbol}</h3>
                <p className="text-sm text-muted-foreground truncate">
                  {token.mint}
                </p>
              </div>
              <p className="font-medium">{token.balance}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
