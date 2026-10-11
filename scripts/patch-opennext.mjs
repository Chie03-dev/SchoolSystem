/**
 * Replicates opennextjs/opennextjs-cloudflare#1356 for @opennextjs/cloudflare
 * versions that predate the fix: Next.js 16.4 moved preview props into a
 * standalone `.next/server/preview-props.json` that the adapter's loadManifest
 * glob (`*-manifest.json` & friends) does not match, so the patched
 * loadManifest() throws at runtime and every route 500s.
 *
 * Run before any `opennextjs-cloudflare build` (local and CI). Idempotent.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const target = join(
  root,
  "node_modules/@opennextjs/cloudflare/dist/cli/build/patches/plugins/load-manifest.js"
);

const FROM = "**/{*-manifest,required-server-files,prefetch-hints}.json";
const TO = "**/{*-manifest,required-server-files,prefetch-hints,preview-props}.json";

if (!existsSync(target)) {
  console.log("patch-opennext: adapter file not found - nothing to do.");
  process.exit(0);
}

const source = readFileSync(target, "utf8");

if (source.includes(TO)) {
  console.log("patch-opennext: already patched.");
} else if (source.includes(FROM)) {
  writeFileSync(target, source.replace(FROM, TO), "utf8");
  console.log("patch-opennext: preview-props.json added to the loadManifest glob.");
} else {
  console.error(
    "patch-opennext: expected glob pattern not found - the adapter may have changed. Update this script."
  );
  process.exit(1);
}
