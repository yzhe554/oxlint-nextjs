import { defineConfig } from 'oxlint'

export default defineConfig({
	  "ignorePatterns": [],
  "categories": {
    "correctness": "off",
    "suspicious": "off",
    "pedantic": "off",
    "style": "off"
  },
  "plugins": [],
  "jsPlugins": ["./js-plugins/index.ts"],
  "rules": {
    "test/nextjs-require-prefetch": "error",
    "eqeqeq": ["error", "always", { "null": "ignore" }]
  },
  "overrides": [],
  "env": {
    "builtin": true
  }
})