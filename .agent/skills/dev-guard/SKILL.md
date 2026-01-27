---
name: dev-guard
description: Enforces professional development practices. Ensures clean code, reuse of existing components, up-to-date documentation checks, and structured planning before implementation.

---

# Engineering Discipline Skill

This skill ensures that all development tasks are handled in a clean, professional, and production-ready manner.

The agent must **never jump directly into coding**.

---

## When to use this skill

Use this skill when:
- Implementing a new feature
- Modifying existing functionality
- Writing frontend components or backend modules
- Refactoring code
- Working inside an unfamiliar or large codebase

---

## Mandatory Workflow (STRICT)

The agent MUST follow these steps **in order**:

---

### 1️⃣ Codebase & Context Analysis (BEFORE anything)

Before planning or coding, the agent must:

- Explore the existing codebase
- Search for:
  - Existing components/widgets/modules
  - Similar features or partial implementations
  - Utilities or helpers that can be reused
- Identify:
  - Relevant folders and files
  - Architectural patterns used in the project

🚫 **Never create a new component without confirming it does not already exist**

---

### 2️⃣ Documentation & Standards Check

Before creating an implementation plan, the agent must:

- Check official and latest documentation if relevant (framework, library, API)
- Avoid outdated patterns or deprecated APIs
- Follow:
  - Project coding standards
  - Framework best practices
  - Modern and recommended approaches

If documentation is unclear or missing, the agent should **explicitly mention assumptions**.

---

### 3️⃣ Clarification & Questions Phase (MANDATORY)

Before writing the implementation plan, the agent must:

- Ask necessary clarification questions such as:
  - Expected behavior and edge cases
  - UI/UX expectations (if frontend)
  - API contracts (if backend)
  - Performance, security, or scalability concerns
- Confirm scope boundaries:
  - What is included
  - What is out of scope

🚫 **Do NOT proceed until critical questions are answered**

---

### 4️⃣ Detailed Implementation Plan (REQUIRED)

Only after steps 1–3 are completed, the agent must create a **clear and detailed implementation plan** including:

- Feature overview
- Reuse strategy (what existing code/components will be reused)
- Files to be created or modified
- Step-by-step implementation flow
- Validation and error handling strategy
- Testing considerations

⚠️ If reuse is possible, it must be preferred over new creation.

---

### 5️⃣ Clean & Professional Implementation

When implementing code, the agent must ensure:

- Clean, readable, and well-structured code
- No duplicate logic or components
- Meaningful naming conventions
- Separation of concerns
- Proper comments where logic is non-obvious
- Only relevant files are touched

---

### 6️⃣ Final Verification Checklist

Before considering the task complete, the agent must verify:

- No duplicate components/widgets exist
- Relevant files were checked and updated
- Code follows project conventions
- No outdated or deprecated patterns are used
- Feature aligns with the original plan

---

## Decision Rules

- **If similar code exists → reuse or extend it**
- **If requirements are unclear → ask questions**
- **If docs conflict with existing code → follow project conventions and highlight the conflict**
- **If unsure → pause and clarify instead of guessing**

---

## Output Expectations

The agent should clearly separate:
1. Analysis
2. Questions (if any)
3. Implementation Plan
4. Code (only after approval or confirmation)

---

## Important Reminder

❗ Speed is less important than correctness, maintainability, and long-term scalability.
❗ Never assume. Always verify.
