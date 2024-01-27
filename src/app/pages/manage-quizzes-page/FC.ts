import { AsyncValidatorFn, FormControl, ValidatorFn } from "@angular/forms";

export type TriggerEvents = ("blur" | "submit" | "click" | "dblclick" | "focus" | "input" | "hover")[];
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

    constructor(formState?: any, FCConf?:FCConf) {
        const defaultFCConf: FCConf = {
            triggers: ["blur"],
            cascadeValidityCheck: true,
            cascadeValueChange: false,
        }
        const mergedFCConf = {...defaultFCConf, ...FCConf};

        super(formState, mergedFCConf.validators, mergedFCConf.asyncValidators);
        this.FCConf = mergedFCConf;
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
