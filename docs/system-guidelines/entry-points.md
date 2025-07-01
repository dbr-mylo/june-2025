# Entry Points

## App Initialization

- **Root component:** `src/App.tsx`
- **Bootstrap file:** `src/main.tsx`
- **Mount target:** `index.html` with `<div id="root">`

## Folder Roles

- **components/** — Shared UI elements (buttons, toolbars, etc.)
- **hooks/** — Reusable logic (e.g., role detection, editor state)
- **lib/** — Helper functions, constants, or shared configuration
- **pages/** — Reserved for future route-based structure

## Notes

- Current app structure uses Vite for bundling and React for UI.
- No routing logic is implemented yet. Role-based view control expected in future phases.
