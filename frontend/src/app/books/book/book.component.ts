import { Component, Input, OnInit } from '@angular/core';
import { Book, BooksService } from '../services/books.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {
  @Input() bookData!: Book;

  public isEditMode: boolean = false;

  public formValues: any = {};

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.formValues = { ...this.bookData };
  }

  public async deleteBook() {
    await this.booksService.deleteBookById(this.bookData.id);
    await this.booksService.getBooks();
  }

  public toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  public dismissFormEdit() {
    // reset form values
    this.formValues = { ...this.bookData };
    this.toggleEditMode();
  }

  public async submitEdit() {
    await this.booksService.updateBookById(this.bookData.id, this.formValues);
    this.dismissFormEdit();
    await this.booksService.getBooks();
  }

  public onInput($event: any, type: string) {
    this.formValues[type] = $event.target.value;
  }
}
