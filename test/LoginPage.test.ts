import {test, expect, Browser, Page, Locator}  from "@playwright/test"
import {chromium, firefox}  from "playwright"
import { Context } from "vm"



test('Login into application',async () => {


    let browser: Browser=  await chromium.launch({headless:false})
    let page: Page=  await browser.newPage()

    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');


    const emailTxtBx: Locator = page.locator('#input-email')
    const passwordTxtBx: Locator = page.locator('#input-password')
    const loginButton: Locator = page.locator("//input[@value='Login']")

    await emailTxtBx.fill('sumeshattec@gmail.com')
    await passwordTxtBx.fill('Welcome@123')
    await loginButton.click()
    await page.waitForTimeout(5000)

    
})