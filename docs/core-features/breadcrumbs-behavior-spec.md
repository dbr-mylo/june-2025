### Breadcrumbs

- Breadcrumbs appear when the user is **browsing within a folder**, such as "Marketing" in Documents, "Proposals" in Templates, or a single-level team name in Admin views.
- Format examples:
  - `Documents ▸ Folder Name`
  - `Templates ▸ Folder Name`
  - `Teams ▸ Team Name`
- Breadcrumbs do **not** appear:
  - When using the default view sorted or filtered by recent activity
  - Inside the Editor + Preview panel (for all roles)
  - Inside global settings panels such as user management, trash, or template publishing workflows
- Clicking the folder or team name returns the user to that folder or team view.

This behavior ensures breadcrumbs are limited to **contextual navigation** within each role's file system — not as a full app-wide history trail.

---

### Future Considerations (Post-MVP)

- **Edge Case: Templates inside Teams**
  - In the future, Admins may navigate more deeply: `Teams ▸ Design Team ▸ Templates ▸ Folder Name`
  - Breadcrumbs may expand to support deeper nesting for templates or shared folders inside teams.

- **Interaction Detail: Back Button or History Behavior**
  - Clicking a breadcrumb does not modify browser history.
  - The browser Back button does not replicate breadcrumb clicks.