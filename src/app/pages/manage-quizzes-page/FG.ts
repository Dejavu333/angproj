import { FormGroup } from "@angular/forms";

export class FG extends FormGroup {
    
    public manualUpdate: boolean = true;

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
