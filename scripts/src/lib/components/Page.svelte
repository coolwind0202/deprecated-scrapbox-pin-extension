<script lang="ts">
	import { onMount } from "svelte";
    import AllowBack from "../assets/allow_back.svg";
    import AllowFront from "../assets/allow_front.svg";
    import Unpin from "../assets/unpin.svg";

    onMount(() => {
        console.log(document.currentScript);
        console.log(document.baseURI);
    });

    export let onMoveFront: Function;
    export let onMoveBack: Function;
    export let onUnpin: Function;
</script>  

<li class="page">
    <div class="page-name">
        <slot>
        </slot>
    </div>
    <div class="operations">
        <button type="button" class="button button-move-front" on:click={onMoveFront()}>
            <img src={AllowBack} class="icon" alt="前に移動する" />
        </button>
        <button type="button" class="button button-move-back" on:click={onMoveBack()}>
            <img src={AllowFront} class="icon" alt="後ろに移動する" />
        </button>
        <button type="button" class="button button-unpin" on:click={onUnpin()}>
            <img src={Unpin} class="icon" alt="ピン留めから削除する" />
        </button>
    </div>
</li>

<style>
    .page {
        display: grid;
        gap: 20px;

        grid-template-columns: 3fr 1fr;
    }

    .operations {
        display: flex;
        width: 100%;
        gap: 5px;
    }

    .button {
        background-color: white;
        width: 2em;
        height: 2em;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .icon {
        width: 80%;
        height: 80%;
    }
</style>