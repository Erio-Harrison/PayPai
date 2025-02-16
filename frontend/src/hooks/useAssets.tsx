import { useQuery } from '@tanstack/react-query';
import { Connection, PublicKey } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';

const connection = new Connection('https://api.mainnet-beta.solana.com');

export function useAssets(publicKey: string | null) {
  return useQuery({
    queryKey: ['assets', publicKey],
    queryFn: async () => {
      if (!publicKey) return null;

      const pubKey = new PublicKey(publicKey);
      
      // 获取 SOL 余额
      const balance = await connection.getBalance(pubKey);
      const solBalance = balance / 1e9;

      // 获取代币账户
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
        pubKey,
        { programId: TOKEN_PROGRAM_ID }
      );

      const tokens = tokenAccounts.value.map(account => ({
        mint: account.account.data.parsed.info.mint,
        balance: account.account.data.parsed.info.tokenAmount.uiAmount,
        symbol: account.account.data.parsed.info.symbol || 'Unknown',
      }));

      return {
        sol: solBalance,
        tokens,
      };
    },
    enabled: !!publicKey,
  });
}