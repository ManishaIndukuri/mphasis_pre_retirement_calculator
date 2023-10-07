
const CommonActions = require('../utility/common.actions');
const BasePage = require('./base.page');
const { $ } = require('@wdio/globals')

class PreRetirementCalculator extends BasePage {
    /**
     * define selectors using getter methods
     */
    async getHeadingElement() {
        return await $('//section/h2');
    }

    async getResultsHeadingElement() {
        return await $('//section[@id="calculator-results-section"]//h3[text()="Results"]');
    }

    async getFillOutRequiredFieldsErrorElement() {
        return $('//section[@id="calculator-input-section"]//span[contains(@class,"fa-exclamation-triangle")]/following-sibling::p[text()="Please fill out all required fields"]');
    }

    async getTextBoxWithOutInfoIconElement(textBoxName) {
        return await $('//label[text()="' + textBoxName + '"]/following-sibling::input')
    }

    async getTextBoxWithInfoIconElement(textBoxName) {
        return await $("//label[contains(text(),'" + textBoxName + "')]/parent::div/following-sibling::input")
    }

    async getSocialSecurityBenifitsRadioButtonElement(buttonName) {
        return await $('//legend[@id="include-social-label"]/parent::fieldset//label[text()="' + buttonName + '"]')
    }

    async getMaritalStatusRadioButtonElement(buttonName) {
        return await $('//legend[@id="marital-status-label"]/parent::fieldset//label[text()="' + buttonName + '"]')
    }

    async getInflationRadioButtonElement(buttonName) {
        return await $('//legend[@id="inflation-label"]/parent::fieldset//label[text()="' + buttonName + '"]')
    }

    async getAdjustDefaultValueLinkElement() {
        return await $('//a[text()="Adjust default values"]');
    }

    async setValueInTextBoxWithOutInfoIcon(textBoxName, textValue) {
        return await CommonActions.setValueInElement(await this.getTextBoxWithOutInfoIconElement(textBoxName), textValue)
    }

    async getValueInTextBoxWithOutInfoIcon(textBoxName) {
        await CommonActions.clickElement(await this.getTextBoxWithOutInfoIconElement(textBoxName))
        return await (await this.getTextBoxWithOutInfoIconElement(textBoxName)).getProperty('oldValue');
    }

    async setValueInTextBoxWithInfoIcon(textBoxName, textValue) {
        return await CommonActions.setValueInElement(await this.getTextBoxWithInfoIconElement(textBoxName), textValue)
    }

    async getValueInTextBoxWithInfoIcon(textBoxName) {
        await CommonActions.clickElement(await this.getTextBoxWithInfoIconElement(textBoxName))
        return await browser.execute(`return arguments[0].value`, await (await this.getTextBoxWithInfoIconElement(textBoxName)))
    }

    async clickSocialSecurityBenefitsRadioButton(buttonToClick) {
        return await CommonActions.clickElementWithOutScroll(await this.getSocialSecurityBenifitsRadioButtonElement(buttonToClick))
    }

    async clickMaritalStatusRadioButton(buttonToClick) {
        return await CommonActions.clickElementWithOutScroll(await this.getMaritalStatusRadioButtonElement(buttonToClick))
    }

    async clickAdjustDefaultValueLink() {
        return await CommonActions.clickElementWithOutScroll(await this.getAdjustDefaultValueLinkElement())
    }

    async clickInflationRadioButton(buttonToClick) {
        return await CommonActions.clickElementWithOutScroll(await this.getInflationRadioButtonElement(buttonToClick))
    }

    async inputRequiredErrorElement(textBoxName) {
        return $('//label[contains(text(),"' + textBoxName + '")]/parent::div/following-sibling::span[text()="Input required"]');
    }

    async getColorOfFillOutRequiredFieldsError() {
        return await CommonActions.getColorOfElement(await this.getFillOutRequiredFieldsErrorElement())
    }
}

module.exports = new PreRetirementCalculator();
