import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { IItem } from '../item';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-tasks-table-view',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './tasks-table-view.component.html',
  styleUrls: ['./tasks-table-view.component.css']
})
export class TasksTableViewComponent {
  defaultColDef: ColDef = {
    filter: true,
    // editable: true
  };

  rowData: IItem[] = [];

  colDefs: ColDef[] = [
    { field: "id", filter: false, editable: false },
    { field: "name" },
    { field: "extraInfo" }
  ];

  constructor(private itemService: ItemService) { }

  ngOnInit(){
    this.itemService.localItems$.subscribe(items => {
      this.rowData = items;
    });
  }
}
