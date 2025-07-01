# Path Aliases

## Alias Mapping

Mylo uses `@` as a shortcut for the `/src` folder. These are configured in `tsconfig.json` and respected by Vite.

| Alias         | Path            |
|---------------|-----------------|
| `@/components`| `src/components`|
| `@/hooks`     | `src/hooks`     |
| `@/lib`       | `src/lib`       |

## File References

- `tsconfig.json`
- `vite.config.ts`

## Benefits

- Cleaner imports
- Avoids brittle `../../` chains
- Easier refactoring
