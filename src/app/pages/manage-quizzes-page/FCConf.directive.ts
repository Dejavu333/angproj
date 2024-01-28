import { Directive, ElementRef, Input, Renderer2, } from "@angular/core";
import { FC } from "./FC";

@Directive({
    standalone: true,
    selector: '[FC]',
})
export class FCConfDirective {
    @Input()
    FC: FC | undefined;

    nonOrdinaryTriggerEvents = ["submit"]

    constructor(private el: ElementRef, private renderer: Renderer2) {
    }

    ngAfterViewInit() {
        if (!this.FC) { console.error("You didn't provide an FC instance to the [FC] directive... Add [FC]=yourFCInstance"); return; }

        this.renderer.listen(this.el.nativeElement, "input", (event) => {
            console.log(event)
            let v = this.el.nativeElement.value;
            this.FC!.setValue(v);
        });

        this.el.nativeElement.value = this.FC?.value;
        this.FC?.reset$tream.subscribe((formState)=>this.el.nativeElement.value=formState) // into two-way binding

        this.FC.FCConf.triggers?.forEach(event => {
            if (!this.nonOrdinaryTriggerEvents.includes(event)) {
                this.renderer.listen(this.el.nativeElement, event, () => this.onEvent(event));
            }
            else if (event === "submit") {
                console.log("submit event requires special handling //todo");
            }
        });
    }

    private onEvent(event: string) {
        if (this.FC instanceof FC) {
            console.log(`FCEvent: ${event}`);
            this.FC.forceUpdateValueAndValidity({ onlySelf: !this.FC.FCConf.cascadeValidityCheck, emitEvent: this.FC.FCConf.cascadeValueChange });
        }
    }

}