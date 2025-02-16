mod storage;
mod wallet;
mod commands;

use std::sync::Arc;
use tauri::async_runtime::Mutex;

#[tokio::main]
async fn main() {
    let storage = Storage::new("sqlite:wallet.db").await.unwrap();
    let wallet_manager = Arc::new(Mutex::new(
        WalletManager::new(storage, [0u8; 32]).await
    ));

    tauri::Builder::default()
        .manage(wallet_manager)
        .invoke_handler(tauri::generate_handler![
            commands::create_wallet,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}