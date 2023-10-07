const { expect } = require('@wdio/globals')
const preRetirementCalculator = require('../pageobjects/pre.retirement.calculator')
const data=require("../data/data.json")

describe('Pre-retirement calculator-', () => {
    beforeEach(async () =>{ 
        await preRetirementCalculator.open()
     });  

    it('User should be able to submit form with all required fields filled in', async () => {
        await expect(await preRetirementCalculator.getHeadingElement()).toHaveText('Pre-retirement calculator')
        await preRetirementCalculator.setValueInTextBoxWithOutInfoIcon("What is your current age?", data.required_fields.what_is_your_current_age)
        await preRetirementCalculator.setValueInTextBoxWithOutInfoIcon("At what age do you plan to retire?", data.required_fields.at_what_age_do_you_plan_to_retire)
        await preRetirementCalculator.setValueInTextBoxWithOutInfoIcon("What is your current annual income?", data.required_fields.what_is_your_current_annual_income)
        await preRetirementCalculator.setValueInTextBoxWithInfoIcon("What is your current retirement savings balance?",  data.required_fields.what_is_your_current_retirement_savings_balance)
        await preRetirementCalculator.setValueInTextBoxWithInfoIcon("How much are you currently saving each year for retirement?", data.required_fields.how_much_are_you_currently_saving_each_year_for_retirement)
        await preRetirementCalculator.setValueInTextBoxWithInfoIcon("What is the rate of increase in your savings each year?", data.required_fields.what_is_the_rate_of_increase_in_your_savings_each_year)
        //Verifying entered values are correct
        await expect(await preRetirementCalculator.getValueInTextBoxWithOutInfoIcon("What is your current age?")).toEqual(data.required_fields.expected_what_is_your_current_age)
        await expect(await preRetirementCalculator.getValueInTextBoxWithOutInfoIcon("At what age do you plan to retire?")).toEqual(data.required_fields.expected_at_what_age_do_you_plan_to_retire)
        await expect(await preRetirementCalculator.getValueInTextBoxWithOutInfoIcon("What is your current annual income?")).toEqual(data.required_fields.expected_what_is_your_current_annual_income)
        await expect(await preRetirementCalculator.getValueInTextBoxWithInfoIcon("What is your current retirement savings balance?")).toEqual(data.required_fields.expected_what_is_your_current_retirement_savings_balance)
        await expect(await preRetirementCalculator.getValueInTextBoxWithInfoIcon("How much are you currently saving each year for retirement?")).toEqual(data.required_fields.expected_how_much_are_you_currently_saving_each_year_for_retirement)
        await expect(await preRetirementCalculator.getValueInTextBoxWithInfoIcon("What is the rate of increase in your savings each year?")).toEqual(data.required_fields.expected_what_is_the_rate_of_increase_in_your_savings_each_year)

        await preRetirementCalculator.clickMenu("Calculate")
       //Verifying Results Heading displayed
        await expect(await preRetirementCalculator.getResultsHeadingElement()).toBeDisplayed()
        
    })
  
    it('User should not be able to submit form without all required fields filled in', async () => {
        await expect(await preRetirementCalculator.getHeadingElement()).toHaveText('Pre-retirement calculator')
        await preRetirementCalculator.setValueInTextBoxWithOutInfoIcon("What is your current age?", data.required_fields.what_is_your_current_age)
        await preRetirementCalculator.setValueInTextBoxWithOutInfoIcon("At what age do you plan to retire?", data.required_fields.at_what_age_do_you_plan_to_retire)
        await preRetirementCalculator.setValueInTextBoxWithOutInfoIcon("What is your current annual income?", data.required_fields.what_is_your_current_annual_income)
        await preRetirementCalculator.setValueInTextBoxWithInfoIcon("What is your current retirement savings balance?",  data.required_fields.what_is_your_current_retirement_savings_balance)
        await preRetirementCalculator.setValueInTextBoxWithInfoIcon("How much are you currently saving each year for retirement?", data.required_fields.how_much_are_you_currently_saving_each_year_for_retirement)
       //Not entered One required field
       
        await expect(await preRetirementCalculator.getValueInTextBoxWithOutInfoIcon("What is your current age?")).toEqual(data.required_fields.expected_what_is_your_current_age)
        await expect(await preRetirementCalculator.getValueInTextBoxWithOutInfoIcon("At what age do you plan to retire?")).toEqual(data.required_fields.expected_at_what_age_do_you_plan_to_retire)
        await expect(await preRetirementCalculator.getValueInTextBoxWithOutInfoIcon("What is your current annual income?")).toEqual(data.required_fields.expected_what_is_your_current_annual_income)
        await expect(await preRetirementCalculator.getValueInTextBoxWithInfoIcon("What is your current retirement savings balance?")).toEqual(data.required_fields.expected_what_is_your_current_retirement_savings_balance)
        await expect(await preRetirementCalculator.getValueInTextBoxWithInfoIcon("How much are you currently saving each year for retirement?")).toEqual(data.required_fields.expected_how_much_are_you_currently_saving_each_year_for_retirement)
        
        await preRetirementCalculator.clickMenu("Calculate")
        //verifying error on specific field
        await expect(await preRetirementCalculator.inputRequiredErrorElement("What is the rate of increase in your savings each year?")).toBeDisplayed()
        //verifying fill out required fields error
        await expect(await preRetirementCalculator.getFillOutRequiredFieldsErrorElement()).toBeDisplayed()
        //verifying color of error
        await expect(await preRetirementCalculator.getColorOfFillOutRequiredFieldsError()).toEqual('rgba(204,0,0,1)')
    })
})

