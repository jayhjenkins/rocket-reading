# Reading App - Project Structure

## Overview

This project uses the **Superpowers LLM Framework** - a comprehensive software development workflow for AI agents that automates best practices including design refinement, planning, and test-driven implementation.

## Directory Layout

```
.
├── .claude/                    # Claude Code configuration
│   └── settings.json          # Project settings and paths
├── docs/                       # Documentation
│   └── product/               # Product & design documentation
│       ├── prd/              # Product Requirements Documents
│       ├── game-specs/       # Game mechanics & specifications
│       ├── user-research/    # User research & findings
│       ├── personas/         # User personas & stakeholder profiles
│       ├── requirements/     # Detailed feature requirements
│       ├── wireframes/       # UI/UX wireframes & mockups
│       └── README.md         # Product docs guide
├── src/                       # Source code
├── tests/                     # Test suites
├── .gitignore                 # Git ignore rules
└── PROJECT_STRUCTURE.md       # This file
```

## Superpowers Framework

The Superpowers LLM framework provides an integrated development workflow with:

- **Brainstorming** - Design exploration and ideation
- **Planning** - Strategic implementation planning
- **Execution** - Automated, test-driven development
- **Code Review** - Quality gates and review processes
- **Testing** - Built-in testing workflows

### Key Commands

Once Superpowers is installed, you'll have access to commands like:
- `/superpowers:brainstorm` - Start design exploration
- `/superpowers:write-plan` - Create implementation plans
- `/superpowers:execute-plan` - Run test-driven execution

## Product Documentation

Place all your product documentation in `docs/product/`:

- **PRD files** → `docs/product/prd/`
- **Game specs** → `docs/product/game-specs/`
- **User research** → `docs/product/user-research/`
- **User personas** → `docs/product/personas/`
- **Feature requirements** → `docs/product/requirements/`
- **Wireframes/mockups** → `docs/product/wireframes/`

The framework will automatically have access to these documents for context during development.

## Setup Next Steps

1. Install Superpowers plugin in Claude Code:
   ```
   /plugin marketplace add obra/superpowers-marketplace
   /plugin install superpowers@superpowers-marketplace
   ```

2. Load your existing product documentation into the appropriate `docs/product/` subdirectories

3. Start building with `/superpowers:brainstorm` or similar commands to leverage the framework
