import { test, expect } from '@playwright/test'

test('review - dashboard', async ({ page }) => {
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  await expect(page).not.toHaveURL(/error/)
  await page.screenshot({ path: 'tests/screenshots/dashboard.png', fullPage: true })
})

test('review - vault page', async ({ page }) => {
  await page.goto('/vault')
  await page.waitForLoadState('networkidle')
  await page.screenshot({ path: 'tests/screenshots/vault.png', fullPage: true })
})

test('review - chat page', async ({ page }) => {
  await page.goto('/chat')
  await page.waitForLoadState('networkidle')
  await page.screenshot({ path: 'tests/screenshots/chat.png', fullPage: true })
})

test('review - settings page', async ({ page }) => {
  await page.goto('/settings')
  await page.waitForLoadState('networkidle')
  await page.screenshot({ path: 'tests/screenshots/settings.png', fullPage: true })
})

test('review - mobile 375px', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  await page.screenshot({ path: 'tests/screenshots/mobile.png', fullPage: true })
})

test('review - desktop 1280px', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 })
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  await page.screenshot({ path: 'tests/screenshots/desktop.png', fullPage: true })
})

test('review - console errors check', async ({ page }) => {
  const consoleErrors: string[] = []
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(`[${msg.type()}] ${msg.text()}`)
    }
  })
  page.on('pageerror', err => {
    consoleErrors.push(`[pageerror] ${err.message}`)
  })

  const routes = ['/', '/vault', '/chat', '/settings']
  for (const route of routes) {
    await page.goto(route)
    await page.waitForLoadState('networkidle')
  }

  if (consoleErrors.length > 0) {
    console.log('Console errors found:\n' + consoleErrors.join('\n'))
  }
  expect(consoleErrors, `Console errors found: ${consoleErrors.join(', ')}`).toHaveLength(0)
})
