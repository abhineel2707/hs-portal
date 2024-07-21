import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  @Output() searchQueryChanged = new EventEmitter<string>();
  searchControl = new FormControl();

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300), // Adjust the debounce time as needed
        distinctUntilChanged()
      )
      .subscribe((query) => this.searchQueryChanged.emit(query));
  }
}
