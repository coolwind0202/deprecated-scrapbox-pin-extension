<script lang="ts">
    import isStringArray from "../lib/util/isStringArray";
    import PopupTemplate from "../lib/components/PopupTemplate.svelte";
	import { DefaultPageNameList, type AbstractPageNameList } from "../lib/util/pageNameList";
	import { getActions } from "../lib/util/actions";

    /**
     * Content Script で取得されたピン留めページの配列マネージャを表します。
     */
    let pageNameList: AbstractPageNameList | null = null;         

    /**
     * ユーザーによって入力された配列を表します。
     */
    let input: AbstractPageNameList | null = null;

    export const csr = false;

    /**
     * 現在のピン留め順を表す DefaultPageNameList を返します。
    */
    const fetchPageNameList = async (): Promise<AbstractPageNameList> => {
        const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });

        console.log(tab);
        
        if (tab?.id === undefined) return new DefaultPageNameList([]);
        
        const res = await chrome.tabs.sendMessage(tab.id, {
            type: "get-page-name-list"
        }) as unknown;
        console.log(res);

        const names = isStringArray(res) ? res : [];

        console.log(names);

        return new DefaultPageNameList(names);
    }

    /**
     * ピン留めされたページ名のリストの DefaultPageNameList インスタンスを作成して、 pageNameList と input を変更します。
     */

    const renderPageList = async () => {
        const names = await fetchPageNameList();

        console.log(names.moveFront.toString());

        pageNameList = names;
        input = names.copy();
    }

    const handleChange = (changed: AbstractPageNameList) => {
        input = changed;
    }


    /**
     * ピン留め順の入力が確定されたタイミングで呼び出してください。
     * 入力されたピン留め順を元に `Action` の配列を取得して、Content Script に渡します。
     */
    const execute = async () => {
        if (pageNameList === null || input === null) return;

        const actions = getActions(pageNameList, input);
        console.log(actions);

        const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });

        console.log(tab);

        if (tab?.id === undefined) return;

        for (const action of actions) {
            
            await chrome.tabs.sendMessage(tab.id, {
                type: "run-action",
                content: {
                    action
                }
            });
        }
    }

    document.addEventListener("DOMContentLoaded", () => {
        renderPageList();
    });
</script>

{#if input !== null}
    <PopupTemplate
        input={input}
        onExecute={execute}
        onReload={renderPageList}
        onChange={handleChange}
    />
{:else}
    <p>
        ピン留めページの一覧が読み込まれていません。

        <button on:click={renderPageList} />
    </p>
{/if}
