import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="book-info"
export default class extends Controller {
  static values = {
    randomCoverUrl: String
  }

  connect() {
    console.log("book-info stimulus controller connected.")
    this.crsfToken = document.querySelector('meta[name="csrf-token"]').content;
  }

  randomCover() {
    fetch(`${this.randomCoverUrlValue}`, {
      method: 'PATCH',
      headers: {
        'X-CSRF-Token': this.crsfToken
      }
    })
    .then(response => response.json())
    .then(data => {
      const defaultCoverPath = `/assets/covers/cover-${data.default_cover}.png`;
      document.querySelector(".book-cover-show").src = defaultCoverPath;
    })
  }
}
