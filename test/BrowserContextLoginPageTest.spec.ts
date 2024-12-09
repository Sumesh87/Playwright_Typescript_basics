import {test, expect, Browser, Page, Locator, BrowserContext}  from "@playwright/test"
import {chromium, firefox}  from "playwright"
import { Context } from "vm"



test('Login into application',async () => {


    let browser: Browser=  await chromium.launch({headless:false})

    let context_01: BrowserContext  =await browser.newContext()
    let page1: Page=  await context_01.newPage()

    let context_02: BrowserContext  =await browser.newContext()
    let page2: Page=  await context_02.newPage()


    // Browser 1
    await page1.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');
    const emailTxtBx1: Locator = page1.locator('#input-email')
    const passwordTxtBx1: Locator = page1.locator('#input-password')
    const loginButton1: Locator = page1.locator("//input[@value='Login']")

    await emailTxtBx1.fill('sumeshattec@gmail.com')
    await passwordTxtBx1.fill('Welcome@123')
    await loginButton1.click()
    //await page1.waitForTimeout(5000)

    //await new Promise (()=> {})

    // Browser 1
    await page2.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');
    const emailTxtBx: Locator = page2.locator('#input-email')
    const passwordTxtBx: Locator = page2.locator('#input-password')
    const loginButton: Locator = page2.locator("//input[@value='Login']")

    await emailTxtBx.fill('sumeshattec@gmail.com')
    await passwordTxtBx.fill('Welcome@123')
    await loginButton.click()
    //await page1.waitForTimeout(5000)

    await new Promise (()=> {})

    
})