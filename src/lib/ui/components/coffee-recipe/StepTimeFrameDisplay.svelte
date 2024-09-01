<script lang="ts">
    let { stepsTimeframeDisplay, highlightStep } = $props();
</script>

<div class="flex flex-col flex-wrap w-12 text-center bg-white">
    <div class="text-sm { highlightStep ? "text-black" : ""}">{stepsTimeframeDisplay[0]}</div>
    <div class="text-sm { highlightStep ? "text-black" : ""}">{stepsTimeframeDisplay[1]}</div>
</div>

