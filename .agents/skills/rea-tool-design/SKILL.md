---
name: rea-tool-design
description: Design or change REA investigation tools, CLI/MCP contracts, provider capabilities, and Evidence semantics.
metadata:
  version: "1.0.0"
---

# REA tool design

Use the [tool-design guide](../../../docs/tool-design.md) for tool boundaries,
contract semantics, provider ownership, and discoverability. Inspect the current
contract and nearest existing tool relevant to the analyst question; source,
documentation, and live catalogs may describe different versions.

For a design request, return the proposed boundary, input/result shape, Evidence
semantics, nearest alternative, and verification approach. Implement when
requested, preserving the user's scope and existing authorization.

For implementation or verification, consult [testing](../../../docs/testing.md)
for the affected consumer and provider lanes, and
[contributing](../../../CONTRIBUTING.md) for generated-file ownership. Read
provider/workflow guides only as the task requires.


## Pre-flight Check
1. Verify target environment readiness and input boundaries.
2. Confirm requisite permissions, dependencies, and provider availability.
3. Validate parameters against strict schema definitions.

## Post-execution Validation
1. Verify generated artifacts against integrity and regression benchmarks.
2. Ensure no unintended side-effects or untracked file leaks.
3. Confirm that observation evidence and provenance are preserved.
