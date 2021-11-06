import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../services/books.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {
  @Input() bookData!: Book;

  constructor() {}

  ngOnInit(): void {}
}
