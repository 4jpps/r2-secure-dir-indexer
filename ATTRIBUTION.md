# 📜 ATTRIBUTION.md

This document serves to formally acknowledge the original source code and intellectual property upon which the **`r2-secure-dir-indexer`** project is built.

## 💻 Core Source Code

The foundation of this Cloudflare Worker script is derived from the **Listr2** project. The Listr2 script provided the initial structure for interacting with Cloudflare R2, generating the HTML directory listing, and handling basic file rendering logic.

| Attribute | Detail |
| --- | --- |
| **Original Project Name** | Listr2 |
| **Original Author** | [xolyn](https://github.com/xolyn) |
| **Original Repository** | [https://github.com/xolyn/listr2](https://github.com/xolyn/listr2) |
| **Original Licensing** | Unlicensed (Default Copyright Applies) |

---

## ✨ Major Modifications and Enhancements

The **`r2-secure-dir-indexer`** project represents a significant evolution of the original Listr2 code. These core value-added features were developed by **Jeff Parrish PC Services** in collaboration with **Google Gemini** and **Microsoft Copilot**.

Key changes and features not present in the original Listr2 include:

* **Token-Based Access Control:** Implementation of `TOKEN_...` secrets for scoped, hierarchical, and authenticated access via URL parameters.
* **Dynamic Case Mapping:** Recursive scanning logic to resolve case-sensitive R2 paths against uppercase environment variables.
* **Security Enforcement:** Mandatory read-only state, blocking all write/management operations (`POST` requests).
* **UI/UX Overhaul:** A modern **Glassmorphism design** featuring Light, Dark, and System theme persistence.
* **Multi-Language Support:** Automatic detection and rendering of UI in English, Spanish, Chinese, French, German, and Russian.
* **Architecture-Specific Icons:** Advanced detection logic to distinguish between **Apple Silicon (ARM64)** and **Intel (x64)** binaries.
* **Clean URL Management:** Logic for redirecting redundant `prefix` parameters to provide shorter, shareable links.

---

## 🤝 Collaborators

The enhancements listed above were developed through a collaborative effort:

* **Jeff Parrish PC Services:** [jpps.us](https://www.jpps.us)
* **Google Gemini:** [gemini.google.com](https://gemini.google.com)
* **Microsoft Copilot:** [copilot.microsoft.com](https://copilot.microsoft.com)

---

## ⚖️ Licensing

While the original Listr2 code is unlicensed, the modifications and all new logic added in this repository are governed by the **MIT License**. This license is provided in the `LICENSE` file in the root of this repository.
