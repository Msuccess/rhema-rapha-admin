import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layouts/layout.component';

const routes: Routes = [
    {
        path: 'account',
        loadChildren: () =>
            import('./auth/auth-routing').then((m) => m.AuthRoutingModule),
    },

    {
        path: '',
        component: LayoutComponent,
        loadChildren: () =>
            import('./pages/pages.module').then((m) => m.PagesModule),
        // canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
