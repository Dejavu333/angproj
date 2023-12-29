enum FilterKind {
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
            return items.filter(item => this.predicate(item));
        }
        catch (error) {
            console.log(error);
            return items;
        }
    }
}


