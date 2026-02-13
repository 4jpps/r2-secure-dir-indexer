//---------------------------------------//
// r2-secure-dir-indexer - Prefix-Agnostic Directory Index //
// Original Author: xolyn (https://github.com/xolyn/listr2)
// Modified by: Jeff Parrish PC Services (jpps.us), Google Gemini, Microsoft Copilot, & Claude (Anthropic)
//---------------------------------------//

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
        image: "Image File",
        video: "Video File",
        audio: "Audio Recording",
        timeJustNow: "just now",
        timeMinuteAgo: "1 minute ago",
        timeMinutesAgo: "{n} minutes ago",
        timeHourAgo: "1 hour ago",
        timeHoursAgo: "{n} hours ago",
        timeDayAgo: "1 day ago",
        timeDaysAgo: "{n} days ago",
        timeWeekAgo: "1 week ago",
        timeWeeksAgo: "{n} weeks ago",
        timeMonthAgo: "1 month ago",
        timeMonthsAgo: "{n} months ago",
        timeYearAgo: "1 year ago",
        timeYearsAgo: "{n} years ago"
    },
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
        image: "Imagen",
        video: "Archivo de Video",
        audio: "Audio",
        timeJustNow: "justo ahora",
        timeMinuteAgo: "hace 1 minuto",
        timeMinutesAgo: "hace {n} minutos",
        timeHourAgo: "hace 1 hora",
        timeHoursAgo: "hace {n} horas",
        timeDayAgo: "hace 1 día",
        timeDaysAgo: "hace {n} días",
        timeWeekAgo: "hace 1 semana",
        timeWeeksAgo: "hace {n} semanas",
        timeMonthAgo: "hace 1 mes",
        timeMonthsAgo: "hace {n} meses",
        timeYearAgo: "hace 1 año",
        timeYearsAgo: "hace {n} años"
    },
    zh: {
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
        image: "图像文件",
        video: "视频文件",
        audio: "音频文件",
        timeJustNow: "刚刚",
        timeMinuteAgo: "1分钟前",
        timeMinutesAgo: "{n}分钟前",
        timeHourAgo: "1小时前",
        timeHoursAgo: "{n}小时前",
        timeDayAgo: "1天前",
        timeDaysAgo: "{n}天前",
        timeWeekAgo: "1周前",
        timeWeeksAgo: "{n}周前",
        timeMonthAgo: "1个月前",
        timeMonthsAgo: "{n}个月前",
        timeYearAgo: "1年前",
        timeYearsAgo: "{n}年前"
    },
    fr: {
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
        image: "Fichier Image",
        video: "Fichier Vidéo",
        audio: "Fichier Audio",
        timeJustNow: "à l'instant",
        timeMinuteAgo: "il y a 1 minute",
        timeMinutesAgo: "il y a {n} minutes",
        timeHourAgo: "il y a 1 heure",
        timeHoursAgo: "il y a {n} heures",
        timeDayAgo: "il y a 1 jour",
        timeDaysAgo: "il y a {n} jours",
        timeWeekAgo: "il y a 1 semaine",
        timeWeeksAgo: "il y a {n} semaines",
        timeMonthAgo: "il y a 1 mois",
        timeMonthsAgo: "il y a {n} mois",
        timeYearAgo: "il y a 1 an",
        timeYearsAgo: "il y a {n} ans"
    },
    de: {
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
        image: "Bilddatei",
        video: "Videodatei",
        audio: "Audiodatei",
        timeJustNow: "gerade eben",
        timeMinuteAgo: "vor 1 Minute",
        timeMinutesAgo: "vor {n} Minuten",
        timeHourAgo: "vor 1 Stunde",
        timeHoursAgo: "vor {n} Stunden",
        timeDayAgo: "vor 1 Tag",
        timeDaysAgo: "vor {n} Tagen",
        timeWeekAgo: "vor 1 Woche",
        timeWeeksAgo: "vor {n} Wochen",
        timeMonthAgo: "vor 1 Monat",
        timeMonthsAgo: "vor {n} Monaten",
        timeYearAgo: "vor 1 Jahr",
        timeYearsAgo: "vor {n} Jahren"
    },
    ru: {
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
        image: "Изображение",
        video: "Видео",
        audio: "Аудио",
        timeJustNow: "только что",
        timeMinuteAgo: "1 минуту назад",
        timeMinutesAgo: "{n} минут назад",
        timeHourAgo: "1 час назад",
        timeHoursAgo: "{n} часов назад",
        timeDayAgo: "1 день назад",
        timeDaysAgo: "{n} дней назад",
        timeWeekAgo: "1 неделю назад",
        timeWeeksAgo: "{n} недель назад",
        timeMonthAgo: "1 месяц назад",
        timeMonthsAgo: "{n} месяцев назад",
        timeYearAgo: "1 год назад",
        timeYearsAgo: "{n} лет назад"
    }
};

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        let prefix = url.searchParams.get("prefix") ?? "";
        const queryToken = url.searchParams.get("token");
        
        const langHeader = request.headers.get("Accept-Language") || "en";
        const langCode = langHeader.split(',')[0].split('-')[0].toLowerCase();
        const t = TRANSLATIONS[langCode] || TRANSLATIONS.en;

        const highestScope = await getHighestAuthorizedScope(env, queryToken); 

        if (highestScope === null) return handleUnauthorizedAccess(t, langCode);
        
        if (prefix !== "" && !prefix.toLowerCase().startsWith(highestScope.toLowerCase())) {
            return handleUnauthorizedAccess(t, langCode);
        }
        if (prefix === "") prefix = highestScope;

        if (url.pathname.startsWith("/raw/")) {
            const key = decodeURIComponent(url.pathname.slice(5));
            if (!key.toLowerCase().startsWith(highestScope.toLowerCase())) return handleUnauthorizedAccess(t, langCode);
            const obj = await env.R2.get(key, { onlyIf: {} });
            if (!obj) return new Response("Not Found", { status: 404 });
            const headers = new Headers();
            if (obj.httpMetadata?.contentType) headers.set("Content-Type", obj.httpMetadata.contentType);
            headers.set("Content-Length", obj.size?.toString() || "");
            return new Response(obj.body, { headers });
        }
    
        const folderName = getScopeDisplayName(highestScope);
        const displayTitle = highestScope === "" ? t.baseTitle : `${t.baseTitle} (${folderName})`;
        const tokenParam = queryToken ? `token=${encodeURIComponent(queryToken)}` : '';
        
        // Fetch data and track active icons for the legend
        const { html, totalFiles, totalDirs, activeIcons } = await renderTree(env.R2, prefix, env.ROOT, tokenParam, highestScope, t);
    
        let parentHtml = "";
        const parentPfx = parentPrefix(prefix);
        if (prefix.toLowerCase() !== highestScope.toLowerCase() && prefix !== "") {
            const parentLinkUrl = parentPfx.toLowerCase() === highestScope.toLowerCase() 
                ? `/?${tokenParam}` 
                : `/?prefix=${encodeURIComponent(parentPfx)}${tokenParam ? '&' + tokenParam : ''}`;
            parentHtml = `<tr class="dir-row"><td colspan="3"><span class="icon-wrap">${getIcon('up')}</span> <a href="${parentLinkUrl}" class="file-link">${t.parentDir}</a></td></tr>`;
        }

        const currentPathDisplay = prefix.replace(new RegExp(`^${escapeRegex(highestScope)}`, 'i'), "");
        const pathHeadingHtml = currentPathDisplay ? `<h2>${t.currentPath} /${escapeHtml(currentPathDisplay)}</h2>` : '';
        
        // Build the dynamic legend
        const legendItems = [
            { id: 'folder', label: t.folder },
            { id: 'windows', label: t.win },
            { id: 'arm', label: t.macArm },
            { id: 'intel', label: t.macIntel },
            { id: 'linux', label: t.linux },
            { id: 'android', label: t.android },
            { id: 'pdf', label: t.pdf },
            { id: 'archive', label: t.archive },
            { id: 'docs', label: t.docs },
            { id: 'image', label: t.image },
            { id: 'video', label: t.video },
            { id: 'audio', label: t.audio }
        ].filter(item => activeIcons.has(item.id))
         .map(item => `<li><span class="icon-wrap">${getIcon(item.id)}</span> ${item.label}</li>`)
         .join('');

        const legendHtml = legendItems 
            ? `<div class="glass-panel"><h3>${t.iconKey}</h3><ul>${legendItems}</ul></div>` 
            : '';

        const page = `<!doctype html>
        <html lang="${langCode}" data-lang="${langCode}">
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
          ${legendHtml}
          <footer>
            &copy; ${new Date().getFullYear()} <a href="https://www.jpps.us" target="_blank">Jeff Parrish PC Services</a><br>
            Built with <a href="https://github.com/xolyn/listr2" target="_blank">Listr2</a>, 
            <a href="https://gemini.google.com" target="_blank">Gemini</a>, 
            <a href="https://copilot.microsoft.com" target="_blank">Copilot</a> &amp; 
            <a href="https://www.anthropic.com/claude" target="_blank">Claude</a>
          </footer>
        </div>
        <script>
            // Translations embedded in page
            const TRANSLATIONS = ${JSON.stringify(TRANSLATIONS)};
            
            function applyTheme(t){
                const h=document.documentElement;
                if(t==='system') h.setAttribute('data-theme', window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
                else h.setAttribute('data-theme', t);
                localStorage.setItem('theme', t);
                document.getElementById('themeSelect').value = t;
            }
            const saved = localStorage.getItem('theme') || 'system';
            applyTheme(saved);

            // Get current language
            const currentLang = document.documentElement.dataset.lang || 'en';
            const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

            // Relative time formatter with translations
            function formatRelativeTime(timestamp) {
                const now = new Date();
                const date = new Date(timestamp);
                const seconds = Math.floor((now - date) / 1000);
                
                if (seconds < 60) return t.timeJustNow;
                
                const minutes = Math.floor(seconds / 60);
                if (minutes < 60) {
                    return minutes === 1 ? t.timeMinuteAgo : t.timeMinutesAgo.replace('{n}', minutes);
                }
                
                const hours = Math.floor(minutes / 60);
                if (hours < 24) {
                    return hours === 1 ? t.timeHourAgo : t.timeHoursAgo.replace('{n}', hours);
                }
                
                const days = Math.floor(hours / 24);
                if (days < 7) {
                    return days === 1 ? t.timeDayAgo : t.timeDaysAgo.replace('{n}', days);
                }
                
                const weeks = Math.floor(days / 7);
                if (weeks < 4) {
                    return weeks === 1 ? t.timeWeekAgo : t.timeWeeksAgo.replace('{n}', weeks);
                }
                
                const months = Math.floor(days / 30);
                if (months < 12) {
                    return months === 1 ? t.timeMonthAgo : t.timeMonthsAgo.replace('{n}', months);
                }
                
                const years = Math.floor(days / 365);
                return years === 1 ? t.timeYearAgo : t.timeYearsAgo.replace('{n}', years);
            }

            // Update all timestamps on page load
            document.addEventListener("DOMContentLoaded", function () {
                document.querySelectorAll(".lm").forEach(function (cell) {
                    const ts = cell.dataset.ts;
                    if (ts) {
                        const d = new Date(ts);
                        if (!isNaN(d.getTime())) {
                            cell.textContent = formatRelativeTime(d);
                            // Store full date as title for hover tooltip
                            cell.title = d.toLocaleString(undefined, { 
                                year: "numeric", 
                                month: "long", 
                                day: "numeric", 
                                hour: "2-digit", 
                                minute: "2-digit" 
                            });
                        }
                    }
                });
                
                // Update times every minute
                setInterval(function() {
                    document.querySelectorAll(".lm").forEach(function (cell) {
                        const ts = cell.dataset.ts;
                        if (ts) {
                            const d = new Date(ts);
                            if (!isNaN(d.getTime())) {
                                cell.textContent = formatRelativeTime(d);
                            }
                        }
                    });
                }, 60000); // Update every 60 seconds
            });
        </script>
        </body></html>`;

        return new Response(page, { headers: { "Content-Type": "text/html; charset=utf-8" } });
    }
};

// --- ICONS & HELPERS ---

function getIcon(type) {
    const svgs = {
        // Folder - Classic folder with tab
        folder: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',
        
        // Windows - Windows logo style (4 panes)
        windows: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M0,0 L10,0 L10,10 L0,10 Z M0,12 L10,12 L10,22 L0,22 Z M12,0 L22,0 L22,10 L12,10 Z M12,12 L22,12 L22,22 L12,22 Z" transform="translate(1, 1)"/></svg>',
        
        // Linux - Terminal/command prompt style
        linux: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 8l3 3-3 3M12 14h4"/></svg>',
        
        // Android - Android robot
        android: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9v8h12V9H6z"/><path d="M6 9h12a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2z"/><circle cx="9" cy="13" r="1"/><circle cx="15" cy="13" r="1"/><path d="M7 6l2-3M17 6l-2-3"/></svg>',
        
        // ARM - Chip/CPU with ARM indicator
        arm: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="5" width="14" height="14" rx="2"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/><text x="12" y="14" font-size="6" text-anchor="middle" fill="currentColor" stroke="none" font-family="monospace">A</text></svg>',
        
        // Intel - Chip/CPU with different style
        intel: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="5" width="14" height="14" rx="2"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/><circle cx="12" cy="12" r="3"/></svg>',
        
        // PDF - Document with "PDF" text indicator
        pdf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><text x="12" y="16" font-size="5" text-anchor="middle" fill="currentColor" stroke="none" font-weight="bold">PDF</text></svg>',
        
        // Archive - Zipper/compressed file
        archive: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="11" x2="12" y2="12"/><line x1="12" y1="13" x2="12" y2="14"/><line x1="12" y1="15" x2="12" y2="16"/><circle cx="12" cy="18" r="1"/></svg>',
        
        // Image - Picture frame with mountain
        image: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',
        
        // Video - Play button in frame
        video: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="18" rx="2"/><polygon points="10 8 16 12 10 16 10 8" fill="currentColor"/></svg>',
        
        // Audio - Music note
        audio: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
        
        // Docs - Document with lines
        docs: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>',
        
        // Generic file
        file: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>',
        
        // Up/Parent directory - Arrow up
        up: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>'
    };
    return svgs[type] || svgs.file;
}

function getFileOSIcon(fileName) {
    const n = fileName.toLowerCase();
    const ext = n.split('.').pop();
    let types = [];

    if (ext === 'dmg' || ext === 'pkg') {
        if (n.includes('arm64') || n.includes('apple') || n.includes('m1') || n.includes('m2')) types.push('arm');
        else if (n.includes('x64') || n.includes('intel')) types.push('intel');
        else types.push('file');
    } 
    else if (['exe', 'msi'].includes(ext)) types.push('windows');
    else if (['deb', 'rpm', 'sh'].includes(ext)) types.push('linux');
    else if (ext === 'apk') types.push('android');
    else if (ext === 'pdf') types.push('pdf');
    else if (['zip', '7z', 'rar'].includes(ext)) types.push('archive');
    else if (['jpg', 'png', 'svg', 'webp', 'jpeg'].includes(ext)) types.push('image');
    else if (['mp4', 'mkv', 'mov', 'avi'].includes(ext)) types.push('video');
    else if (['mp3', 'wav', 'flac', 'm4a'].includes(ext)) types.push('audio');
    else if (['doc', 'docx', 'txt', 'rtf'].includes(ext)) types.push('docs');
    else types.push('file');

    return {
        iconsHtml: types.map(t => `<span class="icon-wrap">${getIcon(t)}</span>`).join(''),
        types: types
    };
}

async function renderTree(bucket, prefix, rootUrl, tokenParam, highestScope, t) {
    let files = [], dirs = [], cursor;
    const activeIcons = new Set();

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

    if (dirs.length > 0) activeIcons.add('folder');

    let levelHtml = dirs.sort((a,b)=>a.name.localeCompare(b.name)).map(d => {
        const lp = d.prefix.toLowerCase() === highestScope.toLowerCase() ? "" : `prefix=${encodeURIComponent(d.prefix)}`;
        const linkUrl = lp ? `/?${lp}${tokenParam ? '&' + tokenParam : ''}` : `/?${tokenParam}`;
        return `<tr class="dir-row"><td><span class="icon-wrap">${getIcon('folder')}</span> <a href="${linkUrl}" class="file-link">${escapeHtml(d.name)}/</a></td><td>--</td><td>--</td></tr>`;
    }).join("");

    levelHtml += files.sort((a,b)=>a.name.localeCompare(b.name)).map(f => {
        const result = getFileOSIcon(f.name);
        result.types.forEach(type => activeIcons.add(type));
        
        const href = rootUrl ? `${rootUrl.replace(/\/$/, '')}/${f.key}` : `/raw/${encodeURIComponent(f.key)}`;
        return `<tr><td><div class="file-link"><span>${result.iconsHtml}</span><a href="${href}" target="_blank" rel="noopener" style="color:inherit;text-decoration:none">${escapeHtml(f.name)}</a></div></td><td>${formatSize(f.size)}</td><td class="lm" data-ts="${f.time.toISOString()}">Loading...</td></tr>`;
    }).join("");

    return { html: levelHtml, totalFiles: files.length, totalDirs: dirs.length, activeIcons };
}

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
    let corrected = "";
    const parts = rawScope.split('/').filter(p => p !== "");
    for (const p of parts) {
        const list = await env.R2.list({ prefix: corrected, delimiter: "/" });
        const match = (list.delimitedPrefixes || []).find(x => x.slice(corrected.length).replace(/\/$/, "").toUpperCase() === p.toUpperCase());
        corrected = match || (corrected + p + "/");
    }
    return corrected;
}

function handleUnauthorizedAccess(t, langCode) {
    return new Response(`<!doctype html>
    <html lang="${langCode}">
    <head>
        <meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>${t.accessDeniedTitle}</title>
        <style>
            :root {
                --ui-gradient: radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(339,49%,30%,1) 0, transparent 50%);
                --ui-glass-bg: rgba(20, 20, 25, 0.6); --ui-glass-border: rgba(255, 255, 255, 0.1);
                --ui-text-main: #f0f0f0; --ui-text-muted: #a0a0a0; --ui-accent: #ff4757; --ui-body-bg: #0f172a;
            }
            body { font-family: 'Inter', system-ui, sans-serif; margin: 0; height: 100vh; background: var(--ui-body-bg); background-image: var(--ui-gradient); color: var(--ui-text-main); display: flex; justify-content: center; align-items: center; padding: 20px; box-sizing: border-box; }
            .error-card { width: 100%; max-width: 500px; background: var(--ui-glass-bg); backdrop-filter: blur(20px); border: 1px solid var(--ui-glass-border); border-radius: 24px; padding: 50px 40px; text-align: center; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); }
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
    </html>`, { status: 403, headers: { "Content-Type": "text/html; charset=utf-8" } });
}

function getScopeDisplayName(p) { return p ? p.replace(/\/$/, "").split('/').pop() : ""; }
function formatSize(b) { if (!b) return '0 B'; const k=1024, s=['B','KB','MB','GB','TB'], i=Math.floor(Math.log(b)/Math.log(k)); return parseFloat((b/Math.pow(k,i)).toFixed(2))+' '+s[i]; }
function escapeHtml(s) { return String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }
function escapeRegex(s) { return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
function parentPrefix(p) { const pts=p.replace(/\/$/,"").split("/"); pts.pop(); return pts.length?pts.join("/")+"/":""; }
