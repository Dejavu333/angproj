import { FormGroup } from "@angular/forms";
import { FC, FCConf } from "./FC";

export class FG extends FormGroup {
    public FCConf: FCConf;
    private manualUpdate: boolean = false; //todo rethink

    constructor(controls?: any, FCConf?: FCConf) {
        const defaultFCConf: FCConf = {
            triggers: ["blur"],
            cascadeValidityCheck: true,
            cascadeValueChange: false,
        }
        const mergedFCConf = {...defaultFCConf, ...FCConf};

        super(controls, mergedFCConf.validators, mergedFCConf.asyncValidators);
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

    getFC(FCName: string): FC {
        return this.get(FCName) as FC;
    }
}
