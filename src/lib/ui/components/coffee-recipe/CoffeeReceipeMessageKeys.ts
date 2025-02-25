import {
	CoffeeRecipeId,
	PouringTechnique,
	PourOverStage,
	SwitchState,
	type StepWaterInfo
} from '$lib/coffee-recipes';
import { StepAdjustment } from '$lib/coffee-recipes/CoffeeRecipeTypes.d';
import * as m from '$lib/paraglide/messages.js';

export const brandMessageKey = (brandName: string) => {
	switch (brandName) {
		case 'hario':
			return m.label_brand_hario;
		case 'kalita':
			return m.label_brand_kalita;
		default:
			return m.label_brand_unknwon;
	}
};

export const dripperMessageKey = (dripperName: string) => {
	switch (dripperName) {
		case 'switch':
			return m.label_dripper_switch;
		case 'v60':
			return m.label_dripper_v60;
		case 'wave155':
			return m.label_dripper_wave155;
		default:
			return m.label_dripper_unknown;
	}
};

export const coffeeRecipeIdSelectMessageKey = (coffeeRecipeId: CoffeeRecipeId) => {
	switch (coffeeRecipeId) {
		case CoffeeRecipeId.hario_switch_tetsukasuyanewhybrid:
			return m.label_hario_switch_tetsukasuyanewhybrid;
		case CoffeeRecipeId.hario_switch_tetsukasuya:
			return m.label_hario_switch_tetsukasuya;
		case CoffeeRecipeId.hario_switch_emifukahori:
			return m.label_hario_switch_emifukahori;
		case CoffeeRecipeId.hario_switch_olekristianboen:
			return m.label_hario_switch_olekristianboen;
		case CoffeeRecipeId.hario_switch_coffeechronicler:
			return m.label_hario_switch_coffeechronicler;
		case CoffeeRecipeId.hario_switch_cafetaster:
			return m.label_hario_switch_cafetaster;
		case CoffeeRecipeId.hario_v60_46method:
			return m.label_hario_v60_46method;
		case CoffeeRecipeId.hario_v60_jameshoffmann:
			return m.label_hario_v60_jameshoffmann;
		case CoffeeRecipeId.hario_v60_mattwinton:
			return m.label_hario_v60_mattwinton;
		case CoffeeRecipeId.kalita_wave155_itoatsuomi:
			return m.label_kalita_wave155_itoatsuomi;
		default:
			return m.label_unknown_recipe;
	}
};

export const coffeeRecipeIdSelectNavItemMessageKey = (coffeeRecipeId: CoffeeRecipeId) => {
	switch (coffeeRecipeId) {
		case CoffeeRecipeId.hario_switch_tetsukasuyanewhybrid:
			return m.label_nav_item_hario_switch_tetsukasuyanewhybrid;
		case CoffeeRecipeId.hario_switch_tetsukasuya:
			return m.label_nav_item_hario_switch_tetsukasuya;
		case CoffeeRecipeId.hario_switch_emifukahori:
			return m.label_nav_item_hario_switch_emifukahori;
		case CoffeeRecipeId.hario_switch_olekristianboen:
			return m.label_nav_item_hario_switch_olekristianboen;
		case CoffeeRecipeId.hario_switch_coffeechronicler:
			return m.label_nav_item_hario_switch_coffeechronicler;
		case CoffeeRecipeId.hario_switch_cafetaster:
			return m.label_nav_item_hario_switch_cafetaster;
		case CoffeeRecipeId.hario_v60_46method:
			return m.label_nav_item_hario_v60_46method;
		case CoffeeRecipeId.hario_v60_jameshoffmann:
			return m.label_nav_item_hario_v60_jameshoffmann;
		case CoffeeRecipeId.hario_v60_mattwinton:
			return m.label_nav_item_hario_v60_mattwinton;
		case CoffeeRecipeId.kalita_wave155_itoatsuomi:
			return m.label_nav_item_kalita_wave155_itoatsuomi;
		default:
			return m.label_nav_item_unknown_recipe;
	}
};

export const pourOverStageMessageKey = (pourOverStage: PourOverStage) => {
	switch (pourOverStage) {
		case PourOverStage.BLOOMING:
			return m.label_stages_blooming;
		case PourOverStage.POURING:
			return m.label_stages_pouring;
		case PourOverStage.FIRST_POUR:
			return m.label_stages_first_pour;
		case PourOverStage.SECOND_POUR:
			return m.label_stages_second_pour;
		case PourOverStage.THIRD_POUR:
			return m.label_stages_third_pour;
		case PourOverStage.FOURTH_POUR:
			return m.label_stages_fourth_pour;
		case PourOverStage.FIFTH_POUR:
			return m.label_stages_fifth_pour;
		case PourOverStage.SIXTH_POUR:
			return m.label_stages_sixth_pour;
		case PourOverStage.PAUSE:
			return m.label_step_pause;
		case PourOverStage.FINAL:
			return m.label_stages_final;
		default:
			return m.label_stages_unknown;
	}
};

export const pouringTechniqueMessageKey = (pouringTechnique: PouringTechnique) => {
	switch (pouringTechnique) {
		case PouringTechnique.CENTER:
			return m.label_pouring_technique_center;
		case PouringTechnique.CIRCLE:
			return m.label_pouring_technique_circular;
		default:
			return m.label_pouring_technique_unknown;
	}
};

export const stepWaterInfoMessageKey = (stepWaterInfo: StepWaterInfo) => {
	// console.log('CoffeeRecipeMessageKeys stepWaterInfo:', stepWaterInfo);
	return stepWaterInfo.showTotalWaterInGrams
		? m.label_step_msg_water_volume_with_total(stepWaterInfo)
		: m.label_step_msg_water_volume(stepWaterInfo);
};

export const waterTemperatureMessageKey = (waterTemperature: string) => {
	return m.label_step_msg_water_temperature({ waterTemperature: waterTemperature });
};

export const finalStepMessageKey = (time: string) => {
	return m.label_step_msg_let_water_flow_until({ time: time });
};

export const waterFlowMessageKey = (time: string) => {
	return m.label_step_msg_let_water_flow_until({ time: time });
};

export const switchStateMessage = (switchState: SwitchState) => {
	switch (switchState) {
		case SwitchState.CLOSED:
			return m.label_switchState_closed();
		case SwitchState.OPEN:
			return m.label_switchState_open();
	}
};

export const swirlMessageKey = () => {
	return m.label_step_swirl();
};

export const stirMessageKey = () => {
	return m.label_step_stir();
};

export const getStepAdjustmentTitleMessageKey = (stepAdjustment: string, recipeId: string) => {
	switch (stepAdjustment) {
		case StepAdjustment.TWO_STEPS_RATIOS:
			return getTwoStepsRatiosTitleMessageKey(recipeId);
		case StepAdjustment.POUR_DIVISIONS:
			return getPourDivisionsTitleMessageKey(recipeId);
	}
};

export const getTwoStepsRatiosTitleMessageKey = (recipeId: string) => {
	switch (recipeId) {
		case CoffeeRecipeId.hario_v60_46method:
			return m.label_twoStepsRatios_method46_title();
		default:
			return m.label_twoStepsRatios_title();
	}
};

export const getPourDivisionsTitleMessageKey = (recipeId: string) => {
	switch (recipeId) {
		case CoffeeRecipeId.hario_v60_46method:
			return m.label_pourDivisions_method46_title();
		case CoffeeRecipeId.hario_switch_coffeechronicler:
			return m.label_pourDivisions_coffeechronicler_title();
		default:
			return m.label_pourDivisions_title();
	}
};

export const getStepAdjustmentOptionMessageKey = (stepAdjustment: string, option: string) => {
	switch (stepAdjustment) {
		case StepAdjustment.TWO_STEPS_RATIOS:
			return getStepAdjustmentTwoStepsRatiosOptionMessageKey(option);
		case StepAdjustment.POUR_DIVISIONS:
			return getStepAdjustmentPourDivisionsOptionMessageKey(option);
	}
};

export const getStepAdjustmentTwoStepsRatiosOptionMessageKey = (option: string) => {
	switch (option) {
		case 'sweeter':
			return m.label_twoStepsRatios_sweeter();
		case 'standard':
			return m.label_twoStepsRatios_standard();
		case 'brighter':
			return m.label_twoStepsRatios_brighter();

		case 'method46Sweeter':
			return m.label_twoStepsRatios_method46Sweeter();
		case 'method46Standard':
			return m.label_twoStepsRatios_method46Standard();
		case 'method46Brighter':
			return m.label_twoStepsRatios_method46Brighter();

		case 'newHybridSweeter':
			return m.label_twoStepsRatios_newHybridSweeter();
		case 'newHybridBalanced':
			return m.label_twoStepsRatios_newHybridBalanced();
		case 'newHybridBrighter':
			return m.label_twoStepsRatios_newHybridBrighter();
	}
};

export const getStepAdjustmentPourDivisionsOptionMessageKey = (option: string) => {
	switch (option) {
		case 'lighter':
			return m.label_pourDivisions_lighter();
		case 'stronger':
			return m.label_pourDivisions_stronger();
		case 'evenStronger':
			return m.label_pourDivisions_evenStronger();

		case 'method46Lighter':
			return m.label_pourDivisions_method46Lighter();
		case 'method46Stronger':
			return m.label_pourDivisions_method46Stronger();
		case 'method46EvenStronger':
			return m.label_pourDivisions_method46EvenStronger();

		case 'newHybridTwoPours':
			return m.label_pourDivisions_newHybridTwoPours();

		case 'coffeeChroniclerStandardVersion':
			return m.label_pourDivisions_coffeeChroniclerStandardVersion();
		case 'coffeeChroniclerSweetVersion':
			return m.label_pourDivisions_coffeeChroniclerSweetVersion();
	}
};
