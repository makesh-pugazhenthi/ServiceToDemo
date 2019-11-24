import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CitiesList } from 'src/dao/citieslist';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OpenapiService {

  postUrl: string = "https://indian-cities-api-nocbegfhqg.now.sh/cities";

  constructor(private http: HttpClient) {
  
  }

  getCities(): Observable<CitiesList[]> {
    return this.http.get<CitiesList[]>(this.postUrl);

  }
}
