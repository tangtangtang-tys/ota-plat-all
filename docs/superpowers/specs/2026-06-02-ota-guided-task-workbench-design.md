# OTA Guided Task Workbench Design

## Goal

Optimize the static OTA platform prototype according to the operation manual, with focus on the task creation flow. The new interaction should make the lifecycle clear: configure basic information, choose target devices, inspect validation results, then publish into the correct approval path.

## Selected Approach

Use a guided task workbench:

- Add a compact step rail at the top of the create page: Basic Info, Target Devices, Validation Preview, Publish.
- Arrange the page as a two-column workspace: main task controls on the left, live task summary on the right.
- Keep strategy switching in one page. Version, file import, and manual import each expose only their relevant controls and guidance.
- Surface approval behavior in context: version and file strategies require approval; manual import goes directly to pending execution.
- Keep the final release decision inside the preview modal, with clear validation results and disabled publish when no device can be upgraded.

## Interaction Details

The create page should show:

- Required base fields: task name, package type, target version, region, task period.
- Package type guidance. Differential packages warn that they only apply to 4G module lines and require baseline matching.
- Strategy cards with scenario, approval requirement, and selected state.
- Version strategy: filter rule controls, version list, selected device count, and differential matching note when relevant.
- File strategy: upload area, file requirements, parsed result, and import validation hints.
- Manual strategy: manual input guidance, max 10 device IDs, validation result, and no-approval reminder.
- Live summary panel: package and strategy, approval path, selected devices, upgradeable devices, invalid devices, and readiness checklist.

The preview modal should show:

- Basic task summary, package type, strategy, region, task period, and approval flow.
- Device validation cards: total, upgradeable, not upgradeable.
- Exception reason list when invalid devices exist.
- Action label changes by strategy and validation outcome.

## Scope

Implement as static HTML/CSS/JS behavior only. Do not add a build system, backend, real file parsing, or real time validation. Existing list, detail, log, user, and role pages stay intact except for shared style compatibility.

## Verification

Open `ota-platform-prototype/index.html` locally and check:

- The create page presents the guided workbench layout.
- Switching package type and strategy updates visible guidance and summary.
- Preview modal reflects selected package and strategy, including approval copy.
- Mobile layout stacks without text overlap.
