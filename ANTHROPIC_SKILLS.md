# Anthropic Official Skills - Installation Guide

## Overview

This document lists all officially installed Anthropic skills for Claude Code. These skills extend Claude's capabilities with specialized knowledge, workflows, and tool integrations.

## Project-Level Skills ✨

**All skills are now stored in the repository at `.claude/skills/`** and are automatically available to all team members. This means:
- ✅ Skills are version-controlled with your code
- ✅ Team members automatically get skills when they clone/pull the repository
- ✅ No need to manually install plugins on each machine
- ✅ Skills work immediately for everyone on the team

## Installation Summary

- **Location**: `.claude/skills/` (project-level, in repository)
- **Source**: https://github.com/anthropics/skills
- **Date Installed**: 2025-11-04
- **Total Skills**: 15 skills
- **Marketplace**: `anthropic-agent-skills` (optional, for updates)

## Setup for New Team Members

**No setup required!** When you clone this repository, all skills are automatically available.

### Optional: Add marketplace for updates

```bash
# Optional: Add the official Anthropic skills marketplace for future updates
claude plugin marketplace add https://github.com/anthropics/skills

# Optional: Install as plugins (alternative to project-level)
claude plugin install document-skills@anthropic-agent-skills
claude plugin install example-skills@anthropic-agent-skills
```

---

## Installed Skills

### 📄 Document Skills (4 skills)

#### 1. xlsx
**Description**: Comprehensive spreadsheet creation, editing, and analysis with support for formulas, formatting, data analysis, and visualization.

**Use Cases**:
- Creating new spreadsheets with formulas and formatting
- Reading or analyzing data
- Modifying existing spreadsheets while preserving formulas
- Data analysis and visualization in spreadsheets
- Recalculating formulas

**Supported Formats**: `.xlsx`, `.xlsm`, `.csv`, `.tsv`

---

#### 2. docx
**Description**: Comprehensive document creation, editing, and analysis with support for tracked changes, comments, formatting preservation, and text extraction.

**Use Cases**:
- Creating new documents
- Modifying or editing content
- Working with tracked changes
- Adding comments
- Professional document tasks

**Supported Formats**: `.docx`

---

#### 3. pptx
**Description**: Presentation creation, editing, and analysis.

**Use Cases**:
- Creating new presentations
- Modifying or editing content
- Working with layouts
- Adding comments or speaker notes
- Presentation tasks

**Supported Formats**: `.pptx`

---

#### 4. pdf
**Description**: Comprehensive PDF manipulation toolkit for extracting text and tables, creating new PDFs, merging/splitting documents, and handling forms.

**Use Cases**:
- Filling PDF forms
- Extracting text and tables
- Creating new PDFs
- Merging/splitting documents
- PDF document processing at scale

**Supported Formats**: `.pdf`

---

### 🎨 Example Skills (11 skills)

#### Creative & Design Skills

#### 5. algorithmic-art
**Description**: Creating algorithmic art using p5.js with seeded randomness and interactive parameter exploration.

**Use Cases**:
- Creating art using code
- Generative art
- Algorithmic art
- Flow fields
- Particle systems

**Output Formats**: `.md` (philosophy), `.html` (interactive viewer), `.js` (generative algorithms)

---

#### 6. canvas-design
**Description**: Create beautiful visual art in .png and .pdf documents using design philosophy.

**Use Cases**:
- Creating posters
- Creating artwork
- Visual design
- Static visual pieces

**Output Formats**: `.md` (philosophy), `.pdf`, `.png`

---

#### 7. slack-gif-creator
**Description**: Toolkit for creating animated GIFs optimized for Slack, with validators for size constraints and composable animation primitives.

**Use Cases**:
- Creating animated GIFs for Slack
- Creating emoji animations
- Optimized Slack media content

**Output Formats**: `.gif`

---

#### Development & Technical Skills

#### 8. artifacts-builder
**Description**: Suite of tools for creating elaborate, multi-component claude.ai HTML artifacts using modern frontend web technologies (React, Tailwind CSS, shadcn/ui).

**Use Cases**:
- Complex artifacts requiring state management
- Artifacts with routing
- Using shadcn/ui components
- Not for simple single-file HTML/JSX artifacts

**Stack**: React 18 + TypeScript + Vite + Parcel + Tailwind CSS + shadcn/ui

---

#### 9. mcp-builder
**Description**: Guide for creating high-quality MCP (Model Context Protocol) servers that enable LLMs to interact with external services through well-designed tools.

**Use Cases**:
- Building MCP servers
- Integrating external APIs or services
- Python (FastMCP) development
- Node/TypeScript (MCP SDK) development

---

#### 10. webapp-testing
**Description**: Toolkit for interacting with and testing local web applications using Playwright.

**Use Cases**:
- Verifying frontend functionality
- Debugging UI behavior
- Capturing browser screenshots
- Viewing browser logs

**Technology**: Playwright

---

#### Enterprise & Communication Skills

#### 11. brand-guidelines
**Description**: Applies Anthropic's official brand colors and typography to any sort of artifact that may benefit from having Anthropic's look-and-feel.

**Use Cases**:
- Applying brand colors
- Style guidelines
- Visual formatting
- Company design standards

---

#### 12. internal-comms
**Description**: A set of resources to help write all kinds of internal communications, using the formats that companies prefer.

**Use Cases**:
- Status reports
- Leadership updates
- 3P updates (Progress, Plans, Problems)
- Company newsletters
- FAQs
- Incident reports
- Project updates

---

#### 13. theme-factory
**Description**: Toolkit for styling artifacts with a theme. These artifacts can be slides, docs, reports, HTML landing pages, etc.

**Features**:
- 10 pre-set themes with colors/fonts
- Generate custom themes on-the-fly
- Apply to any artifact type

**Supported Artifacts**: Slides, docs, reports, HTML landing pages

---

#### Meta Skills

#### 14. skill-creator
**Description**: Guide for creating effective skills. This skill should be used when users want to create a new skill (or update an existing skill) that extends Claude's capabilities.

**Use Cases**:
- Creating new skills
- Updating existing skills
- Extending Claude's capabilities
- Specialized knowledge integration
- Workflow development
- Tool integrations

---

#### 15. template-skill
**Description**: Basic template for starting new skill development.

**Use Cases**:
- Starting point for new skills
- Reference for skill structure
- Skill development foundation

---

## Verification

To verify project skills are loaded:

```bash
# Check that skills directory exists
ls -la .claude/skills/

# List all skills in the project
ls .claude/skills/

# Verify a specific skill has SKILL.md
cat .claude/skills/xlsx/SKILL.md | head -5
```

To verify marketplace plugins (if installed):

```bash
# List configured marketplaces
claude plugin marketplace list

# Check installed plugins
cat ~/.claude/settings.json
```

## Updating Skills

To update skills to the latest version from Anthropic:

```bash
# 1. Update the marketplace (if you have it installed)
claude plugin marketplace update anthropic-agent-skills

# 2. Re-copy skills to repository
rm -rf .claude/skills/*
cp -r ~/.claude/plugins/marketplaces/anthropic-agent-skills/document-skills/* .claude/skills/
cp -r ~/.claude/plugins/marketplaces/anthropic-agent-skills/algorithmic-art .claude/skills/
cp -r ~/.claude/plugins/marketplaces/anthropic-agent-skills/artifacts-builder .claude/skills/
cp -r ~/.claude/plugins/marketplaces/anthropic-agent-skills/brand-guidelines .claude/skills/
cp -r ~/.claude/plugins/marketplaces/anthropic-agent-skills/canvas-design .claude/skills/
cp -r ~/.claude/plugins/marketplaces/anthropic-agent-skills/internal-comms .claude/skills/
cp -r ~/.claude/plugins/marketplaces/anthropic-agent-skills/mcp-builder .claude/skills/
cp -r ~/.claude/plugins/marketplaces/anthropic-agent-skills/skill-creator .claude/skills/
cp -r ~/.claude/plugins/marketplaces/anthropic-agent-skills/slack-gif-creator .claude/skills/
cp -r ~/.claude/plugins/marketplaces/anthropic-agent-skills/theme-factory .claude/skills/
cp -r ~/.claude/plugins/marketplaces/anthropic-agent-skills/webapp-testing .claude/skills/

# 3. Commit the updated skills
git add .claude/skills/
git commit -m "Update Anthropic skills to latest version"
```

## Additional Resources

- **Official Repository**: https://github.com/anthropics/skills
- **Claude Code Documentation**: https://docs.claude.com/
- **Agent Skills Documentation**: https://docs.claude.com/en/docs/agents-and-tools/agent-skills/
- **Project Skills Guide**: https://docs.claude.com/en/docs/claude-code/skills.md

## License

All skills are proprietary. See LICENSE.txt in each skill directory for complete terms.

---

**Generated**: 2025-11-04 by Terragon Labs
**Updated**: 2025-11-04 - Added project-level skills in `.claude/skills/`
