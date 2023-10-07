const { expect } = require('@wdio/globals')
const preRetirementCalculator = require('../pageobjects/pre.retirement.calculator')
const data = require("../data/data.json")

describe('Pre-retirement calculator-', () => {
    beforeEach(async () => {
        await preRetirementCalculator.open()
    });

    it('Additional Social Security fields should display/hide based on Social Security benefits toggle', async () => {
        await expect(await preRetirementCalculator.getHeadingElement()).toHaveText('Pre-retirement calculator')
        await preRetirementCalculator.setValueInTextBoxWithOutInfoIcon("What is your current age?", data.social_security_benifits_toggle.what_is_your_current_age)
        await preRetirementCalculator.setValueInTextBoxWithOutInfoIcon("At what age do you plan to retire?", data.social_security_benifits_toggle.at_what_age_do_you_plan_to_retire)
        await preRetirementCalculator.setValueInTextBoxWithOutInfoIcon("What is your current annual income?", data.social_security_benifits_toggle.what_is_your_current_annual_income)

        await preRetirementCalculator.setValueInTextBoxWithInfoIcon("What is your current retirement savings balance?", data.social_security_benifits_toggle.what_is_your_current_retirement_savings_balance)
        await preRetirementCalculator.setValueInTextBoxWithInfoIcon("How much are you currently saving each year for retirement?", data.social_security_benifits_toggle.how_much_are_you_currently_saving_each_year_for_retirement)
        await preRetirementCalculator.setValueInTextBoxWithInfoIcon("What is the rate of increase in your savings each year?", data.social_security_benifits_toggle.what_is_the_rate_of_increase_in_your_savings_each_year)
        // Verifying Marital status radio button is not displayed before selection of social security
        await expect(await preRetirementCalculator.getMaritalStatusRadioButtonElement("Single")).not.toBeDisplayed()
        await preRetirementCalculator.clickSocialSecurityBenefitsRadioButton('Yes')
        // Verifying Marital status radio button is displayed before selection of social security
        await expect(await preRetirementCalculator.getMaritalStatusRadioButtonElement("Single")).toBeDisplayed()
        await preRetirementCalculator.clickMaritalStatusRadioButton('Married')
        await preRetirementCalculator.setValueInTextBoxWithInfoIcon("Social Security override amount", data.social_security_benifits_toggle.social_security_override_amount)
        //Verifying entered values are correct
        await expect(await preRetirementCalculator.getValueInTextBoxWithInfoIcon("Social Security override amount")).toEqual(data.social_security_benifits_toggle.expected_social_security_override_amount)
        await preRetirementCalculator.clickMenu("Calculate")
        //Verifying Results Heading displayed
        await expect(await preRetirementCalculator.getResultsHeadingElement()).toBeDisplayed()
    })

})

