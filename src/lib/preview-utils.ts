import type { StyleMap } from './TemplateEngine'

// Converts "Modern Report" → "modern-report"
export function toPreviewClassName(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-')
}

// Converts camelCase → kebab-case
export function camelToKebab(key: string): string {
  return key.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

// Generates raw CSS string from style map
export function generateInjectedCSS(styles: StyleMap): string {
  return Object.entries(styles)
    .map(([selector, rules]) => {
      const scopedSelector = selector.startsWith('.')
        ? selector
        : `.preview-body ${selector}`

      const styleString = Object.entries(rules)
        .map(([key, value]) => `${camelToKebab(key)}: ${value};`)
        .join(' ')

      return `${scopedSelector} { ${styleString} }`
    })
    .join('\n')
}
