import { createI18n } from "@inlang/paraglide-sveltekit";
import * as runtime from "$lib/paraglide/runtime.js";

export const i18n = createI18n(runtime, {
    // don't include the language or base path
    exclude: ["/coffee-calculator"],
});