import { test, expect } from '@playwright/test'

test('dashboard loads', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Vault/)
  await expect(page.locator('text=ホーム').first()).toBeVisible()
})

test('vault page loads', async ({ page }) => {
  await page.goto('/vault')
  await expect(page.locator('text=Vault').first()).toBeVisible()
})

test('chat page loads', async ({ page }) => {
  await page.goto('/chat')
  await expect(page.locator('text=AIチャット').first()).toBeVisible()
})
