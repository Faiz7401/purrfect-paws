import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface CatBreed {
  breed: string;
  country: string;
  origin: string;
  coat: string;
  pattern: string;
  [key: string]: string;
}

interface CatData {
  current_page: number;
  data: CatBreed[];
}

@Component({
  selector: 'app-cat-list',
  templateUrl: './cat-list.component.html',
  styleUrls: ['./cat-list.component.scss'],
})
export class CatListComponent implements OnInit {

  
  searchOption: string = 'breed';
  searchQuery: string = '';
  filteredItems: CatBreed[] = [];
  data: CatData | undefined;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.fetchCatData();
  }

  fetchCatData() {
    this.httpClient
      .get<CatData>('https://catfact.ninja/breeds')
      .subscribe(
        (data: CatData) => {
          console.log('Fetched cat data:', data);
          this.data = data;
          this.filteredItems = data.data; // Initialize filteredItems with all data initially
        },
        (error: any) => {
          console.error('Error fetching cat data:', error);
        }
      );
  }

  search() {
    if (!this.data) {
      console.error('No data to search');
      return; // No data to search
    }

    if (!this.searchQuery.trim()) {
      console.log('Resetting filtered items');
      this.filteredItems = this.data.data; // Reset filteredItems when query is empty
      return;
    }

    this.filteredItems = this.data.data.filter(breed =>
      breed[this.searchOption].toLowerCase().includes(this.searchQuery.trim().toLowerCase())
    );
  }
}
