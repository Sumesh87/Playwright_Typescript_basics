import { Browser, BrowserContext, Page, Locator, chromium}  from "playwright"


describe("Handle multiple elements" , () =>{

    let browser: Browser
    let context: BrowserContext
    let locator: Locator
    let page: Page

    beforeAll(async() =>{

        browser= await chromium.launch({
            headless: false,
            args: ["--start-maximized"],
        })

        context= await browser.newContext({ viewport: null })
        page=await context.newPage()
        await page.goto("https://letcode.in/elements")
    })

    test("type git name" ,async () =>{

       const gitname=  page.locator("input[name='username']")

       await gitname?.fill("sumesh87")
       await gitname?.press("Enter")
    
    })

    test("Print all names from list" ,async () =>{

        await page.waitForSelector("app-gitrepos ol li", {timeout:5000})

        // locator.all() - to get list of locators
        const repos =  await page.locator("app-gitrepos ol li").all()
        console.log(repos.length);

        // use for-await to wait for promise to be resolved
        for await (const repo of repos)
        {
            console.log(await repo.innerText());
        }

        // Method 2: using map
        console.log("Method 2: ");
        const allUrls =  await Promise.all( repos.map(async (repo, i)=> {

            return await repo.innerText()
        }))

        console.log(allUrls);
    
    })

})