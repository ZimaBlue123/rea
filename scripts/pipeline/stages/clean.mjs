/**
 * @file scripts/pipeline/stages/clean.mjs
 * @description Pipeline stage for workspace sanitation and cache cleanup.
 */

import { PipelineStage } from "../core/stage.mjs";
import { readdir, rm, stat } from "node:fs/promises";
import { join } from "node:path";

export class CleanStage extends PipelineStage {
  constructor(options = {}) {
    super("clean");
    this.root = options.root || process.cwd();
  }

  async preflight(context) {
    context.log("Scanning target directories for cleanup candidates...");
    return true;
  }

  async execute(context) {
    const targets = [
      "__pycache__",
      ".DS_Store",
      "Thumbs.db",
      "*.log",
      ".pipeline_cache",
    ];

    let removedCount = 0;
    const cleanDir = async (dir) => {
      const entries = await readdir(dir, { withFileTypes: true }).catch(() => []);
      for (const entry of entries) {
        const fullPath = join(dir, entry.name);
        if (entry.name === ".git" || entry.name === "node_modules") continue;

        if (
          entry.name === "__pycache__" ||
          entry.name === ".DS_Store" ||
          entry.name === "Thumbs.db" ||
          entry.name.endsWith(".log")
        ) {
          await rm(fullPath, { recursive: true, force: true }).catch(() => {});
          removedCount++;
          context.log(`Removed unneeded artifact: ${entry.name}`);
        } else if (entry.isDirectory()) {
          await cleanDir(fullPath);
        }
      }
    };

    await cleanDir(this.root);
    return { removedCount };
  }

  async validate(context, result) {
    context.log(`Sanitation complete. Removed ${result.removedCount} temporary artifacts.`);
    return true;
  }
}
