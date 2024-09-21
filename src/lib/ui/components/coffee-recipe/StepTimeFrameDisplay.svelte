<script lang="ts">
    let { timeframe, highlightStep } = $props();
</script>

<div class="flex flex-col flex-wrap w-12 text-center bg-white">
    <div class="text-sm { highlightStep ? "text-black" : ""}">{timeframe.fromDisplay}</div>
    <div class="text-sm { highlightStep ? "text-black" : ""}">{timeframe.toDisplay}</div>
</div>

