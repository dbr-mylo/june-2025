# Document Versioning – Risks & Mitigations

## Overview
Versioning allows users to revert to past states and track document changes over time.

## Key Risks

| Risk ID | Risk Description | Likelihood | Impact | Priority | Notes |
|---------|------------------|------------|--------|----------|-------|
| R1 | Accidental data loss if versions are not properly stored or restored. | High | High | High |  |
| R2 | Confusion over current vs. historical version. | Medium | Medium | Medium |  |

## Mitigations

| Risk ID | Mitigation Strategy | Owner | Status | Notes |
|---------|----------------------|--------|--------|-------|
| R1 | Save diffs on major actions and test rollback logic thoroughly. | Backend | Planned |  |
| R2 | Label versions clearly and allow preview before restore. | Design | Planned |  |
