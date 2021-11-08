import { Component, OnInit } from '@angular/core';
import { BooksService } from './books/services/books.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public isAddBookVisible: boolean = false;

  constructor(private booksService: BooksService) {}

  ngOnInit() {}

  getStuff() {
    this.booksService.getBooks();
  }

  public addRandom() {
    this.booksService.addRandomBook();
  }

  public toggleAddBook() {
    this.isAddBookVisible = !this.isAddBookVisible;
  }
}
