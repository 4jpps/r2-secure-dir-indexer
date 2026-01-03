# 📄 README2.md: Key Differences from Original Listr2

This document highlights the major feature, security, and UI logic changes implemented in **`r2-secure-dir-indexer`** compared to the original `listr2` Worker.

---

## 🖥️ User Experience and Visuals

| Feature | Original Listr2 | r2-secure-dir-indexer (Current) | Significance |
| --- | --- | --- | --- |
| **Icon Legend** | None. | **Dynamic & Contextual:** Only shows icons relevant to the files currently visible in the directory. | Reduces visual noise; only explains what the user actually sees. |
| **Media Detection** | Generic file icons. | **Rich Media & OS Detection:** Specialized icons for Video, Audio, and specific hardware architectures (ARM64 vs Intel). | Professional classification of support assets; prevents users from downloading the wrong architecture. |
| **UI Design** | Basic HTML table. | **Glassmorphism:** Modern responsive design with translucent panels and blur effects. | Provides a premium, enterprise-grade aesthetic for client-facing portals. |
| **Theme Support** | Single fixed theme. | **Tri-Theme Logic:** Persisted Light, Dark, and System-preference sync. | Improved accessibility and user comfort for long-term use. |
| **Metadata** | Hover-only (HTML title). | **Dedicated Columns:** File size and modified dates are always visible. | Faster scanning and comparison of file versions. |

---

## 🔒 Security and Access Logic

| Feature | Original Listr2 | r2-secure-dir-indexer (Current) | Significance |
| --- | --- | --- | --- |
| **Authentication** | HTTP Basic Auth. | **Token-Based Auth:** Query parameter tokens (`?token=...`) linked to secrets. | Enables sharing specific folders via unique links without global credentials. |
| **Scoping** | Global bucket access. | **Strict Prefix Caging:** Users are locked into the folder tree defined by their token. | Enables secure multi-tenancy within a single R2 bucket. |
| **Operations** | Supports Write/POST. | **Read-Only Enforcement:** Blocks all `POST`, `PUT`, and `DELETE` attempts. | Ensures the repository remains a secure, immutable source of truth. |
| **Path Casing** | Case-sensitive. | **Dynamic Case Mapping:** Resolves tokens to mixed-case R2 paths automatically. | High reliability even with inconsistent bucket naming conventions. |

---

## 🌍 Internationalization

| Feature | Original Listr2 | r2-secure-dir-indexer (Current) | Significance |
| --- | --- | --- | --- |
| **Language** | Hardcoded English. | **Dynamic Auto-Detection:** Uses `Accept-Language` headers for 6 major languages. | Automatically localizes the UI for global users without manual switching. |
| **Timezones** | Server-side string. | **Client-Side Localization:** Dates are formatted to the user's local timezone. | Prevents confusion regarding when a file was actually uploaded. |
