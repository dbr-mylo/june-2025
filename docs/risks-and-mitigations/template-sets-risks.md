# Template Sets – Risks & Mitigations

## Overview
Template Sets allow Template Editors and Admins to group and manage collections of styles, layouts, and settings for use across multiple documents.

## Key Risks

| Risk ID | Risk Description | Likelihood | Impact | Priority | Notes |
|---------|------------------|------------|--------|----------|-------|
| R1 | Incorrect template-to-document mapping could apply the wrong style rules. | Medium | High | High | Especially critical for teams managing multiple branded templates. |
| R2 | Loss of template version traceability across sets. | Medium | Medium | Medium | Users may not realize that templates changed. |

## Mitigations

| Risk ID | Mitigation Strategy | Owner | Status | Notes |
|---------|----------------------|--------|--------|-------|
| R1 | Validate mapping logic before template set assignment; add preview confirmation step. | Dev Team | Planned |  |
| R2 | Include internal version tags per template instance in each set. | Product | Planned |  |
