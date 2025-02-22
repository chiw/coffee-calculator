import { getCoffeeRecipeDefaultConfig, type CoffeeRecipeId } from "./CoffeeRecipeConstants";
import { 
    type PourDivisionsConfig, type PourParametersConfig, type StepAdjustmentSelectedOptionConfig, 
    type StepConfig, type StepAdjustmentsConfig, type TwoStepsRatiosConfig, type StepAdjustmentAvailableOptions, 
    type CoffeeRecipeConfig, StepAdjustment, type StepControls, type StepAdjustmentSelectableFlagConfig } from "./CoffeeRecipeTypes.d";

export const createEmptyStepControls = () => {
    return <StepControls> {
        availableOptions: [],
        isSelectableFlags: [],
        selectedOptions: []
    }
}

export const createStepControls = (stepsAdjustments: StepAdjustmentsConfig, stepAdjustmentSelectedOptions: StepAdjustmentSelectedOptionConfig[]): StepControls => {
    return <StepControls> {
        availableOptions: getStepAdjustmentAvailableOptions(stepsAdjustments),
        isSelectableFlags: getSelectableFlags(stepsAdjustments),
        selectedOptions: stepAdjustmentSelectedOptions,
    }
}

const getSelectableFlags = (stepAdjustments: StepAdjustmentsConfig) : StepAdjustmentSelectableFlagConfig[] => {
    return [
        <StepAdjustmentSelectableFlagConfig> { stepAdjustmentName: StepAdjustment.TWO_STEPS_RATIOS, isSelectable: stepAdjustments.twoStepsRatios?.canEdit },
        <StepAdjustmentSelectableFlagConfig> { stepAdjustmentName: StepAdjustment.POUR_DIVISIONS, isSelectable: stepAdjustments.pourDivisions?.canEdit }
    ]
}

export const stepOptionsAreSelectable = (isSelectableFlags: StepAdjustmentSelectableFlagConfig[], stepAdjustmentName: string) => {
    // console.log('stepOptionsAreSelectable stepAdjustmentName =' + stepAdjustmentName);
    let selectableFlag = isSelectableFlags.find(selectableFlag => selectableFlag.stepAdjustmentName === stepAdjustmentName);
    let result = selectableFlag ? selectableFlag.isSelectable : false;
    // console.log('stepOptionsAreSelectable stepAdjustmentName =' + stepAdjustmentName + ' isSelectable=' + result);
    return result;
}

const getStepAdjustmentAvailableOptions = (stepsAdjustments: StepAdjustmentsConfig): StepAdjustmentAvailableOptions[] => {
    let stepAdjustmentAvailableOptions: StepAdjustmentAvailableOptions[] = [];

    stepsAdjustments.order.forEach(adjustment => {
        if(adjustment === StepAdjustment.TWO_STEPS_RATIOS) {
            stepAdjustmentAvailableOptions.push(<StepAdjustmentAvailableOptions>{
                stepAdjustmentName: adjustment,
                options: stepsAdjustments.twoStepsRatios?.options.map(option => option.name)
            });
        }

        if(adjustment === StepAdjustment.POUR_DIVISIONS) {
            stepAdjustmentAvailableOptions.push(<StepAdjustmentAvailableOptions>{
                stepAdjustmentName: adjustment,
                options: stepsAdjustments.pourDivisions?.options.map(option => option.name)
            });
        }
    });

    return stepAdjustmentAvailableOptions;
}

export const createStepsFromStepAdjustments = (stepsAdjustments: StepAdjustmentsConfig, stepAdjustmentSelectedOptions: StepAdjustmentSelectedOptionConfig[]) => {
    let steps: StepConfig[] = [];
    stepsAdjustments.order.forEach(adjustment => {
        let options = stepAdjustmentSelectedOptions.filter(option => option.stepAdjustmentName === adjustment);

        if(adjustment === StepAdjustment.TWO_STEPS_RATIOS) {
            steps = steps.concat(createStepsFromTwoStepsRatios(stepsAdjustments.twoStepsRatios, options ? options[0].option : null));
        }

        if(adjustment === StepAdjustment.POUR_DIVISIONS) {
            steps = steps.concat(createStepsFromPourDivisions(stepsAdjustments.pourDivisions, options ? options[0].option : null));
        }
    });

    // console.log('createStepsFromStepAdjustments steps', steps);
    return steps;
}

const createStepsFromTwoStepsRatios = (twoStepsRatios: TwoStepsRatiosConfig, selectedOption?: string): StepConfig[] => {
    // console.log('createStepsFromTwoStepsRatios twoStepsRatios', twoStepsRatios, selectedOption);
    let steps: StepConfig[] = twoStepsRatios.defaultSteps;

    if(selectedOption) {
        let selectedOptionConfig = twoStepsRatios.options.filter(option => option.name === selectedOption);
        // console.log('createStepsFromTwoStepsRatios selectedOptionConfig', selectedOptionConfig);

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
    // console.log('createStepsFromPourDivisions pourDivisionsConfig', pourDivisionsConfig, selectedOption);
    let defaultSteps: StepConfig[] = pourDivisionsConfig.defaultSteps;
    let steps: StepConfig[] = [];

    if(selectedOption) {
        let selectedOptionConfig = pourDivisionsConfig.options.filter(option => option.name === selectedOption);
        // console.log('createStepsFromPourDivisions selectedOptionConfig', selectedOptionConfig);

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

export const recreateStepsWithStepControl = (recipeId: CoffeeRecipeId, stepControls: StepControls) : StepConfig[] => {
    let steps: StepConfig[] = [];
    let recipeDefaultConfig: CoffeeRecipeConfig = getCoffeeRecipeDefaultConfig(recipeId);
 
    let stepAdjustments: StepAdjustmentsConfig = recipeDefaultConfig.stepAdjustments;

    stepAdjustments.order.forEach(adjustmentName => {
        let selectedOption = stepControls.selectedOptions.find(selectedOption => selectedOption.stepAdjustmentName === adjustmentName);

        if(adjustmentName === StepAdjustment.TWO_STEPS_RATIOS) {
            steps = steps.concat(createStepsFromTwoStepsRatios(stepAdjustments.twoStepsRatios, selectedOption?.option));
        }

        if(adjustmentName === StepAdjustment.POUR_DIVISIONS) {
            steps = steps.concat(createStepsFromPourDivisions(stepAdjustments.pourDivisions, selectedOption?.option));
        }
    });

    // console.log('recreateStepsWithStepControl steps', steps);
    return steps;
}