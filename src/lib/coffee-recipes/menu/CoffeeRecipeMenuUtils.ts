import { type CoffeeRecipeId } from "../CoffeeRecipeConstants"
import type { DripperBrand, DripperRecipe, DripperType, MetaInfos } from "../CoffeeRecipeTypes"
import { createBrandMetaInfo, createRecipeMetaInfo } from "../MetaInfoUtils"

export type MenuGroup = {
    brandName: string,
    dripperName: string
    metaInfos: MetaInfos,
    items: MenuItem[],
    hasItems: boolean
}

export type MenuItem = {
    id: CoffeeRecipeId,
    defaultRecipe ?: true,
    metaInfos: MetaInfos
}

export const getCoffeeRecipeMenu = (dripperBrands: DripperBrand[]): MenuGroup[] => {
    let menuGroups: MenuGroup[] = [];

    dripperBrands.forEach(brand => {
        menuGroups = menuGroups.concat(createMenuGroups(brand.name, brand.drippers));
    });
    
    console.log('menu', menuGroups);
    return menuGroups;
}

const createMenuGroups = (brandName: string, drippers: DripperType[]): MenuGroup[] => {
    let menuGroups: MenuGroup[] = [];
    drippers.forEach(dripper => {
        menuGroups.push(createMenuGroup(brandName, dripper));
    });
    // console.log('menuGroups', menuGroups);
    return menuGroups;
}

const createMenuGroup = (brandName: string, dripper: DripperType): MenuGroup => {
    let menuItems: MenuItem[] = createMenuItems(brandName, dripper.name, dripper.recipes);
    return <MenuGroup> {
        brandName: brandName,
        dripperName: dripper.name,
        items: menuItems,
        hasItems: menuItems.length > 0
    }
}

const createMenuItems = (brandName: string, dripperName: string, dripperRecipes?: DripperRecipe[]): MenuItem[] => {
    let menuItems: MenuItem[] = [];
    if(dripperRecipes) {
        dripperRecipes.forEach(recipe => {
            let isDefaultRecipe = menuItems.length == 0;
            menuItems.push(createMenuItem(brandName, dripperName, recipe, isDefaultRecipe));
        });
    }
    // console.log('menuItems', menuItems);
    return menuItems;
}

const createMenuItem = (brandName: string, dripperName: string, recipe: DripperRecipe, defaultRecipe: boolean): MenuItem => {
    return <MenuItem> {
        id: recipe.recipeId,
        defaultRecipe: defaultRecipe,
        metaInfos: createRecipeMetaInfo(brandName, dripperName, recipe.name, recipe.recipeId, defaultRecipe)
    }
}