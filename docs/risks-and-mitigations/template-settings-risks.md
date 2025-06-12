# Template Settings – Risks & Mitigations

## Overview
Defines master-level settings such as page size, margins, and global hyphenation.

## Key Risks

| Risk ID | Risk Description | Likelihood | Impact | Priority | Notes |
|---------|------------------|------------|--------|----------|-------|
| R1 | Invalid margin or page size configurations could break layout. | Medium | High | Medium |  |
| R2 | Template changes affect existing documents unintentionally. | Medium | High | High |  |

## Mitigations

| Risk ID | Mitigation Strategy | Owner | Status | Notes |
|---------|----------------------|--------|--------|-------|
| R1 | Use constrained input types and built-in validation. | Frontend | Complete |  |
| R2 | Require user confirmation before reapplying updated templates to existing docs. | Product | Planned |  |
