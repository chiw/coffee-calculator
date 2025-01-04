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

export const Method46Flavor = {
    STANDARD : 'STANDARD',
    SWEETER : 'SWEETER',
    BRIGHTER : 'BRIGHTER'
} as const;
export type Method46Flavor = keyof typeof Method46Flavor;

export const Method46Concentration = {
    LIGHTER : 'LIGHTER',
    STRONGER : 'STRONGER',
    EVEN_STRONGER : 'EVEN_STRONGER'
} as const;
export type Method46Concentration = keyof typeof Method46Concentration;

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
    showTimeframeEndTime?: boolean
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
    showTimeframeEndTime?: boolean;
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
    references: Reference[];
    is46Method?: boolean;
}

