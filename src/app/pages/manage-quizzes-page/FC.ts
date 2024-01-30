import { AsyncValidatorFn, FormControl, ValidatorFn } from "@angular/forms";
import { Subject } from "rxjs";
import { FG } from "./FG";

export type TriggerEvents = ("blur" | "submit" | "click" | "dblclick" | "focus" | "input" | "mouseover")[];
export type FCConf = {
    triggers?: TriggerEvents,
    cascadeValidityCheck?: boolean,
    cascadeValueChange?: boolean,
    validators?: ValidatorFn | ValidatorFn[],
    asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[],
}

export class FC extends FormControl {
    //===========================================================================
    // properties, fields
    //===========================================================================
    public FCConf: FCConf;
    private manualUpdate: boolean = true;
    public reset$tream: Subject<string> = new Subject<string>();
    public initialValue: string;
    public submitted$tream: Subject<void> | undefined;

    //===========================================================================
    // constructors
    //===========================================================================
    constructor(formState?: any, FCConf?: FCConf) {
        const defaultFCConf: FCConf = {
            triggers: ["blur"],
            cascadeValidityCheck: true,
            cascadeValueChange: false,
        }
        const mergedFCConf = { ...defaultFCConf, ...FCConf };

        super(formState, mergedFCConf.validators, mergedFCConf.asyncValidators);
        this.FCConf = mergedFCConf;
        this.initialValue = formState ?? "";
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
        const opts = { onlySelf: !this.FCConf.cascadeValidityCheck, emitEvent: this.FCConf.cascadeValueChange };
        super.updateValueAndValidity(opts);
        const p = this.parent as FG;
        if (p && !opts.onlySelf) { // cascadeValidyCheck is true
            p.forceUpdateValueAndValidity();
        }
    }

    public override reset(formState?: any, options?: { onlySelf?: boolean | undefined; emitEvent?: boolean | undefined; } | undefined): void {
        super.reset(formState, options);
        this.reset$tream?.next(this.initialValue);
    }
}
