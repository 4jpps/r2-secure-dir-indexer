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
    * **Account:** Cloudflare Workers: `None`
    * **Account:** Cloudflare Pages: `None`
    * **Account:** R2 Storage: **`Edit`** (This level is required to perform the recursive listing necessary for access control.)
        * *If you want read-only listing:* Select **`Read`** instead, but this may prevent the Worker from dynamically handling case-sensitive directory names if your token doesn't grant full account R2 listing permission. **`Edit`** is recommended for full functionality.
7.  Click **Continue to Summary** and **Create Token**.
8.  **Immediately copy the token value.** You will use this as a secret environment variable.

### 2. Cloudflare Worker Deployment

You can use the `wrangler.toml` file to deploy, or deploy directly through the Cloudflare UI.

#### A. Bind R2 Bucket

The Worker must be bound to your R2 bucket.

1.  Go to your **Worker's Dashboard**.
2.  Navigate to **Settings** > **Variables** (or the **Resources** tab if using the new UI).
3.  Under **R2 Bucket Bindings** (or "R2"), click **Add binding**.
    * **Variable Name:** Set this to **`R2`** (This exact name is used in the `worker.js` script).
    * **Bucket:** Select your target R2 bucket from the dropdown.

#### B. Set Environment Variables (Secrets)

All access tokens and path information must be stored as **Secrets** (Environment Variables prefixed with `SECRETS_`).

1.  Go to **Settings** > **Variables** > **Add Secret**.

| Secret Name | Example Value | Description |
| :--- | :--- | :--- |
| **`ROOT`** | `https://pub-yourbucketid.r2.dev` | **Your R2 Public Domain URL.** This is used to construct direct download links. If you are not using a Custom Domain, this will be your public R2 ID domain. |
| **`TOKEN_`** | `A-SUPER-SECRET-ROOT-KEY` | **Root Access Token.** Grants access to the entire bucket (prefix `""`). Used for a primary user or administrator. |
| **`TOKEN_CLIENT_A_`** | `CLIENTA-MONTHLY-KEY` | **Scoped Access Token.** Grants access to the R2 path that matches the token name, replacing underscores with slashes. This example grants access to the R2 path `CLIENT/A/`. **Token names must be ALL CAPS.** |

**Example of Token-to-Path Mapping:**

| Secret Name | Token Value (The Secret) | R2 Path Granted |
| :--- | :--- | :--- |
| `TOKEN_` | `MYROOTKEY` | `""` (Root of the bucket) |
| `TOKEN_MATHEWS_` | `MATH001` | `Mathews/` |
| `TOKEN_MATHEWS_UPLOAD_CLIENT_` | `MATHEWSCLIENT` | `Mathews/Upload/Client/` |

### 3. Deploy and Access

1.  Paste the Worker code into a file named **`worker.js`**.
2.  Deploy the Worker.
3.  Access the worker URL using a token, e.g.:

    `https://your-worker.your-domain.dev/?token=MYROOTKEY`
    
    or for scoped access:
    
    `https://your-worker.your-domain.dev/?token=MATHEWSCLIENT`
