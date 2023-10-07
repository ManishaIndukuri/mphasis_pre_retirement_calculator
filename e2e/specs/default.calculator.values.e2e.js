const { expect } = require('@wdio/globals')
const preRetirementCalculator = require('../pageobjects/pre.retirement.calculator')
const data = require("../data/data.json")

describe('Pre-retirement calculator-', () => {
  beforeEach(async () => {
    await preRetirementCalculator.open()

  });

  it('User should be able to update default calculator values', async () => {
    await expect(await preRetirementCalculator.getHeadingElement()).toHaveText('Pre-retirement calculator')
    await preRetirementCalculator.setValueInTextBoxWithOutInfoIcon("What is your current age?", data.default_calculator_values.what_is_your_current_age)
    await preRetirementCalculator.setValueInTextBoxWithOutInfoIcon("At what age do you plan to retire?", data.default_calculator_values.at_what_age_do_you_plan_to_retire)
    await preRetirementCalculator.setValueInTextBoxWithOutInfoIcon("What is your current annual income?", data.default_calculator_values.what_is_your_current_annual_income)

    await preRetirementCalculator.setValueInTextBoxWithInfoIcon("What is your current retirement savings balance?", data.default_calculator_values.what_is_your_current_retirement_savings_balance)
    await preRetirementCalculator.setValueInTextBoxWithInfoIcon("How much are you currently saving each year for retirement?", data.default_calculator_values.how_much_are_you_currently_saving_each_year_for_retirement)
    await preRetirementCalculator.setValueInTextBoxWithInfoIcon("What is the rate of increase in your savings each year?", data.default_calculator_values.what_is_the_rate_of_increase_in_your_savings_each_year)
    // Verifying Marital status radio button is not displayed before selection of social security
    await expect(await preRetirementCalculator.getMaritalStatusRadioButtonElement("Single")).not.toBeDisplayed()
    await preRetirementCalculator.clickSocialSecurityBenefitsRadioButton('Yes')
    // Verifying Marital status radio button is displayed before selection of social security
    await expect(await preRetirementCalculator.getMaritalStatusRadioButtonElement("Single")).toBeDisplayed()
    await preRetirementCalculator.clickMaritalStatusRadioButton('Married')
    await preRetirementCalculator.setValueInTextBoxWithInfoIcon("Social Security override amount", data.default_calculator_values.social_security_override_amount)
    //Verifying entered values are correct
    await expect(await preRetirementCalculator.getValueInTextBoxWithInfoIcon("Social Security override amount")).toEqual(data.default_calculator_values.expected_social_security_override_amount)

    await preRetirementCalculator.clickAdjustDefaultValueLink()

    await preRetirementCalculator.setValueInTextBoxWithInfoIcon("What other income will you have during retirement?", data.default_calculator_values.expected_what_other_income_will_you_have_during_retirement)
    await preRetirementCalculator.setValueInTextBoxWithInfoIcon("How many years do you plan to depend on retirement income?", data.default_calculator_values.how_many_years_do_you_plan_to_depend_on_retirement_income)

    // Verifying expected inflation rate text box is not displayed before selection of social security
    await expect(await preRetirementCalculator.getTextBoxWithInfoIconElement("If yes, what is the expected inflation rate?")).not.toBeDisplayed()
    await preRetirementCalculator.clickInflationRadioButton('Yes')
    // Verifying expected inflation rate text box is  displayed before selection of social security
    await expect(await preRetirementCalculator.getTextBoxWithInfoIconElement("If yes, what is the expected inflation rate?")).toBeDisplayed()
    await preRetirementCalculator.setValueInTextBoxWithInfoIcon("If yes, what is the expected inflation rate?", data.default_calculator_values.if_yes_what_is_the_expected_inflation_rate)

    //Verifying entered values are correct
    await expect(await preRetirementCalculator.getValueInTextBoxWithInfoIcon("If yes, what is the expected inflation rate?")).toEqual(data.default_calculator_values.expected_if_yes_what_is_the_expected_inflation_rate)

    await preRetirementCalculator.setValueInTextBoxWithInfoIcon("How much of your final annual income do you want available in each year of your retirement?", data.default_calculator_values.how_much_of_your_final_annual_income_do_you_want_available_in_each_year_of_your_retirement)
    await preRetirementCalculator.setValueInTextBoxWithInfoIcon("Pre-retirement investment return", data.default_calculator_values.pre_retirement_investment_return)
    await preRetirementCalculator.setValueInTextBoxWithInfoIcon("Post-retirement investment return", data.default_calculator_values.post_retirement_investment_return)

    //Verifying entered values are correct
    await expect(await preRetirementCalculator.getValueInTextBoxWithInfoIcon("What other income will you have during retirement?")).toEqual(data.default_calculator_values.expected_what_other_income_will_you_have_during_retirement)
    await expect(await preRetirementCalculator.getValueInTextBoxWithInfoIcon("How many years do you plan to depend on retirement income?")).toEqual(data.default_calculator_values.expected_how_many_years_do_you_plan_to_depend_on_retirement_income)
    await expect(await preRetirementCalculator.getValueInTextBoxWithInfoIcon("How much of your final annual income do you want available in each year of your retirement?")).toEqual(data.default_calculator_values.expected_how_much_of_your_final_annual_income_do_you_want_available_in_each_year_of_your_retirement)
    await expect(await preRetirementCalculator.getValueInTextBoxWithInfoIcon("Pre-retirement investment return")).toEqual(data.default_calculator_values.expected_pre_retirement_investment_return)
    await expect(await preRetirementCalculator.getValueInTextBoxWithInfoIcon("Post-retirement investment return")).toEqual(data.default_calculator_values.expected_post_retirement_investment_return)
    await preRetirementCalculator.clickMenu("Save changes")

    //Verifying previously entered values are still present
    await expect(await preRetirementCalculator.getValueInTextBoxWithOutInfoIcon("What is your current age?")).toEqual(data.default_calculator_values.expected_what_is_your_current_age)
    await expect(await preRetirementCalculator.getValueInTextBoxWithOutInfoIcon("At what age do you plan to retire?")).toEqual(data.default_calculator_values.expected_at_what_age_do_you_plan_to_retire)
    await expect(await preRetirementCalculator.getValueInTextBoxWithOutInfoIcon("What is your current annual income?")).toEqual(data.default_calculator_values.expected_what_is_your_current_annual_income)
    await expect(await preRetirementCalculator.getValueInTextBoxWithInfoIcon("What is your current retirement savings balance?")).toEqual(data.default_calculator_values.expected_what_is_your_current_retirement_savings_balance)
    await expect(await preRetirementCalculator.getValueInTextBoxWithInfoIcon("How much are you currently saving each year for retirement?")).toEqual(data.default_calculator_values.expected_how_much_are_you_currently_saving_each_year_for_retirement)
    await expect(await preRetirementCalculator.getValueInTextBoxWithInfoIcon("What is the rate of increase in your savings each year?")).toEqual(data.default_calculator_values.expected_what_is_the_rate_of_increase_in_your_savings_each_year)

    await preRetirementCalculator.clickMenu("Calculate")
    //Verifying Results Heading displayed
    await expect(await preRetirementCalculator.getResultsHeadingElement()).toBeDisplayed()
  })


})