export abstract class QuizEditorTool {
    abstract cursor: string;
    abstract activate():void;
    abstract clickCommand():void;
}

export class GroupingTool extends QuizEditorTool {
    override activate(): void {
        const territory = document.querySelector("#container") as HTMLElement;
        territory.style.cursor = this.cursor;
    }
    override cursor: string = "pointer";
    override clickCommand(): void {
        console.log("clickwithgroupingtool");
    }
}

export class DefaultTool extends QuizEditorTool {
    override activate(): void {
        const territory = document.querySelector("#container") as HTMLElement;
        territory.style.cursor = this.cursor;
    }
    override cursor: string = "auto";
    override clickCommand(): void {
        console.log("nothing happens since its default tool");    
    }
}

