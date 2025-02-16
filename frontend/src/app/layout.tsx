import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { Providers } from "@/components/providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PayPai",
  description: "Web3 Wallet Application",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        inter.className
      )}>
        <Providers>
          <SidebarProvider defaultOpen>
            <div className="flex min-h-screen">
              <Sidebar />
              <main className="flex-1">
                {children}
              </main>
            </div>
          </SidebarProvider>
        </Providers>
      </body>
    </html>
  )
}