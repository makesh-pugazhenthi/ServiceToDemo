import { TestBed } from '@angular/core/testing';
import { OpenapiService } from './openapi.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('OpenapiService', () => {
  let service : OpenapiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers : [OpenapiService]
  });

  service = TestBed.get(OpenapiService);
  httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should retrieve get from the API GET', () => {
    const dummyData = [{
      District: 'Firozpur',
      City: 'Abohar'    
    }]

    service.getCities().subscribe(cities => {
      expect(cities.length).toBe(1);
      expect(cities).toEqual(dummyData)
    })

    const request = httpMock.expectOne(`https://indian-cities-api-nocbegfhqg.now.sh/cities`);
  expect( request.request.method).toBe('GET');
  request.flush(dummyData);
  });

  
});
