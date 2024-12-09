import {Browser, chromium, Page,BrowserContext}  from "playwright"



describe('Launch browser', ()=>{

    let browser: Browser
    let context : BrowserContext
    let page:Page

    beforeAll(async ()=>{
         browser= await chromium.launch({
            headless: false
        })
        context= await browser.newContext()
        page= await context.newPage()
        
    })

    test('Test single page', async ()=>{      

        await page.goto("https://letcode.in/windows")

        const [newWindow] = await Promise.all([
            context.waitForEvent("page"),
            await page.click("#home")
       ])

       await newWindow.waitForLoadState()
       expect(newWindow.url()).toContain("test")

       await newWindow.getByText("Log in").click()
       //await newWindow.waitForNavigation({ timeout: 60000 })

       expect(newWindow.url()).toContain("signin")
       await page.bringToFront()

       await page.click("#testing")

    //    await context.close(); // Ensure context is closed properly
    //    await browser.close();

    }, 60000)


    test('Test multiple page', async ()=>{      

        await page.goto("https://letcode.in/windows")

        const [multipleWindow] = await Promise.all([
            context.waitForEvent("page"),
            await page.click("#multi")
       ])

       await multipleWindow.waitForLoadState()

       const allwindows=multipleWindow.context().pages()

       console.log("No of windows : " +  allwindows.length)

       allwindows.forEach((page: Page) => {
        console.log("No of pages : " + page.url())
        
       });
    })

    afterAll(async ()=>{
       await page.close()
       await context.close()
       await browser.close()
       
   })

})