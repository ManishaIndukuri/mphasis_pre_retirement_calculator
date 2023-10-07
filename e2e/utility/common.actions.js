module.exports = class CommonActions {

        static timeoutToElementAppears = 15000;

        static async clickElement(element) {
                await (element).waitForExist({ timeout: CommonActions.timeoutToElementAppears });
                await element.scrollIntoView()
                await (element).waitForDisplayed({ timeout: CommonActions.timeoutToElementAppears });
                return await (await element).click();
        }

        static async clickElementWithOutScroll(element) {
                await (element).waitForExist({ timeout: CommonActions.timeoutToElementAppears });
                await (element).waitForDisplayed({ timeout: CommonActions.timeoutToElementAppears });
                return await (await element).click();
        }

        static async setValueInElement(element, text) {
                await (element).waitForExist({ timeout: CommonActions.timeoutToElementAppears });
                await element.scrollIntoView()
                await element.click()
                await (element).waitForDisplayed({ timeout: CommonActions.timeoutToElementAppears });
                return await (element).setValue(text);
        }

        static async getColorOfElement(element) {
                await (element).waitForExist({ timeout: CommonActions.timeoutToElementAppears });
                await (element).waitForDisplayed({ timeout: CommonActions.timeoutToElementAppears });
                return await (await (element).getCSSProperty('color')).value
        }

}

