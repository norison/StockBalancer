import { coverageConfigDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/ui/setupTests.ts",
    coverage: {
      provider: "v8",
      include: ["src/ui/**/*"],
      exclude: [
        ...coverageConfigDefaults.exclude,
        "src/ui/main.tsx",
        "src/ui/App.tsx",
        "src/ui/darkTheme.ts",
        "src/ui/container/**/*",
      ],
    },
  },
});
