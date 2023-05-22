import { test, expect } from '@playwright/test'

test.describe.serial('create and delete notes', () => {
  test('should add a note', async ({ page }) => {
    await page.goto('/apps/com.app.package.weather/v1.0.0');

    await page.locator('#new-note-input').fill('This is a test note');
    await page.getByRole('button', { name: 'Add Note' }).click();

    // Check that the new note has been created
    const newNote = page.locator('#notes-list li:first-child');
    await expect(newNote).toContainText('Tom Test');
    await expect(newNote).toContainText('Just now');
    await expect(newNote).toContainText('This is a test note');
  });

  test('should delete a note', async ({ page}) => {
    await page.goto('/apps/com.app.package.weather/v1.0.0');

    const newNote = page.locator('#notes-list li:first-child');
    await expect(newNote).toContainText('This is a test note');
    await newNote.getByRole('button', { name: 'Delete' }).click();

    // Check that the note was deleted
    const firstNote = page.locator('#notes-list li:first-child');
    await expect(firstNote).not.toContainText('This is a test note');
  });

});
