import {Browser, BrowserContext,chromium, Page, Locator}  from "playwright"


describe("Frame Test", () => {

    let browser: Browser
    let context: BrowserContext
    let locator: Locator
    let page: Page

    jest.setTimeout(100000);


    beforeAll(async() =>{

        browser= await chromium.launch({
            headless: false
        })

        context= await browser.newContext()
        page=await context.newPage()
        await page.goto("https://letcode.in/frame")
    })

    test("Check frames" , async ()=>{
        const frame=page.frame({name: "firstFr"});

        if(frame!= null)
        {
            await frame.fill("input[name='fname']", "Sumesh")
            await frame.fill("input[name='lname']", "m s")

            const frames = frame.childFrames()
            console.log("No. of inner frames :" +  frames.length)

            if(frames!= null)
                await frames[1].fill("input[name='email']", "Sumeshattec@gmail.com")
            else
                console.log("Wrong frame " )

            const parent = frames[1].parentFrame()
            await parent?.fill("input[name='lname']", "Manager")
        }
        else
            throw new Error("no such frames")
    })

    // afterAll(async ()=>{
    //     await page.close()
    //     await context.close()
    //     await browser.close()
        
    // })


})