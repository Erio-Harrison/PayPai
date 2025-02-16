use serde::{Deserialize, Serialize};
use ed25519_dalek::{Keypair, SecretKey};
use rand::rngs::OsRng;
use anyhow::Result;

#[derive(Debug, Serialize, Deserialize)]
pub struct WalletInfo {
    pub address: String,
    pub encrypted_key: String,
}

pub struct WalletManager {
    storage: Storage,
    encryption_key: [u8; 32],
}

impl WalletManager {
    pub async fn new(storage: Storage, encryption_key: [u8; 32]) -> Self {
        Self {
            storage,
            encryption_key,
        }
    }

    pub async fn create_wallet(&self, password: &str) -> Result<WalletInfo> {
        let mut rng = OsRng;
        let keypair = Keypair::generate(&mut rng);
        let encrypted_key = self.encrypt_private_key(&keypair.secret, password)?;
        
        let wallet = WalletInfo {
            address: base58::encode(&keypair.public.to_bytes()),
            encrypted_key,
        };
        
        self.storage.save_wallet(&wallet).await?;
        Ok(wallet)
    }

    fn encrypt_private_key(&self, secret: &SecretKey, password: &str) -> Result<String> {
        Ok(String::new())
    }
}