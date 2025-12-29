# PRD: AI-Assisted TODO App (MVP)

## 1. Overview

**Product name:** TBD
**Status:** MVP
**Primary user:** Individual user managing personal tasks
**Platform:** Web

### Problem

Users often capture tasks in messy, ambiguous language. Traditional TODO apps force premature structure; fully automated AI tools remove user control.

### Solution

A lightweight TODO app where AI _proposes_ clean, categorized tasks from natural language, and the user explicitly approves or edits before saving.

---

## 2. Goals & Success Criteria

### Goals

- Minimize friction to capture tasks
- Improve clarity and consistency of TODOs
- Maintain user trust by keeping AI actions transparent and reversible

### Success Criteria (MVP)

- User can add a TODO in under 10 seconds
- AI output is always visible before saving
- User retains full control over final task content

---

## 3. Non-Goals (MVP)

- Auto-scheduling
- Task splitting
- Notifications or reminders
- User accounts or authentication
- Background AI re-writes
- Nested tasks or projects
- Multi-list support

---

## 4. Core User Flows

### 4.1 Create TODO

1. User types free-form text into a single input
2. User submits the input
3. App sends input to LLM
4. LLM returns a structured suggestion
5. App shows confirmation UI
6. User chooses one action:
   - Approve & save
   - Retry AI rewrite
   - Edit manually
   - Cancel

---

### 4.2 View & Manage TODOs

- View a flat list of TODOs
- Mark TODO as complete / incomplete
- Drag & drop to reorder TODOs
- Edit TODO title inline
- Trigger AI rewrite for a single TODO (explicit action + confirmation)

---

## 5. Functional Requirements

### 5.1 Input

- Single text input field
- Accepts free-form natural language
- Submit disabled when input is empty

---

### 5.2 AI Formatting

- One input maps to exactly one TODO
- AI returns:
  - A clean, imperative task title
  - A category from a fixed list
- No automatic saving without user approval

---

### 5.3 Confirmation UI

Displays:

- Original user input (read-only)
- AI-formatted title
- Category

Actions:

- Approve & save
- Retry AI
- Edit manually
- Cancel

---

### 5.4 TODO List

Each TODO displays:

- Title
- Category
- Completion checkbox

Interactions:

- Toggle completion
- Drag & drop reorder
- Manual edit
- AI rewrite (with confirmation)

---

## 6. Categories (Fixed Set)

- Work
- Personal
- Errands
- Health
- Learning
- Other

Categories are hard-coded in MVP.

---

## 7. Data Model (MVP)

```ts
Todo {
  id: string
  title: string
  category: Category
  completed: boolean
  createdAt: timestamp
  updatedAt: timestamp
}
```

## 8. Future Considerations (Out of Scope for MVP)

- Due dates
- Priorities
- Filters and search
- Task splitting
- Learning from user edits
- Multi-list or project views
