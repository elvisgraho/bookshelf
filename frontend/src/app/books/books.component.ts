import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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
  public booksDisplay: Book[] = [];

  private searchString: string = '';

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    // make a request on component entrance
    this.booksService.getBooks();

    this.bookSub = this.booksService.getBooksBS().subscribe((val) => {
      this.books = val;
      this.filterSearchString();
    });
  }

  ngOnDestroy() {
    this.bookSub && this.bookSub.unsubscribe();
  }

  public onSearchInput($event: any) {
    this.searchString = $event.target.value;

    this.searchString = this.searchString.toLowerCase();

    this.filterSearchString();
  }

  private filterSearchString() {
    if (!this.searchString || this.searchString.length == 0) {
      this.booksDisplay = [...this.books];
      return;
    }

    const newList: Book[] = [];
    for (const book of this.books) {
      const bookString: string = `${book.isbn} ${book.name} ${book.authors}`.toLowerCase();
      if (bookString.includes(this.searchString)) {
        newList.push(book);
      }
    }

    this.booksDisplay = newList;
  }
}
