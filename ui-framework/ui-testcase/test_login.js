let Page = require('../basePage');
const assert = require("assert");
const locator = require('../Locators');

describe("test demo 001 ", async function ()  {
    this.timeout(200000);
    let page;
    let url = '';
    let password = '';
    let title = '';

    before(async() => {
        page = new Page('chrome',true);
        await page.openBrowser(url);
    });

    after(async() => {
        await page.quitBrowser();
    });

    it("LoginAction Check ", async () => {
        await page.login(locator.loginPage.username,password);
        let title_res = await page.getTitle();
        let url_res = await page.getUrl();
        await assert.equal(url,url_res);
        await assert.equal(title,title_res);
        let path = '';
        await page.screenShot(path);

    });


});