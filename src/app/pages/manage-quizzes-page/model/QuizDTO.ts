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
        return this.groups.reduce((acc, g) => acc + g.drawThisMany, 0);
    }
    //user can't affect these
    private animState: QuizAnimState = QuizAnimState.ScaleIn;

    //===========================================================================
    // constructors
    //===========================================================================
    constructor(id: string, category: string, indexInParent: number, title: string, quizQuestions: QuizQuestionDTO[], isOrdered: boolean, timeLimit: number, groups: Group[]) {
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
    addQuizQuestion(quizQuestion: QuizQuestionDTO) {
        this.quizQuestions.push(quizQuestion);
    }
    addGroup(group:Group) {
        this.groups.push(group);
    }
    removeQuizQuestion(id: string) {
        //  this.quizQuestions.indexOf(this.quizQuestions.find((q)=>q.id===id)!) //todo id 
    }

    setGroupForQuizQuestion(quizQuestion: QuizQuestionDTO, group: Group) {
        //set q group
        quizQuestion.group = group.name;
        //trash
        const currentGroupNames = this.quizQuestions.map((q) => q.group);
        this.groups = this.groups.filter(group => currentGroupNames.includes(group.name));
        //inventory
        const inventoryGroupNames = this.groups.map((g) => { return g.name });
        const alreadyExists = inventoryGroupNames.includes(group.name);
        if (!alreadyExists) { this.addGroup(group); };

    }

    setAnimState(toState: QuizAnimState) {
        this.animState = toState;
    }
    getAnimState() {
        return this.animState;
    }
}
