use tauri::State;
use crate::wallet::{WalletManager, WalletInfo};

#[tauri::command]
pub async fn create_wallet(
    wallet_manager: State<'_, WalletManager>,
    password: String,
) -> Result<WalletInfo, String> {
    wallet_manager
        .create_wallet(&password)
        .await
        .map_err(|e| e.to_string())
}