# Contributing

Thank you for contributing to **portuguese-tenses**!

This document describes how to set up the project locally, make changes, and submit pull requests.

---

## Project Overview

**portuguese-tenses** is a React-based quiz application for learning **when and why** Brazilian Portuguese verb tenses are used.

The project focuses on:

* Tense usage and context
* Multiple-choice theory questions
* Fill-in-the-blank exercises
* Brazilian Portuguese linguistic conventions

---

## Prerequisites

Before starting, ensure you have:

* Node.js 20+ (recommended)
* npm 10+ (recommended)
* Git

Check your versions:

```bash
node --version
npm --version
git --version
```

---

## Local Development

### Clone the Repository

```bash
git clone https://github.com/philkleer/portuguese-tenses.git
cd portuguese-tenses
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

or, if the project uses Create React App:

```bash
npm start
```

The application will be available at:

```text
http://localhost:3000
```

or

```text
http://localhost:5173
```

depending on the chosen tooling.

---

## Production Build

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

(if supported by the tooling).

---

## Project Structure

```text
src/
├── components/
├── data/
├── engine/
├── hooks/
├── App.jsx
└── main.jsx
```

### Components

UI elements and quiz screens.

### Data

Question databases.

### Engine

Question selection and filtering logic.

### Hooks

State management and quiz behavior.

---

## Coding Guidelines

### General

* Prefer functional React components.
* Prefer React hooks over class components.
* Keep components focused and small.
* Avoid unnecessary dependencies.
* Use clear, descriptive names.

### JavaScript

* Use modern ES modules.
* Prefer `const` over `let` when possible.
* Prefer array methods over manual loops where appropriate.

### React

* Keep state as local as possible.
* Avoid prop drilling when reasonable.
* Use `useCallback` and `useMemo` only when beneficial.

---

## Question Database Guidelines

All content must follow **Brazilian Portuguese** conventions.

### Requirements

* Use natural Brazilian Portuguese.
* Prefer `você` and `vocês`.
* Avoid European Portuguese constructions.
* Ensure linguistic explanations are accurate.
* Verify tense usage examples carefully.

### Question Quality

Good questions should:

* Test actual tense usage.
* Include realistic contexts.
* Avoid ambiguity.
* Have exactly one correct answer.

### Fill-in-the-Blank Questions

* Provide an infinitive hint.
* Ensure the expected answer is unique.
* Keep sentences natural and realistic.

### Theory Questions

* Provide four answer options.
* Include one clearly correct option.
* Ensure distractors are plausible.

---

## Branch Workflow

Create a feature branch from `main`:

```bash
git checkout main
git pull
git checkout -b feature/my-feature
```

Commit changes:

```bash
git add .
git commit -m "Add future subjunctive questions"
```

Push branch:

```bash
git push origin feature/my-feature
```

Open a Pull Request against `main`.

---

## Fork Workflow

If you do not have write access:

### Fork the Repository

Create a fork on GitHub.

### Clone Your Fork

```bash
git clone https://github.com/<your-username>/portuguese-tenses.git
cd portuguese-tenses
```

### Add Upstream Remote

```bash
git remote add upstream https://github.com/<org-or-user>/portuguese-tenses.git
```

Verify:

```bash
git remote -v
```

### Sync With Upstream

```bash
git fetch upstream
git checkout main
git merge upstream/main
```

### Create a Branch

```bash
git checkout -b feature/my-feature
```

### Push Changes

```bash
git push origin feature/my-feature
```

### Open Pull Request

Create a Pull Request from:

```text
your-fork:feature/my-feature
```

to:

```text
upstream:main
```

---

## Pull Request Guidelines

Before opening a Pull Request:

* [ ] Application runs locally
* [ ] Build succeeds
* [ ] No console errors
* [ ] New questions have been reviewed
* [ ] Existing functionality remains intact
* [ ] Branch is up to date with `main`

### Pull Request Description

Please include:

1. Summary of changes
2. Motivation
3. Screenshots (if UI changes)
4. Testing performed

Example:

```markdown
## Summary

Adds 100 new Presente do Subjuntivo questions.

## Motivation

Increase coverage of subordinate clause usage.

## Testing

- Local development server
- Production build
- Manual question verification
```

---

## Reporting Issues

When reporting a bug, include:

* Browser and version
* Operating system
* Steps to reproduce
* Expected behavior
* Actual behavior
* Screenshots if applicable

---

## Feature Requests

Feature requests are welcome.

Please describe:

* The problem being solved
* Proposed solution
* Alternative approaches considered

---

## Questions

If anything is unclear, open an issue or start a discussion before implementing large changes.
