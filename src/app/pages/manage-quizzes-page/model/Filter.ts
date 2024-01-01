export enum FilterKind {
    PARITYFILTER = "parityFilter",
    SEARCHTERMFILTER = "searchTermFilter",
    ORDERFILTER = "orderFilter",
    LIMITFILTER = "limitFilter",
}

export class Filter {
    public kind: FilterKind;
    public predicate: (...args: any[]) => boolean;

    constructor(kind: FilterKind, predicate: (itemsToFilter: any[]) => boolean) {
        this.kind = kind;
        this.predicate = predicate;
    }

    applyTo(items: any[]): any[] {
        try {
            const result = items.filter(item => {
                const res: true | false | undefined = this.predicate(item);
                if (res === true || res === false) return res;
                else throw new Error("not applicable filter");
            });
            return result;
        }
        catch (error) {
            console.log(error);
            return items;
        }
    }
}
