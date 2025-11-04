# Anthropic Official Skills - Installation Guide

## Overview

This document lists all officially installed Anthropic skills for Claude Code. These skills extend Claude's capabilities with specialized knowledge, workflows, and tool integrations.

## Installation Summary

- **Marketplace**: `anthropic-agent-skills`
- **Source**: https://github.com/anthropics/skills
- **Date Installed**: 2025-11-04
- **Total Skills**: 15 (grouped in 2 plugins)

## Installation Command

```bash
# Add the official Anthropic skills marketplace
claude plugin marketplace add https://github.com/anthropics/skills

# Install all skills
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

To verify installed skills:

```bash
# List configured marketplaces
claude plugin marketplace list

# Check installed plugins (look for enabledPlugins in settings)
cat ~/.claude/settings.json
```

## Additional Resources

- **Official Repository**: https://github.com/anthropics/skills
- **Claude Code Documentation**: https://docs.claude.com/
- **Agent Skills Documentation**: https://docs.claude.com/en/docs/agents-and-tools/agent-skills/

## License

All skills are proprietary. See LICENSE.txt in each skill directory for complete terms.

---

**Generated**: 2025-11-04 by Terragon Labs
