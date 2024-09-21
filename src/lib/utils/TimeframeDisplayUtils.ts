import { PourOverStage } from "$lib/coffee-recipes"
import type { StepConfig } from "$lib/coffee-recipes/CoffeeRecipeTypes";

export const shouldDisplayTimeframe = (step: StepConfig) => {
    return PourOverStage.PAUSE != step.stage || step.timeFrameDisplay?.showTimeframe == true;
}