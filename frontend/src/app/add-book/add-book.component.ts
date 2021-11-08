import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BooksService } from '../books/services/books.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
})
export class AddBookComponent implements OnInit {
  @Output() onDismiss = new EventEmitter();

  public formValues: any = {};

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {}

  public dismiss() {
    this.onDismiss.emit();
  }

  public onInput($event: any, type: string) {
    this.formValues[type] = $event.target.value;
  }

  public async addBook() {
    try {
      await this.booksService.postNewBook({ ...this.formValues });
      this.booksService.getBooks();
      this.dismiss();
    } catch (err) {
      console.error(err);
    }
  }
}
