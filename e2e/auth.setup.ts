import { test as setup } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'Sign in with Google' }).click();
  await page.getByRole('textbox', { name: 'Email or phone' }).fill(process.env.GOOGLE_USERNAME);
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).fill(process.env.GOOGLE_PASSWORD);
  await page.locator('#passwordNext').getByRole('button', { name: 'Next' }).click();
  await page.waitForURL('http://localhost:3000/');

  await page.context().storageState({ path: authFile });
});
