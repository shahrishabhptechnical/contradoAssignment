import { Component } from '@angular/core';
import { SearchService } from './search.service';

@Component({
  selector: 'contrado-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'contradoAssignment';
  search: string;

  constructor(
    private searchService: SearchService
  ) {

  }

  onSubmitForm() {

  }
}
