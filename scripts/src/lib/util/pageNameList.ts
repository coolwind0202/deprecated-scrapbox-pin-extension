export interface AbstractPageNameList {
    names: string[],
    moveFront: (i: number) => AbstractPageNameList,
    moveBack: (i: number) => AbstractPageNameList,
    unpin: (i: number) => AbstractPageNameList,
    copy: () => AbstractPageNameList
}

export class DefaultPageNameList implements AbstractPageNameList {
    names: string[]

    constructor(names: string[]) {
        this.names = names;
        console.log(this.moveFront.toString());
    }

    copy() {
        console.log(JSON.stringify(this));
        return new DefaultPageNameList([...this.names]);
    }

    moveFront(i: number) {
        if (i - 1 < 0) return this;

        const copy = this.copy();
        [copy.names[i - 1], copy.names[i]] = [copy.names[i], copy.names[i - 1]];
        return copy;
    }

    moveBack(i: number) {
        if (i + 1 >= this.names.length) return this;

        const copy = this.copy();
        [copy.names[i + 1], copy.names[i]] = [copy.names[i], copy.names[i + 1]];
        return copy;
    }

    unpin(i: number) {
        return new DefaultPageNameList(this.names.filter((_, index) => i !== index));
    }
}