import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { dashboardRoutes } from './dashboard.routes';
//import { AuthGuard } from 'src/app/services/auth.guard';

//Children routes used displayed in dashboard component and triggered in the sidebar
const childrenRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: dashboardRoutes,
    //canActivate: [ AuthGuard ]
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(childrenRoutes)
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
