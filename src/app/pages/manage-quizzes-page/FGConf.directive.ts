import { Directive, ElementRef, Input, Renderer2, } from "@angular/core";
import { FG } from "./FG";

@Directive({
    standalone: true,
    selector: '[FG]',
})
export class FGConfDirective {
    @Input()
    FG: FG | undefined;

    constructor(private el: ElementRef, private renderer: Renderer2) {
    }

    ngAfterViewInit() {
        if (!this.FG) { console.error("You didn't provide an FG instance to the [FG] directive... Add [FG]=yourFGInstance"); return; }

        this.FG.FCConf.triggers?.forEach(event => {
            this.renderer.listen(this.el.nativeElement, event, () => this.onEvent(event));
        });
    }

    private onEvent(event: string) {
        if (this.FG instanceof FG) {
            console.log(`FGEvent: ${event}`);
            this.FG.forceUpdateValueAndValidity();
            // if (event === "submit") {
            //     console.log('Form submitted');
            //     console.log(this.FG?.value)
            // }
        }
    }
}