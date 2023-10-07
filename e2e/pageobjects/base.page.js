const { browser } = require('@wdio/globals')

/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
module.exports = class BasePage {

    async open() {
        await browser.url(`https://www.securian.com/insights-tools/retirement-calculator.html`);
        await browser.maximizeWindow()
    }

    get menuLocator() {
        return '//button[text()="replace"]';
    }

    async getMenuElement(menuName) {
        return await $(this.menuLocator.replace("replace", menuName))
    }

    async clickMenu(menuName) {
        return await (await this.getMenuElement(menuName)).click();
    }


}
