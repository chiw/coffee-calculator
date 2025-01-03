export type DripperBrand = {
    name: string,
    drippers: DripperType[]
}

export type DripperType = {
    name: string,
    recipes?: DripperRecipe[]
}

export type DripperRecipe = {
    recipeId: string,
    name?: string,
    createdBy: string,
}

export type MetaInfo = {
    name: string,
    value: string
}

export type MetaInfos = {
    values: MetaInfo[];
}

export const PouringTechnique = {
    CENTER : 'CENTER',
    CIRCLE : 'CIRCLE'
} as const;
export type PouringTechnique = keyof typeof PouringTechnique;

export const PourOverStage = {
    BLOOMING : 'BLOOMING',
    POURING : 'POURING',
    FIRST_POUR : 'FIRST_POUR',
    SECOND_POUR : 'SECOND_POUR',
    THIRD_POUR : 'THIRD_POUR',
    FOURTH_POUR : 'FOURTH_POUR',
    FIFTH_POUR : 'FIFTH_POUR',
    SIXTH_POUR : 'SIXTH_POUR',
    PAUSE : 'PAUSE',
    FINAL : 'FINAL'
} as const;
export type PourOverStage = keyof typeof PourOverStage;

export const SwitchState = {
    OPEN : 'OPEN',
    CLOSED : 'CLOSED',
    NA : 'NA'
} as const;
export type SwitchState = keyof typeof SwitchState;

export type CoffeeParametersConfig = {
    beanInGrams: number,
    coffeeToWaterRatio: number,
    waterInGrams: number
}

export type PourParametersConfig = {
    waterPercentage: number,
    waterTemp: number,
}

export type StepConfig = {
    stage: PourOverStage,
    switchState?: SwitchState,
    showWaterTemperature?: boolean,
    timeFrameDisplay?: TimeframeDisplayConfig,
    pouringTechnique?: PouringTechnique,
    msgKey?: any,
    msgParams?: any,
    swirl?: boolean,
    stir? : boolean,

    pourParameters?: PourParametersConfig,
    stepWaterInfo?: StepWaterInfo,

    durationInSeconds: number,
    timeFrame?: Timeframe
}

export type TimeframeDisplayConfig = {
    showTimeframeHeader?: boolean,
    showTimeframe?: boolean,
    showStartTimeOnly?: boolean
}

export type CoffeeRecipeConfig = {
    isTimerRecipe: boolean,
    isImmersionDripperRecipe: boolean,
    is46Method?: boolean,
    coffeeParameters: CoffeeParametersConfig,
    steps: StepConfig[],
    references: Reference[],
}

export type Timeframe = {
    from: number,
    to: number,
    fromDisplay: string,
    toDisplay: string,
}

export type TimeframeDisplay = {
    fromDisplay: string,
    toDisplay: string
}

export type StepWaterInfo = {
    waterInGrams: string;
    totalWaterInGrams: string;
    showTotalWaterInGrams: boolean;
    waterTemperature: number;
}

export type CoffeeRecipeSteps = {
    steps: StepConfig[];
    stepsDurationInSeconds: number[];
    
    isTimerRecipe: boolean;
    isImmersionDripperRecipe: boolean;
    timerInSeconds: number;
}

export type Reference = {
    description: string;
    url: string;
}

export type CoffeeRecipe = {
    recipeId: string;
    defaultCoffeeParams: CoffeeParametersConfig;
    defaultStepsDurationInSeconds: number[];
    defaultSteps: StepConfig[];
    references: Reference[],
    is46Method?: boolean
}

