# Claude Code Skills

This directory contains project-level skills that are automatically available to all team members working on this repository.

## What are Skills?

Skills are modular capabilities that extend Claude's functionality. Each skill packages:
- Specialized instructions
- Metadata
- Optional resources (scripts, templates, reference docs)

Claude automatically loads these skills when relevant to the current task.

## Available Skills

### Document Processing Skills (4)

- **docx/** - Word document creation, editing, and analysis
- **pdf/** - PDF manipulation and form handling
- **pptx/** - PowerPoint presentation creation and editing
- **xlsx/** - Excel spreadsheet creation with formulas and analysis

### Creative & Design Skills (3)

- **algorithmic-art/** - Generative art using p5.js
- **canvas-design/** - Visual design in PNG/PDF
- **slack-gif-creator/** - Animated GIFs for Slack

### Development Skills (3)

- **artifacts-builder/** - Complex HTML artifacts with React
- **mcp-builder/** - MCP server development guide
- **webapp-testing/** - Web testing with Playwright

### Enterprise Skills (3)

- **brand-guidelines/** - Anthropic brand styling
- **internal-comms/** - Internal communications templates
- **theme-factory/** - Professional themes for artifacts

### Meta Skills (2)

- **skill-creator/** - Guide for creating new skills
- **template-skill/** - Basic skill template (if present)

## Source

All skills are copied from the official Anthropic skills repository:
https://github.com/anthropics/skills

## Usage

Skills are automatically invoked by Claude Code when relevant to your request. You don't need to explicitly activate them.

For example:
- Request Excel work → `xlsx` skill activates
- Request presentation creation → `pptx` skill activates
- Request MCP server development → `mcp-builder` skill activates

## Updates

To update skills to the latest version:

```bash
# Update the marketplace
claude plugin marketplace update anthropic-agent-skills

# Re-copy skills to repository
# (Manual process - see ANTHROPIC_SKILLS.md for details)
```

## License

All skills are proprietary. See LICENSE.txt in each skill directory for complete terms.
