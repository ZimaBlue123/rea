#!/usr/bin/env node
/**
 * @file scripts/pipeline/index.mjs
 * @description Master entrypoint for the modern modular REA pipeline.
 */

import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
import { PipelineContext } from "./core/context.mjs";
import { AuditStage } from "./stages/audit.mjs";
import { SkillsStage } from "./stages/skills.mjs";
import { CleanStage } from "./stages/clean.mjs";
import { VerifyStage } from "./stages/verify.mjs";

export async function runPipeline(options = {}) {
  const context = new PipelineContext({
    name: "REA-Modular-Pipeline",
    verbose: options.verbose || false,
  });

  context.log("Initiating modular pipeline execution...");

  const stages = [
    new SkillsStage(),
    new CleanStage(),
    new VerifyStage(),
    new AuditStage(),
  ];

  for (const stage of stages) {
    await stage.run(context);
  }

  const summary = context.getSummary();
  context.log(`Pipeline completed in ${summary.elapsedMs}ms. Status: ${summary.success ? "SUCCESS" : "FAILED"}`);
  return summary;
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  runPipeline()
    .then((summary) => {
      if (!summary.success) process.exit(1);
    })
    .catch((err) => {
      console.error("[FATAL] Pipeline execution failed:", err);
      process.exit(1);
    });
}
