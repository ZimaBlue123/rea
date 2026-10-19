/**
 * @file scripts/pipeline/core/context.mjs
 * @description Execution context for the REA pipeline architecture.
 */

export class PipelineContext {
  constructor(options = {}) {
    this.name = options.name || "rea-pipeline";
    this.startTime = Date.now();
    this.stageResults = new Map();
    this.artifacts = new Map();
    this.verbose = Boolean(options.verbose);
    this.logger = options.logger || console;
  }

  log(message, ...args) {
    this.logger.log(`[${this.name}] ${message}`, ...args);
  }

  warn(message, ...args) {
    this.logger.warn(`[${this.name}] [WARN] ${message}`, ...args);
  }

  error(message, ...args) {
    this.logger.error(`[${this.name}] [ERROR] ${message}`, ...args);
  }

  recordStage(stageName, result) {
    this.stageResults.set(stageName, {
      ...result,
      timestamp: new Date().toISOString(),
    });
  }

  getSummary() {
    const elapsedMs = Date.now() - this.startTime;
    return {
      name: this.name,
      elapsedMs,
      stages: Object.fromEntries(this.stageResults),
      success: Array.from(this.stageResults.values()).every(
        (s) => s.status === "passed" || s.status === "skipped",
      ),
    };
  }
}
