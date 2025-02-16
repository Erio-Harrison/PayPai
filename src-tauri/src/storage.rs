use sqlx::SqlitePool;
use anyhow::Result;

pub struct Storage {
    pool: SqlitePool,
}

impl Storage {
    pub async fn new(database_url: &str) -> Result<Self> {
        let pool = SqlitePool::connect(database_url).await?;
        sqlx::migrate!("./migrations").run(&pool).await?;
        Ok(Self { pool })
    }

    pub async fn save_wallet(&self, wallet: &WalletInfo) -> Result<()> {
        sqlx::query!(
            "INSERT INTO wallets (address, encrypted_key) VALUES (?, ?)",
            wallet.address,
            wallet.encrypted_key
        )
        .execute(&self.pool)
        .await?;
        Ok(())
    }
}