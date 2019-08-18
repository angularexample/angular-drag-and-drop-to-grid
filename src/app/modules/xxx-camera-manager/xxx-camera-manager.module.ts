import {CommonModule} from '@angular/common';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {NgModule} from '@angular/core';
import {MatButtonModule, MatCardModule} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


import {XxxCameraManagerComponent} from './xxx-camera-manager.component';
import {XxxDataModule} from '@app/xxx-common/xxx-data/xxx-data.module';

@NgModule({
  declarations: [XxxCameraManagerComponent],
  exports: [XxxCameraManagerComponent],
  imports: [CommonModule, DragDropModule, MatButtonModule, MatCardModule, MatIconModule, MatProgressSpinnerModule, XxxDataModule]
})

export class XxxCameraManagerModule {
}
