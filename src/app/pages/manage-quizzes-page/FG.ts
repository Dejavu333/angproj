import { FormGroup } from "@angular/forms";
import { FC, FCConf } from "./FC";
import { FGConfDirective } from "./FGConf.directive";

export class FG extends FormGroup {
    //===========================================================================
    // properties, fields
    //===========================================================================
    public FGConf: FCConf;
    public ownerDirective: FGConfDirective | undefined;
    private manualUpdate: boolean = true;
    
    //===========================================================================
    // constructors
    //===========================================================================
    constructor(controls?: any, FCConf?: FCConf) {
        const defaultFCConf: FCConf = {
            triggers: ["blur"],
            cascadeValidityCheck: true,
            cascadeValueChange: false,
        }
        const mergedFCConf = { ...defaultFCConf, ...FCConf };

        super(controls, mergedFCConf.validators, mergedFCConf.asyncValidators);
        this.FGConf = mergedFCConf;
    }

    //===========================================================================
    // methods
    //===========================================================================
    // prevents original behaviour
    public override updateValueAndValidity(opts: { onlySelf?: boolean; emitEvent?: boolean } = {}): void {
        if (!this.manualUpdate) {
            super.updateValueAndValidity(opts);
        }
    }

    public forceUpdateValueAndValidity(): void {
        const opts = { onlySelf: !this.FGConf.cascadeValidityCheck, emitEvent: this.FGConf.cascadeValueChange };
        super.updateValueAndValidity(opts);
        const p = this.parent as FG;
        if (p && !opts.onlySelf) { // so cascadeValidyCheck is true
            p.forceUpdateValueAndValidity();
        }
    }

    public getFC(FCName: string): FC {
        return this.get(FCName) as FC;
    }
}
