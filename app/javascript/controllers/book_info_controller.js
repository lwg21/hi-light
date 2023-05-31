import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="book-info"
export default class extends Controller {
  static targets = ["book"]

  static values = {
    randomCoverUrl: String,
    parseCoverUrl: String
  }

  connect() {
    console.log("book-info stimulus controller connected.")
    this.crsfToken = document.querySelector('meta[name="csrf-token"]').content;
  }

  randomCover() {
    fetch(`${this.randomCoverUrlValue}`, {method: 'PATCH', headers: {'X-CSRF-Token': this.crsfToken}})
    .then(response => response.json())
    .then(data => {
      const defaultCoverPath = `/assets/covers/cover-${data.default_cover}.png`;
      const bookCover = document.querySelector(".book-cover>img");
      bookCover.src = defaultCoverPath;
      bookCover.classList.add("book-cover-show");
    })
  }

  parseCover() {
    console.log("parse cover")
    fetch(`${this.parseCoverUrlValue}`, {method: 'PATCH', headers: {'X-CSRF-Token': this.crsfToken}})
    .then(response => response.json())
    .then(data => {
      console.log(data)
      const bookCover = document.querySelector(".book-cover>img");
      if (data.cover !== null) {
        bookCover.src = data.cover;
        bookCover.classList.remove("book-cover-show");
      }
    })
  }

  parseAllCovers() {
    console.log("parse ALL covers");
    const books = this.bookTargets;
    books.forEach((book) => {
      console.log(book.dataset.parseCoverUrl);
      fetch(`${book.dataset.parseCoverUrl}`, {method: 'PATCH', headers: {'X-CSRF-Token': this.crsfToken}})
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const bookCover = book.querySelector("img");
        if (data.cover !== null) {
          bookCover.src = data.cover;
        }
      })
    });
  }
}
