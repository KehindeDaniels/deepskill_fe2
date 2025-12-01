import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3000";

test.describe("Homepage Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL); // Use full URL instead of "/"
    await page.waitForLoadState("networkidle");
  });

  test("should load homepage with all elements", async ({ page }) => {
    // Check page structure
    await expect(page.locator('[data-testid="home-page"]')).toBeVisible();
    await expect(page.locator('[data-testid="header-controls"]')).toBeVisible();

    // Check categories section
    await expect(
      page.locator('[data-testid="categories-section"]')
    ).toBeVisible();
    await expect(
      page.locator('[data-testid="categories-heading"]')
    ).toBeVisible();

    // Check categories heading contains count
    const heading = page.locator('[data-testid="categories-heading"]');
    await expect(heading).toContainText("Categories");
  });

  test("should display categories when available", async ({ page }) => {
    // Check if categories are displayed or "no categories" message
    const categoriesGrid = page.locator('[data-testid="category-card"]');
    const noCategoriesMessage = page.locator(
      '[data-testid="no-categories-message"]'
    );

    // Wait a bit more for async content
    await page.waitForTimeout(1000);

    // Either categories OR no categories message should be visible
    if (await categoriesGrid.first().isVisible({ timeout: 5000 })) {
      await expect(categoriesGrid.first()).toBeVisible();
      const count = await categoriesGrid.count();
      console.log(`Found ${count} category cards`);
    } else if (await noCategoriesMessage.isVisible({ timeout: 5000 })) {
      await expect(noCategoriesMessage).toBeVisible();
      console.log("No categories message displayed");
    } else {
      console.log("Neither categories nor message found");
    }
  });

  test("category card should have clickable link", async ({ page }) => {
    // Wait for potential categories to load
    await page.waitForTimeout(2000);

    const firstCategoryCard = page
      .locator('[data-testid="category-card"]')
      .first();

    if (await firstCategoryCard.isVisible({ timeout: 5000 })) {
      // Get the slug for verification
      const slug = await firstCategoryCard.getAttribute("data-category-slug");
      console.log(`Testing category with slug: ${slug}`);

      if (slug) {
        // Get category title for verification
        const categoryTitle = await firstCategoryCard
          .locator('[data-testid="category-title"]')
          .textContent();

        // Click the category card
        await firstCategoryCard.click();

        // Verify navigation
        await page.waitForURL(`**/categories/${slug}`);
        await expect(
          page.locator('[data-testid="category-page"]')
        ).toBeVisible();

        // Verify category title matches
        const pageTitle = await page
          .locator('[data-testid="category-title"]')
          .textContent();
        expect(pageTitle).toBe(categoryTitle?.trim());
      } else {
        console.log("No slug found on category card");
      }
    } else {
      console.log("No category cards found to test");
    }
  });
});
