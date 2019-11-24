import { Component, Input } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { CitiesList } from 'src/dao/citieslist';
import { OpenapiService } from 'src/service/openapi.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  @Input('name') userInput: string;

  citiesList$: Observable<CitiesList[]>;
  filteredCities$: Observable<CitiesList[]>;
  filter: FormControl;
  filter$: Observable<string>;


  constructor(service: OpenapiService) {
    this.citiesList$ = service.getCities();
    this.filter = new FormControl('');
    this.filter$ = this.filter.valueChanges.pipe(startWith(''));
    this.filteredCities$ = combineLatest(this.citiesList$, this.filter$).pipe(
      map(([citiesList, userInput]) => citiesList.filter(citiesList => citiesList.City.indexOf(userInput) !== -1))
    );
  }
}
