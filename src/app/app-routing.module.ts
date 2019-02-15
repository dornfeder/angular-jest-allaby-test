import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { environment } from 'environments/environment';

import { FormPageComponent } from './form-page';
import { NoContentComponent } from './no-content';

const routes: Routes = [
    { path: '', component: FormPageComponent },
    { path: '**',    component: NoContentComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        useHash: environment.settings.useHash,
        preloadingStrategy: PreloadAllModules
    })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
