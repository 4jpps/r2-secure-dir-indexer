# 📂 r2-secure-dir-indexer

**Description:** A Cloudflare Worker for R2 providing **token-based, scoped, and hierarchical access control** to directory listings. Includes file type sorting and OS-specific icons (Apple Silicon/Intel).

### Features

* **Token-Based Access:** Access is secured using URL tokens, granting users access only to their designated R2 prefix (folder).
* **Hierarchical Scoping:** A single token can grant access to a top-level folder, with navigation restricted within that scope.
* **Case-Insensitive Pathing:** Uses a dynamic internal map to handle case differences between tokens (which must be uppercase) and R2's actual mixed-case paths.
* **Clean URLs:** Automatically cleans up the URL when navigating to the root scope (`/?token=...` instead of `/?prefix=...&token=...`).
* **Visual File Sorting:** Files are primarily sorted by **extension/type** for easy grouping.
* **Differentiated Icons:** Uses emojis to clearly distinguish between file types and operating system architecture:
    * **Mac Silicon:** 🍎 ⚙️ (`-arm64.dmg`)
    * **Mac Intel:** 🍎 🖥️ (`-x64.dmg`)
    * **Windows:** 🪟, **Linux:** 🐧, **Android:** 🤖, **PDF:** 📃, etc.

---

## 🚀 Setup Instructions

### 1. Cloudflare R2: API Token Creation

You must create an **API Token** that grants the Worker permission to read the R2 bucket. Using a restricted token is a security best practice.

1.  Navigate to your **Cloudflare Dashboard**.
2.  Go to **My Profile** > **API Tokens**.
3.  Click **Create Token**.
4.  Use the **Custom Token** template.
5.  **Token Name:** Give it a meaningful name (e.g., `R2-Indexer-Worker`).
6.  **Permissions:**
    * **Account:** R2 Storage: **`Edit`** (This level is recommended for the dynamic case-mapping feature to work reliably across the entire bucket.)
7.  Click **Continue to Summary** and **Create Token**.
8.  **Immediately copy the token value.** You will use this as a secret environment variable.

---

## 💻 Deployment using Wrangler CLI

Wrangler is the command-line tool for Cloudflare Workers. We will use it to configure environment secrets and deploy the worker.

### A. Project Structure

Ensure you have the following two files in your project directory:

1.  **`worker.js`**: Contains the main Worker JavaScript code.
2.  **`worker.toml`**: Contains the deployment configuration and R2 binding.

### B. Setup and Login

1.  **Install Wrangler:**
    ```bash
    npm install -g wrangler
    ```

2.  **Login to Cloudflare:**
    ```bash
    wrangler login
    ```

### C. Configure Environment Secrets

The **token** definitions (`TOKEN_...`) are critical and must be set as environment secrets. For **each token** you want to activate, run the following command and paste the unique token value when prompted.

# 1. Set the Root Access Token (TOKEN_ grants access to the entire bucket)
```bash
wrangler secret put TOKEN_ A-SUPER-SECRET-ROOT-KEY
```

# 2. Set a Scoped Access Token (Example: TOKEN_CLIENT_A_ grants access to the "CLIENT/A/" folder)
```bash
wrangler secret put TOKEN_CLIENT_A_ CLIENTA-MONTHLY-KEY
```
Note on Naming: Token names are derived from the folder path, replacing slashes (/) with underscores (_) and ending with an underscore. They must be ALL CAPS.

D. Deploy the Worker
Once the secrets are set and your worker.toml is configured with the correct bucket_name and ROOT URL, deploy your project:

```bash
wrangler deploy
```
E. Accessing the Index
Access the deployed worker URL using the specific token as a query parameter:

Root Access: https://your-worker.your-domain.dev/?token=A-SUPER-SECRET-ROOT-KEY

Scoped Access: https://your-worker.your-domain.dev/?token=CLIENTA-MONTHLY-KEY
