use serde::{Deserialize, Serialize};
use ed25519_dalek::{Keypair, SecretKey, PublicKey};
use rand::rngs::OsRng;
use anyhow::{Result, Context};
use aes_gcm::{
    aead::{Aead, KeyInit},
    Aes256Gcm, Nonce
};
use sha2::{Sha256, Digest};
use bip39::{Mnemonic, Language};

use crate::storage::Storage;

#[derive(Debug, Serialize, Deserialize)]
pub struct WalletInfo {
    pub id: Option<i64>,
    pub address: String,
    pub encrypted_key: String,
    pub name: String,
    pub network: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct KeyPair {
    pub public_key: String,
    pub private_key: String,
}

pub struct WalletManager {
    storage: Storage,
    cipher: Aes256Gcm,
}

impl WalletManager {
    pub async fn new(storage: Storage, encryption_key: [u8; 32]) -> Self {
        let cipher = Aes256Gcm::new_from_slice(&encryption_key)
            .expect("Failed to create cipher");
        
        Self { storage, cipher }
    }

    pub async fn create_wallet(
        &self,
        password: &str,
        name: &str,
        network: &str
    ) -> Result<WalletInfo> {
        let mnemonic = Mnemonic::new(bip39::MnemonicType::Words24, Language::English);
        let seed = mnemonic.to_seed(password);
        
        let keypair = self.generate_keypair_from_seed(&seed)?;
        let encrypted_key = self.encrypt_private_key(&keypair.private_key, password)?;
        
        let wallet = WalletInfo {
            id: None,
            address: keypair.public_key,
            encrypted_key,
            name: name.to_string(),
            network: network.to_string(),
        };
        
        let id = self.storage.save_wallet(&wallet).await?;
        Ok(WalletInfo { id: Some(id), ..wallet })
    }

    pub async fn import_wallet(
        &self,
        mnemonic: &str,
        password: &str,
        name: &str,
        network: &str
    ) -> Result<WalletInfo> {
        let mnemonic = Mnemonic::from_phrase(mnemonic, Language::English)
            .context("Invalid mnemonic phrase")?;
        
        let seed = mnemonic.to_seed(password);
        let keypair = self.generate_keypair_from_seed(&seed)?;
        let encrypted_key = self.encrypt_private_key(&keypair.private_key, password)?;
        
        let wallet = WalletInfo {
            id: None,
            address: keypair.public_key,
            encrypted_key,
            name: name.to_string(),
            network: network.to_string(),
        };
        
        let id = self.storage.save_wallet(&wallet).await?;
        Ok(WalletInfo { id: Some(id), ..wallet })
    }

    fn generate_keypair_from_seed(&self, seed: &[u8]) -> Result<KeyPair> {
        let mut hasher = Sha256::new();
        hasher.update(seed);
        let hash = hasher.finalize();
        
        let secret = SecretKey::from_bytes(&hash)?;
        let public = PublicKey::from(&secret);
        
        Ok(KeyPair {
            public_key: base58::encode(&public.to_bytes()),
            private_key: base58::encode(&secret.to_bytes()),
        })
    }

    fn encrypt_private_key(&self, private_key: &str, password: &str) -> Result<String> {
        let nonce = Nonce::from_slice(b"unique nonce"); // In production, use a random nonce
        
        let mut hasher = Sha256::new();
        hasher.update(password.as_bytes());
        let key = hasher.finalize();
        
        let ciphertext = self.cipher
            .encrypt(nonce, private_key.as_bytes())
            .context("Encryption failed")?;
        
        Ok(base58::encode(&ciphertext))
    }
}