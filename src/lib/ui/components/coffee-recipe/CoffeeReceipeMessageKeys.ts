import { CoffeeRecipeId, PouringTechnique, PourOverStage, SwitchState, type StepWaterInfo } from '$lib/coffee-recipes';
import * as m from '$lib/paraglide/messages.js';



export const coffeeRecipeIdSelectMessageKey = (coffeeRecipeId: CoffeeRecipeId) => {
    switch(coffeeRecipeId) {
        case CoffeeRecipeId.HarioSwitch_TetsuKasuya : return m.label_harioSwitch_TetsuKasuya;
        case CoffeeRecipeId.HarioSwitch_EmiFukahori : return m.label_harioSwitch_EmiFukahori;
        case CoffeeRecipeId.HarioSwitch_OleKristianBoen: return m.label_harioSwitch_OleKristianBoen;
        case CoffeeRecipeId.HarioSwitch_CoffeeChronicler: return m.label_harioSwitch_CoffeeChronicler;
        case CoffeeRecipeId.HarioV60_JamesHoffmann: return m.label_harioV60_JamesHoffmann;
        default:
            return m.label_unknown_recipe;
    }
}

export const pourOverStageMessageKey = (pourOverStage: PourOverStage) => {
    switch(pourOverStage) {
        case PourOverStage.BLOOMING : return m.label_stages_blooming;
        case PourOverStage.POURING : return m.label_stages_pouring;
        case PourOverStage.FIRST_POUR: return m.label_stages_first_pour;
        case PourOverStage.SECOND_POUR: return m.label_stages_second_pour;
        case PourOverStage.THIRD_POUR: return m.label_stages_third_pour;
        case PourOverStage.FOURTH_POUR: return m.label_stages_fourth_pour;
        case PourOverStage.FIFTH_POUR: return m.label_stages_fifth_pour;
        case PourOverStage.SIXTH_POUR: return m.label_stages_sixth_pour;
        case PourOverStage.PAUSE: return m.label_step_pause;
        case PourOverStage.FINAL: return m.label_stages_final;
        default: return m.label_stages_unknown;
    }
}

export const pouringTechniqueMessageKey = (pouringTechnique: PouringTechnique) => {
    switch(pouringTechnique) {
        case PouringTechnique.CENTER : return m.label_pouring_technique_center;
        case PouringTechnique.CIRCLE : return m.label_pouring_technique_circular;        
        default: return m.label_pouring_technique_unknown;
    }
}

export const stepWaterInfoMessageKey = (stepWaterInfo: StepWaterInfo) => {
    return stepWaterInfo.showTotalWaterInGrams ? 
        m.label_step_msg_water_volume_with_total(stepWaterInfo) 
        : m.label_step_msg_water_volume(stepWaterInfo);
}

export const waterTemperatureMessageKey = (waterTemperature: number) => {
    return m.label_step_msg_water_temperature({waterTemperature: waterTemperature});
}

export const finalStepMessageKey = (time: string) => {
    return m.label_step_msg_let_water_flow_until({time: time});
}

export const switchStateMessage = (switchState: SwitchState) => {
    switch(switchState) {
        case SwitchState.CLOSED : return m.label_switchState_closed();
        case SwitchState.OPEN: return m.label_switchState_open();
    }
}

export const swirlMessageKey = () => {
    return m.label_step_swirl();
}