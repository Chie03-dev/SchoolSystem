import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
  // The incremental cache defaults to the in-worker cache. To persist ISR /
  // `use cache` entries across deploys and isolates, add the R2 override:
  //
  // import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
  // export default defineCloudflareConfig({ incrementalCache: r2IncrementalCache });
});
