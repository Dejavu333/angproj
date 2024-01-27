import { AbstractControlOptions, AsyncValidatorFn, FormControl, ValidatorFn } from "@angular/forms";

export type TriggerEvents = ("blur" | "submit" | "click" | "dblclick" | "focus" | "input" | "hover")[];
export type FCConf = {
    triggers?: TriggerEvents,
    cascadeValidityCheck?: boolean,
    cascadeValueChange?: boolean,
}

export class FC extends FormControl {
    public FCConf: FCConf = { triggers: ["blur"], cascadeValidityCheck: true, cascadeValueChange: false };

    private manualUpdate: boolean = true;

    constructor(formState?: any, FCCOnf?: FCConf, validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null, asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null) {
        super(formState, validatorOrOpts, asyncValidator);
        if(FCCOnf) this.FCConf = FCCOnf;
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
}
