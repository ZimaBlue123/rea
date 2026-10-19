/**
 * @file scripts/pipeline/core/stage.mjs
 * @description Base interface and execution model for modular pipeline stages.
 */

export class PipelineStage {
  constructor(name) {
    if (!name) throw new Error("Stage must have a valid identifier name");
    this.name = name;
  }

  /**
   * Pre-flight checklist to verify required preconditions before execution.
   * @param {import('./context.mjs').PipelineContext} context
   * @returns {Promise<boolean>}
   */
  async preflight(context) {
    context.log(`Running preflight checklist for stage: ${this.name}`);
    return true;
  }

  /**
   * Core logic execution for this stage.
   * @param {import('./context.mjs').PipelineContext} context
   * @returns {Promise<any>}
   */
  async execute(context) {
    throw new Error(`execute() not implemented in stage ${this.name}`);
  }

  /**
   * Post-execution validation SOP to ensure outputs meet quality criteria.
   * @param {import('./context.mjs').PipelineContext} context
   * @param {any} result
   * @returns {Promise<boolean>}
   */
  async validate(context, result) {
    context.log(`Running post-execution validation for stage: ${this.name}`);
    return true;
  }

  /**
   * Orchestrates preflight, execution, and validation.
   * @param {import('./context.mjs').PipelineContext} context
   */
  async run(context) {
    context.log(`=== Starting Stage: ${this.name} ===`);
    const preflightOk = await this.preflight(context);
    if (!preflightOk) {
      const err = new Error(`Preflight check failed for stage: ${this.name}`);
      context.recordStage(this.name, { status: "failed", error: err.message });
      throw err;
    }

    try {
      const result = await this.execute(context);
      const validationOk = await this.validate(context, result);
      if (!validationOk) {
        const err = new Error(`Validation check failed for stage: ${this.name}`);
        context.recordStage(this.name, { status: "failed", error: err.message });
        throw err;
      }
      context.recordStage(this.name, { status: "passed", data: result });
      context.log(`=== Stage ${this.name} Completed Successfully ===`);
      return result;
    } catch (err) {
      context.recordStage(this.name, { status: "failed", error: err.message });
      throw err;
    }
  }
}
