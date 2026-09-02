import { getLevelMeta } from '@content/registry';
import { SCHEMA_VERSION } from '@/entities/user/model/types';
import { migrate } from '@/entities/user/model/migrations';
export function buildExport(data) {
    const contentVersions = {};
    for (const levelId of Object.keys(data.progress)) {
        contentVersions[levelId] = getLevelMeta(levelId)?.contentVersion ?? 'unknown';
    }
    return {
        format: 'english-file-trainer-export',
        formatVersion: 1,
        exportedAt: new Date().toISOString(),
        schemaVersion: SCHEMA_VERSION,
        contentVersions,
        data,
    };
}
export function parseImport(text) {
    const warnings = [];
    let parsed;
    try {
        parsed = JSON.parse(text);
    }
    catch {
        return { ok: false, error: 'That file is not valid JSON.', warnings };
    }
    if (typeof parsed !== 'object' || parsed === null) {
        return { ok: false, error: 'That file does not contain a backup.', warnings };
    }
    const bundle = parsed;
    if (bundle.format !== 'english-file-trainer-export' || !bundle.data) {
        return { ok: false, error: 'That file is not an English File Trainer backup.', warnings };
    }
    const data = migrate(bundle.data);
    if (!data.profile || typeof data.profile.name !== 'string') {
        return { ok: false, error: 'The backup has no profile.', warnings };
    }
    for (const [levelId, version] of Object.entries(bundle.contentVersions ?? {})) {
        const current = getLevelMeta(levelId)?.contentVersion;
        if (current && current !== version) {
            warnings.push(`The backup was made with ${levelId} content ${version}; this app has ${current}. ` +
                'Results are kept, but some question ids may no longer exist.');
        }
    }
    return { ok: true, data, warnings };
}
export function downloadJson(bundle, filename) {
    const blob = new Blob([JSON.stringify(bundle, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    // Release the object URL on the next tick so the download can start.
    setTimeout(() => URL.revokeObjectURL(url), 0);
}
