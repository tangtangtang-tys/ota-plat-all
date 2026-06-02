# OTA2 Task Create Flow Design

## Goal

Sync the prototype task creation flow with OTA2.0 center-edge architecture and workflow rules.

## Design

The create task page should explain the user-facing flow as four steps:

1. Basic information: task name, package type, target firmware, and task period.
2. Target source: choose the task source strategy.
3. Center preprocessing: show what the center API derives before dispatch.
4. Publish and dispatch: show approval path, center dispatch, and edge execution.

## OTA2.0 Rules Reflected In UI

- The current center only operates the current major region.
- Version strategy is an active-device scan and requires selecting one or more current-region `regionId` values.
- File import and manual import do not ask the user to select cluster, node, or `regionId`.
- File/manual targets are enriched by the center using log platform model/version and device attribution `regionId`.
- Known devices in other major regions are filtered out of the current center task.
- Unknown-attribution devices become candidate records and are claimed by the real edge node after the device comes online.
- Version and file tasks require approval. Manual tasks publish directly and dispatch immediately.
- Preview should show `targetRegionIds`, center target list counts, filtered counts, candidate counts, and dispatch path.

## Scope

Static prototype only. No real API calls, file parsing, edge queries, candidate claim, or approval integration are added.

## Verification

Open `ota-platform-prototype/index.html`, go to Create Task, switch among the three strategies, and confirm:

- Version strategy shows region scan range.
- File/manual strategy shows center-side attribution, not region selection.
- Summary and preview reflect approval and dispatch semantics.
