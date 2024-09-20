import { PourOverStage } from "$lib/coffee-recipes"

export const shouldDisplayTimeframe = (step) => {
    return PourOverStage.PAUSE != step.stage || step.showTimeframe == true;
}