import { chmodSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Copy entry.txt verbatim to the harness output directory.
const dir = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}
const text = readFileSync(join(dir, "entry.txt"), "utf8");
const chars = [...text.trimEnd()].length;
if (chars < 1 || chars > 200) {
  throw new Error(`entry.txt must be 1-200 characters, got ${chars}`);
}
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, text);
// The harness collects outputs as another user, so leave it world-readable.
chmodSync(outPath, 0o644);
