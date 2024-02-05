import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksListViewComponent } from './tasks-list-view/tasks-list-view.component';
import { TasksTableViewComponent } from './tasks-table-view/tasks-table-view.component';

const routes: Routes = [
  { path: 'list', component: TasksListViewComponent },
  { path: 'table', component: TasksTableViewComponent },
  { path: '', component: TasksListViewComponent, pathMatch: 'full' },
  { path: '', redirectTo: '/', pathMatch: 'prefix' },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
