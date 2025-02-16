"use client"

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { useTheme } from 'next-themes'

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Dark Mode</span>
            <Switch
              checked={theme === 'dark'}
              onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
            />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium">Auto-lock Wallet</span>
              <p className="text-sm text-muted-foreground">
                Automatically lock wallet after period of inactivity
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium">Transaction Confirmation</span>
              <p className="text-sm text-muted-foreground">
                Require password confirmation for all transactions
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

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
  )
}