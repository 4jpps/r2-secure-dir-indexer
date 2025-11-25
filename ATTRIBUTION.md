# 📜 ATTRIBUTION.md

This document serves to formally acknowledge the original source code and intellectual property upon which the **`r2-secure-dir-indexer`** project is built.

## 💻 Core Source Code

The foundation of this Cloudflare Worker script is derived from the **Listr2** project. The Listr2 script provided the initial structure for interacting with Cloudflare R2, generating the HTML directory listing, and handling basic file rendering logic.

| Attribute | Detail |
| :--- | :--- |
| **Original Project Name** | Listr2 |
| **Original Author** | xolyn |
| **Original Repository** | [https://github.com/xolyn/listr2](https://github.com/xolyn/listr2) |
| **Original Licensing** | Unlicensed (Default Copyright Applies) |

## ✨ Major Modifications and Enhancements

The **`r2-secure-dir-indexer`** project represents a significant modification and enhancement of the original Listr2 code. The core value-added features were developed by **Jeff Parrish PC Services** and are covered under the **MIT License** included in this repository.

Key changes and features not present in the original Listr2 include:

* **Token-Based Access Control:** Implementation of `TOKEN_...` secrets for scoped, hierarchical, and authenticated access.
* **Dynamic Case Mapping:** Recursive scanning logic to resolve case-sensitive R2 paths against uppercase tokens.
* **Security Enforcement:** Blocking of all write/management operations (`POST` requests).
* **Visual and UX Overhaul:** Enhanced CSS, display of file size/time in columns, file-type sorting, and OS-specific icons (e.g., Apple Silicon/Intel differentiation).
* **Clean URL Management:** Logic for redirecting redundant `prefix` parameters.

---

## ⚖️ Licensing

While the original Listr2 code is unlicensed, the modifications and all new code added in this repository are governed by the **MIT License**. This license is provided in the `LICENSE` file in the root of this repository.
