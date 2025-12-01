import { test, expect } from "@playwright/test";

test.describe("Category Page Tests", () => {
  test("should load category page with correct structure", async ({ page }) => {
    // First go to homepage to get a category slug
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const firstCategory = page.locator('[data-testid="category-card"]').first();

    if (await firstCategory.isVisible()) {
      const slug = await firstCategory.getAttribute("data-category-slug");

      // Navigate directly to category page
      await page.goto(`/categories/${slug}`);
      await page.waitForLoadState("networkidle");

      // Check page structure
      await expect(page.locator('[data-testid="category-page"]')).toBeVisible();
      await expect(
        page.locator('[data-testid="back-to-home-link"]')
      ).toBeVisible();
      await expect(
        page.locator('[data-testid="category-banner"]')
      ).toBeVisible();
      await expect(
        page.locator('[data-testid="modules-section"]')
      ).toBeVisible();

      // Check category info
      await expect(
        page.locator('[data-testid="category-title"]')
      ).toBeVisible();

      // Check modules count is displayed
      const modulesHeading = page.locator('[data-testid="modules-heading"]');
      await expect(modulesHeading).toContainText("Modules");
    }
  });

  test("should display modules when available", async ({ page }) => {
    // You might need to use a specific category slug that has modules
    const testCategorySlug = "your-test-category-slug"; // Replace with actual slug

    await page.goto(`/categories/${testCategorySlug}`);
    await page.waitForLoadState("networkidle");

    const modulesGrid = page.locator('[data-testid="modules-grid"]');
    const noModulesMessage = page.locator('[data-testid="no-modules-message"]');

    if (await modulesGrid.isVisible()) {
      // Check module cards exist
      const moduleCards = page.locator('[data-testid^="module-card-"]');
      await expect(moduleCards.first()).toBeVisible();

      const count = await moduleCards.count();
      console.log(`Found ${count} module cards in category`);
    } else if (await noModulesMessage.isVisible()) {
      await expect(noModulesMessage).toContainText("No modules available");
    }
  });

  test("back button should navigate to homepage", async ({ page }) => {
    // Go to a category page
    await page.goto("/categories/some-category"); // Replace with actual slug
    await page.waitForLoadState("networkidle");

    // Click back button
    await page.locator('[data-testid="back-to-home-link"]').click();

    // Should navigate to homepage
    await page.waitForURL("**/");
    await expect(page.locator('[data-testid="home-page"]')).toBeVisible();
  });

  test("should show 404 for non-existent category", async ({ page }) => {
    const response = await page.goto("/categories/non-existent-category-12345");

    // Should get 404 status
    expect(response?.status()).toBe(404);

    // Check Next.js 404 page is shown
    await expect(page.locator('h1:has-text("404")')).toBeVisible();
  });
});
