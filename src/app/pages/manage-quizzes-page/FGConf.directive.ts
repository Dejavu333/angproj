import { Directive, ElementRef, Input, Renderer2, } from "@angular/core";
import { FG } from "./FG";
import { AbstractControl } from "@angular/forms";
import { FC, TriggerEvents } from "./FC";

@Directive({
    standalone: true,
    selector: '[FG]',
})
export class FGConfDirective {
    //===========================================================================
    // properties, fields
    //===========================================================================
    @Input()
    public FG: FG | undefined;

    //===========================================================================
    // constructors
    //===========================================================================
    constructor(private el: ElementRef, private renderer: Renderer2) {
    }

    //===========================================================================
    // lifecycle hooks
    //===========================================================================
    ngAfterViewInit() {
        if (!this.FG) {
            console.error("You didn't provide an FG instance to the [FG] directive... Add [FG]=yourFGInstance");
            return;
        }

        this.FG.ownerDirective=this;

        this._registerTriggers();
    }

    //===========================================================================
    // methods
    //===========================================================================
    private _onEvent(event: string) {
        if (this.FG instanceof FG) {
            console.log(`FGEvent: ${event}`);
            this.FG.forceUpdateValueAndValidity();
            if (event === "submit") {
                console.log("submitting...")
                this._digFCThenTriggerSubmitted$tream(this.FG);
            }
        }
    }

    private _digFCThenTriggerSubmitted$tream(ac: AbstractControl) {
        if (ac instanceof FG) {
            Object.keys(ac.controls).forEach((controlName) => {
                const c = ac.get(controlName);
                c && this._digFCThenTriggerSubmitted$tream(c);
            });
        }
        else if (ac instanceof FC) {
            ac.submitted$tream?.next();
        }
        else return;
    }

    private _registerTriggers() {
        this.FG?.FGConf.triggers?.forEach(trigger => {
            this.renderer.listen(this.el.nativeElement, trigger, () => this._onEvent(trigger));
        });
    }

    public registerTriggers(triggers: TriggerEvents) {
        const newTriggers = triggers.filter(trigger => !this.FG?.FGConf.triggers?.includes(trigger));
        this.FG?.FGConf.triggers?.push(...newTriggers);
        newTriggers.forEach(trigger => {
            this.renderer.listen(this.el.nativeElement, trigger, () => this._onEvent(trigger));
        });
    }
}