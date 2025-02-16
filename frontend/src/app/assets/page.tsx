import { AssetList } from '@/components/wallet/AssetList'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'

export default function AssetsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Assets Overview</CardTitle>
        </CardHeader>
      </Card>
      <AssetList />
    </div>
  );
}