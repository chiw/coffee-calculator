import * as m from '$lib/paraglide/messages.js';
import { PouringTechnique } from './PouringTechnique';

import { PourOverStage } from './PourOverStage';
import { SwitchState } from './SwitchState';

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

export const waterTemperatureMessageKey = (waterTemperature) => {
    return m.label_step_msg_water_temperature({waterTemperature: waterTemperature});
}

export const switchStateMessageKey = (switchState: SwitchState) => {
    switch(switchState) {
        case SwitchState.CLOSED : return m.label_switchState_closed;
        case SwitchState.OPEN: return m.label_switchState_open;
    }
}