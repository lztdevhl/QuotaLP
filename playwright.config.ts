import { defineConfig, devices } from "@playwright/test";
const chrome = process.env.QUOTA_CHROME_PATH
  ? { launchOptions: { executablePath: process.env.QUOTA_CHROME_PATH } }
  : { channel: "chrome" as const };
export default defineConfig({
  testDir: "./tests",
  testMatch: "**/*.spec.ts",
  fullyParallel: true,
  workers: 2,
  reporter: "list",
  use: { baseURL: "http://localhost:3000", trace: "retain-on-failure" },
  webServer: {
    command: "npm run start",
    url: "http://localhost:3000/pt-br",
    reuseExistingServer: !process.env.CI,
    timeout: 60000,
  },
  projects: [
    {
      name: "chrome-desktop",
      use: {
        ...devices["Desktop Chrome"],
        ...chrome,
        viewport: { width: 1440, height: 1000 },
      },
    },
    {
      name: "edge-desktop",
      use: {
        ...devices["Desktop Edge"],
        channel: "msedge",
        viewport: { width: 1440, height: 1000 },
      },
    },
    { name: "chrome-mobile", use: { ...devices["Pixel 7"], ...chrome } },
    { name: "edge-mobile", use: { ...devices["Pixel 7"], channel: "msedge" } },
  ],
});
