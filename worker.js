//---------------------------------------//
// Listr2 - Prefix-Agnostic Directory Index //
// Original Author: xolyn (https://github.com/xolyn/listr2)
// Modified by: Jeff Parrish PC Services (jpps.us) & Google Gemini
//---------------------------------------//

export default {
    async fetch(request, env, ctx) {
      
        const url = new URL(request.url);
        let prefix = url.searchParams.get("prefix") ?? "";
        const queryToken = url.searchParams.get("token");
        
        // --- 1. Find the Highest Authorized Scope (Includes Dynamic Map Generation) ---
        const highestScope = await getHighestAuthorizedScope(env, queryToken); 

        // --- 2. Security Check & Prefix Adjustment ---
        if (highestScope === null) {
            return handleUnauthorizedAccess();
        }
        
        // A. Handle invalid access attempts (requested prefix is NOT in scope)
        if (prefix !== "" && !prefix.startsWith(highestScope)) {
            // User manually typed an invalid prefix outside their scope.
            return handleUnauthorizedAccess();
        }
        
        // B. Handle Initial Load / Clean URL internal processing
        // If the URL has no prefix parameter, we internally set the prefix to the highestScope.
        if (prefix === "") {
            prefix = highestScope;
        }

        // C. Clean URL Redirect: If the user explicitly navigated to the highest scope, clean the URL.
        const requestedPrefixParam = url.searchParams.get("prefix");
        if (requestedPrefixParam !== null && requestedPrefixParam === highestScope) {
            const cleanURL = url.origin + `/?token=${encodeURIComponent(queryToken)}`;
            // Redirect to the clean URL, stripping the redundant prefix parameter.
            return Response.redirect(cleanURL, 302);
        }
        
        // At this point: highestScope is valid, and the actual R2 prefix is stored in the 'prefix' variable.
        
        // --- 3. If access is granted, proceed with execution ---
        
        // Block all POST requests
        if (request.method === "POST") {
           return new Response("Method Not Allowed: Management operations (Upload, Delete, Move) are disabled.", { status: 405 });
        }
    
        // Handle /raw/ path to allow file downloads
        if (url.pathname.startsWith("/raw/")) {
          const key = decodeURIComponent(url.pathname.slice(5));
          const obj = await env.R2.get(key, { onlyIf: {} });
          if (!obj) return new Response("Not Found", { status: 404 });
  
          const headers = new Headers();
          const meta = obj.httpMetadata || {};
          if (meta.contentType) headers.set("Content-Type", meta.contentType);
          if (meta.contentLanguage) headers.set("Content-Language", meta.contentLanguage);
          if (meta.contentDisposition) headers.set("Content-Disposition", meta.contentDisposition);
          if (meta.cacheControl) headers.set("CacheControl", meta.cacheControl);
          if (meta.contentEncoding) headers.set("Content-Encoding", meta.contentEncoding);
          headers.set("Content-Length", obj.size?.toString() || "");
  
          return new Response(obj.body, { headers });
        }
    
        // Handle the main index page (GET request)
        const baseTitle = "JPPS Support Files"; 
        const rootUrl = env.ROOT;
        
        const folderName = getScopeDisplayName(highestScope);
        
        // H1 Title display
        const displayTitle = highestScope === "" 
            ? baseTitle 
            : `${baseTitle} (${folderName})`;
        
        // H2 Path display
        let currentPathDisplay = "";
        if (prefix !== highestScope) {
            // Calculate the path relative to the highestScope
            currentPathDisplay = prefix.startsWith(highestScope) 
                ? prefix.slice(highestScope.length) 
                : prefix;
            
            // Remove trailing slash for cleaner look
            if (currentPathDisplay.endsWith('/')) {
                currentPathDisplay = currentPathDisplay.slice(0, -1);
            }
        }

        const tokenParam = queryToken ? `&token=${encodeURIComponent(queryToken)}` : '';
        
        // Render the tree using the determined 'prefix'
        const { html, totalFiles, totalDirs } = await renderTree(env.R2, prefix, rootUrl, tokenParam, highestScope);
    
        // --- HTML Rendering ---
        
        // Determine the parent link URL:
        let parentLinkUrl = "";
        const parentPfx = parentPrefix(prefix);
        const shouldShowParent = (prefix !== highestScope && prefix !== "");

        if (shouldShowParent) {
            if (parentPfx === highestScope) {
                // If navigating back to the authorized root, use the clean URL
                parentLinkUrl = `/?${tokenParam}`;
            } else {
                // Otherwise, use the standard prefix URL
                parentLinkUrl = `/?prefix=${encodeURIComponent(parentPfx)}${tokenParam}`;
            }
        }
        
        const parentHtml = shouldShowParent ? 
            `<tr class="dir-row"><td colspan="3"><span class="icon icon-folder">⬆️</span> <a href="${parentLinkUrl}" class="file-link">.. (Parent Directory)</a></td></tr>` 
            : "";
        
        const pathHeadingHtml = currentPathDisplay ? 
            `<h2>Current Path: /${escapeHtml(currentPathDisplay)}</h2>` : 
            '';
        
        const iconLegendHtml = getIconLegendHtml();

        const page = `<!doctype html>
        <html lang="en">
        <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>${escapeHtml(baseTitle)}</title>
        <style>
        /* --- BEAUTIFIED CSS STYLES --- */
        body { 
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"; 
            margin: 0;
            padding: 20px;
            background-color: #f7f9fc; 
            color: #333;
        }
        .container {
            max-width: 900px;
            margin: 0 auto;
            background: #fff;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }
        h1 { 
            border-bottom: 2px solid #007bff; 
            padding-bottom: 10px;
            margin-bottom: 10px; 
            color: #007bff;
        }
        h2 {
            font-size: 1.1em;
            color: #495057;
            margin-top: 5px;
            margin-bottom: 20px;
            padding-left: 5px;
            border-left: 4px solid #adb5bd;
        }
        button {
            background-color: #007bff;
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 6px;
            cursor: pointer;
            margin-bottom: 15px;
            transition: background-color 0.2s;
        }
        button:hover {
            background-color: #0056b3;
        }
        p { 
            color: #666; 
        }
        
        /* Table Styles */
        table { 
            width: 100%; 
            border-collapse: separate; 
            border-spacing: 0;
            table-layout: fixed; 
            border-radius: 8px;
            overflow: hidden; 
        }
        th, td { 
            padding: 12px 15px; 
            text-align: left; 
            vertical-align: middle;
            border-bottom: 1px solid #eee; 
        }
        th { 
            background-color: #e9ecef;
            color: #343a40;
            font-weight: 600;
            text-transform: uppercase;
            font-size: 0.9em;
        }
        tr:last-child td {
            border-bottom: none;
        }
        tr:hover td {
            background-color: #f5f8ff; 
        }
        td.name-col { width: 60%; }
        td.size-col { width: 15%; white-space: nowrap; font-size: 0.9em; color: #6c757d; }
        td.time-col { width: 25%; white-space: nowrap; font-size: 0.9em; color: #6c757d; }
        
        /* Directory/Link Styles */
        .dir-row td { 
            font-weight: 600; 
            background-color: #f8f9fa; 
        }
        .file-link { 
            text-decoration: none; 
            color: #333;
            display: inline-flex;
            align-items: center;
        }
        .file-link:hover {
            color: #007bff; 
            text-decoration: underline;
        }
        /* Icon styles */
        .icons-container {
            display: inline-flex;
            gap: 4px; /* Space between icons */
            margin-right: 8px;
        }
        .icon {
            font-size: 1.2em; 
        }
        .icon-folder { color: #fcc419; } 
        .icon-file { color: #495057; } 
        
        /* Differentiated OS Classes */
        .icon-windows { color: #0078D6; }
        .icon-linux { color: #000000; }
        .icon-android { color: #3DDC84; }
        .icon-apple { color: #999; } /* Default Apple (unspecified) */
        .icon-apple-arm { color: #6A1B9A; } /* Purple for Silicon */
        .icon-apple-intel { color: #999; } /* Gray for Intel */

        /* Icon Key Styles */
        .icon-key-container {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
        }
        .icon-key-container h3 {
            font-size: 1em;
            color: #007bff;
            margin-bottom: 10px;
        }
        .icon-key-container ul {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            flex-wrap: wrap;
            gap: 15px 30px;
        }
        .icon-key-container li {
            display: flex;
            align-items: center;
            font-size: 0.9em;
            color: #666;
        }
        </style>
        </head>
        <body>
        <div class="container">
          
          <h1>${escapeHtml(displayTitle)}</h1>
          ${pathHeadingHtml}
          <div>
            <button onclick="location.href='/?prefix=${encodeURIComponent(prefix)}${tokenParam}'">Refresh</button>
          </div>
          
          <p>${totalDirs} folders , ${totalFiles} files.</p>
          
          <table>
            <thead>
              <tr>
                <th class="name-col">Name</th>
                <th class="size-col">Size</th>
                <th class="time-col">Last Modified</th>
              </tr>
            </thead>
            <tbody>
              ${parentHtml}
              ${html}
            </tbody>
          </table>
          
          ${iconLegendHtml}

          <p style="margin-top:40px;text-align:center;font-size:0.8em;color:#999">
                  Based on <a href="https://github.com/xolyn/listr2" style="color:#999;">Listr2</a>, modified by 
                  <a href="https://jpps.us" style="color:#999;">Jeff Parrish PC Services</a> and 
                  <a href="https://google.com/search?q=Google+Gemini" style="color:#999;">Google Gemini</a>.
          </p>
        </div>
        </body>
        </html>`;
    
        return new Response(page, { headers: { "Content-Type": "text/html; charset=utf-8" } });
    }
};

// ---
// --- CORE SECURITY FUNCTIONS (Dynamic Recursive CaseMap) ---
// ---

/**
 * Creates a comprehensive case map by recursively listing all delimited prefixes (folders) 
 * in the R2 bucket. This is done using an iterative queue to prevent deep recursion issues.
 * @param {R2Bucket} bucket - The R2 bucket instance.
 * @returns {Promise<Object>} The case map (e.g., {"MATHEWS/UPLOAD/CLIENT/": "Mathews/Upload/Client/"}).
 */
async function generateCaseMap(bucket) {
    const caseMap = {};
    // Start with the root prefix
    let prefixQueue = [""]; 
    
    // Process the queue iteratively (breadth-first traversal)
    while (prefixQueue.length > 0) {
        const currentPrefix = prefixQueue.shift();
        let cursor;
        
        do {
            const page = await bucket.list({ 
                prefix: currentPrefix,
                delimiter: '/',
                cursor: cursor,
                limit: 1000 
            });
            cursor = page.truncated ? page.cursor : undefined;

            for (const p of page.delimitedPrefixes || []) {
                // p is the correct mixed-case path, e.g., "Mathews/Upload/Client/"
                
                // 1. Create the all-uppercase key: 
                const mapKey = p.toUpperCase(); 
                
                // 2. Store the correct mixed-case value
                caseMap[mapKey] = p;
                
                // 3. Add this new directory to the queue to scan its subdirectories
                prefixQueue.push(p); 
            }
        } while (cursor);
    }
    
    // Add the root map entry for TOKEN_
    caseMap[""] = "";
    
    return caseMap;
}

/**
 * Calculates the highest (shortest) directory prefix that the provided token is authorized to access.
 * Uses a dynamically generated, comprehensive caseMap.
 * @returns {Promise<string | null>} The highest authorized prefix.
 */
async function getHighestAuthorizedScope(env, queryToken) {
    if (!queryToken) return null;

    // Generate the comprehensive map based on the entire bucket structure
    const caseMap = await generateCaseMap(env.R2);
    
    let currentBestPrefix = null;
    
    for (const envKey in env) {
        if (envKey.startsWith("TOKEN_") && envKey.endsWith("_")) { 
            const requiredToken = env[envKey];
            
            if (requiredToken === queryToken) {
                
                let testPrefix;
                if (envKey === "TOKEN_") {
                    testPrefix = ""; // Root token
                } else {
                    // 1. Slice off "TOKEN_" (6 chars) and the trailing "_" (1 char).
                    let rawPrefix = envKey.slice(6, -1); 
                    
                    // 2. Convert underscores to slashes. This produces the all-uppercase key for lookup.
                    testPrefix = rawPrefix.replaceAll('_', '/') + '/';
                }
                
                // 3. Apply the dynamic case mapping to get the correct R2 casing.
                const mappedPrefix = caseMap[testPrefix] || testPrefix; 
                
                // Found a valid scope. Keep the one that is shortest (highest in the hierarchy).
                if (currentBestPrefix === null || mappedPrefix.length < currentBestPrefix.length) {
                    currentBestPrefix = mappedPrefix;
                }
            }
        }
    }
    
    return currentBestPrefix;
}


// --- UTILITY FUNCTIONS ---

/**
 * Maps common file extensions to OS-specific icons and classes,
 * now differentiating Mac files by architecture (ARM vs. Intel).
 * @param {string} fileName The full name of the file.
 * @returns {{icon: string, class: string}[]} An array of icon objects.
 */
function getFileOSIcon(fileName) {
    const nameLower = fileName.toLowerCase();
    const extMatch = nameLower.match(/\.([0-9a-z]+)(?=[?#])?$|\.([0-9a-z]+)$/i);
    
    if (!extMatch) {
        return [{ icon: '📄', class: 'icon-file' }];
    }
    
    const ext = (extMatch[1] || extMatch[2]).toLowerCase();
    let icons = [];

    // --- Specific Mac Logic ---
    if (ext === 'dmg' || ext === 'pkg') {
        icons.push({ icon: '🍎', class: 'icon-apple' });
        
        // Use the exact suffixes provided by the user: -arm64.dmg and -x64.dmg
        if (nameLower.includes('-arm64')) {
            icons.push({ icon: '⚙️', class: 'icon-apple-arm', description: 'Apple Silicon (ARM)' });
        } else if (nameLower.includes('-x64')) {
            icons.push({ icon: '🖥️', class: 'icon-apple-intel', description: 'Intel (x64)' });
        } else {
            // Universal or unspecified architecture, using a generic computer icon
             icons.push({ icon: '💻', class: 'icon-apple', description: 'Universal/Unspecified Mac' });
        }
        return icons;
    }
    
    // --- General OS Logic ---
    switch (ext) {
        // Windows
        case 'exe':
        case 'msi':
        case 'bat':
        case 'cmd':
            icons.push({ icon: '🪟', class: 'icon-windows' });
            break;

        // Linux / Unix
        case 'deb':
        case 'rpm':
        case 'sh':
        case 'tar':
            icons.push({ icon: '🐧', class: 'icon-linux' });
            break;

        // Android
        case 'apk':
            icons.push({ icon: '🤖', class: 'icon-android' });
            break;

        // PDF Document
        case 'pdf':
            icons.push({ icon: '📃', class: 'icon-file' });
            break;
            
        // Other common types
        case 'doc':
        case 'docx':
            icons.push({ icon: '📝', class: 'icon-file' });
            break;
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif': 
            icons.push({ icon: '🖼️', class: 'icon-file' });
            break;
        case 'zip':
        case 'rar':
        case '7z': 
            icons.push({ icon: '📦', class: 'icon-file' });
            break;
            
        // Default Fallback
        default:
            icons.push({ icon: '📄', class: 'icon-file' });
            break;
    }

    return icons;
}

/**
 * Generates the HTML for the icon key/legend at the bottom of the page.
 * @returns {string} HTML for the icon key.
 */
function getIconLegendHtml() {
    const legendItems = [
        { icon: '📁', description: 'Folder/Directory', class: 'icon-folder' },
        { icon: '🪟', description: 'Windows (.exe, .msi, etc.)', class: 'icon-windows' },
        { icon: '🍎', description: 'macOS Base File (.dmg, .pkg)', class: 'icon-apple' },
        { icon: '⚙️', description: 'Apple Silicon (ARM64)', class: 'icon-apple-arm' },
        { icon: '🖥️', description: 'Intel Architecture (x64)', class: 'icon-apple-intel' },
        { icon: '🐧', description: 'Linux (.deb, .rpm, etc.)', class: 'icon-linux' },
        { icon: '🤖', description: 'Android (.apk)', class: 'icon-android' },
        { icon: '📃', description: 'PDF Document', class: 'icon-file' }, 
        { icon: '📦', description: 'Archive (.zip, .rar, etc.)', class: 'icon-file' },
        { icon: '📄', description: 'Generic File', class: 'icon-file' },
    ];

    const listHtml = legendItems.map(item => 
        `<li><span class="icon ${item.class}">${item.icon}</span> ${escapeHtml(item.description)}</li>`
    ).join('');

    return `
        <div class="icon-key-container">
            <h3>Icon Key:</h3>
            <ul>
                ${listHtml}
            </ul>
        </div>
    `;
}


/**
 * Extracts the final folder name (the directory the token grants access to) from the full prefix.
 * e.g., "Mathews/Upload/Client/" -> "Client"
 * @param {string} prefix The full R2 prefix with correct casing.
 * @returns {string} The final folder name or an empty string if it's the root.
 */
function getScopeDisplayName(prefix) {
    if (!prefix || prefix === "") {
        return "";
    }
    
    // 1. Trim the trailing slash
    const trimmed = prefix.endsWith("/") ? prefix.slice(0, -1) : prefix;
    
    // 2. Find the last path component
    const lastSlashIndex = trimmed.lastIndexOf("/");
    
    if (lastSlashIndex === -1) {
        // This handles a single top-level folder name like "JPPS"
        return trimmed;
    } else {
        // This handles nested paths, slicing off everything before the last slash
        return trimmed.slice(lastSlashIndex + 1);
    }
}


/**
 * Returns a 403 Forbidden HTML response.
 */
function handleUnauthorizedAccess() {
    
    const htmlContent = `<!doctype html>
    <html lang="en">
    <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>403 Forbidden</title>
    <style>
    body { 
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; 
        background-color: #f7f9fc; 
        color: #333;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
        text-align: center;
    }
    .error-container {
        background: #fff;
        padding: 40px;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0 0 0 / 10%);
    }
    h1 { 
        color: #dc3545;
        font-size: 3em;
        margin-bottom: 10px;
    }
    p {
        font-size: 1.2em;
        color: #6c757d;
        margin-bottom: 30px;
    }
    </style>
    </head>
    <body>
        <div class="error-container">
            <h1>🛑 Access Denied (403)</h1>
            <p>The access token provided is missing or invalid.</p>
            <p>Please ensure you are using the correct URL with a valid token.</p>
        </div>
    </body>
    </html>`;

    const headers = {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate", 
        "Pragma": "no-cache",
        "Expires": "0",
    };

    return new Response(htmlContent, { status: 403, headers: headers });
}


// --- RENDER & HELPER FUNCTIONS ---

function formatSize(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function formatTime(date) {
  if (!date) return 'N/A';
  return date.toISOString().slice(0, 19).replace('T', ' '); 
}


async function renderTree(bucket, prefix, rootUrl = null, tokenParam = '', highestScope = '') {
  let totalFiles = 0, totalDirs = 0;

  async function listLevel(curPrefix) {

    const dirs = [];
    const files = [];
    let cursor;
    let currentLevelSize = 0;

    do {
      const page = await bucket.list({
        prefix: curPrefix,
        delimiter: "/", 
        cursor,
        limit: 1000,
        include: ["httpMetadata"] 
      });
      cursor = page.truncated ? page.cursor : undefined;

      for (const obj of page.objects || []) {
        const name = obj.key.slice(curPrefix.length);
        if (name && !name.includes("/")) {
          files.push({ 
              key: obj.key, name, meta: obj.httpMetadata, size: obj.size || 0, time: obj.uploaded 
          });
          currentLevelSize += obj.size || 0;
        }
      }
      for (const p of page.delimitedPrefixes || []) {
        const name = p.slice(curPrefix.length).replace(/\/$/, "");
        if (name) dirs.push({ prefix: p, name });
      }
    } while (cursor);

    let levelHtml = "";
    
    // Folders
    for (const d of dirs.sort((a, b) => a.name.localeCompare(b.name, "en"))) {
      totalDirs++;
      const dirName = escapeHtml(d.name) + '/';
      
      // Determine link: If the destination is the highest scope, use the clean URL, otherwise use the prefix.
      const linkPrefix = d.prefix === highestScope ? "" : `prefix=${encodeURIComponent(d.prefix)}`;
      const link = `/?${linkPrefix}${tokenParam}`; 
      
      levelHtml += `<tr class="dir-row">
          <td class="name-col"><span class="icon icon-folder">📁</span> <a href="${link}" class="file-link">${dirName}</a></td>
          <td class="size-col">--</td>
          <td class="time-col"></td>
      </tr>\n`;
    }

    // Files
    totalFiles += files.length;
    levelHtml += files
        .sort((a, b) => {
          // Helper to get the extension, or an empty string if none
          const getExt = (name) => {
              const match = name.match(/\.([0-9a-z]+)(?=[?#])?$|\.([0-9a-z]+)$/i);
              return match ? (match[1] || match[2]).toLowerCase() : '';
          };
          
          const extA = getExt(a.name);
          const extB = getExt(b.name);
          
          // Primary sort: by extension
          if (extA < extB) return -1;
          if (extA > extB) return 1;
          
          // Secondary sort: by file name (ascending)
          return a.name.localeCompare(b.name, "en");
        })
        .map(f => {
          let href;
          if (rootUrl) {
              const cleanRootUrl = rootUrl.endsWith('/') ? rootUrl.slice(0, -1) : rootUrl;
              href = `${cleanRootUrl}/${f.key}`;
          } else {
              href = `/raw/${encodeURIComponent(f.key)}`;
          }

          const fileSize = formatSize(f.size);
          const fileTime = formatTime(f.time);
          
          const osIcons = getFileOSIcon(f.name); // <--- Call the icon function
          const iconsHtml = osIcons.map(icon => `<span class="icon ${icon.class}">${icon.icon}</span>`).join('');

          const fileTooltip = `${fileSize} | ${fileTime}`; 
          
          return `<tr>
              <td class="name-col">
                  <span class="icons-container">${iconsHtml}</span> 
                  <a href="${href}" target="_blank" rel="noopener" title="${escapeHtml(fileTooltip)}" class="file-link">${escapeHtml(f.name)}</a>
              </td>
              <td class="size-col">${fileSize}</td>
              <td class="time-col">${fileTime}</td>
          </tr>`;
        })
        .join("\n");
    
    const totalSize = currentLevelSize; 

    return { html: levelHtml, size: totalSize, fileCount: files.length };
  }

  const result = await listLevel(prefix);
  
  return { html: result.html, totalFiles: result.fileCount, totalDirs: result.html.split('dir-row').length -1 };
}

function escapeHtml(s) {
  return String(s).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}

function parentPrefix(pfx) {
  if (!pfx) return "";
  const trimmed = pfx.endsWith("/") ? pfx.slice(0, -1) : pfx;
  const idx = trimmed.lastIndexOf("/");
  return idx === -1 ? "" : trimmed.slice(0, idx + 1); 
}
