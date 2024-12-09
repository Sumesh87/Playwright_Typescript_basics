import {Browser, chromium, Page}  from "playwright"
import { Context } from "vm"


describe('Launch browser', ()=>{

    let browser: Browser
    let newContext : Context
    let page:Page

    beforeAll(async ()=>{
         browser= await chromium.launch({
            headless: false
        })
        newContext= await browser.newContext()
        page= await newContext.newPage()
        
    })

    test('Handle dropdown', async ()=>{      

        await page.goto("https://letcode.in/dropdowns")

        let fruits=  page.locator('#fruits');
        await fruits?.selectOption("2")

        let msg=  page.locator('div.notification.is-success')
        if(msg){
            expect(await msg.textContent()).toContain("Orange")
        }

        await browser.close()

    }, 10000)

})