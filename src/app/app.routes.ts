import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ManageQuizzesPageComponent } from './pages/manage-quizzes-page/manage-quizzes-page.component';
import { ManageQuizInstancesPageComponent } from './pages/manage-quiz-instances-page/manage-quiz-instances-page.component';
import { EmailTemplatesPageComponent } from './pages/email-templates-page/email-templates-page.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { AttendQuizPageComponent } from './pages/attend-quiz-page/attend-quiz-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { QuizEditorComponent } from "./pages/manage-quizzes-page/quiz-editor/quiz-editor.component";
import { QuizInstanceEditorComponent } from "./pages/manage-quizzes-page/quiz-instance-editor/quiz-instance-editor.component";
import { Constants } from './app.constants';

export const routes: Routes = [
    { path: 'login',                        component: LoginPageComponent },
    { path: 'register',                     component: RegisterPageComponent },
    { path: Constants.MANAGE_QUIZZES_PAGE_ROUTE,               component: ManageQuizzesPageComponent,
        children: [
            { path: Constants.QUIZ_EDITOR_ROUTE+"/:id",          component: QuizEditorComponent },
            { path: Constants.QUIZ_INSTANCE_EDITOR_ROUTE+"/:id", component: QuizInstanceEditorComponent },
            // {path: 'quiz-category-columns-editor', component: ### }
        ]},
    { path: 'manage-quiz-instances',        component: ManageQuizInstancesPageComponent },
    { path: 'email-templates',              component: EmailTemplatesPageComponent },
    { path: 'settings',                     component: SettingsPageComponent },
    { path: 'attend-quiz/:quizaccesstoken', component: AttendQuizPageComponent },
    { path: '**',                           component: NotFoundPageComponent },
];
