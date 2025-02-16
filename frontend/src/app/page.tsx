"use client"

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Wallet, BarChart2, Settings, ArrowRightCircle } from "lucide-react"
import Link from "next/link"

const navigationItems = [
  {
    title: "Wallet",
    description: "Manage your wallet and transactions",
    icon: <Wallet className="h-6 w-6" />,
    href: "/wallet",
  },
  {
    title: "Assets",
    description: "View and manage your assets",
    icon: <BarChart2 className="h-6 w-6" />,
    href: "/assets",
  },
  {
    title: "Settings",
    description: "Configure your wallet settings",
    icon: <Settings className="h-6 w-6" />,
    href: "/settings",
  },
]

export default function HomePage() {
  return (
    <div className="flex-1 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight mb-6">PayPai Wallet</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {navigationItems.map((item) => (
          <Link href={item.href} key={item.href}>
            <Card className="hover:bg-muted/50 transition-colors cursor-pointer group">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {item.icon}
                    <div>
                      <CardTitle>{item.title}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </div>
                  </div>
                  <ArrowRightCircle className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}