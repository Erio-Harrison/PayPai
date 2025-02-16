// src/app/wallet/page.tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WalletCreate } from '@/components/wallet/WalletCreate';
import { WalletImport } from '@/components/wallet/WalletImport';
import { AssetList } from '@/components/wallet/AssetList';

export default function WalletPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Tabs defaultValue="create" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="create">Create Wallet</TabsTrigger>
          <TabsTrigger value="import">Import Wallet</TabsTrigger>
          <TabsTrigger value="assets">Assets</TabsTrigger>
        </TabsList>
        
        <TabsContent value="create">
          <WalletCreate />
        </TabsContent>
        
        <TabsContent value="import">
          <WalletImport />
        </TabsContent>
        
        <TabsContent value="assets">
          <AssetList />
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Network</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium">Network Selection</span>
              <p className="text-sm text-muted-foreground">
                Choose between Mainnet and Testnet
              </p>
            </div>
            <select className="rounded-md border bg-background px-3 py-2">
              <option value="mainnet">Mainnet</option>
              <option value="testnet">Testnet</option>
              <option value="devnet">Devnet</option>
            </select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}