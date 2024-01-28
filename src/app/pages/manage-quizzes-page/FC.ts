import { AsyncValidatorFn, FormControl, ValidatorFn } from "@angular/forms";
import { Subject } from "rxjs";

export type TriggerEvents = ("blur" | "submit" | "click" | "dblclick" | "focus" | "input" | "mouseover")[];
export type FCConf = {
    triggers?: TriggerEvents,
    cascadeValidityCheck?: boolean,
    cascadeValueChange?: boolean,
    validators?: ValidatorFn | ValidatorFn[],
    asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[],
}

export class FC extends FormControl {
    public FCConf: FCConf;
    private manualUpdate: boolean = true;
    public reset$tream:Subject<string> = new Subject<string>();
    public initialValue:string;

    constructor(formState?: any, FCConf?:FCConf) {
        const defaultFCConf: FCConf = {
            triggers: ["blur"],
            cascadeValidityCheck: true,
            cascadeValueChange: false,
        }
        const mergedFCConf = {...defaultFCConf, ...FCConf};
        
        super(formState, mergedFCConf.validators, mergedFCConf.asyncValidators);
        this.FCConf = mergedFCConf;
        this.initialValue = formState ?? "";
    }

    // prevents original behaviour
    override updateValueAndValidity(opts: { onlySelf?: boolean; emitEvent?: boolean } = {}): void {
        if (!this.manualUpdate) {
            super.updateValueAndValidity(opts);
        }
    }

    forceUpdateValueAndValidity(opts: { onlySelf?: boolean; emitEvent?: boolean } = {}): void {
        super.updateValueAndValidity(opts);
    }

    override reset(formState?: any, options?: { onlySelf?: boolean | undefined; emitEvent?: boolean | undefined; } | undefined): void {
        super.reset(formState, options);
            this.reset$tream?.next(this.initialValue);
    }
}
