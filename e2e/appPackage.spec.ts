import { test, expect } from '@playwright/test'

test.describe.serial('create, edit and delete an app package', () => {

  test('should go to the add package form', async ({ page }) => {
    await page.goto('/');
    await page.click('text=ADD PACKAGE');
    await expect(page).toHaveURL('/apps/add');
    await expect(page.locator('h1')).toContainText('Add Package');
  });

  test('should create an app package', async ({ page }) => {
    // Create a new app package
    await page.goto('/apps/add');
    await page.getByLabel('Display Name').fill('Test App');
    await page.getByLabel('Package name').fill('com.app.package.test');
    await page.getByLabel('Version').fill('v1.0.0');
    await page.getByLabel('Description (Markdown)').fill('## Changelog\n\n- This is a test application');
    await page.getByRole('button', { name: 'Draft' }).click();
    await page.getByRole('option', { name: 'Submitted' }).click();
    await page.getByRole('button', { name: 'Add Package' }).click();

    // Check that the user was redirected to the app package page
    await expect(page).toHaveURL('/apps/com.app.package.test/v1.0.0');

    // Check that the package was created correctly
    const header = page.locator('#app-package-header');
    await expect(header).toContainText('Test App v1.0.0');
    await expect(header).toContainText('com.app.package.test');
    await expect(header).toContainText('Submitted');
    await expect(page.getByText('This is a test application')).toBeVisible();
  });

  test('should delete an app package', async ({ page }) => {
    await page.goto('/apps/com.app.package.test/v1.0.0');
    await page.click('text=Actions');
    await page.click('text=Delete');

    // Check that page is redirected
    await expect(page).toHaveURL('/');

    // Check that app package no longer exists
    await expect(page.locator('table')).not.toContainText('Test App v1.0.0');
  });

});

test('should filter the table of app packages', async ({ page }) => {
  await page.goto('/');
  await page.locator('#search-input').fill('Weath');
  await expect(page.locator('table')).toContainText('Weather');
  await expect(page.locator('table')).not.toContainText('Stocks');
});
