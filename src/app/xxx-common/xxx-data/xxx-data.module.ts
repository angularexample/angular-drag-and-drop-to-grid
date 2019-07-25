import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';

import {XxxDataService} from './xxx-data.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [
    XxxDataService
  ]
})

export class XxxDataModule {
}
