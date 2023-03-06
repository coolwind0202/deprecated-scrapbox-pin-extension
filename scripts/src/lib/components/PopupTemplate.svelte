<script lang="ts">
    import Page from "./Page.svelte";
	import type { AbstractPageNameList } from "../util/pageNameList";

    export let input: AbstractPageNameList;

    $: input
        console.log(input);

    export let onReload: Function;
    export let onExecute: Function;
    export let onChange: (changed: AbstractPageNameList) => void;
</script>

<section>
    <h1>
        Scrapbox Pin Utility
    </h1>
    <p>
        Scrapbox でのピン留めを自動的に入れ替えられます。
    </p>
</section>
<section>
    <h2>
        このプロジェクトのピン留めリスト
    </h2>
    <ul class="page-list">
        {#each input.names as pageName, i (pageName)}
            <Page
                onMoveBack={() => onChange(input.moveBack(i))}
                onMoveFront={() => onChange(input.moveFront(i))}
                onUnpin={() => onChange(input.unpin(i))}
            >
                {pageName}
            </Page>
        {/each}
    </ul>
    <p>
        <button type="button" on:click={onExecute()}>
            実行する
        </button>
    </p>
    <p>
        <button type="button" on:click={onReload()}>
            ピン留めリストをリロード
        </button>
    </p>
</section>