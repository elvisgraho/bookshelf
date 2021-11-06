import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

export interface Book {
  id: string;
  isbn: string;
  name: string;
  authors: string;
  annotation: string;
}
export interface PostBook {
  isbn: string;
  name: string;
  authors: string;
  annotation: string;
}

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private mainApi = 'http://localhost:3150';

  private getAllApi = `${this.mainApi}/`;
  private getBookByIdApi = `${this.mainApi}/book`;
  private postNewBookApi = `${this.mainApi}/book`;
  private deleteBookByIdApi = `${this.mainApi}/book`;
  private putBookByIdApi = `${this.mainApi}/book`;

  private addRandomBookApi = `${this.mainApi}/add`;

  private currentBooks: Book[] = [];
  private currentBooks$ = new BehaviorSubject<Book[]>([]);

  constructor(private http: HttpClient) {}

  public getBooksBS() {
    return this.currentBooks$;
  }

  public async getBooks(): Promise<any> {
    const resp = await this.http.get(this.getAllApi).toPromise();

    if (resp && Array.isArray(resp)) {
      this.currentBooks = resp.reverse();
    } else {
      this.currentBooks = [];
    }

    this.currentBooks$.next(this.currentBooks);
    return resp;
  }

  public async getBookById(id: string): Promise<any> {
    const resp = await this.http
      .get(`${this.getBookByIdApi}/${id}`)
      .toPromise();
    return resp;
  }

  public async postNewBook(bookData: PostBook): Promise<any> {
    const resp = await this.http
      .post(this.postNewBookApi, bookData)
      .toPromise();
    return resp;
  }

  public async deleteBookById(id: string): Promise<any> {
    const resp = await this.http
      .delete(`${this.deleteBookByIdApi}/${id}`)
      .toPromise();
    return resp;
  }

  public async updateBookById(id: string, newBookData: Book): Promise<any> {
    const resp = await this.http
      .put(`${this.putBookByIdApi}/${id}`, newBookData)
      .toPromise();
    return resp;
  }

  public async addRandomBook(): Promise<any> {
    const resp = await this.http.get(`${this.addRandomBookApi}`).toPromise();
    await this.getBooks();
    return resp;
  }
}
