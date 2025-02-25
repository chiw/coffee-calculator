import { type CoffeeRecipeId } from '../CoffeeRecipeConstants';
import type { DripperBrand, DripperRecipe, DripperType, MetaInfos } from '../CoffeeRecipeTypes';
import { createBrandMetaInfo, createDripperMetaInfo, createRecipeMetaInfo } from '../MetaInfoUtils';

export type CoffeeRecipeMenu = {
	brandMenus: BrandMenu[];
};

export type BrandMenu = {
	brandName: string;
	metaInfos: MetaInfos;
	dripperMenus: DripperMenu[];
};

export type DripperMenu = {
	brandName: string;
	dripperName: string;
	metaInfos: MetaInfos;
	recipeMenus: RecipeMenu[];
	hasItems: boolean;
};

export type RecipeMenu = {
	id: CoffeeRecipeId;
	defaultRecipe?: true;
	metaInfos: MetaInfos;
};

export const getCoffeeRecipeMenu = (dripperBrands: DripperBrand[]): CoffeeRecipeMenu => {
	let coffeeRecipeMenu = <CoffeeRecipeMenu>{
		brandMenus: createBrandMenus(dripperBrands)
	};

	// console.log('coffeeRecipeMenu', coffeeRecipeMenu);
	return coffeeRecipeMenu;
};

const createBrandMenus = (dripperBrands: DripperBrand[]): BrandMenu[] => {
	let brandMenus: BrandMenu[] = [];

	dripperBrands.forEach((brand) => {
		brandMenus.push(createBrandMenu(brand));
	});
	// console.log('brandMenus', brandMenus);
	return brandMenus;
};

const createBrandMenu = (dripperBrand: DripperBrand): BrandMenu => {
	let dripperMenus: DripperMenu[] = createDripperMenus(dripperBrand.name, dripperBrand.drippers);
	return <BrandMenu>{
		brandName: dripperBrand.name,
		metaInfos: createBrandMetaInfo(dripperBrand.name),
		dripperMenus: dripperMenus
	};
};

const createDripperMenus = (brandName: string, drippers: DripperType[]): DripperMenu[] => {
	let dripperMenus: DripperMenu[] = [];
	drippers.forEach((dripper) => {
		dripperMenus.push(createDripperMenu(brandName, dripper));
	});
	// console.log('dripperMenus', dripperMenus);
	return dripperMenus;
};

const createDripperMenu = (brandName: string, dripper: DripperType): DripperMenu => {
	let recipeMenus: RecipeMenu[] = createRecipeMenus(brandName, dripper.name, dripper.recipes);
	return <DripperMenu>{
		brandName: brandName,
		dripperName: dripper.name,
		metaInfos: createDripperMetaInfo(brandName, dripper.name),
		recipeMenus: recipeMenus,
		hasItems: recipeMenus.length > 0
	};
};

const createRecipeMenus = (
	brandName: string,
	dripperName: string,
	dripperRecipes?: DripperRecipe[]
): RecipeMenu[] => {
	let menuItems: RecipeMenu[] = [];
	if (dripperRecipes) {
		dripperRecipes.forEach((recipe) => {
			let isDefaultRecipe = menuItems.length == 0;
			menuItems.push(createRecipeMenu(brandName, dripperName, recipe, isDefaultRecipe));
		});
	}
	// console.log('menuItems', menuItems);
	return menuItems;
};

const createRecipeMenu = (
	brandName: string,
	dripperName: string,
	recipe: DripperRecipe,
	defaultRecipe: boolean
): RecipeMenu => {
	return <RecipeMenu>{
		id: recipe.recipeId,
		defaultRecipe: defaultRecipe,
		metaInfos: createRecipeMetaInfo(
			brandName,
			dripperName,
			recipe.name,
			recipe.recipeId,
			defaultRecipe
		)
	};
};

export const getMenuMetaInfos = (coffeeRecipeMenu: CoffeeRecipeMenu): MetaInfos[] => {
	let metaInfosArr: MetaInfos[] = [];

	metaInfosArr = metaInfosArr.concat(getBrandMenusMetaInfoArr(coffeeRecipeMenu.brandMenus));
	// console.log('getMenuMetaInfos', metaInfosArr);

	return metaInfosArr;
};

const getBrandMenusMetaInfoArr = (brandMenus: BrandMenu[]): MetaInfos[] => {
	let metaInfosArr: MetaInfos[] = [];

	brandMenus.forEach((brandMenu) => {
		metaInfosArr.push(brandMenu.metaInfos);
		metaInfosArr = metaInfosArr.concat(getDripperMenuMetaInfoArr(brandMenu.dripperMenus));
	});
	// console.log('getBrandMenusMetaInfoArr', metaInfosArr);

	return metaInfosArr;
};

const getDripperMenuMetaInfoArr = (dripperMenus: DripperMenu[]): MetaInfos[] => {
	let metaInfosArr: MetaInfos[] = [];

	dripperMenus.forEach((dripperMenu) => {
		metaInfosArr.push(dripperMenu.metaInfos);
		metaInfosArr = metaInfosArr.concat(getRecipeMenuMetaInfoArr(dripperMenu.recipeMenus));
	});
	// console.log('getDripperMenuMetaInfoArr', metaInfosArr);

	return metaInfosArr;
};

const getRecipeMenuMetaInfoArr = (recipeMenus: RecipeMenu[]): MetaInfos[] => {
	let metaInfosArr: MetaInfos[] = [];

	recipeMenus.forEach((recipeMenu) => {
		metaInfosArr.push(recipeMenu.metaInfos);
	});
	// console.log('getRecipeMenuMetaInfoArr', metaInfosArr);

	return metaInfosArr;
};
