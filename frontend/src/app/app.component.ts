import { Component, OnInit } from '@angular/core';
import { BooksService } from './books/services/books.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'frontend';

  constructor(private booksService: BooksService) {}

  ngOnInit() {}

  getStuff() {
    this.booksService.getBooks();
  }

  addRandom() {
    this.booksService.addRandomBook();
  }
}
