import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class XxxDataService {
  constructor(private httpClient: HttpClient) {
  }

  getData(url: string): Promise<any> {
    let data: Promise<any>;
    data = this.httpClient.get(url)
        .toPromise()
        .then(this.onSuccessGetData, this.onErrorGetData);
    return data;
  }

  private onSuccessGetData(result: HttpResponse<any>): Promise<any> {
    return Promise.resolve(result);
  }

  private onErrorGetData(result: HttpErrorResponse): Promise<any> {
    return Promise.reject(result.error || result);
  }
}
