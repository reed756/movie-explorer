import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  options: any = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDA5YzY0M2UzNzVkOTE3ZGMxNWQ3OWMxYWI0OWNhNCIsInN1YiI6IjY1YTgxZGQ0MWJmODc2MDEyM2M5YzY4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yqN1Xviii_ZwRZFvts-oS7fI5jQV61zpsXI46Y6Mcl0'
    }
  };

  constructor(private http: HttpClient) {}

  fetchData() {
    return this.http.get('https://api.themoviedb.org/3/authentication', this.options);
  }

}