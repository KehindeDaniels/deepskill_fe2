import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("should navigate to category page", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Click first category card
    await page.locator('[data-testid="category-card"]').first().click();

    // Should be on category page
    await expect(page).toHaveURL(/\/categories\/.+/);

    // Check category title exists
    await expect(page.locator('h1:has-text("")')).toBeVisible();

    // Check back button exists
    await expect(page.locator('a:has-text("Back to Home")')).toBeVisible();

    // Check modules section exists
    await expect(page.locator('h2:has-text("Modules")')).toBeVisible();
  });

  test("should navigate to module page from category", async ({ page }) => {
    // Go to a category page first (you might need to seed data)
    await page.goto("/categories/some-category-slug"); // Replace with actual slug

    // Wait for page to load
    await page.waitForLoadState("networkidle");

    // Click first module card if exists
    const moduleCard = page.locator('a[href^="/modules/"]').first();

    if (await moduleCard.isVisible()) {
      await moduleCard.click();

      // Should be on module page
      await expect(page).toHaveURL(/\/modules\/.+/);

      // Check module title exists
      await expect(page.locator("h1")).toBeVisible();
    }
  });
});
