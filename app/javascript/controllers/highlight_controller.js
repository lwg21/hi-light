import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="highlight"
export default class extends Controller {
  static targets = ["heart"]
  connect() {
    // this.token = document.querySelector('meta[name="csrf-token"]').content;
    console.log("Highlight controller connected");
  }

  toggleFavorite(event) {
    const url = this.heartTarget.dataset.highlightFavurl
    console.log(url)

    const crsfToken = document.querySelector('meta[name="csrf-token"]').content;
    console.log(crsfToken)

    fetch(`${url}`, {method: 'PATCH', headers: {'X-CSRF-Token': crsfToken}})
    .then(response => response.json)
    .then(data => {
      this.heartTarget.classList.toggle("fa-regular");
      this.heartTarget.classList.toggle("fa-solid");
      this.heartTarget.classList.toggle("favorite-heart");
    })
  }
}
