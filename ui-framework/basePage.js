const fs = require('fs');
const path = require('path')
const { Builder, By,until,Key } = require("selenium-webdriver");
const utilFunc = require('./utilFunction');
const { promisify } = require('util');
const locator = require('./Locators');
const log4js = require('log4js');
const log = log4js.getLogger('SeleniumLogger');
log.level = 'info';
let flag;
let o;
let beforePath  = path.resolve(__dirname, '..');
let errorPath = 'ui-framework/ErrorSource';
let BasePage = function(browser,headlessFlag) {
    switch (browser){
        case 'chrome':
            let chrome = require('selenium-webdriver/chrome');
            let chromedriver = require('./Driver/chromedriver_mac');

            if(chrome.getDefaultService().isRunning()){
                chrome.getDefaultService().kill();
            }
            chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

            o = new chrome.Options();
            if(headlessFlag == false){
                o.addArguments('disable-infobars');
                o.setUserPreferences({ credential_enable_service: false });
                this.driver = new Builder()
                    .setChromeOptions(o)
                    .forBrowser('chrome')
                    .build()

            }else {

                o.addArguments('--headless','--no-sandbox','--disable-dev-shm-usage');
                //o.setBinaryPath('/home/jenkins/workspace/One-Automation-Test-QA/node_modules/chromedriver/lib/chromedriver');
                o.setUserPreferences({ credential_enable_service: false });

                this.driver = new Builder()
                    .setChromeOptions(o)
                    .forBrowser('chrome')
                    .build()
            }
            break;
        case 'ie':
            let ie = require('selenium-webdriver/ie');
            let iedriver = require('iedriver');
            this.driver = new Builder()
                .forBrowser('internet explorer')
                .build()
            break;
        case 'firefox':
            let firefox = require('selenium-webdriver/firefox');
            let firefoxdriver = require('geckodriver');
            this.driver = new Builder()
                .forBrowser('firefox')
                .build()
            break;
        case 'edge':
            let edge = require('selenium-webdriver/edge');
            let edgedriver = require('edgedriver');
            this.driver = new Builder()
                .forBrowser('edge')
                .build()
            break;
        default:
    }
// visit a webpage;
    this.visit = async function(url) {
        try {
            await this.driver.get(url);
            log.info(`go to ${url} successfully.`);

        }catch (e) {
            log.error(`go to ${url} failed`,e);
        }

        //console.log(`go to ${url} successfully.`);

    };
// max browser;
    this.maxBrowser = async function(){

        try {
            let max = await this.driver.manage().window().maximize();
            log.info(`max browser successfully.`);
            //console.log(`max browser successfully.`);
            return max;
        }catch (e) {
            log.error(`max browser successfully`,e);
        }
    }
// quit current session;
    this.quitBrowser = async function() {
        log.info(`quit browser successfully.`);
        //console.log(`quit browser successfully.`);
        return await this.driver.quit();
    };
// wait and find a specific element with it's type(id,xpath,name,css)
    this.findElement = async function(type,loc){
        if(type =='id'){
            try{
                await this.driver.wait(until.elementLocated(By.id(loc)), 150000, 'Looking for element');
                flag = true;
            }catch (e) {
                log.error(`find element by ID ${loc} failed because of ${e}`);
                flag = false;
            }finally {
                if(flag ==false){
                    log.error(`find element by ID ${loc} failed `);
                    let path = `${errorPath}`+Date.now()+'.jpg';
                    await this.screenShot(path);
                    return -1;
                }else {
                    log.info(`find element by ID ${loc} successfully.`);
                    return await this.driver.findElement(By.id(loc));
                };
            }
        }
        if(type =='xpath'){
            try{
                await this.driver.wait(until.elementLocated(By.xpath(loc)), 150000, 'Looking for element');
                flag = true;
            }catch (e) {
                log.error(`find element by xpath ${loc} failed because of ${e}`);
                flag = false;
            }finally {
                if(flag ==false){
                    log.error(`find element by xpath ${loc} failed `);
                    let path = `${errorPath}`+Date.now()+'.jpg';
                    await this.screenShot(path);
                    return -1;
                }else {
                    log.info(`find element by xpath ${loc} successfully.`);
                    return await this.driver.findElement(By.xpath(loc));
                };
            }

        }
        if(type=='name'){
            try{
                await this.driver.wait(until.elementLocated(By.name(loc)), 150000, 'Looking for element');
                flag = true;
            }catch (e) {
                log.error(`find element by NAME ${loc} failed because of ${e}`);
                flag = false
            }finally {
                if(flag ==false){
                    log.error(`find element by NAME ${loc} failed `);
                    let path = `${errorPath}`+Date.now()+'.jpg';
                    await this.screenShot(path);
                    return -1;
                }else {
                    log.info(`find element by NAME ${loc} successfully.`);
                    return await this.driver.findElement(By.name(loc));
                };
            }
        }
        if(type =='css'){
            try{
                await this.driver.wait(until.elementLocated(By.css(loc)), 150000, 'Looking for element');
                flag = true;
            }catch (e) {
                log.error(`find element by CSS ${loc} failed because of ${e}`);
                flag = false
            }finally {
                if(flag ==false){
                    log.error(`find element by CSS ${loc} failed `);
                    let path = `${errorPath}`+Date.now()+'.jpg';
                    await this.screenShot(path);
                    return -1;
                }else {
                    log.info(`find element by CSS ${loc} successfully.`);
                    return await this.driver.findElement(By.css(loc));
                };
            }

        }
        if(type=='link'){
            try{
                await this.driver.wait(until.elementLocated(By.linkText(loc)), 150000, 'Looking for element');
                flag = true;
            }catch (e) {
                log.error(`find element by LINKTEXT ${loc} failed because of ${e}`);
                flag = false
            }finally {
                if(flag ==false){
                    log.error(`find element by LINKTEXT ${loc} failed `);
                    let path = `${errorPath}`+Date.now()+'.jpg';
                    await this.screenShot(path);
                    return -1;
                }else {
                    log.info(`find element by LINKTEXT ${loc} successfully.`);
                    return await this.driver.findElement(By.linkText(loc));
                };
            }
        }
        if(type=='parLink'){
            try{
                await this.driver.wait(until.elementLocated(By.partialLinkText(loc)), 150000, 'Looking for element');
                flag = true;
            }catch (e) {
                log.error(`find element by partialLinkText ${loc} failed because of ${e}`);
                flag = false
            }finally {
                if(flag ==false){
                    log.error(`find element by partialLinkText ${loc} failed `);
                    let path = `${errorPath}`+Date.now()+'.jpg';
                    await this.screenShot(path);
                    return -1;
                }else {
                    log.info(`find element by partialLinkText ${loc} successfully.`);
                    return await this.driver.findElement(By.partialLinkText(loc));
                };
            }
        }
        if(type=='className'){
            try{
                await this.driver.wait(until.elementLocated(By.className(loc)), 150000, 'Looking for element');
                flag = true;
            }catch (e) {
                log.error(`find element by className ${loc} failed because of ${e}`);
                flag = false
            }finally {
                if(flag ==false){
                    log.error(`find element by className ${loc} failed `);
                    let path = `${errorPath}`+Date.now()+'.jpg';
                    await this.screenShot(path);
                    return -1;
                }else {
                    log.info(`find element by className ${loc} successfully.`);
                    return await this.driver.findElement(By.className(loc));
                };
            }
        }
    };
// wait and find not only elements.
    this.findElements = async function(type,loc,len) {
        if(type=='id'){
            try {
                await this.driver.wait(until.elementLocated(By.id(loc)), 150000, 'Looking for element');
                let elems = await this.driver.findElements(By.id(loc));
                log.info(`find elements by id ${elems} successfully.`);
                let el = elems[len];
                log.info(`find element by id ${el} successfully.`);
                return el;
            }catch (e) {
                log.error(`find element by id ${loc} failed because of ${e}`);
                let path = `${errorPath}`+Date.now()+'.jpg';
                await this.screenShot(path);
                return false;
            }
        }

        if(type=='xpath'){
            try {
                await this.driver.wait(until.elementLocated(By.xpath(loc)), 150000, 'Looking for element');
                let elems = await this.driver.findElements(By.xpath(loc));
                log.info(`find elements by xpath ${elems} successfully.`);
                let el = elems[len];
                log.info(`find element by xpath ${el} successfully.`);
                return el;
            }catch (e) {
                log.error(`find element by xpath ${loc} failed because of ${e}`);
                let path = `${errorPath}`+Date.now()+'.jpg';
                await this.screenShot(path);
                return false;
            }
        }
        if(type=='name'){
            try {
                await this.driver.wait(until.elementLocated(By.name(loc)), 150000, 'Looking for element');
                let elems = await this.driver.findElements(By.name(loc));
                log.info(`find elements by name ${elems} successfully.`);
                let el = elems[len];
                log.info(`find element by name ${el} successfully.`);
                return el;
            }catch (e) {
                log.error(`find element by name ${loc} failed because of ${e}`);
                let path = `${errorPath}`+Date.now()+'.jpg';
                await this.screenShot(path);
                return false;
            }
        }
        if(type=='css'){
            try {
                await this.driver.wait(until.elementLocated(By.css(loc)), 150000, 'Looking for element');
                let elems = await this.driver.findElements(By.css(loc));
                log.info(`find elements by css ${elems} successfully.`);
                let el = elems[len];
                log.info(`find element by css ${el} successfully.`);
                return el;
            }catch (e) {
                log.error(`find element by css ${loc} failed because of ${e}`);
                let path = `${errorPath}`+Date.now()+'.jpg';
                await this.screenShot(path);
                return false;
            }
        }
        if(type=='link'){
            try {
                await this.driver.wait(until.elementLocated(By.linkText(loc)), 150000, 'Looking for element');
                let elems = await this.driver.findElements(By.linkText(loc));
                log.info(`find elements by linkText ${elems} successfully.`);
                let el = elems[len];
                log.info(`find element by linkText ${el} successfully.`);
                return el;
            }catch (e) {
                log.error(`find element by linkText ${loc} failed because of ${e}`);
                let path = `${errorPath}`+Date.now()+'.jpg';
                await this.screenShot(path);
                return false;
            }
        }
        if(type=='parLink'){
            try {
                await this.driver.wait(until.elementLocated(By.partialLinkText(loc)), 150000, 'Looking for element');
                let elems = await this.driver.findElements(By.partialLinkText(loc));
                log.info(`find elements by partialLinkText ${elems} successfully.`);
                let el = elems[len];
                log.info(`find element by partialLinkText ${el} successfully.`);
                return el;
            }catch (e) {
                log.error(`find element by partialLinkText ${loc} failed because of ${e}`);
                let path = `${errorPath}`+Date.now()+'.jpg';
                await this.screenShot(path);
                return false;
            }
        }
        if(type=='tagName'){
            try {
                await this.driver.wait(until.elementLocated(By.tagName(loc)), 150000, 'Looking for element');
                let elems = await this.driver.findElements(By.tagName(loc));
                log.info(`find elements by tagName ${elems} successfully.`);
                let el = elems[len];
                log.info(`find element by tagName ${el} successfully.`);
                return el;
            }catch (e) {
                log.error(`find element by tagName ${loc} failed because of ${e}`);
                let path = `${errorPath}`+Date.now()+'.jpg';
                await this.screenShot(path);
                return false;
            }
        }
        if(type=='className'){
            try {
                await this.driver.wait(until.elementLocated(By.className(loc)), 150000, 'Looking for element');
                let elems = await this.driver.findElements(By.className(loc));
                log.info(`find elements by className ${elems} successfully.`);
                let el = elems[len];
                log.info(`find element by className ${el} successfully.`);
                return el;
            }catch (e) {
                log.error(`find element by className ${loc} failed because of ${e}`);
                let path = `${errorPath}`+Date.now()+'.jpg';
                await this.screenShot(path);
                return false;
            }
        }


    };
    //wait until element is visable
    this.waitNormal = async function(loc){
        try {
            await this.driver.wait(until.elementLocated(By.xpath(loc)),100000);
            return true;
        }catch (e){
            log.error(`${loc} not found.`);
        }


    }
//driver screenshot
    this.screenShot = async function(path){
        let base64 = await this.driver.takeScreenshot();
        let buffer = Buffer.from(base64,'base64');
        await promisify(fs.writeFile)(path, buffer);

    };
//element screenshot
    this.elementScreenShot = async function(path,type,lo){
        let el = await this.findElement(type,lo);
        let base64 = await el.takeScreenshot();
        let buffer = Buffer.from(base64,'base64');
        await promisify(fs.writeFile)(path, buffer);

    };
// send keys to element;
    this.write = async function (el, txt) {
        try {
            log.info(`input text ${txt} in element ${el} successfully.`);
            return await el.sendKeys(txt);
        }catch (e) {
            log.error(`input text ${txt} in element ${el} failed because of ${e}`);
        }

    };
    
// get element value;
    this.getAttribute = async function (el, value) {
        try {
            let field = await el.getAttribute(value);
            log.info(`get ${value} ${field} in element ${el} successfully.`);
            return field;
        }catch (e) {
            log.error(`get ${value} in element ${el} failed because of ${e}`);
        }

    };
//click element
    this.click = async function (el) {
        try {
            let cl = await el.click();
            log.info(`click element ${el} successfully.`);
            return cl;
        }catch(e){
            log.error(`click element ${el} failed because of ${e}`);
        }

    };
//get current title;
    this.getTitle = async function(){
        let title = await this.driver.getTitle();
        log.info(`Current title is ${title}`);
        return title;
    };
//get current url;
    this.getUrl = async function(){
        let url = await this.driver.getCurrentUrl();
        log.info(`Current url is ${url};`);
        return url
    };
//get current text;
    this.getText= async function(el){
        try {
            let text = await el.getText();
            log.info(`Current text is ${text};`);
            return text;
        }catch (e) {
            log.error(`error displayed ${e}`);
        }

    };
//sleep
    this.sleep = async function(ss){
        //log.info(`sleep ${ss} ms`);
        await this.driver.sleep(ss);
    };
//close current window;
    this.close = async function(){
        log.info(`close current window.`);
        await this.driver.close();
    };
//get currentHandle
    this.getCurrentHandle = async function(){
        let handle = await this.driver.getWindowHandle();
        log.info(`Get current window handle ${handle}`);
        return handle;
    };
//get all handles;
    this.getAllHandles = async function(){
        let handles = await this.driver.getAllWindowHandles();
        log.info(`Get all window handle ${handles}`);
        return handles;
    };
//switch windows to you want switch handle;
    this.switchToWindows = async function(s){
        this.driver.switchTo().window(s);
    };
    this.mouseMove = async function(el){
        await this.driver.mouseMove(el);
    };
    this.clear = async function (el) {
        try {
            let cl = await el.clear();
            log.info(`clear element ${el} successfully.`);
            return cl;
        }catch(e){
            log.error(`clear element ${el} failed because of ${e}`);
            if(e)throw e;
        }

    };
    this.isSelected = async function(el){

        let flag = await el.isSelected();
        return flag;
    };
    this.back = async function(){
        log.info(`back browser`);
        await this.driver.back();
    };
    this.refreshPage = async function(){
        await this.driver.navigate().refresh();
        await this.sleep(1000);
        log.info(`refresh browser successfully.`);

    };
    this.forward = async function(){
        log.info(`back browser`);
        await this.driver.navigate().forward();
    };

};
BasePage.prototype.openBrowser = async function(url){
    await this.maxBrowser();
    await this.visit(url);
};
BasePage.prototype.getValue = async function(type,xpath){
    let loc = await this.findElement(type,xpath)
    if( loc == -1){
        log.error(`element ${xpath} is not visible`);
    }else {
        let text = await this.getText(loc);
        return text;
    }

};
BasePage.prototype.getAttributes = async function(type,xpath,value){
    let loc = await this.findElement(type,xpath);
    if( loc == -1){
        log.error(`element ${xpath} is not visible`);
    }else {
        await this.sleep(2000);
        let field = await this.getAttribute(loc,value);
        return field;
    }

};
BasePage.prototype.getValues = async function(type,xpath,len){
    let loc = await this.findElements(type,xpath,len);
    return await this.getText(loc);

}
BasePage.prototype.getColor = async function(type,xpath){
    let loc = await this.findElement(type,xpath);
    if( loc == -1){
        log.error(`element ${xpath} is not visible`);
    }else {
        let color = loc.getCssValue('background-color');
        return color;
    }
};
BasePage.prototype.getColors = async function(type,xpath,len){
    let loc = await this.findElements(type,xpath,len);
    let color = loc.getCssValue('background-color');
    return color;
};
BasePage.prototype.getFontColors = async function(type,xpath,len){
    let loc = await this.findElements(type,xpath,len);
    let color = loc.getCssValue('color');
    return color;
};
BasePage.prototype.exchangeColor = async function(field){
    let color = await utilFunc.getValue(field);
    return color;
};
BasePage.prototype.type = async function(type,xpath,txt){
    let loc = await this.findElement(type,xpath);
    if( loc == -1){
        log.error(`element ${xpath} is not visible`);
    }else {
        await this.write(loc,txt);
    }
};
BasePage.prototype.types = async function(type,locs,len,txt){
    let loc = await this.findElements(type,locs,len);
    await this.write(loc,txt);
};
BasePage.prototype.clickElements = async function(type,xpath,len){
    let loc = await this.findElements(type,xpath,len);
    await this.click(loc);
};
BasePage.prototype.clickElement = async function(type,xpath){
    let loc = await this.findElement(type,xpath);
    if( loc == -1){
        log.error(`element ${xpath} is not visible`);

    }else {
        await this.sleep(100);
        await this.click(loc);
    }
};
BasePage.prototype.clearElement = async function(type,xpath){
    let loc = await this.findElement(type,xpath);
    if(loc ==-1){
        log.error(`element ${xpath} is not visible`);
    }else{
        await this.sleep(2000);
        await this.clear(loc);
    }
};
BasePage.prototype.clearElements = async function(type,xpath,len){
    let loc = await this.findElements(type,xpath,len);
    //await this.sleep(2000);
    await this.clear(loc);
};
BasePage.prototype.isElementVisable = async function(type,xpath){
    let loc = await this.findElement(type,xpath);
    if( loc == -1){
        console.log(`element ${xpath} is not visible`);
        return false;
    }else {
        console.log(`element ${xpath} is visible`);
        return true;
    }
};
BasePage.prototype.mouseMoveAction = async function(type,xpath){
    let loc = await this.findElement(type,xpath);
    await this.mouseMove(loc);
};
BasePage.prototype.isElementSelected = async function(type,xpath){
    let loc = await this.findElement(type,xpath);
    if( loc == -1){
        console.log(`element ${xpath} is not visible`);
        return false;
    }else {
        let flag = await this.isSelected(loc);
        return flag;
    }

};
BasePage.prototype.scrolls = async function(type,lo,len){
    let el = await this.findElements(type,lo,len);
    await this.driver.executeScript("arguments[0].scrollIntoView()", el);
}
BasePage.prototype.scroll = async function(type,lo){
    let el = await this.findElement(type,lo);
    if( el == -1){
        console.log(`element ${lo} is not visible`);
        return false;
    }else {
        await this.driver.executeScript("arguments[0].scrollIntoView()", el);

    }
}

//business level;
BasePage.prototype.login  = async function(user,pwd){
    await this.type('id',locator.loginPage.user_locator,user);
    await this.type('id',locator.loginPage.password_locator,pwd);
    await this.clickElement('xpath','xpath');
};
module.exports = BasePage;
