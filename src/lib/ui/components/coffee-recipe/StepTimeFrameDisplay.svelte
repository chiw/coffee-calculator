<script lang="ts">

    let { stepsTimeframeDisplay } = $props();

</script>

<div class="flex flex-col flex-wrap w-12">
    <div class="border-solid rounded">{stepsTimeframeDisplay[0]}</div>
    <div>{stepsTimeframeDisplay[1]}</div>
</div>

