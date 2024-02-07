import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IItem } from './item';
import { BehaviorSubject } from 'rxjs';

const LOCALHOST = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private _localItems = new BehaviorSubject<IItem[]>([]);
  readonly localItems$ = this._localItems.asObservable();

  constructor(private http: HttpClient) { }

  private _emitNext(items: IItem[]) {
    this._localItems.next(items);
  }

  private _emitError(error: string) {
    this._localItems.error(error);
  }

  getItems() {
    this.http.get<IItem[]>(LOCALHOST + '/items').subscribe(items => this._emitNext(items));
  }

  addItem(newItem: IItem) {
    console.log('addItem', newItem);
    this.http.post<IItem>(LOCALHOST + '/items/add', newItem).subscribe(responseItem => {
      const tempItems = this._localItems.getValue();
      tempItems.push(responseItem);
      this._emitNext(tempItems);
    });
  }

  editItem(targetItem: IItem) {
    this.http.put<IItem>(LOCALHOST + '/items/edit', targetItem).subscribe(responseItem => {
      const currentItems = this._localItems.getValue();
      const updatedItems = currentItems.map(currentItem => currentItem.id == responseItem.id ? responseItem : currentItem);
      this._emitNext(updatedItems);
    });
  }

  updateItems(localItems: IItem[]) {
    this.http.put<IItem[]>(LOCALHOST + '/items/update', localItems).subscribe({
      next: responseItems => this._emitNext(responseItems),
      error: error => this._emitError(error)
    });
  }

  removeItem(id: number) {
    this.http.delete(LOCALHOST + '/items/remove/' + id).subscribe(() => {
      const currentItems = this._localItems.getValue();
      const updatedItems = currentItems.filter(item => item.id != id);
      this._emitNext(updatedItems);
    });
  }

  // getItems(callback: (response: IItem[]) => void) {
  //   this.http.get<IItem[]>('http://localhost:3000/api/items').subscribe(items => {
  //     this.localItems = items;
  //     callback(this.localItems);
  //   });
  // }

  // addItem(newItem: IItem, callback: (response: IItem[]) => void) {
  //   this.http.post<IItem>('http://localhost:3000/api/items/add', newItem).subscribe(item => {
  //     this.localItems.push(item);
  //     callback(this.localItems);
  //   });
  // }

  // editItem(targetItem: IItem, callback: (response: IItem[], targetItem: IItem) => void) {
  //   this.http.put<IItem>('http://localhost:3000/api/items/edit', targetItem).subscribe(item => {
  //     this.localItems = this.localItems.map(localItem => localItem.id == item.id ? item : localItem);
  //     callback(this.localItems, item);
  //   });
  // }

  // updateItems(localItems: IItem[], cbNext: (response: IItem[]) => void, cbError: () => void) {
  //   this.http.put<IItem[]>('http://localhost:3000/api/items/update', localItems).subscribe({
  //     next: items => {
  //       this.localItems = items;
  //       cbNext(this.localItems);
  //     },
  //     error: err => {
  //       cbError();
  //     }
  //   });
  // }

  // removeItem(id: number, callback: (response: IItem[]) => void) {
  //   this.http.delete('http://localhost:3000/api/items/remove/' + id).subscribe(() => {
  //     this.localItems = this.localItems.filter(item => item.id != id);
  //     callback(this.localItems);
  //   });
  // }
}
