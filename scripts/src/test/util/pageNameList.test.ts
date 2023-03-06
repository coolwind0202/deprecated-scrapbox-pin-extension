import { DefaultPageNameList } from "../../lib/util/pageNameList";
import { describe, expect, test } from "vitest";

describe("DefaultPageNameList", () => {
    test("when construct, names will be setted correctly", () => {
        const pageNameList = new DefaultPageNameList(["a", "b", "c"]);
        expect(pageNameList.names).toHaveLength(3);

        expect(pageNameList.names.every((name, i) => name === ["a", "b", "c"][i]));
    });

    test("moveFront(0)", () => {
        const pageNameList = new DefaultPageNameList(["a", "b", "c"]);
        const A = pageNameList.moveFront(0);

        expect(A.names.every((name, i) => name === ["a", "b", "c"][i]));
    });

    test("moveFront(1)", () => {
        const pageNameList = new DefaultPageNameList(["a", "b", "c"]);
        const A = pageNameList.moveFront(1);

        console.log(A.names);

        expect(pageNameList.names.every((name, i) => name === ["a", "b", "c"][i]));
        expect(A.names.every((name, i) => name === ["b", "a", "c"][i]));
    });

    test("moveFront(minus)", () => {
        const moved = new DefaultPageNameList(["a"]).moveFront(-1);
        
        expect(moved.names[0]).toBe("a");
        expect(moved.names).toHaveLength(1);
    });

    test("moveFront(a number what is bigger than length)", () => {
        expect(() => {
            new DefaultPageNameList(["a"]).moveFront(1)
        }).toThrowError();

        expect(() => {
            new DefaultPageNameList(["a"]).moveFront(2)
        }).toThrowError();
    });

    test("whether we can use of return value of copy correctly", () => {
        const pageNameList = new DefaultPageNameList(["a", "b", "c"]);
        const clone = pageNameList.copy();
        let i = 0;

        expect(pageNameList.names === clone.names).toBeFalsy();

        while (i < pageNameList.names.length) {
            const a = pageNameList.names[i];
            const b = clone.names[i];
            const c = ["a", "b", "c"][i];

            expect(b).toBe(a);
            expect(b).toBe(c);
            i++;
        }
        
        const moved = clone.moveFront(1);  // moveFront() を実行しても clone に影響はないか？

        i = 0;

        while (i < clone.names.length) {
            const a = clone.names[i];
            const b = ["a", "b", "c"][i];

            const c = moved.names[i];
            const d = ["b", "a", "c"][i];

            expect(a).toBe(b);
            expect(c).toBe(d);

            i++;
        }
    });
});