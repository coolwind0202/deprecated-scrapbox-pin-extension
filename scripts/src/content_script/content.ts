import { isAction, type Action } from "../lib/util/actions";
import { BROWSER_ACTION_INTERVAL, TEXT } from "../lib/util/const";

const getPageNameList = () => {
    const pinElements = document.querySelectorAll<HTMLElement>("li.pin");
    console.log(pinElements);

    const isString = (arg: string | undefined): arg is string => {
        return arg !== undefined;
    }

    return [...pinElements.values()].map(getPageNameFromPinElement).filter(isString);
}

const getPageNameFromPinElement = (element: HTMLElement) => {
    return element.dataset.pageTitle;
}

const messageTypes = {
    GetPageNameList: "get-page-name-list",
    RunAction: "run-action"
} as const;

type MessageType = typeof messageTypes[keyof typeof messageTypes];

type BaseMessage = {
    type: MessageType,
    content: unknown
};

type BaseMessageWithContent = {
    type: MessageType,
    content: Record<"action", unknown>
};

type MessageGetPageNameList = {
    type: "get-page-name-list",
    content: unknown
};

type MessageRunAction = {
    type: "run-action",
    content: {
        action: Action
    }
};

const isBaseMessage = (message: unknown): message is BaseMessage => "type" in (message as BaseMessage);

const isNotNullishContent = (content: unknown): content is Record<string, unknown> => content !== undefined && content !== null;
const hasAction = (content: Record<string, unknown>): content is Record<"action", unknown> => "action" in content;

const isBaseMessageWithContent = (message: BaseMessage): message is BaseMessageWithContent => isNotNullishContent(message.content);

const isMessageGetPageNameList = (message: BaseMessage): message is MessageGetPageNameList => message.type === messageTypes.GetPageNameList;

const isMessageRunAction = (message: BaseMessageWithContent): message is MessageRunAction => {
    if (message.type !== messageTypes.RunAction) return false;
    if (!hasAction(message.content)) return false;
    
    return isAction(message.content.action);
}

const sleep = (ms: number) => {
    const promise = new Promise(resolve => {
        setTimeout(() => {
            resolve(null);
        }, ms);
    });

    return promise;
}

export const runAction = async (action: Action) => {
    /*
    const tab = await chrome.tabs.getCurrent();
    console.log(tab);

    if (tab === undefined) return;
    if (tab.id === undefined) return;
    */

    window.location.href = action.target;
    console.log("待機開始");
    
    await sleep(BROWSER_ACTION_INTERVAL);  // 読み込みを待つ

    console.log("待機");

    /*
        TODO:
            現在、 BROWSER_ACTION_INTERVAL を待って読み込み完了としています。
            1. 読み込みと、要素のレイアウトが完了したら、
            2. #page-edit-menu をクリックして、
            3. Unpin from home または、 Pin at home と書かれた a 要素を取得する。
    */

    const pageEditMenu = document.getElementById(TEXT.PAGE_EDIT_MENU_ID);
    console.log(pageEditMenu);
    if (pageEditMenu === null) return;


    pageEditMenu.click();

    const menuButtons = document.querySelectorAll<HTMLElement>(`#${TEXT.PAGE_EDIT_MENU_ID} + ul > li > a`);

    const isPinText = (textContent: string) => {
        return [TEXT.PIN_AT_HOME_TEXT, TEXT.UNPIN_FROM_HOME_TEXT].includes(textContent);
    }

    const pinButton = [...menuButtons.values()].find(button => isPinText(button.textContent || ""));
    if (pinButton === undefined) return;

    pinButton.click();
}

chrome.runtime.onMessage.addListener((message: unknown, _, sendResponse) => {
    console.log(message);
    if (!isBaseMessage(message)) return true;

    if (isMessageGetPageNameList(message)) {
        sendResponse(getPageNameList());
        return true;
    }

    console.log("not get-page-name-list")

    if (isBaseMessageWithContent(message)) {
        console.log("with-content");
        console.log(message.content);
        if (isMessageRunAction(message)) {
            console.log("run-action");
            runAction(message.content.action)
            .then(() => {
                sendResponse("OK");
            });
            return true;
        }
    }
});