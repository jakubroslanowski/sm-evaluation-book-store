import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, of, pluck} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {IBooks} from "./books";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) {
  }

  getBooks(searchTerm: string): Observable<IBooks[] | never[]> {
    const url = `http://openlibrary.org/search.json?title=${searchTerm}`
    return this.http.get<any>(url)
      .pipe(
        pluck('docs'),
        map(books => books.map((book: any) => ({
          title: book.title,
          authors: book.author_name,
          publishYears: book.publish_year,
          coverId: book.cover_i
        }))),
        catchError(_ => of([]))
      );
  }
}
