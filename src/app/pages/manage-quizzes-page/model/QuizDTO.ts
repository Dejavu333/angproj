import { QuizAnimState } from "app/app.animations";
import { QuizQuestionDTO } from "./QuizQuestionDTO";

export class Group {
    name: string;
    drawThisMany: number;

    constructor(name: string, drawThisMany: number) {
        this.name = name; // colorvalue
        this.drawThisMany = drawThisMany;
    }
}

export class QuizDTO {
    //===========================================================================
    // properties, fields
    //===========================================================================
    //independent variables
    public id: string;
    public title: string;
    public category: string;
    public indexInParent: number;
    public quizQuestions: QuizQuestionDTO[];
    public isOrdered: boolean;
    public timeLimit: number;
    public groups: Group[]; //todo have to change in sync with questions, should make this private, quiz is actually an aggregate
    //dependent variables
    public get drawThisMany() {
        return this.groups.reduce((acc,g)=>acc+g.drawThisMany,0);
    } 
    //user can't affect these
    private animState: QuizAnimState = QuizAnimState.ScaleIn;

    //===========================================================================
    // constructors
    //===========================================================================
    constructor(id: string, category: string, indexInParent: number, title: string, quizQuestions: QuizQuestionDTO[], isOrdered: boolean, timeLimit: number, groups:Group[]) {
        this.id = id;
        this.category = category;
        this.indexInParent = indexInParent;
        this.title = title;
        this.quizQuestions = quizQuestions;
        this.isOrdered = isOrdered;
        this.timeLimit = timeLimit;
        this.groups = groups;
    }

    //===========================================================================
    // methods
    //===========================================================================
    setGroupForQuizQuestion(quizQuestion:QuizQuestionDTO, group:Group) {
        quizQuestion.group = group.name;
        const alreadyExists = this.groups.map((g)=>{return g.name}).includes(group.name);
        if (alreadyExists) {return};
        this.groups.push(group);
    }

    setAnimState(toState: QuizAnimState) {
        this.animState = toState;
    }
    getAnimState() {
        return this.animState;
    }
}
