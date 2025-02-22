<script lang="ts">
    import 'iconify-icon';

    // let dialog = $state(); // HTMLDialogElement
    // let { showModal=$bindable(), children } = $props();

    let { dialog=$bindable(), showModal=$bindable(), dialogTitleId, children } = $props();
    

    // console.log('showModal', showModal);

    $effect(() => {
        // console.log('inside Modal.svelte effect');
        // console.log('in effect:', $effect.tracking(), ' showModal ', showModal , 'dialog', dialog);
        if (dialog && showModal) {
            // console.log('trigger dialog showModal');
            dialog.showModal();
        }
        if(!showModal) {
            // console.log('trigger closeDialog');
            closeDialog();
        }
    })

    function onClickSelf(fn) {
        return function(event) {
            if (event.target === dialog) {
                fn.call(this, event);
            }
        }
    }

    function onClickStopPropagation(fn) {
        return function(event) {
            event.stopPropagation();
            fn.call(this, event);
        };
    }

    function closeDialog() {
        // console.log('closeDialog')
        if(dialog) {
            // console.log('closeDialog dialog is not null, trigger dialog.close()');
            dialog.close();
        }
    }

    function setShowModalFalse() {
        showModal = false;
    }
</script>

<dialog bind:this={dialog} onclose={setShowModalFalse} onclick={onClickSelf(closeDialog)} 
    class="fixed w-full h-full z-50 overflow-y-auto  top-0 left-0 max-w-full max-h-full">
    <!-- <dialog bind:this={dialog} onclose={() => (showModal = false)} > -->
    <div onclick={onClickStopPropagation(() => {})}>
        <div class="flex flex-row m-3">
            <div class="grow text-xl font-bold italic">{dialogTitleId()}</div>
            <!-- <button autofocus onclick={closeDialog}>close modal</button> -->
            <button autofocus onclick={closeDialog}>
                <iconify-icon icon="material-symbols-light:close"
                    class="text-[32px] hover:text-slate-600 m-0 p-0">
                </iconify-icon>
            </button>
        </div>
        {#if children}
            {@render children()}
        {/if}
        
    </div>
</dialog>