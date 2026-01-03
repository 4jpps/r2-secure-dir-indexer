//---------------------------------------//
// r2-secure-dir-indexer - Prefix-Agnostic Directory Index //
// Original Author: xolyn (https://github.com/xolyn/listr2)
// Modified by: Jeff Parrish PC Services (jpps.us), Google Gemini, & Microsoft Copilot
//---------------------------------------//

/**
 * TRANSLATIONS
 * A dictionary supporting multi-language UI. 
 * The system detects the 'Accept-Language' header from the browser to choose the best fit.
 */
const TRANSLATIONS = {
    en: {
        baseTitle: "JPPS Support Files",
        currentPath: "Current Path:",
        refreshButton: "Refresh List",
        folders: "folders",
        files: "files",
        nameCol: "Name",
        sizeCol: "Size",
        timeCol: "Last Modified",
        parentDir: ".. (Parent Directory)",
        accessDeniedTitle: "🛑 Access Denied",
        accessDeniedBody: "A valid security token is required to access the JPPS Support Files repository.",
        iconKey: "Support Legend",
        folder: "Folder",
        win: "Windows Installer",
        macArm: "Mac ARM (Silicon)",
        macIntel: "Mac Intel (x64)",
        linux: "Linux Package",
        android: "Android APK",
        pdf: "PDF Document",
        archive: "Archive (Zip/7z)",
        docs: "Office/Text Document",
        image: "Image File"
    },
    es: { /* Spanish */
        baseTitle: "Archivos de Soporte JPPS",
        currentPath: "Ruta Actual:",
        refreshButton: "Actualizar",
        folders: "carpetas",
        files: "archivos",
        nameCol: "Nombre",
        sizeCol: "Tamaño",
        timeCol: "Última Modificación",
        parentDir: ".. (Directorio Superior)",
        accessDeniedTitle: "🛑 Acceso Denegado",
        accessDeniedBody: "Se requiere un token de seguridad válido para acceder al repositorio.",
        iconKey: "Leyenda de Soporte",
        folder: "Carpeta",
        win: "Instalador de Windows",
        macArm: "Mac ARM (Silicon)",
        macIntel: "Mac Intel (x64)",
        linux: "Paquete Linux",
        android: "Android APK",
        pdf: "Documento PDF",
        archive: "Archivo Comprimido",
        docs: "Documento de Texto",
        image: "Imagen"
    },
    zh: { /* Chinese Simplified */
        baseTitle: "JPPS 支持文件",
        currentPath: "当前路径:",
        refreshButton: "刷新列表",
        folders: "文件夹",
        files: "文件",
        nameCol: "名称",
        sizeCol: "大小",
        timeCol: "修改日期",
        parentDir: ".. (上级目录)",
        accessDeniedTitle: "🛑 访问被拒绝",
        accessDeniedBody: "访问 JPPS 支持文件库需要有效的安全令牌。",
        iconKey: "图标说明",
        folder: "文件夹",
        win: "Windows 安装程序",
        macArm: "Mac ARM (芯片)",
        macIntel: "Mac Intel (x64)",
        linux: "Linux 软件包",
        android: "安卓 APK",
        pdf: "PDF 文档",
        archive: "压缩档案",
        docs: "办公/文本文件",
        image: "图像文件"
    },
    fr: { /* French */
        baseTitle: "Fichiers de Support JPPS",
        currentPath: "Chemin Actuel:",
        refreshButton: "Actualiser",
        folders: "dossiers",
        files: "fichiers",
        nameCol: "Nom",
        sizeCol: "Taille",
        timeCol: "Dernière Modification",
        parentDir: ".. (Répertoire Parent)",
        accessDeniedTitle: "🛑 Accès Refusé",
        accessDeniedBody: "Un jeton de sécurité valide est requis pour accéder au dépôt JPPS.",
        iconKey: "Légende des Icônes",
        folder: "Dossier",
        win: "Installateur Windows",
        macArm: "Mac ARM (Silicon)",
        macIntel: "Mac Intel (x64)",
        linux: "Paquet Linux",
        android: "APK Android",
        pdf: "Document PDF",
        archive: "Archive (Zip/7z)",
        docs: "Document Texte",
        image: "Fichier Image"
    },
    de: { /* German */
        baseTitle: "JPPS Support-Dateien",
        currentPath: "Aktueller Pfad:",
        refreshButton: "Aktualisieren",
        folders: "Ordner",
        files: "Dateien",
        nameCol: "Name",
        sizeCol: "Größe",
        timeCol: "Zuletzt Geändert",
        parentDir: ".. (Übergeordnetes Verzeichnis)",
        accessDeniedTitle: "🛑 Zugriff Verweigert",
        accessDeniedBody: "Ein gültiges Sicherheits-Token ist erforderlich, um auf das Repository zuzugreifen.",
        iconKey: "Symbollegende",
        folder: "Ordner",
        win: "Windows-Installer",
        macArm: "Mac ARM (Silicon)",
        macIntel: "Mac Intel (x64)",
        linux: "Linux-Paket",
        android: "Android APK",
        pdf: "PDF-Dokument",
        archive: "Archiv (Zip/7z)",
        docs: "Dokument",
        image: "Bilddatei"
    },
    ru: { /* Russian */
        baseTitle: "Файлы поддержки JPPS",
        currentPath: "Текущий путь:",
        refreshButton: "Обновить",
        folders: "папки",
        files: "файлы",
        nameCol: "Имя",
        sizeCol: "Размер",
        timeCol: "Изменено",
        parentDir: ".. (Родительский каталог)",
        accessDeniedTitle: "🛑 Доступ запрещен",
        accessDeniedBody: "Для доступа к репозиторию файлов JPPS требуется действительный токен безопасности.",
        iconKey: "Легенда значков",
        folder: "Папка",
        win: "Установщик Windows",
        macArm: "Mac ARM (Silicon)",
        macIntel: "Mac Intel (x64)",
        linux: "Пакет Linux",
        android: "Android APK",
        pdf: "Документ PDF",
        archive: "Архив (Zip/7z)",
        docs: "Документ",
        image: "Изображение"
    }
};

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        let prefix = url.searchParams.get("prefix") ?? "";
        const queryToken = url.searchParams.get("token");
        
        // 1. Language Detection
        const langHeader = request.headers.get("Accept-Language") || "en";
        const langCode = langHeader.split(',')[0].split('-')[0].toLowerCase();
        const t = TRANSLATIONS[langCode] || TRANSLATIONS.en;

        // 2. Authorization Check
        // Checks environment variables (TOKEN_...) for a match with the URL's ?token= value.
        // Also performs case-mapping to ensure the Worker can access the real R2 path regardless of case.
        const highestScope = await getHighestAuthorizedScope(env, queryToken); 

        if (highestScope === null) return handleUnauthorizedAccess(t);
        
        // Security: Ensure user isn't trying to access a path above their authorized scope
        if (prefix !== "" && !prefix.toLowerCase().startsWith(highestScope.toLowerCase())) {
            return handleUnauthorizedAccess(t);
        }
        if (prefix === "") prefix = highestScope;

        // 3. Raw File Serving
        // If path starts with /raw/, serve the file directly from R2 with appropriate metadata
        if (url.pathname.startsWith("/raw/")) {
            const key = decodeURIComponent(url.pathname.slice(5));
            if (!key.toLowerCase().startsWith(highestScope.toLowerCase())) return handleUnauthorizedAccess(t);
            const obj = await env.R2.get(key, { onlyIf: {} });
            if (!obj) return new Response("Not Found", { status: 404 });
            const headers = new Headers();
            if (obj.httpMetadata?.contentType) headers.set("Content-Type", obj.httpMetadata.contentType);
            headers.set("Content-Length", obj.size?.toString() || "");
            return new Response(obj.body, { headers });
        }
    
        // 4. Data Gathering
        const folderName = getScopeDisplayName(highestScope);
        const displayTitle = highestScope === "" ? t.baseTitle : `${t.baseTitle} (${folderName})`;
        const tokenParam = queryToken ? `&token=${encodeURIComponent(queryToken)}` : '';
        
        // Fetch folder structure and file list from R2
        const { html, totalFiles, totalDirs } = await renderTree(env.R2, prefix, env.ROOT, tokenParam, highestScope, t);
    
        // 5. Build Navigation (Parent Directory)
        let parentHtml = "";
        const parentPfx = parentPrefix(prefix);
        if (prefix.toLowerCase() !== highestScope.toLowerCase() && prefix !== "") {
            const parentLinkUrl = parentPfx.toLowerCase() === highestScope.toLowerCase() ? `/?${tokenParam}` : `/?prefix=${encodeURIComponent(parentPfx)}${tokenParam}`;
            parentHtml = `<tr class="dir-row"><td colspan="3"><span class="icon-wrap">${getIcon('up')}</span> <a href="${parentLinkUrl}" class="file-link">${t.parentDir}</a></td></tr>`;
        }

        // Clean up the path display for the user (strip their root prefix)
        const currentPathDisplay = prefix.replace(new RegExp(`^${highestScope}`, 'i'), "");
        const pathHeadingHtml = currentPathDisplay ? `<h2>${t.currentPath} /${escapeHtml(currentPathDisplay)}</h2>` : '';
        
        // 6. Final HTML Rendering
        const page = `<!doctype html>
        <html lang="${langCode}">
        <head>
        <meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>${escapeHtml(displayTitle)}</title>
        <style>
            :root {
                --ui-gradient: radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(339,49%,30%,1) 0, transparent 50%);
                --ui-glass-bg: rgba(255, 255, 255, 0.7); --ui-glass-border: rgba(255, 255, 255, 0.4);
                --ui-text-main: #1a1a1a; --ui-text-muted: #555555; --ui-accent: #007bff;
                --ui-row-hover: rgba(0, 123, 255, 0.08); --ui-body-bg: #0f172a; --ui-icon-stroke: 2px;
            }
            [data-theme="dark"] {
                --ui-glass-bg: rgba(20, 20, 25, 0.6); --ui-glass-border: rgba(255, 255, 255, 0.1);
                --ui-text-main: #f0f0f0; --ui-text-muted: #a0a0a0; --ui-accent: #3793ff;
                --ui-row-hover: rgba(255, 255, 255, 0.04);
            }
            body { font-family: 'Inter', system-ui, sans-serif; margin: 0; min-height: 100vh; background: var(--ui-body-bg); background-image: var(--ui-gradient); background-attachment: fixed; color: var(--ui-text-main); display: flex; justify-content: center; padding: 40px 20px; box-sizing: border-box; }
            .container { width: 100%; max-width: 1000px; background: var(--ui-glass-bg); backdrop-filter: blur(20px); border: 1px solid var(--ui-glass-border); border-radius: 24px; padding: 40px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); }
            h1 { font-size: 2em; margin: 0; color: var(--ui-accent); letter-spacing: -0.02em; }
            h2 { font-size: 0.95em; color: var(--ui-text-muted); font-weight: 400; margin: 10px 0 25px 0; border-left: 3px solid var(--ui-accent); padding-left: 12px; }
            .toolbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
            .btn-refresh { background: var(--ui-accent); color: white; border: none; padding: 10px 20px; border-radius: 10px; cursor: pointer; font-weight: 600; }
            table { width: 100%; border-collapse: collapse; }
            th { text-align: left; padding: 15px; color: var(--ui-text-muted); font-size: 0.75em; text-transform: uppercase; border-bottom: 1px solid var(--ui-glass-border); }
            td { padding: 14px 15px; border-bottom: 1px solid var(--ui-glass-border); }
            .dir-row:hover td { background: var(--ui-row-hover); }
            .file-link { text-decoration: none; color: inherit; font-weight: 500; display: flex; align-items: center; gap: 12px; }
            .icon-wrap { width: 20px; height: 20px; display: inline-flex; align-items: center; justify-content: center; color: var(--ui-accent); flex-shrink: 0; }
            .icon-wrap svg { width: 100%; height: 100%; stroke-width: var(--ui-icon-stroke); }
            .glass-panel { margin-top: 40px; padding: 25px; background: rgba(255, 255, 255, 0.03); border-radius: 18px; border: 1px solid var(--ui-glass-border); }
            .glass-panel h3 { margin: 0 0 18px 0; font-size: 0.85em; text-transform: uppercase; color: var(--ui-accent); }
            .glass-panel ul { list-style: none; padding: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 15px; }
            .glass-panel li { font-size: 0.85em; display: flex; align-items: center; gap: 12px; color: var(--ui-text-muted); }
            footer { margin-top: 50px; text-align: center; font-size: 0.8em; opacity: 0.7; padding-top: 20px; border-top: 1px solid var(--ui-glass-border); line-height: 1.8; }
            footer a { color: var(--ui-accent); text-decoration: none; }
            footer a:hover { text-decoration: underline; }
            .theme-select { background: var(--ui-glass-bg); color: var(--ui-text-main); border: 1px solid var(--ui-glass-border); border-radius: 8px; padding: 5px 10px; cursor: pointer; outline: none; }
        </style>
        </head>
        <body>
        <div class="container">
          <div style="display:flex; justify-content:space-between; align-items:center;">
             <h1>${escapeHtml(displayTitle)}</h1>
             <select id="themeSelect" class="theme-select" onchange="applyTheme(this.value)">
                <option value="light">Light</option><option value="dark">Dark</option><option value="system">System</option>
             </select>
          </div>
          ${pathHeadingHtml}
          <div class="toolbar">
            <button class="btn-refresh" onclick="location.reload()">${t.refreshButton}</button>
            <span style="font-size: 0.9em; color: var(--ui-text-muted); font-weight: 600;">${totalDirs} ${t.folders} , ${totalFiles} ${t.files}</span>
          </div>
          <table>
            <thead><tr><th>${t.nameCol}</th><th>${t.sizeCol}</th><th>${t.timeCol}</th></tr></thead>
            <tbody>${parentHtml}${html}</tbody>
          </table>
          <div class="glass-panel">
            <h3>${t.iconKey}</h3>
            <ul>
              <li><span class="icon-wrap">${getIcon('folder')}</span> ${t.folder}</li>
              <li><span class="icon-wrap">${getIcon('windows')}</span> ${t.win}</li>
              <li><span class="icon-wrap">${getIcon('arm')}</span> ${t.macArm}</li>
              <li><span class="icon-wrap">${getIcon('intel')}</span> ${t.macIntel}</li>
              <li><span class="icon-wrap">${getIcon('linux')}</span> ${t.linux}</li>
              <li><span class="icon-wrap">${getIcon('pdf')}</span> ${t.pdf}</li>
              <li><span class="icon-wrap">${getIcon('archive')}</span> ${t.archive}</li>
              <li><span class="icon-wrap">${getIcon('image')}</span> ${t.image}</li>
            </ul>
          </div>
          <footer>
            &copy; ${new Date().getFullYear()} <a href="https://www.jpps.us" target="_blank">Jeff Parrish PC Services</a><br>
            Built with <a href="https://github.com/xolyn/listr2" target="_blank">Listr2</a>, 
            <a href="https://gemini.google.com" target="_blank">Gemini</a> & 
            <a href="https://copilot.microsoft.com" target="_blank">Copilot</a>
          </footer>
        </div>
        <script>
            // Apply theme and save preference to localStorage
            function applyTheme(t){
                const h=document.documentElement;
                if(t==='system') h.setAttribute('data-theme', window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
                else h.setAttribute('data-theme', t);
                localStorage.setItem('theme', t);
                document.getElementById('themeSelect').value = t;
            }
            
            // Initialization: Load saved theme
            const saved = localStorage.getItem('theme') || 'system';
            applyTheme(saved);

            // Localization: Format timestamps on the client side based on user's local timezone
            document.addEventListener("DOMContentLoaded", function () {
                const opts = { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" };
                document.querySelectorAll(".lm").forEach(function (cell) {
                    const ts = cell.dataset.ts;
                    if (ts) {
                        const d = new Date(ts + "Z");
                        if (!isNaN(d.getTime())) cell.textContent = d.toLocaleString(undefined, opts);
                    }
                });
            });
        </script>
        </body></html>`;

        return new Response(page, { headers: { "Content-Type": "text/html; charset=utf-8" } });
    }
};

// --- ICONS & HELPERS ---

/**
 * Returns SVG path for a given UI component.
 */
function getIcon(type) {
    const svgs = {
        folder: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/></svg>',
        windows: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12L21 12M3 12L3 4L11 3V12M3 12L3 20L11 21V12M13 3L21 2V12M13 21L21 22V12"/></svg>',
        linux: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c-4.42 0-8 3.58-8 8v2c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-2c0-4.42-3.58-8-8-8z"/><path d="M12 15v4m-3-4v2m6-2v2"/></svg>',
        android: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M12 18V22M7 18V22M17 18V22M5 10V18H19V10H5ZM8 10V7C8 4.79 9.79 3 12 3C14.21 3 16 4.79 16 7V10"/></svg>',
        arm: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M12 8v4M9 10h6"/><path d="M8 4v2M12 4v2M16 4v2M8 18v2M12 18v2M16 18v2"/></svg>',
        intel: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 15l6-6M9 9l6 6"/></svg>',
        pdf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
        archive: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8v13H3V8M1 3h22v5H1V3ZM10 12h4"/></svg>',
        image: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',
        docs: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
        file: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/></svg>',
        up: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>'
    };
    return svgs[type] || svgs.file;
}

/**
 * Intelligent file extension to icon mapping.
 * Handles specialized logic like detecting Mac ARM vs Intel based on filename patterns.
 */
function getFileOSIcon(fileName) {
    const n = fileName.toLowerCase();
    const ext = n.split('.').pop();
    let icons = [];

    if (ext === 'dmg' || ext === 'pkg') {
        if (n.includes('arm64') || n.includes('apple') || n.includes('m1') || n.includes('m2')) icons.push(getIcon('arm'));
        else if (n.includes('x64') || n.includes('intel')) icons.push(getIcon('intel'));
        else icons.push(getIcon('file'));
    } else if (['exe', 'msi'].includes(ext)) icons.push(getIcon('windows'));
    else if (['deb', 'rpm', 'sh'].includes(ext)) icons.push(getIcon('linux'));
    else if (ext === 'apk') icons.push(getIcon('android'));
    else if (ext === 'pdf') icons.push(getIcon('pdf'));
    else if (['zip', '7z', 'rar'].includes(ext)) icons.push(getIcon('archive'));
    else if (['jpg', 'png', 'svg', 'webp', 'jpeg'].includes(ext)) icons.push(getIcon('image'));
    else if (['doc', 'docx', 'txt', 'rtf'].includes(ext)) icons.push(getIcon('docs'));
    else icons.push(getIcon('file'));

    return icons.map(i => `<span class="icon-wrap">${i}</span>`).join('');
}

/**
 * Renders the directory tree by listing objects in the R2 bucket.
 * Sorts directories first, then files alphabetically.
 */
async function renderTree(bucket, prefix, rootUrl, tokenParam, highestScope, t) {
    let files = [], dirs = [], cursor;
    do {
        const page = await bucket.list({ prefix, delimiter: "/", cursor });
        cursor = page.truncated ? page.cursor : undefined;
        for (const o of page.objects || []) {
            const name = o.key.slice(prefix.length);
            if (name && !name.includes("/")) files.push({ key: o.key, name, size: o.size, time: o.uploaded });
        }
        for (const p of page.delimitedPrefixes || []) {
            const name = p.slice(prefix.length).replace(/\/$/, "");
            if (name) dirs.push({ prefix: p, name });
        }
    } while (cursor);

    // Render Folders
    let levelHtml = dirs.sort((a,b)=>a.name.localeCompare(b.name)).map(d => {
        const lp = d.prefix.toLowerCase() === highestScope.toLowerCase() ? "" : `prefix=${encodeURIComponent(d.prefix)}`;
        return `<tr class="dir-row"><td><span class="icon-wrap">${getIcon('folder')}</span> <a href="/?${lp}${tokenParam}" class="file-link">${escapeHtml(d.name)}/</a></td><td>--</td><td>--</td></tr>`;
    }).join("");

    // Render Files
    levelHtml += files.sort((a,b)=>a.name.localeCompare(b.name)).map(f => {
        const href = rootUrl ? `${rootUrl.replace(/\/$/, '')}/${f.key}` : `/raw/${encodeURIComponent(f.key)}`;
        return `<tr><td><div class="file-link"><span>${getFileOSIcon(f.name)}</span><a href="${href}" target="_blank" rel="noopener" style="color:inherit;text-decoration:none">${escapeHtml(f.name)}</a></div></td><td>${formatSize(f.size)}</td><td class="lm" data-ts="${f.time.toISOString()}"></td></tr>`;
    }).join("");

    return { html: levelHtml, totalFiles: files.length, totalDirs: dirs.length };
}

/**
 * Authorization Logic:
 * Scans env variables starting with "TOKEN_" to find one matching the provided queryToken.
 * Maps the variable name (e.g., TOKEN_APPS_TOOLS_) to a real R2 path (apps/tools/).
 * Case-mapping: Lists R2 directories to find the exact casing of the path.
 */
async function getHighestAuthorizedScope(env, queryToken) {
    if (!queryToken) return null;
    let rawScope = null;
    for (const k in env) {
        if (k.startsWith("TOKEN_") && k.endsWith("_") && env[k] === queryToken) {
            rawScope = k === "TOKEN_" ? "" : k.slice(6, -1).replaceAll('_', '/') + '/';
            break; 
        }
    }
    if (rawScope === null) return null;
    if (rawScope === "") return "";
    
    // Exact case matching for the storage layer
    let corrected = "";
    const parts = rawScope.split('/').filter(p => p !== "");
    for (const p of parts) {
        const list = await env.R2.list({ prefix: corrected, delimiter: "/" });
        const match = (list.delimitedPrefixes || []).find(x => x.slice(corrected.length).replace(/\/$/, "").toUpperCase() === p.toUpperCase());
        corrected = match || (corrected + p + "/");
    }
    return corrected;
}

/**
 * Standard 403 response for unauthorized users.
 * Uses the same Glassmorphism design language as the main index.
 */
/**
 * Standard 403 response for unauthorized users.
 * Uses the same Glassmorphism design language and dynamic localization.
 */
function handleUnauthorizedAccess(t, langCode) {
    return new Response(`<!doctype html>
    <html lang="${langCode}">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>${t.accessDeniedTitle}</title>
        <style>
            :root {
                --ui-gradient: radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(339,49%,30%,1) 0, transparent 50%);
                --ui-glass-bg: rgba(20, 20, 25, 0.6); 
                --ui-glass-border: rgba(255, 255, 255, 0.1);
                --ui-text-main: #f0f0f0; 
                --ui-text-muted: #a0a0a0; 
                --ui-accent: #ff4757;
                --ui-body-bg: #0f172a;
            }
            body { 
                font-family: 'Inter', system-ui, sans-serif; 
                margin: 0; 
                height: 100vh; 
                background: var(--ui-body-bg); 
                background-image: var(--ui-gradient); 
                color: var(--ui-text-main); 
                display: flex; 
                justify-content: center; 
                align-items: center; 
                padding: 20px;
                box-sizing: border-box;
            }
            .error-card { 
                width: 100%; 
                max-width: 500px; 
                background: var(--ui-glass-bg); 
                backdrop-filter: blur(20px); 
                border: 1px solid var(--ui-glass-border); 
                border-radius: 24px; 
                padding: 50px 40px; 
                text-align: center;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); 
            }
            h1 { font-size: 2.5em; margin: 0 0 20px 0; color: var(--ui-accent); }
            p { font-size: 1.1em; line-height: 1.6; color: var(--ui-text-muted); margin: 0; }
            .brand { margin-top: 30px; font-size: 0.8em; opacity: 0.5; letter-spacing: 0.05em; text-transform: uppercase; }
        </style>
    </head>
    <body>
        <div class="error-card">
            <h1>${t.accessDeniedTitle}</h1>
            <p>${t.accessDeniedBody}</p>
            <div class="brand">Jeff Parrish PC Services</div>
        </div>
    </body>
    </html>`, { 
        status: 403, 
        headers: { "Content-Type": "text/html; charset=utf-8" } 
    });
}

// Formatting helpers
function getScopeDisplayName(p) { return p ? p.replace(/\/$/, "").split('/').pop() : ""; }
function formatSize(b) { if (!b) return '0 B'; const k=1024, s=['B','KB','MB','GB','TB'], i=Math.floor(Math.log(b)/Math.log(k)); return parseFloat((b/Math.pow(k,i)).toFixed(2))+' '+s[i]; }
function escapeHtml(s) { return String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }
function parentPrefix(p) { const pts=p.replace(/\/$/,"").split("/"); pts.pop(); return pts.length?pts.join("/")+"/":""; }
