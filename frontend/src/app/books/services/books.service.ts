import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private mainApi = 'http://localhost:3150';

  constructor(private http: HttpClient) {}

  public async getBooks() {
    const resp = await this.http.get(`${this.mainApi}/`).toPromise();
    console.log(this.mainApi);
    console.log(resp);
  }
}
