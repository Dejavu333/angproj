import { FormGroup } from "@angular/forms";
import { FC, FCConf } from "./FC";

export class FG extends FormGroup {
    public FCConf: FCConf;
    private manualUpdate: boolean = true;

    constructor(controls?: any, FCConf?: FCConf) {
        const defaultFCConf: FCConf = {
            triggers: ["blur"],
            cascadeValidityCheck: true,
            cascadeValueChange: false,
        }
        const mergedFCConf = { ...defaultFCConf, ...FCConf };

        super(controls, mergedFCConf.validators, mergedFCConf.asyncValidators);
        this.FCConf = mergedFCConf;

        // Object.keys(this.controls).forEach(key => {
        //     let control = this.get(key) as FC;
        //     if (control.FCConf.cascadeValueChange) {
        //         control?.valueChanges.subscribe(() =>{ 
        //             console.info("VALUE changed in ", control)
        //             // this.forceUpdateValueAndValidity({onlySelf:true,emitEvent:true});
        //         });
        //     }
        // }); //todo remove

        this.valueChanges.subscribe(() =>{ 
            console.info("VALUE changed in ", this) //todo remove
            // this.forceUpdateValueAndValidity({onlySelf:true,emitEvent:true});
        });
    }

    // prevents original behaviour
    override updateValueAndValidity(opts: { onlySelf?: boolean; emitEvent?: boolean } = {}): void {
        if (!this.manualUpdate) {
            // console.log("updateVandV got called", opts) //todo                  
            super.updateValueAndValidity(opts);
        }
    }

    forceUpdateValueAndValidity(): void {
        const opts = { onlySelf: !this.FCConf.cascadeValidityCheck, emitEvent: this.FCConf.cascadeValueChange };
        super.updateValueAndValidity(opts);
        const p = this.parent as FG;
        if (p && !opts.onlySelf) { // so cascadeValidyCheck is true
            p.forceUpdateValueAndValidity();
        }
    }

    getFC(FCName: string): FC {
        return this.get(FCName) as FC;
    }
}
