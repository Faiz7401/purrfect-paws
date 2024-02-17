import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

// Represents the structure of a cat breed object.
interface CatBreed {
  breed: string;
  country: string;
  origin: string;
  coat: string;
  pattern: string;
  [key: string]: string;  // allows for additional properties with string values.
}

// Represents the structure of data returned from the cat data API.
interface CatData {
  data: CatBreed[];// An array containing the cat breed objects.
}

@Component({
  selector: 'app-cat-list',
  templateUrl: './cat-list.component.html',
  styleUrls: ['./cat-list.component.scss'],
})
export class CatListComponent implements OnInit {
  data: CatData | undefined; // Stores the fetched cat data
  searchQuery: string = ''; // Stores the search query entered by the user
  searchOption: string = 'breed'; // Defines the search option (breed, and country.)
  filteredItems: CatBreed[] = []; // Stores the filtered cat breeds based on search query and option
  currentPageItems: CatBreed[] = []; // hold the items for the current page (pagination)

  currentPage: number = 1; // Stores the current page number
  itemsPerPage: number = 5; // Defines the number of items to display per page
  count: number = 0;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.fetchCatData(); // Fetches cat data when the component initializes
    this.applyPagination(); // Applies pagination when the component initializes
  }

  // Fetches cat data from the API
  fetchCatData() {
    this.httpClient
      .get<CatData>('https://catfact.ninja/breeds/')
      .subscribe(
        (data: CatData) => {
          console.log('Fetched cat data:', data);
          this.data = data;
          this.filteredItems = data.data;
          this.applyPagination();
        },
        (error: any) => {
          console.error('Error fetching cat data:', error);
        }
      );
  }

  // Searches for cat breeds based on the search query and option
  search() {
    if (!this.data) {
      console.error('No data to search');
      this.applyPagination(); // Applies pagination even if there's no data to search
      return; // No data to search
    }

    // Reset filteredItems when query is empty
    if (!this.searchQuery.trim()) {
      console.log('Resetting filtered items');
      this.filteredItems = this.data.data;
    } else {
      this.filteredItems = this.data.data.filter(breed =>
        breed[this.searchOption].toLowerCase().includes(this.searchQuery.trim().toLowerCase())
      );
    }
    this.currentPage = 1; // Resets current page to 1 after applying search
    this.applyPagination(); // Applies pagination after applying search
  }
  
  applyPagination() {
    // Calculate the index of the first item on the current page
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    // Calculate the index of the last item on the current page
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.filteredItems.length);
    // Extract a slice of the filtered items array to represent the current page
    this.currentPageItems  = this.filteredItems.slice(startIndex, endIndex);
}

// Handles page change event
onPageChange(pageNumber: number) {
    // Update the current page number to the new page number
    this.currentPage = pageNumber;
    // Apply pagination to display the items on the new page
    this.applyPagination();
}

// Calculates and returns the total number of pages based on the filtered items and items per page
getTotalPages(): number {
    return Math.ceil(this.filteredItems.length / this.itemsPerPage);
}

// total row
getCount(): number{
  return this.filteredItems.length;
}
  
}
