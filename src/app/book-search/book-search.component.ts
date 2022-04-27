import {Component} from '@angular/core';
import {BookService} from "../book.service";
import {IBooks} from "../books";

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent {
  books: IBooks[] = []
  searchTerm: string = ''

  constructor(private bookService: BookService) {
  }

  getBooks(): void {
    this.bookService.getBooks(this.searchTerm)
      .subscribe(books => this.books = books)
  }

  listElements(elements: string[] | undefined): string {
    return elements ? elements.join(', ') : ''
  }

  buildImgSrc(id: number | undefined): string {
    return id ? `https://covers.openlibrary.org/b/id/${id}-S.jpg` : ''
  }


}
