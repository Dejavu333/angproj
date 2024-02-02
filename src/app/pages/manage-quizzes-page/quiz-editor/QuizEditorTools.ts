export abstract class QuizEditorTool {
    abstract cursor: string;
    abstract activate(): void;
    abstract clickCommand(): void;
}

export class GroupingTool extends QuizEditorTool {
    override cursor: string = "pointer";

    override activate(): void {
        const allElements = document.querySelectorAll('*');
        allElements.forEach((element) => {
            const el = element as HTMLElement;
            el.style.setProperty('cursor', this.cursor, 'important');
        });
    }

    override clickCommand(): void {
        console.log("clickwithgroupingtool");
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

