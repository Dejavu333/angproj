import { Directive, ElementRef, Input, Renderer2, } from "@angular/core";
import { FG } from "./FG";

@Directive({
    standalone: true,
    selector: '[FG]',
})
export class FGConfDirective {
    @Input()
    FG: FG | undefined;

    nonOrdinaryTriggerEvents = ["submit"]

    constructor(private el: ElementRef, private renderer: Renderer2) {
    }

    ngAfterViewInit() {
        if (!this.FG) { console.error("You didn't provide an FG instance to the [FG] directive... Add [FG]=yourFGInstance"); return; }

        // this.renderer.listen(this.el.nativeElement, "input", (event) => {
        //     console.log(event)
        //     let v = this.el.nativeElement.value;
        //     this.FG!.setValue(v);
        // }); //todo

        // this.el.nativeElement.value = this.FG?.value;
        // this.FG?.reset$tream.subscribe(()=>this.el.nativeElement.value=this.FG?.value) // into two-way binding //todo

        this.FG.FCConf.triggers?.forEach(event => {
            if (!this.nonOrdinaryTriggerEvents.includes(event)) {
                this.renderer.listen(this.el.nativeElement, event, () => this.onEvent(event));
            }
            else if (event === "submit") {
                console.log("submit event requires special handling //todo");
            }
        });
    }

    private onEvent(event: string) {
        if (this.FG instanceof FG) {
            console.log(`FGEvent: ${event}`);
            this.FG.forceUpdateValueAndValidity({ onlySelf: !this.FG.FCConf.cascadeValidityCheck, emitEvent: this.FG.FCConf.cascadeValueChange });
        }
    }
}