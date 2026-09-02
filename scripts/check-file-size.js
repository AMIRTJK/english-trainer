/**
 * Enforce the 250-line limit from AGENTS.md §2.
 * Run: npm run lint:size
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
const LIMIT = 250;
const ROOTS = ['src', 'content', 'scripts', 'tests'];
const EXTENSIONS = ['.ts', '.tsx', '.css'];
function walk(dir, out = []) {
    for (const entry of readdirSync(dir)) {
        const full = join(dir, entry);
        if (statSync(full).isDirectory())
            walk(full, out);
        else if (EXTENSIONS.some((ext) => full.endsWith(ext)))
            out.push(full);
    }
    return out;
}
const offenders = [];
let checked = 0;
for (const root of ROOTS) {
    for (const file of walk(root)) {
        checked += 1;
        const lines = readFileSync(file, 'utf8').split('\n').length;
        if (lines > LIMIT)
            offenders.push([relative(process.cwd(), file), lines]);
    }
}
console.log(`\nFile size check\n===============\n  ${checked} files, limit ${LIMIT} lines`);
if (offenders.length > 0) {
    console.error(`\n  ${offenders.length} file(s) over the limit:`);
    for (const [file, lines] of offenders.sort((a, b) => b[1] - a[1])) {
        console.error(`   x ${lines} lines — ${file}`);
    }
    process.exit(1);
}
console.log('  OK — every file is within the limit.\n');
