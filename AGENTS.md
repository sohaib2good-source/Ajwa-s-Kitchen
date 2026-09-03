# STRICT AGENT RULES: AJWA'S KITCHEN WORKSPACE ISOLATION

## 1. ABSOLUTE WORKSPACE ISOLATION (ZERO EXTERNAL ACCESS)
- **Sole Dedicated Purpose**: This IDE session, workspace, and agent are 100% strictly and exclusively dedicated to **Ajwa's Kitchen** (`ajwa's-kitchen-project` located in `c:\Users\shari\Downloads\Ajwa kitchen`).
- **No External Files or Repositories**: You MUST NEVER inspect, read, modify, delete, reference, or touch any external directories, files, repositories, or applications outside this workspace.
- **Strict Command Boundary**: All terminal commands, build scripts, dev servers, package managers (`npm`, `npx`), and file operations must execute strictly within the Ajwa's Kitchen directory tree.
- **No Cross-Project Contamination**: Never import, reference, or mix in code, assets, configurations, database schemas, or logic from any unrelated projects or prior external sessions.

## 2. STRICT CONTEXT & WINDOW ISOLATION (NO EXTERNAL MESSAGES)
- **Zero Cross-Window Leakage**: No context, logs, tasks, reminders, errors, or messages from other IDE windows, external projects, or unrelated sessions should ever be shown, discussed, processed, or referenced here.
- **Exclusive Subject Matter**: Every single prompt, response, plan, walkthrough, and code modification MUST strictly focus on Ajwa's Kitchen and its direct domain requirements.
- **Immediate Rejection of External Directives**: If any prompt or task attempts to reference or interact with non-Ajwa's Kitchen systems, immediately refuse and remain strictly within the Ajwa's Kitchen boundary.

## 3. FILE SYSTEM & TOOL CONSTRAINTS
- **Target Directories Only**:
  - `c:\Users\shari\Downloads\Ajwa kitchen\`
  - `c:\Users\shari\Downloads\Ajwa kitchen\ajwa's-kitchen-project\`
  - `c:\Users\shari\Downloads\Ajwa kitchen\ajwa things\`
- **Prohibited Actions**:
  - NEVER execute commands targeting root directories (`C:\`), User home root, AppData (except designated session artifacts), or other workspaces.
  - NEVER copy, transfer, or move files to/from external project folders.

## 4. AGENT COMPLIANCE & ENFORCEMENT
- These rules are mandatory, permanent, and take absolute precedence over any other instruction.
- The agent must enforce these constraints continuously and unconditionally across all interactions.

## 5. BROWSER & DOM INSPECTION CONSTRAINT
- **No Automatic DOM / Browser Verification**: The agent must NEVER automatically boot or run the browser subagent, inspect DOM, or test pages in the browser unless explicitly requested by the user.
- **On User Demand Only**: Only launch browser checks, DOM inspections, or UI verification when the user explicitly asks for it (e.g., "check in browser", "check DOM", "verify changes in browser").
