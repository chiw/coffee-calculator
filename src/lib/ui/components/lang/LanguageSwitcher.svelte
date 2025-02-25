<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';

	import 'iconify-icon';

	import { availableLanguageTags, languageTag } from '$lib/paraglide/runtime';
	import { i18n } from '$lib/i18n';
	// import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	// import { get } from 'svelte/store';

	// import { Globe } from 'lucide-svelte';

	/**
	 * @param { import("$lib/paraglide/runtime").AvailableLanguageTag } newLanguage
	 */
	// function switchToLanguage(newLanguage) {
	// 	const canonicalPath = i18n.route(get(page).url.pathname);
	// 	const localisedPath = i18n.resolveRoute(canonicalPath, newLanguage);
	// 	goto(localisedPath);
	// }

	let container;
	let showDropdown: boolean = false;

	const toggleDropdown = () => {
		showDropdown = !showDropdown;
	};

	// const closeDropdown = () => {
	// 	showDropdown = false;
	// };
	/**
	 * @type {Record<import("$lib/paraglide/runtime").AvailableLanguageTag, string>}
	 */
	const locale_labels = {
		en: m.label_locale_en,
		'zh-hk': m.label_locale_zh_hk
	};

	function onWindowClick(e) {
		if (container.contains(e.target) == false) {
			showDropdown = false;
		}
	}
</script>

<svelte:window on:click={onWindowClick} />

<div bind:this={container}>
	<button
		id="dropdown-button"
		type="button"
		onclick={toggleDropdown}
		aria-expanded={showDropdown}
		aria-haspopup="true"
		aria-label={'Select Language'}
		class="w-[2rem] h-[2rem] mx-1 cursor-pointer flex justify-between bg-transparent border-0"
	>
		<iconify-icon
			icon="material-symbols-light:language"
			class="text-[32px] hover:text-slate-600 m-0 p-0"
		></iconify-icon>
	</button>

	{#if showDropdown}
		<div
			id="dropdown-menu"
			role="menu"
			aria-labelledby="dropdown-button"
			class="absolute right-0 top-50 w-48 border border-gray-300 bg-white shadow-md mt-2"
		>
			{#each availableLanguageTags as lang}
				<a
					class="block px-4 py-2 text-gray-800 hover:bg-gray-300"
					href={i18n.route($page.url.pathname)}
					hreflang={lang}
					role="menuitem"
					aria-current={lang === languageTag() ? 'page' : undefined}
				>
					{locale_labels[lang]()}
				</a>
			{/each}
		</div>
	{/if}
</div>
