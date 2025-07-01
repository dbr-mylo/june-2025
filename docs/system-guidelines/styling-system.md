# Styling System

## Libraries

- TailwindCSS — utility-first styling engine
- shadcn/ui — component library built on Radix + Tailwind

## Config

- `tailwind.config.ts` sets custom values:
  - Colors, border radius, font families
  - Includes `shadcn-preset` if installed
- Base styles are injected via `src/index.css`
- No `theme.ts` abstraction file used — customization is handled inline

## Notes

- Consistent spacing, radius, and typography are handled through Tailwind token design.
- Future color theming (e.g., light/dark) may be added using CSS variables and Tailwind theming support.
