<script lang="ts">
    let { timeFrame, highlightStep } = $props();
</script>

<div class="flex flex-col flex-wrap w-12 text-center bg-white">
    <div class="text-sm { highlightStep ? "text-black" : ""}">{timeFrame.fromDisplay}</div>
    <div class="text-sm { highlightStep ? "text-black" : ""}">{timeFrame.toDisplay}</div>
</div>

