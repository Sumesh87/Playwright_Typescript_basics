import { chromium, test } from "@playwright/test";



test("This is a smoke test",  {   tag: ['@smoke']   }, async () => {

    const browser =  await chromium.launch()
    const context =  await browser.newContext()
    const page =  await context.newPage()


    await page.goto("https://ecommerce-playground.lambdatest.io/")
    await page.hover("(//span[contains(text(),'My account')])[2]")
    await page.click("'Login'")

    await page.fill("input[name='email']","sumeshattec@gmail.com")
    await page.fill("input[name='password']","Welcome@123")

    await page.click("input[value='Login']")

    await page.waitForTimeout(5000)

    const context2 =  await browser.newContext()
    const page2 =  await context2.newPage()    
    await page2.goto("https://ecommerce-playground.lambdatest.io/index.php?route=account/account")

    await page2.waitForTimeout(5000)

})


