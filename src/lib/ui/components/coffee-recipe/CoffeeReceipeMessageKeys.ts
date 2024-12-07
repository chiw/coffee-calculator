import { CoffeeRecipeId, PouringTechnique, PourOverStage, SwitchState, type StepWaterInfo } from '$lib/coffee-recipes';
import * as m from '$lib/paraglide/messages.js';

export const brandMessageKey = (brandName: string) => {
    switch(brandName) {
        case 'hario' : return m.label_brand_hario;
        default:
            return m.label_brand_unknwon;
    }
}

export const dripperMessageKey = (dripperName: string) => {
    switch(dripperName) {
        case 'switch' : return m.label_dripper_switch;
        case 'v60' : return m.label_dripper_v60;
        default:
            return m.label_dripper_unknown;
    }
}

export const coffeeRecipeIdSelectMessageKey = (coffeeRecipeId: CoffeeRecipeId) => {
    switch(coffeeRecipeId) {
        case CoffeeRecipeId.hario_switch_tetsukasuya : return m.label_hario_switch_tetsukasuya;
        case CoffeeRecipeId.hario_switch_emifukahori : return m.label_hario_switch_emifukahori;
        case CoffeeRecipeId.hario_switch_olekristianboen: return m.label_hario_switch_olekristianboen;
        case CoffeeRecipeId.hario_switch_coffeechronicler: return m.label_hario_switch_coffeechronicler;
        case CoffeeRecipeId.hario_v60_46method : return m.label_hario_v60_46method;
        case CoffeeRecipeId.hario_v60_jameshoffmann: return m.label_hario_v60_jameshoffmann;
        case CoffeeRecipeId.hario_v60_mattwinton : return m.label_hario_v60_mattwinton;        
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