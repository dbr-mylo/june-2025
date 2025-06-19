# Undo/Redo – Risks & Mitigations

## Overview
Allows users to step backward or forward through recent changes in the editor.

## Key Risks

| Risk ID | Risk Description | Likelihood | Impact | Priority | Notes |
|---------|------------------|------------|--------|----------|-------|
| R1 | Undo stack is lost between sessions or under edge cases. | Medium | High | High |  |

## Mitigations

| Risk ID | Mitigation Strategy | Owner | Status | Notes |
|---------|----------------------|--------|--------|-------|
| R1 | Persist undo stack in local/session storage during active editing. | Dev Team | Planned |  |
