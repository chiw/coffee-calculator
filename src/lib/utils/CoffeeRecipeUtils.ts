import { PourOverStage } from '$lib/coffee-recipes';

export const isPouringStage = (stage: PourOverStage): boolean => {
	switch (stage) {
		case PourOverStage.BLOOMING:
		case PourOverStage.POURING:
		case PourOverStage.FIRST_POUR:
		case PourOverStage.SECOND_POUR:
		case PourOverStage.THIRD_POUR:
		case PourOverStage.FOURTH_POUR:
		case PourOverStage.FIFTH_POUR:
		case PourOverStage.SIXTH_POUR:
			return true;
		default:
			return false;
	}
};

export const isFinalStage = (stage: PourOverStage): boolean => {
	return PourOverStage.FINAL === stage;
};

export const isWaterFlowStage = (stage: PourOverStage): boolean => {
	return PourOverStage.WATER_FLOW === stage;
};

export const isPauseStage = (stage: PourOverStage): boolean => {
	return PourOverStage.PAUSE === stage;
};

export const isBloomingStage = (stage: PourOverStage): boolean => {
	return PourOverStage.BLOOMING === stage;
};
