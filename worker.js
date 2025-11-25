//---------------------------------------//
// r2-secure-dir-indexer - Prefix-Agnostic Directory Index //
// Original Author: xolyn (https://github.com/xolyn/listr2)
// Modified by: Jeff Parrish PC Services (jpps.us) & Google Gemini
//---------------------------------------//

// --- 1. TRANSLATION DATA ---
const TRANSLATIONS = {
    // English (Default)
    en: {
        baseTitle: "JPPS Support Files",
        currentPath: "Current Path:",
        refreshButton: "Refresh",
        folders: "folders",
        files: "files",
        nameCol: "Name",
        sizeCol: "Size",
        timeCol: "Last Modified",
        parentDir: ".. (Parent Directory)",
        accessDeniedTitle: "🛑 Access Denied (403)",
        accessDeniedBody1: "The access token provided is missing or invalid.",
        accessDeniedBody2: "Please ensure you are using the correct URL with a valid token.",
        methodNotAllowed: "Method Not Allowed: Management operations (Upload, Delete, Move) are disabled.",
        iconKey: "Icon Key:",
        genericFile: "Generic File",
        folder: "Folder/Directory",
        win: "Windows (.exe, .msi, etc.)",
        macBase: "macOS Base File (.dmg, .pkg)",
        macArm: "Apple Silicon (ARM64)",
        macIntel: "Intel Architecture (x64)",
        macUni: "Universal/Unspecified Mac",
        linux: "Linux (.deb, .rpm, etc.)",
        android: "Android (.apk)",
        pdf: "PDF Document",
        archive: "Archive (.zip, .rar, etc.)",
        image: "Image Files",
        docs: "Document Files",
        na: "N/A"
    },
    // Spanish
    es: {
        baseTitle: "Archivos de Soporte JPPS",
        currentPath: "Ruta Actual:",
        refreshButton: "Actualizar",
        folders: "carpetas",
        files: "archivos",
        nameCol: "Nombre",
        sizeCol: "Tamaño",
        timeCol: "Última Modificación",
        parentDir: ".. (Directorio Superior)",
        accessDeniedTitle: "🛑 Acceso Denegado (403)",
        accessDeniedBody1: "El token de acceso proporcionado es incorrecto o no existe.",
        accessDeniedBody2: "Asegúrese de estar utilizando la URL correcta con un token válido.",
        methodNotAllowed: "Método No Permitido: Las operaciones de gestión (Cargar, Eliminar, Mover) están desactivadas.",
        iconKey: "Clave de Iconos:",
        genericFile: "Archivo Genérico",
        folder: "Carpeta/Directorio",
        win: "Windows (.exe, .msi, etc.)",
        macBase: "Archivo Base de macOS (.dmg, .pkg)",
        macArm: "Apple Silicon (ARM64)",
        macIntel: "Arquitectura Intel (x64)",
        macUni: "Mac Universal/No especificado",
        linux: "Linux (.deb, .rpm, etc.)",
        android: "Android (.apk)",
        pdf: "Documento PDF",
        archive: "Archivo Comprimido (.zip, .rar, etc.)",
        image: "Archivos de Imagen",
        docs: "Archivos de Documento",
        na: "N/D"
    },
    // Simplified Chinese
    zh: {
        baseTitle: "JPPS 支持文件",
        currentPath: "当前路径:",
        refreshButton: "刷新",
        folders: "文件夹",
        files: "文件",
        nameCol: "名称",
        sizeCol: "大小",
        timeCol: "上次修改时间",
        parentDir: ".. (上级目录)",
        accessDeniedTitle: "🛑 访问被拒绝 (403)",
        accessDeniedBody1: "提供的访问令牌缺失或无效。",
        accessDeniedBody2: "请确保您使用的 URL 包含有效的令牌。",
        methodNotAllowed: "方法不被允许: 管理操作（上传、删除、移动）已被禁用。",
        iconKey: "图标说明:",
        genericFile: "通用文件",
        folder: "文件夹/目录",
        win: "Windows (.exe, .msi 等)",
        macBase: "macOS 基本文件 (.dmg, .pkg)",
        macArm: "Apple 芯片 (ARM64)",
        macIntel: "Intel 架构 (x64)",
        macUni: "Mac 通用/未指定",
        linux: "Linux (.deb, .rpm 等)",
        android: "Android (.apk)",
        pdf: "PDF 文档",
        archive: "压缩文件 (.zip, .rar 等)",
        image: "图片文件",
        docs: "文档文件",
        na: "不可用"
    },
    // French (New)
    fr: {
        baseTitle: "Fichiers de Support JPPS",
        currentPath: "Chemin Actuel:",
        refreshButton: "Actualiser",
        folders: "dossiers",
        files: "fichiers",
        nameCol: "Nom",
        sizeCol: "Taille",
        timeCol: "Dernière Modification",
        parentDir: ".. (Dossier Parent)",
        accessDeniedTitle: "🛑 Accès Refusé (403)",
        accessDeniedBody1: "Le jeton d'accès fourni est manquant ou invalide.",
        accessDeniedBody2: "Veuillez vous assurer d'utiliser l'URL correcte avec un jeton valide.",
        methodNotAllowed: "Méthode Non Autorisée: Les opérations de gestion (Téléchargement, Suppression, Déplacement) sont désactivées.",
        iconKey: "Clé d'Icônes:",
        genericFile: "Fichier Générique",
        folder: "Dossier/Répertoire",
        win: "Windows (.exe, .msi, etc.)",
        macBase: "Fichier de Base macOS (.dmg, .pkg)",
        macArm: "Apple Silicon (ARM64)",
        macIntel: "Architecture Intel (x64)",
        macUni: "Mac Universel/Non Spécifié",
        linux: "Linux (.deb, .rpm, etc.)",
        android: "Android (.apk)",
        pdf: "Document PDF",
        archive: "Archive (.zip, .rar, etc.)",
        image: "Fichiers Image",
        docs: "Fichiers Document",
        na: "N/A"
    },
    // German (New)
    de: {
        baseTitle: "JPPS Support-Dateien",
        currentPath: "Aktueller Pfad:",
        refreshButton: "Aktualisieren",
        folders: "Ordner",
        files: "Dateien",
        nameCol: "Name",
        sizeCol: "Größe",
        timeCol: "Zuletzt geändert",
        parentDir: ".. (Übergeordnetes Verzeichnis)",
        accessDeniedTitle: "🛑 Zugriff verweigert (403)",
        accessDeniedBody1: "Das bereitgestellte Zugriffstoken fehlt oder ist ungültig.",
        accessDeniedBody2: "Bitte stellen Sie sicher, dass Sie die korrekte URL mit einem gültigen Token verwenden.",
        methodNotAllowed: "Methode nicht erlaubt: Verwaltungsoperationen (Hochladen, Löschen, Verschieben) sind deaktiviert.",
        iconKey: "Symbolschlüssel:",
        genericFile: "Allgemeine Datei",
        folder: "Ordner/Verzeichnis",
        win: "Windows (.exe, .msi, etc.)",
        macBase: "macOS Basisdatei (.dmg, .pkg)",
        macArm: "Apple Silicon (ARM64)",
        macIntel: "Intel-Architektur (x64)",
        macUni: "Universal/Nicht spezifizierter Mac",
        linux: "Linux (.deb, .rpm, etc.)",
        android: "Android (.apk)",
        pdf: "PDF-Dokument",
        archive: "Archiv (.zip, .rar, etc.)",
        image: "Bilddateien",
        docs: "Dokumentdateien",
        na: "N/A"
    },
    // Russian (New)
    ru: {
        baseTitle: "Файлы поддержки JPPS",
        currentPath: "Текущий путь:",
        refreshButton: "Обновить",
        folders: "папки",
        files: "файлы",
        nameCol: "Имя",
        sizeCol: "Размер",
        timeCol: "Последнее изменение",
        parentDir: ".. (Родительский каталог)",
        accessDeniedTitle: "🛑 Доступ запрещен (403)",
        accessDeniedBody1: "Предоставленный токен доступа отсутствует или недействителен.",
        accessDeniedBody2: "Убедитесь, что вы используете правильный URL с действительным токеном.",
        methodNotAllowed: "Метод не разрешен: Операции управления (загрузка, удаление, перемещение) отключены.",
        iconKey: "Ключ значков:",
        genericFile: "Общий файл",
        folder: "Папка/Каталог",
        win: "Windows (.exe, .msi и т. д.)",
        macBase: "Базовый файл macOS (.dmg, .pkg)",
        macArm: "Apple Silicon (ARM64)",
        macIntel: "Архитектура Intel (x64)",
        macUni: "Универсальный/Неуказанный Mac",
        linux: "Linux (.deb, .rpm и т. д.)",
        android: "Android (.apk)",
        pdf: "Документ PDF",
        archive: "Архив (.zip, .rar и т. д.)",
        image: "Файлы изображений",
        docs: "Файлы документов",
        na: "Н/Д"
    }
};

/**
 * Parses the Accept-Language header to determine the preferred language.
 * @param {string} header - The value of the Accept-Language header.
 * @returns {string} The two-letter language code (e.g., 'en', 'es', 'zh').
 */
function getLanguageCode(request) {
    const acceptLanguageHeader = request.headers.get("Accept-Language");
    if (!acceptLanguageHeader) return 'en';

    // Simplified parsing: takes the first language code before any separator (e.g., "en-US,en;q=0.9" -> "en")
    const preferredLangCode = acceptLanguageHeader.split(',')[0].split('-')[0].toLowerCase();
    
    // Check if the preferred language is in our translation map.
    if (TRANSLATIONS[preferredLangCode]) {
        return preferredLangCode;
    } 
    // Handle broad Chinese codes (zh-CN, zh-TW, etc.)
    if (preferredLangCode.startsWith('zh')) {
        return 'zh'; // Defaulting all Chinese requests to Simplified Chinese
    }

    return 'en'; // Default to English if no match is found
}


export default {
    async fetch(request, env, ctx) {
      
        const url = new URL(request.url);
        let prefix = url.searchParams.get("prefix") ?? "";
        const queryToken = url.searchParams.get("token");
        
        // --- LANGUAGE SELECTION ---
        const langCode = getLanguageCode(request);
        const T = TRANSLATIONS[langCode] || TRANSLATIONS.en;

        // --- 1. Find the Highest Authorized Scope (Includes Dynamic Map Generation) ---
        // Note: getHighestAuthorizedScope and generateCaseMap do not require translation object
        const highestScope = await getHighestAuthorizedScope(env, queryToken); 

        // --- 2. Security Check & Prefix Adjustment ---
        if (highestScope === null) {
            // Pass the translation object T to the unauthorized handler
            return handleUnauthorizedAccess(T);
        }
        
        // A. Handle invalid access attempts (requested prefix is NOT in scope)
        if (prefix !== "" && !prefix.startsWith(highestScope)) {
            return handleUnauthorizedAccess(T);
        }
        
        // B. Handle Initial Load / Clean URL internal processing
        if (prefix === "") {
            prefix = highestScope;
        }

        // C. Clean URL Redirect: If the user explicitly navigated to the highest scope, clean the URL.
        const requestedPrefixParam = url.searchParams.get("prefix");
        if (requestedPrefixParam !== null && requestedPrefixParam === highestScope) {
            const cleanURL = url.origin + `/?token=${encodeURIComponent(queryToken)}`;
            return Response.redirect(cleanURL, 302);
        }
        
        // --- 3. If access is granted, proceed with execution ---
        
        // Block all POST requests
        if (request.method === "POST") {
           return new Response(T.methodNotAllowed, { status: 405 });
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
        const baseTitle = T.baseTitle; 
        const rootUrl = env.ROOT;
        
        const folderName = getScopeDisplayName(highestScope);
        
        // H1 Title display
        const displayTitle = highestScope === "" 
            ? baseTitle 
            : `${baseTitle} (${folderName})`;
        
        // H2 Path display
        let currentPathDisplay = "";
        if (prefix !== highestScope) {
            currentPathDisplay = prefix.startsWith(highestScope) 
                ? prefix.slice(highestScope.length) 
                : prefix;
            
            if (currentPathDisplay.endsWith('/')) {
                currentPathDisplay = currentPathDisplay.slice(0, -1);
            }
        }

        const tokenParam = queryToken ? `&token=${encodeURIComponent(queryToken)}` : '';
        
        // Render the tree using the determined 'prefix'
        const { html, totalFiles, totalDirs } = await renderTree(env.R2, prefix, rootUrl, tokenParam, highestScope, T);
    
        // --- HTML Rendering ---
        
        // Determine the parent link URL:
        let parentLinkUrl = "";
        const parentPfx = parentPrefix(prefix);
        const shouldShowParent = (prefix !== highestScope && prefix !== "");

        if (shouldShowParent) {
            if (parentPfx === highestScope) {
                parentLinkUrl = `/?${tokenParam}`;
            } else {
                parentLinkUrl = `/?prefix=${encodeURIComponent(parentPfx)}${tokenParam}`;
            }
        }
        
        const parentHtml = shouldShowParent ? 
            `<tr class="dir-row"><td colspan="3"><span class="icon icon-folder">⬆️</span> <a href="${parentLinkUrl}" class="file-link">${T.parentDir}</a></td></tr>` 
            : "";
        
        const pathHeadingHtml = currentPathDisplay ? 
            `<h2>${T.currentPath} /${escapeHtml(currentPathDisplay)}</h2>` : 
            '';
        
        const iconLegendHtml = getIconLegendHtml(T); // Pass T here

        const page = `<!doctype html>
        <html lang="${langCode}">
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
            <button onclick="location.href='/?prefix=${encodeURIComponent(prefix)}${tokenParam}'">${T.refreshButton}</button>
          </div>
          
          <p>${totalDirs} ${T.folders} , ${totalFiles} ${T.files}.</p>
          
          <table>
            <thead>
              <tr>
                <th class="name-col">${T.nameCol}</th>
                <th class="size-col">${T.sizeCol}</th>
                <th class="time-col">${T.timeCol}</th>
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
    let prefixQueue = [""]; 
    
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
                const mapKey = p.toUpperCase(); 
                caseMap[mapKey] = p;
                prefixQueue.push(p); 
            }
        } while (cursor);
    }
    
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

    const caseMap = await generateCaseMap(env.R2);
    
    let currentBestPrefix = null;
    
    for (const envKey in env) {
        if (envKey.startsWith("TOKEN_") && envKey.endsWith("_")) { 
            const requiredToken = env[envKey];
            
            if (requiredToken === queryToken) {
                
                let testPrefix;
                if (envKey === "TOKEN_") {
                    testPrefix = ""; 
                } else {
                    let rawPrefix = envKey.slice(6, -1); 
                    testPrefix = rawPrefix.replaceAll('_', '/') + '/';
                }
                
                const mappedPrefix = caseMap[testPrefix] || testPrefix; 
                
                if (currentBestPrefix === null || mappedPrefix.length < currentBestPrefix.length) {
                    currentBestPrefix = mappedPrefix;
                }
            }
        }
    }
    
    return currentBestPrefix;
}


// --- UTILITY FUNCTIONS ---

function formatSize(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * @param {Date | null} date 
 * @param {Object} T - The translation object.
 */
function formatTime(date, T) {
  if (!date) return T.na;
  return date.toISOString().slice(0, 19).replace('T', ' '); 
}


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
        return [{ icon: '📄', class: 'icon-file', key: 'genericFile' }];
    }
    
    const ext = (extMatch[1] || extMatch[2]).toLowerCase();
    let icons = [];

    // --- Specific Mac Logic ---
    if (ext === 'dmg' || ext === 'pkg') {
        icons.push({ icon: '🍎', class: 'icon-apple', key: 'macBase' });
        
        if (nameLower.includes('-arm64')) {
            icons.push({ icon: '⚙️', class: 'icon-apple-arm', key: 'macArm' });
        } else if (nameLower.includes('-x64')) {
            icons.push({ icon: '🖥️', class: 'icon-apple-intel', key: 'macIntel' });
        } else {
             icons.push({ icon: '💻', class: 'icon-apple', key: 'macUni' });
        }
        return icons;
    }
    
    // --- General OS Logic ---
    switch (ext) {
        case 'exe': case 'msi': case 'bat': case 'cmd':
            icons.push({ icon: '🪟', class: 'icon-windows', key: 'win' });
            break;
        case 'deb': case 'rpm': case 'sh': case 'tar':
            icons.push({ icon: '🐧', class: 'icon-linux', key: 'linux' });
            break;
        case 'apk':
            icons.push({ icon: '🤖', class: 'icon-android', key: 'android' });
            break;
        case 'pdf':
            icons.push({ icon: '📃', class: 'icon-file', key: 'pdf' });
            break;
        case 'doc': case 'docx': case 'txt':
            icons.push({ icon: '📝', class: 'icon-file', key: 'docs' });
            break;
        case 'jpg': case 'jpeg': case 'png': case 'gif': 
            icons.push({ icon: '🖼️', class: 'icon-file', key: 'image' });
            break;
        case 'zip': case 'rar': case '7z': 
            icons.push({ icon: '📦', class: 'icon-file', key: 'archive' });
            break;
            
        default:
            icons.push({ icon: '📄', class: 'icon-file', key: 'genericFile' });
            break;
    }

    return icons;
}

/**
 * Generates the HTML for the icon key/legend at the bottom of the page.
 * @param {Object} T - The translation object.
 * @returns {string} HTML for the icon key.
 */
function getIconLegendHtml(T) {
    // Note: The 'key' in getFileOSIcon must match the key used here.
    const legendItems = [
        { icon: '📁', key: 'folder', class: 'icon-folder' },
        { icon: '🪟', key: 'win', class: 'icon-windows' },
        { icon: '🍎', key: 'macBase', class: 'icon-apple' },
        { icon: '⚙️', key: 'macArm', class: 'icon-apple-arm' },
        { icon: '🖥️', key: 'macIntel', class: 'icon-apple-intel' },
        { icon: '🐧', key: 'linux', class: 'icon-linux' },
        { icon: '🤖', key: 'android', class: 'icon-android' },
        { icon: '📃', key: 'pdf', class: 'icon-file' }, 
        { icon: '📦', key: 'archive', class: 'icon-file' },
        { icon: '📄', key: 'genericFile', class: 'icon-file' },
    ];

    const listHtml = legendItems.map(item => 
        `<li><span class="icon ${item.class}">${item.icon}</span> ${escapeHtml(T[item.key] || item.key)}</li>`
    ).join('');

    return `
        <div class="icon-key-container">
            <h3>${T.iconKey}</h3>
            <ul>
                ${listHtml}
            </ul>
        </div>
    `;
}

/**
 * Returns a 403 Forbidden HTML response.
 * @param {Object} T - The translation object.
 */
function handleUnauthorizedAccess(T) {
    
    const htmlContent = `<!doctype html>
    <html lang="${T.langCode}">
    <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>${T.accessDeniedTitle}</title>
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
        margin-bottom: 10px;
    }
    </style>
    </head>
    <body>
        <div class="error-container">
            <h1>${T.accessDeniedTitle}</h1>
            <p>${T.accessDeniedBody1}</p>
            <p>${T.accessDeniedBody2}</p>
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

async function renderTree(bucket, prefix, rootUrl = null, tokenParam = '', highestScope = '', T) {
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
          const getExt = (name) => {
              const match = name.match(/\.([0-9a-z]+)(?=[?#])?$|\.([0-9a-z]+)$/i);
              return match ? (match[1] || match[2]).toLowerCase() : '';
          };
          
          const extA = getExt(a.name);
          const extB = getExt(b.name);
          
          if (extA < extB) return -1;
          if (extA > extB) return 1;
          
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
          const fileTime = formatTime(f.time, T); // Pass T here
          
          const osIcons = getFileOSIcon(f.name); 
          const iconsHtml = osIcons.map(icon => `<span class="icon ${icon.class}" title="${T[icon.key] || icon.key}">${icon.icon}</span>`).join(''); // Add title for better UX

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
  
  // Calculate totalDirs accurately
  return { html: result.html, totalFiles: result.fileCount, totalDirs: totalDirs };
}


function getScopeDisplayName(prefix) {
    if (!prefix || prefix === "") {
        return "";
    }
    
    const trimmed = prefix.endsWith("/") ? prefix.slice(0, -1) : prefix;
    const lastSlashIndex = trimmed.lastIndexOf("/");
    
    if (lastSlashIndex === -1) {
        return trimmed;
    } else {
        return trimmed.slice(lastSlashIndex + 1);
    }
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
