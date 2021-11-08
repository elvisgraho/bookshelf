import { Component, Input, OnInit } from '@angular/core';
import { Book, BooksService } from '../services/books.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {
  @Input() bookData!: Book;

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {}

  public async deleteBook() {
    await this.booksService.deleteBookById(this.bookData.id);
    await this.booksService.getBooks();
  }
}
