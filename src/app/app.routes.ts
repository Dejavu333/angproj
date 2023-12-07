import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ManageQuizzesPageComponent } from './pages/manage-quizzes-page/manage-quizzes-page.component';
import { ManageQuizInstancesPageComponent } from './pages/manage-quiz-instances-page/manage-quiz-instances-page.component';
import { EmailTemplatesPageComponent } from './pages/email-templates-page/email-templates-page.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { AttendQuizPageComponent } from './pages/attend-quiz-page/attend-quiz-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

export const routes: Routes = [
    { path: 'login', component: LoginPageComponent },
    { path: 'register', component: RegisterPageComponent },
    { path: 'managequizzes', component: ManageQuizzesPageComponent },
    { path: 'managequizinstances', component: ManageQuizInstancesPageComponent },
    { path: 'emailtemplates', component: EmailTemplatesPageComponent },
    { path: 'settings', component: SettingsPageComponent },
    { path: 'attendquiz/:quizaccesstoken', component: AttendQuizPageComponent },
    { path: '**', component: NotFoundPageComponent },
  ];
  