import { Directive, ElementRef, Input, Renderer2, } from "@angular/core";
import { FC } from "./FC";
import { FG } from "./FG";
import { Subject } from "rxjs";

@Directive({
    standalone: true,
    selector: '[FC]',
})
export class FCConfDirective {
    //===========================================================================
    // properties, fields
    //===========================================================================
    @Input()
    public FC: FC | undefined;

    public nonOrdinaryTriggerEvents = ["submit"];

    //===========================================================================
    // constructors
    //===========================================================================
    constructor(private el: ElementRef, private renderer: Renderer2) {
    }

    //===========================================================================
    // lifecycle hooks
    //===========================================================================
    ngAfterViewInit() {
        if (!this.FC) {
            console.error("You didn't provide an FC instance to the [FC] directive... Add [FC]=yourFCInstance");
            return;
        }

        this.renderer.listen(this.el.nativeElement, "input", (event) => {
            console.log(event)
            let v = this.el.nativeElement.value;
            this.FC!.setValue(v);
        });

        this.el.nativeElement.value = this.FC.value;
        this.FC.reset$tream.subscribe((formState) => this.el.nativeElement.value = formState) // into two-way binding

        this.FC.FCConf.triggers?.forEach(trigger => {
            if (!this.nonOrdinaryTriggerEvents.includes(trigger)) {
                this.renderer.listen(this.el.nativeElement, trigger, () => this._onEvent(trigger));
            }
            else if (trigger === "submit") {
                setTimeout(() => {
                    const rootFG = this.FC!.root as FG;
                    if (rootFG && !rootFG.FGConf.triggers?.includes("submit")) rootFG.ownerDirective?.registerTriggers(["submit"]); // registers submit handler on the top controller (FG)
                    this.FC!.submitted$tream = new Subject<void>(); // controllers which don't have submit trigger will have this undefined
                    this.FC!.submitted$tream.subscribe(() => this._onEvent("submit"));
                }, 0);  // have to wait reason is unclear atm
            }
        });
    }

    //===========================================================================
    // methods
    //===========================================================================
    private _onEvent(event: string | undefined) {
        if (this.FC instanceof FC) {
            console.log(`FCEvent: ${event}`);
            this.FC.forceUpdateValueAndValidity();
        }
    }
}