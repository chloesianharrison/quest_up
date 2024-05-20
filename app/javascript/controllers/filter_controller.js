import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="filter"
export default class extends Controller {
  static targets = ["completed", "xp"]

  connect() {
    const url = window.location.href;
    const searchQuery = url.split('?')[1];
    this.searchParams = {};
    if (searchQuery) {
      const searchParamsGroups = searchQuery.split('&');
      searchParamsGroups.forEach((group) => { this.searchParams[group.split('=')[0]] = group.split('=')[1] });
    }
    this.processFilters()
  }

  processFilters() {
    if (this.searchParams['sortOption'] === 'completed') {
      this.completedTarget.checked = true;
    } else if (this.searchParams['sortOption'] === 'byXP') {
      this.xpTarget.checked = true;
    }
  }

}
