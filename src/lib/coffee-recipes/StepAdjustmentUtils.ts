import { getCoffeeRecipeDefaultConfig, type CoffeeRecipeId } from "./CoffeeRecipeConstants";
import { type PourDivisionsConfig, type PourParametersConfig, type StepAdjustmentSelectedOptionConfig, type StepConfig, type StepAdjustmentsConfig, type TwoStepsRatiosConfig, type StepAdjustmentAvailableOptions, type CoffeeRecipeConfig, StepAdjustment } from "./CoffeeRecipeTypes.d";

export const canEditStepAdjustment = (stepAdjustmensts: StepAdjustmentsConfig, adjustment: string) => {
    if(adjustment === StepAdjustment.TWO_STEPS_RATIOS) return stepAdjustmensts.twoStepsRatios?.canEdit;
    if(adjustment === StepAdjustment.POUR_DIVISIONS) return stepAdjustmensts.pourDivisions?.canEdit;
    return false;
}

export const getStepAdjustmentAvailableOptions = (stepsAdjustments: StepAdjustmentsConfig): StepAdjustmentAvailableOptions[] => {
    let stepAdjustmentAvailableOptions: StepAdjustmentAvailableOptions[] = [];

    stepsAdjustments.order.forEach(adjustment => {
        if(adjustment === StepAdjustment.TWO_STEPS_RATIOS) {
            stepAdjustmentAvailableOptions.push(<StepAdjustmentAvailableOptions>{
                stepAdjustment: adjustment,
                availableOptions: stepsAdjustments.twoStepsRatios?.options.map(option => option.name)
            });
        }

        if(adjustment === StepAdjustment.POUR_DIVISIONS) {
            stepAdjustmentAvailableOptions.push(<StepAdjustmentAvailableOptions>{
                stepAdjustment: adjustment,
                availableOptions: stepsAdjustments.pourDivisions?.options.map(option => option.name)
            });
        }
    });

    return stepAdjustmentAvailableOptions;
}

export const hasChangedStepAdjustmentSelectedOption = (existingSelectedOptions: StepAdjustmentSelectedOptionConfig[], newSelectedOption: StepAdjustmentSelectedOptionConfig) => {
    let existingSelectedOption = existingSelectedOptions.find(option => option.stepAdjustment === newSelectedOption.stepAdjustment);

    if(existingSelectedOption?.selectedOption != newSelectedOption.selectedOption) {
        console.log('hasChangedStepAdjustmentSelectedOption existing [' + existingSelectedOption?.selectedOption + '] !=  newSelected [' + newSelectedOption.selectedOption+ ']');
        return true;
    } else {
        console.log('hasChangedStepAdjustmentSelectedOption existing [' + existingSelectedOption?.selectedOption + '] ==  newSelected [' + newSelectedOption.selectedOption+ ']');
        return false;
    }
}

export const getNewStepAdjustmentSelectedOptions = (existingSelectedOptions: StepAdjustmentSelectedOptionConfig[], newSelectedOption: StepAdjustmentSelectedOptionConfig): StepAdjustmentSelectedOptionConfig[] => {
    let clonedSelectedOptions: StepAdjustmentSelectedOptionConfig[] = <StepAdjustmentSelectedOptionConfig[]> JSON.parse(JSON.stringify(existingSelectedOptions));
    
    clonedSelectedOptions.forEach((selectedOption, index) => {
        if(selectedOption.stepAdjustment === newSelectedOption.stepAdjustment) {
            selectedOption.selectedOption = newSelectedOption.selectedOption
        }
    });
    console.log('getNewStepAdjustmentSelectedOptions', clonedSelectedOptions);
    return clonedSelectedOptions;
}

export const recreateSteps = (recipeId: CoffeeRecipeId, 
    existingSelectedOptions: StepAdjustmentSelectedOptionConfig[], newSelectedOption: StepAdjustmentSelectedOptionConfig) : StepConfig[] => {

    let recipeDefaultConfig: CoffeeRecipeConfig = getCoffeeRecipeDefaultConfig(recipeId);
    
    let newSelectedOptions: StepAdjustmentSelectedOptionConfig[] = getNewStepAdjustmentSelectedOptions(existingSelectedOptions, newSelectedOption);
    
    return createStepsFromStepAdjustments(recipeDefaultConfig.stepAdjustments, newSelectedOptions);
}

export const createStepsFromStepAdjustments = (stepsAdjustments: StepAdjustmentsConfig, stepAdjustmentSelectedOptions: StepAdjustmentSelectedOptionConfig[]) => {
    let steps: StepConfig[] = [];
    stepsAdjustments.order.forEach(adjustment => {
        let options = stepAdjustmentSelectedOptions.filter(option => option.stepAdjustment === adjustment);

        if(adjustment === StepAdjustment.TWO_STEPS_RATIOS) {
            steps = steps.concat(createStepsFromTwoStepsRatios(stepsAdjustments.twoStepsRatios, options ? options[0].selectedOption : null));
        }

        if(adjustment === StepAdjustment.POUR_DIVISIONS) {
            steps = steps.concat(createStepsFromPourDivisions(stepsAdjustments.pourDivisions, options ? options[0].selectedOption : null));
        }
    });

    console.log('createStepsFromStepAdjustments steps', steps);
    return steps;
}

const createStepsFromTwoStepsRatios = (twoStepsRatios: TwoStepsRatiosConfig, selectedOption?: string): StepConfig[] => {
    console.log('createStepsFromTwoStepsRatios twoStepsRatios', twoStepsRatios, selectedOption);
    let steps: StepConfig[] = twoStepsRatios.defaultSteps;

    if(selectedOption) {
        let selectedOptionConfig = twoStepsRatios.options.filter(option => option.name === selectedOption);
        console.log('createStepsFromTwoStepsRatios selectedOptionConfig', selectedOptionConfig);

        if(selectedOptionConfig.length > 0) {
            if(!selectedOptionConfig[0].useDefault) {
                steps.forEach((step, index) => {
                    step.pourParameters = <PourParametersConfig> {
                         waterPercentage: selectedOptionConfig[0].waterPercentageRatios[index],
                         waterTemp: step.pourParameters?.waterTemp
                    }
                })
            }
        }
    }

    return steps;
}

const createStepsFromPourDivisions = (pourDivisionsConfig: PourDivisionsConfig, selectedOption?: string): StepConfig[] => {
    console.log('createStepsFromPourDivisions pourDivisionsConfig', pourDivisionsConfig, selectedOption);
    let defaultSteps: StepConfig[] = pourDivisionsConfig.defaultSteps;
    let steps: StepConfig[] = [];

    if(selectedOption) {
        let selectedOptionConfig = pourDivisionsConfig.options.filter(option => option.name === selectedOption);
        console.log('createStepsFromPourDivisions selectedOptionConfig', selectedOptionConfig);

        if(selectedOptionConfig.length > 0) {
            if(!selectedOptionConfig[0].useDefault) {
                steps = steps.concat(selectedOptionConfig[0].steps);
            } else {
                steps = steps.concat(defaultSteps);
            }
        }
    } else {
        steps = steps.concat(defaultSteps);
    }

    return steps;
}