export enum PourOverStage {
    BLOOMING = 'BLOOMING',
    POURING = 'POURING',
    FIRST_POUR = 'FIRST_POUR',
    SECOND_POUR = 'SECOND_POUR',
    THIRD_POUR = 'THIRD_POUR',
    FOURTH_POUR = 'FOURTH_POUR',
    FIFTH_POUR = 'FIFTH_POUR',
    SIXTH_POUR = 'SIXTH_POUR',
    PAUSE = 'PAUSE',
    FINAL = 'FINAL'
}

export const isPouringStage = (stage: PourOverStage): boolean => {
    switch(stage) {
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
}

export const isFinalStage = (stage: PourOverStage): boolean => {
    return PourOverStage.FINAL === stage;
}

export const isPauseStage = (stage: PourOverStage): boolean => {
    return PourOverStage.PAUSE === stage;
}