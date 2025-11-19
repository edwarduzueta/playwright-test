import { test, expect } from '@playwright/test';

test.use({
  storageState: 'john-auth.json',
});

test('List Stuff Page', async ({ page }) => {
  // Go to the List Stuff page
  await page.goto('http://localhost:3000/list');

  // Navigation links are visible
  await expect(page.getByRole('link', { name: 'Add Stuff' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'List Stuff' })).toBeVisible();

  // Logged-in user is john@foo.com
  await expect(page.getByRole('button', { name: 'john@foo.com' })).toBeVisible();

  // The page heading is correct
  await expect(page.getByRole('heading', { name: 'Stuff' })).toBeVisible();

  // The table renders correctly
  const table = page.getByRole('table');
  await expect(table).toBeVisible();

  // There is at least one data row (row 0 is usually the header)
  const rows = table.getByRole('row');
  await expect(rows.nth(1)).toBeVisible();
});
