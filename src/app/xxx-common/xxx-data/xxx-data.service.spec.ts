import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController, TestRequest} from '@angular/common/http/testing';
import {fakeAsync, TestBed, tick} from '@angular/core/testing';

import {XxxDataService} from './xxx-data.service';

describe('XxxDataService', () => {
  let httpMock: HttpTestingController;
  const mockData = {key: 'value'};
  const mockError = new ErrorEvent('Unknown Error');
  const mockUrl = 'https://mockurl?param1=1&param2=2';
  let xxxDataService: XxxDataService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [XxxDataService]
  }));

  beforeEach(() => {
    httpMock = TestBed.get(HttpTestingController);
    xxxDataService = TestBed.get(XxxDataService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(xxxDataService).toBeDefined();
  });

  it('should run getData with url', () => {
    xxxDataService.getData(mockUrl);
    httpMock.expectOne(mockUrl);
  });

  it('should run getData with url and method', () => {
    let testRequest: TestRequest;
    xxxDataService.getData(mockUrl);
    testRequest = httpMock.expectOne(mockUrl);
    expect(testRequest.request.method).toBe('GET');
  });

  it('should run getData and return promise data on success', fakeAsync(() => {
    let result: any;
    let testRequest: TestRequest;
    xxxDataService.getData(mockUrl).then((response: HttpResponse<any>) => {
      result = response;
    });
    testRequest = httpMock.expectOne(mockUrl);
    testRequest.flush(mockData);
    tick();
    expect(result).toEqual(mockData);
  }));

  it('should run getData and return promise error on error', fakeAsync(() => {
    let result: any;
    let testRequest: TestRequest;
    xxxDataService.getData(mockUrl).then((response: HttpResponse<any>) => {
      result = response;
    }, (errorResponse: HttpErrorResponse) => {
      result = errorResponse;
    });
    testRequest = httpMock.expectOne(mockUrl);
    testRequest.error(mockError);
    tick();
    expect(result).toEqual(mockError);
  }));

  it('should run getData and return promise error on unwrapped error', fakeAsync(() => {
    let result: any;
    let testRequest: TestRequest;
    xxxDataService.getData(mockUrl).then((response: HttpResponse<any>) => {
      result = response;
    }, (errorResponse: HttpErrorResponse) => {
      result = errorResponse;
    });
    testRequest = httpMock.expectOne(mockUrl);
    testRequest.error(null);
    tick();
    expect(result.statusText).toEqual('Unknown Error');
  }));
});
