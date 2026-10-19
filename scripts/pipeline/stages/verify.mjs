/**
 * @file scripts/pipeline/stages/verify.mjs
 * @description Pipeline stage for configuration verification and boundary integrity.
 */

import { PipelineStage } from "../core/stage.mjs";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export class VerifyStage extends PipelineStage {
  constructor(options = {}) {
    super("verify");
    this.root = options.root || process.cwd();
  }

  async preflight(context) {
    context.log("Checking project manifests and configuration files...");
    return true;
  }

  async execute(context) {
    const pkgPath = join(this.root, "package.json");
    const pkg = JSON.parse(await readFile(pkgPath, "utf8"));
    const issues = [];

    if (!pkg.name) issues.push("Missing package name");
    if (!pkg.version) issues.push("Missing package version");

    return { issuesCount: issues.length, issues };
  }

  async validate(context, result) {
    if (result.issuesCount > 0) {
      throw new Error(`Verification found ${result.issuesCount} issues`);
    }
    context.log("Configuration and manifest verification passed");
    return true;
  }
}
