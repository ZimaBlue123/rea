# Global Skills Index (REA)

*Generated automatically by REA Modular Pipeline at: 2026-10-19T09:18:43.811Z*

## Overview
This registry catalogs all standardized agent skills available within REA. Every listed skill adheres to strict metadata standards, versioning protocols, and pre/post validation SOPs.

| Skill Name | Version | SOP Compliance | Description |
| :--- | :---: | :---: | :--- |
| **`rea-analysis-optimization`** | `v1.0.0` | [x] Pre-flight<br>[x] Post-val | Optimize REA providers and shared analysis workflows for agent context, latency, CPU, and memory while preserving correctness and Evidence. Use for analysis bottlenecks and cache or query design; CI/test-suite optimization belongs to rea-ci-tests-audit. |
| **`rea-changelog-update`** | `v1.0.0` | [x] Pre-flight<br>[x] Post-val | Prepare or rewrite REA release changelogs and GitHub release notes from pinned Git history, with verified contributor thanks and Release Please synchronization. |
| **`rea-ci-tests-audit`** | `v1.0.0` | [x] Pre-flight<br>[x] Post-val | Audit REA CI and test suites for correctness, fixture drift, false passes, and measured performance; use for suite or workflow investigations and efficiency changes, rather than ordinary feature testing or a single test failure. |
| **`rea-tool-design`** | `v1.0.0` | [x] Pre-flight<br>[x] Post-val | Design or change REA investigation tools, CLI/MCP contracts, provider capabilities, and Evidence semantics. |
| **`reverse-engineer-anything`** | `v42` | [x] Pre-flight<br>[x] Post-val | Reverse engineer native, managed, Electron/JavaScript, packaged, firmware, and browser targets with REA. Use shipped-artifact or requested runtime evidence to explain features, compare versions, decompile code, or guide a reconstruction. Skip REA for ordinary source-repository architecture analysis. |

## Operational SOP Standards
All skills in this directory must comply with the standard execution lifecycle:
1. **Pre-flight Check**: Verification of prerequisite binaries, inputs, and environment constraints.
2. **Deterministic Execution**: Bounded analysis preserving evidence provenance without unbounded side effects.
3. **Post-execution Validation**: Output verification and cleanliness assurance against the regression baseline.
