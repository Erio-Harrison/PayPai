// frontend/src/pages/transactions.tsx
import { Card } from '@/components/ui/card';
import { TransactionForm } from '@/components/transactions/TransactionForm';
import { TransactionHistory } from '@/components/transactions/TransactionHistory';
import { useWallet } from '@/hooks/useWallet';

export default function TransactionsPage() {
  const { keypair } = useWallet();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {!keypair ? (
        <Card className="p-4">
          <p className="text-center text-muted-foreground">
            Please create or import a wallet to start making transactions
          </p>
        </Card>
      ) : (
        <>
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">Transactions</h1>
            <p className="text-muted-foreground">
              Send and receive tokens on the Solana network
            </p>
          </div>
          
          <TransactionForm />
          
          <div className="pt-4">
            <TransactionHistory />
          </div>
        </>
      )}
    </div>
  );
}