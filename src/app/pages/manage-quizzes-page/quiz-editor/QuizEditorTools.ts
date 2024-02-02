import { QuizQuestionDTO } from "../model/QuizQuestionDTO";

export abstract class QuizEditorTool {
    abstract cursor: string;
    abstract activate(): void;
    abstract clickCommand(el?:any): void;
}

export class GroupingTool extends QuizEditorTool {
    override cursor: string = "pointer";
    groupingColor:string;

    constructor(groupingColor:string) {
        super();
        this.groupingColor = groupingColor;
    }

    override activate(): void {
        const allElements = document.querySelectorAll('*');
        allElements.forEach((element) => {
            const el = element as HTMLElement;
            el.style.setProperty('cursor', this.cursor, 'important');
        });
    }

    override clickCommand(el?:any): void {
        const targetQestion = el as QuizQuestionDTO;
        targetQestion.group = this.groupingColor;
    }
}

export class DefaultTool extends QuizEditorTool {
    override cursor: string = "auto";

    override activate(): void {
        const allElements = document.querySelectorAll('*');
        allElements.forEach((element) => {
            const el = element as HTMLElement;
            el.style.setProperty('cursor', this.cursor, 'important');
        });
    }

    override clickCommand(): void {
        console.log("nothing happens since its default tool");
    }
}

