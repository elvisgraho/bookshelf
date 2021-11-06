import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book, BooksService } from './services/books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit, OnDestroy {
  public bookSub!: Subscription;
  public books: Book[] = [];

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    // make a request on component entrance
    this.booksService.getBooks();

    this.bookSub = this.booksService.getBooksBS().subscribe((val) => {
      this.books = val;
    });
  }

  ngOnDestroy() {
    this.bookSub && this.bookSub.unsubscribe();
  }
}
