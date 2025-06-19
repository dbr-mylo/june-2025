# Reusable Toolbar – Risks & Mitigations

## Overview
A shared formatting toolbar used across roles and panels, respecting permissions and available features per context.

## Key Risks

| Risk ID | Risk Description | Likelihood | Impact | Priority | Notes |
|---------|------------------|------------|--------|----------|-------|
| R1 | Tool options appear that are not allowed for the user’s role. | Medium | High | High |  |

## Mitigations

| Risk ID | Mitigation Strategy | Owner | Status | Notes |
|---------|----------------------|--------|--------|-------|
| R1 | Role-aware rendering logic and disable unpermitted tools visually. | Dev Team | In Progress |  |
