import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreComponent } from './store/store.component';
import { MyCollectionComponent } from './my-collection/my-collection.component';
import { AdminComponent } from './admin/admin.component';
import { MenuComponent } from './menu/menu.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccessGuardGuard } from './access-guard.guard';

const routes: Routes = [
  { path: 'store', component: StoreComponent, data: {requiresLogin: true}, canActivate:[AccessGuardGuard] },
  {path: 'collection', component: MyCollectionComponent, data: {requiresLogin: true}, canActivate:[AccessGuardGuard]},
  {path: 'admin', component: AdminComponent, data: {requiresAdmin: true}, canActivate:[AccessGuardGuard]},
  {path: 'menu', component: MenuComponent, data: {requiresLogin: true}, canActivate:[AccessGuardGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'dashboard', component: DashboardComponent},
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
