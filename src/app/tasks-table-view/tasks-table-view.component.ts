import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellValueChangedEvent, ColDef } from 'ag-grid-community';
import { IItem } from '../item';
import { ItemService } from '../item.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-tasks-table-view',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './tasks-table-view.component.html',
  styleUrls: ['./tasks-table-view.component.css']
})
export class TasksTableViewComponent {
  destroySubscription$ = new Subject<void>();
  defaultColDef: ColDef = {
    filter: true,
    editable: true
  };

  rowData!:IItem[];
  // rowData$!:Observable<IItem[]>; // async pipe doesn't work?

  colDefs: ColDef[] = [
    { field: "id", filter: false, editable: false },
    { field: "name" },
    { field: "extraInfo" }
  ];

  constructor(private itemService: ItemService) { 
  }

  ngOnInit(){
    this.itemService.localItems$.pipe(takeUntil(this.destroySubscription$)).subscribe(items => this.rowData = items);
  }

  ngOnDestroy() {
    this.destroySubscription$.next();
  }

  onCellValueChanged(event: CellValueChangedEvent) {
    this.itemService.editItem(event.data);
  }
}
