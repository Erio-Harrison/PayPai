use sqlx::SqlitePool;
use anyhow::Result;
use serde::{Deserialize, Serialize};
use chrono::{DateTime, Utc};

#[derive(Debug, Serialize, Deserialize)]
pub struct Transaction {
    pub id: i64,
    pub wallet_id: i64,
    pub hash: String,
    pub transaction_type: String,
    pub amount: f64,
    pub status: String,
    pub created_at: DateTime<Utc>,
}

pub struct Storage {
    pool: SqlitePool,
}

impl Storage {
    pub async fn new(database_url: &str) -> Result<Self> {
        let pool = SqlitePool::connect(database_url).await?;
        sqlx::migrate!("./migrations").run(&pool).await?;
        Ok(Self { pool })
    }

    pub async fn save_wallet(&self, wallet: &WalletInfo) -> Result<i64> {
        let result = sqlx::query!(
            r#"
            INSERT INTO wallets (address, encrypted_key, name, network)
            VALUES (?, ?, ?, ?)
            RETURNING id
            "#,
            wallet.address,
            wallet.encrypted_key,
            wallet.name,
            wallet.network
        )
        .fetch_one(&self.pool)
        .await?;

        Ok(result.id)
    }

    pub async fn get_wallet(&self, id: i64) -> Result<Option<WalletInfo>> {
        let wallet = sqlx::query_as!(
            WalletInfo,
            r#"
            SELECT * FROM wallets WHERE id = ?
            "#,
            id
        )
        .fetch_optional(&self.pool)
        .await?;

        Ok(wallet)
    }

    pub async fn save_transaction(&self, transaction: &Transaction) -> Result<i64> {
        let result = sqlx::query!(
            r#"
            INSERT INTO transactions (
                wallet_id, hash, transaction_type, amount, status
            ) VALUES (?, ?, ?, ?, ?)
            RETURNING id
            "#,
            transaction.wallet_id,
            transaction.hash,
            transaction.transaction_type,
            transaction.amount,
            transaction.status
        )
        .fetch_one(&self.pool)
        .await?;

        Ok(result.id)
    }
}