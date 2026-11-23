// Entrypoint: copies entry.txt (next to this script) byte-for-byte to
// $MAKEFUN_OUTPUT_DIR/entry.txt. Node standard library only.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const entryPath = join(dirname(fileURLToPath(import.meta.url)), "entry.txt");
const text = readFileSync(entryPath, "utf8");
if (text.trim().length === 0) throw new Error("entry.txt is empty");
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), text, "utf8");
