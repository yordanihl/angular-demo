import { Component } from '@angular/core';
import { IItem } from '../item';
import { ItemService } from '../item.service';
import { skip, take } from 'rxjs';

@Component({
  selector: 'app-tasks-list-view',
  templateUrl: './tasks-list-view.component.html',
  styleUrls: ['./tasks-list-view.component.css']
})
export class TasksListViewComponent {
  items!: IItem[];
  popupIsShowing = false;
  editModeIsActive = false;
  itemsAreLoading = false;
  selectedItem: IItem = { id: 0, name: '', extraInfo: '' };
  formItem: IItem = { id: 0, name: '', extraInfo: '' };
  draggedItem: IItem = { id: 0, name: '', extraInfo: '' };
  dragTargetId: number = 0;

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.itemService.localItems$.subscribe({
      next: items => {
        this.items = items;
        this.items.forEach(item => {
          if (this.selectedItem.id !== item.id) return;
          this.selectedItem = { ...item };
        });
        this.itemsAreLoading = false;
      },
      error: error => console.log(error)
    });
  }

  itemHandleDragstart(itemId: number) {
    setTimeout(() => {
      this.draggedItem = this.items.filter(item => item.id == itemId)[0];
    }, 0);
  }

  itemHandleDragend(itemId: number) {
    this.itemsAreLoading = true;
    const tempItems = [...this.items];
    if (this.dragTargetId != 0 && this.dragTargetId != itemId) {
      let itemIndex!: number, targetIndex!: number;
      for (let i = 0; i < tempItems.length; i++) {
        if (itemIndex == undefined && tempItems[i].id == itemId) itemIndex = i;
        if (targetIndex == undefined && tempItems[i].id == this.dragTargetId) targetIndex = i;
      }
      tempItems.splice(itemIndex, 1);
      tempItems.splice(targetIndex, 0, this.draggedItem);
      this.itemService.updateItems(tempItems);
    }
    this.draggedItem = { id: 0, name: '', extraInfo: '' };
  }

  itemHandleDragover(e: Event, itemId: number) {
    e.preventDefault();
    this.dragTargetId = itemId;
  }

  itemHandleClick(itemId: number) {
    this.selectedItem = this.items.filter(item => item.id == itemId)[0];
    this.showPopup();
  }

  closeBtnHandleClick() {
    this.hidePopup();
  }

  formHandleSubmit() {
    this.itemService.localItems$.pipe(skip(1), take(1)).subscribe(() => {
      this.formClear();
    });
    if (this.editModeIsActive) {
      this.itemService.editItem(this.formItem);
      this.deactivateEditMode();
      return;
    }
    this.itemService.addItem(this.formItem);
  }

  deleteBtnHandleClick() {
    this.itemService.localItems$.pipe(skip(1), take(1)).subscribe(() => {
      this.hidePopup();
    });
    this.itemService.removeItem(this.selectedItem.id);
  }

  editBtnHandleClick() {
    this.activateEditMode();
    this.formItem = { ...this.selectedItem };
  }

  formCancelBtnHandleClick() {
    this.deactivateEditMode();
    this.formClear();
  }

  showPopup() {
    this.popupIsShowing = true;
  }

  hidePopup() {
    this.popupIsShowing = false;
  }

  activateEditMode() {
    this.editModeIsActive = true;
  }

  deactivateEditMode() {
    this.editModeIsActive = false;
  }

  formClear() {
    this.formItem.name = '';
    this.formItem.extraInfo = '';
  }
}
