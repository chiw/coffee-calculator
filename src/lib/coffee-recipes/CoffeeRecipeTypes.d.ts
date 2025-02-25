export type DripperBrand = {
	name: string;
	drippers: DripperType[];
};

export type DripperType = {
	name: string;
	recipes?: DripperRecipe[];
};

export type DripperRecipe = {
	recipeId: string;
	name?: string;
	createdBy: string;
};

export type MetaInfo = {
	name: string;
	value: string;
};

export type MetaInfos = {
	values: MetaInfo[];
};

export const PouringTechnique = {
	CENTER: 'CENTER',
	CIRCLE: 'CIRCLE'
} as const;
export type PouringTechnique = keyof typeof PouringTechnique;

export const PourOverStage = {
	BLOOMING: 'BLOOMING',
	POURING: 'POURING',
	FIRST_POUR: 'FIRST_POUR',
	SECOND_POUR: 'SECOND_POUR',
	THIRD_POUR: 'THIRD_POUR',
	FOURTH_POUR: 'FOURTH_POUR',
	FIFTH_POUR: 'FIFTH_POUR',
	SIXTH_POUR: 'SIXTH_POUR',
	PAUSE: 'PAUSE',
	FINAL: 'FINAL',
	WATER_FLOW: 'WATER_FLOW'
} as const;
export type PourOverStage = keyof typeof PourOverStage;

export const SwitchState = {
	OPEN: 'OPEN',
	CLOSED: 'CLOSED',
	NA: 'NA'
} as const;
export type SwitchState = keyof typeof SwitchState;

export const StepAdjustment = {
	TWO_STEPS_RATIOS: 'TWO_STEPS_RATIOS',
	POUR_DIVISIONS: 'POUR_DIVISIONS'
};
export type StepAdjustment = keyof typeof StepAdjustment;

export type CoffeeParametersConfig = {
	beanInGrams: number;
	coffeeToWaterRatio: number;
	waterInGrams: number;
};

export type PourParametersConfig = {
	waterPercentage: number;
	waterTemp: string;
};

export type StepConfig = {
	stage: PourOverStage;
	switchState?: SwitchState;
	showWaterTemperature?: boolean;
	timeFrameDisplay?: TimeframeDisplayConfig;
	pouringTechnique?: PouringTechnique;
	msgKey?: any;
	msgParams?: any;
	swirl?: boolean;
	stir?: boolean;

	pourParameters?: PourParametersConfig;
	stepWaterInfo?: StepWaterInfo;

	durationInSeconds: number;
	timeFrame?: Timeframe;
	stepAdjustment?: string;
};

export type TimeframeDisplayConfig = {
	showTimeframeHeader?: boolean;
	showTimeframe?: boolean;
	showStartTimeOnly?: boolean;
};

export type TwoStepsRatioOptionConfig = {
	name: string;
	default?: boolean;
	useDefault?: boolean;
	waterPercentageRatios: number[];
};

export type TwoStepsRatiosConfig = {
	minPercentage: number;
	maxPercentage: number;
	defaultSteps: StepConfig[];
	selectMode: string;
	options: TwoStepsRatioOptionConfig[];
	canEdit: boolean;
	overrideDisplayKey?: string;
};

export type PourDivisionsOptionConfig = {
	name: string;
	default?: boolean;
	useDefault?: boolean;
	steps?: StepConfig[];
};

export type PourDivisionsConfig = {
	maxSteps: number;
	totalPercentages: number;
	stepsStages: PourOverStage[];
	selectMode: string;
	defaultSteps: StepConfig[];
	options: PourDivisionsOptionConfig[];
	canEdit: boolean;
	overrideDisplayKey?: string;
};

export type StepAdjustmentsConfig = {
	order: string[];
	selectedOptions: StepAdjustmentSelectedOptionConfig[];
	twoStepsRatios?: TwoStepsRatiosConfig;
	pourDivisions?: PourDivisionsConfig;
};

export type StepAdjustmentAvailableOptions = {
	stepAdjustmentName: string;
	options: string[];
};

export type StepAdjustmentSelectedOptionConfig = {
	stepAdjustmentName: string;
	option: string;
};

export type StepAdjustmentSelectableFlagConfig = {
	stepAdjustmentName: string;
	isSelectable: boolean;
};

export type StepControls = {
	availableOptions: StepAdjustmentAvailableOptions[];
	isSelectableFlags: StepAdjustmentSelectableFlagConfig[];
	selectedOptions: StepAdjustmentSelectedOptionConfig[];
};

export type RecipeChangeFactors = {
	coffeeParameters: CoffeeParametersConfig;
	stepsDurationInSeconds: number[];
	stepControls?: StepControls;
	factorsToUpdate?: string[];
	recipeChangeStatus?: RecipeChangeStatus;
};

export type RecipeChangeStatus = {
	updatedCoffeeParameters: boolean;
	updatedStepsDurationInSeconds: boolean;
	updatedStepControls: boolean;
};

export type RecipeSEOData = {
	recipeName: string;
	author: string;
	dripperBrand: string;
	dripperType: string;
};

export type CoffeeRecipeConfig = {
	isTimerRecipe: boolean;
	isImmersionDripperRecipe: boolean;
	is46Method?: boolean;
	coffeeParameters: CoffeeParametersConfig;
	enableStepsAdjustments?: boolean;
	stepAdjustmentSelectedOptions?: StepAdjustmentSelectedOptionConfig[];
	stepAdjustments?: StepAdjustmentsConfig;
	steps: StepConfig[];
	references: Reference[];
	showTimeframeEndTime?: boolean;
	seoData?: RecipeSEOData;
};

export type Timeframe = {
	from: number;
	to: number;
	fromDisplay: string;
	toDisplay: string;
};

export type TimeframeDisplay = {
	fromDisplay: string;
	toDisplay: string;
};

export type StepWaterInfo = {
	waterInGrams: string;
	waterPercentage: number;
	totalWaterInGrams: string;
	showTotalWaterInGrams: boolean;
	waterTemperature: string;
};

export type CoffeeRecipeSteps = {
	steps: StepConfig[];
	enableStepsAdjustments?: boolean;
	stepsAdjustments?: StepAdjustmentsConfig;
	isTimerRecipe: boolean;
	isImmersionDripperRecipe: boolean;
	timerInSeconds: number;
	showTimeframeEndTime?: boolean;
	recipeChangeFactors: RecipeChangeFactors;
	recipeChangeStatus?: RecipeChangeStatus;
};

export type Reference = {
	description: string;
	url: string;
	type?: string;
};

export type CoffeeRecipe = {
	recipeId: string;
	defaultSteps: StepConfig[];
	references: Reference[];
	is46Method?: boolean;
	enableStepsAdjustments?: boolean;
	defaultRecipeChangeFactors: RecipeChangeFactors;
	seoData?: RecipeSEOData;
};
