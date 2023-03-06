import type { AbstractPageNameList } from "./pageNameList";

/**
 * `Action` は、特定のページを pin / unpin する操作を表すオブジェクトです。
 */
export type Action = {
    type: "pin" | "unpin",
    target: string
};

export type PinAction = {
    type: "pin"
} | Action;

export type UnpinAction = {
    type: "unpin"
} | Action;

const isNotNullish = (value: unknown): value is Record<string, unknown> => {
    return value !== null && value !== undefined;
}

export const isAction = (value: unknown): value is Action => {
    if (!isNotNullish(value)) return false;

    return (value.type === "pin" || value.type === "unpin") && typeof value.target === "string";
}

/**
 * 入力されたピン留め順にするために必要な`Action`の配列を生成します。
 * @param currentPageNameList 現在のピン留め順
 * @param inputPageNameList ユーザーが入力したピン留め順
 */
export const getActions = (currentPageNameList: AbstractPageNameList, inputPageNameList: AbstractPageNameList) => {
    const pinActions: PinAction[] = [];
    const unpinActions: UnpinAction[] = [];

    let current = [...currentPageNameList.names];
    const target = [...inputPageNameList.names];
    
    let n = 0;
    let m = 0;

    /*
        Unpin後のPinが不要な要素を考える
        入力されたページの配列には存在しない要素を Unpin して取り去る。
    */

    
    /*
        入力されたピン留め順に存在しない要素は、そのまま Unpin する
    */

    current.filter(name => !target.includes(name)).forEach(name => {
        console.log(name);
        unpinActions.push({
            type: "unpin",
            target: name
        });
    });

    /*
        以降の探索では、入力されたピン留め順に存在しない要素は無視する
    */

    current = current.filter(name => target.includes(name));

    while (n < target.length) {
        while (m < current.length) {
            console.log(target[n], current[m], n, m);
            if (target[n] !== current[m]) {
                unpinActions.push({
                    type: "unpin",
                    target: current[m]
                });

                pinActions.push({
                    type: "pin",
                    target: current[m]
                });
                m++;
            } else {
                m++;
                break;
            }
        }
        n++;
    }

    return [...unpinActions, ...pinActions];
}