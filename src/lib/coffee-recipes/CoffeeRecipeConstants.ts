import * as m from '$lib/paraglide/messages.js';

export enum CoffeeDripper {
    HarioSwitch = "HarioSwitch"
}

export enum CoffeeRecipeId {
    HarioSwitch_TetsuKasuya = 'HarioSwitch_TetsuKasuya',
    HarioSwitch_EmiFukahori = 'HarioSwitch_EmiFukahori',
    HarioSwitch_OleKristianBoen = 'HarioSwitch_OleKristianBoen',
    HarioSwitch_CoffeeChronicler = 'HarioSwitch_CoffeeChronicler'
}

export const CoffeeRecipesChoices = [
    { id: CoffeeRecipeId.HarioSwitch_TetsuKasuya, displayLabelId: m.label_harioSwitch_TetsuKasuya, display: "Hario Switch (Tetsu Kasuya)" },
    { id: CoffeeRecipeId.HarioSwitch_EmiFukahori, displayLabelId: m.label_harioSwitch_EmiFukahori, display: "Hario Switch (Emi Fukahori)" },
    { id: CoffeeRecipeId.HarioSwitch_OleKristianBoen, displayLabelId: m.label_harioSwitch_OleKristianBoen, display: "Hario Switch (Ole Kristian Bøen)" },
    { id: CoffeeRecipeId.HarioSwitch_CoffeeChronicler, displayLabelId: m.label_harioSwitch_CoffeeChronicler, display: "Hario Switch (The Coffee Chronicler)"}
]