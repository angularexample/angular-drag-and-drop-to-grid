import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';

import {environment} from '@env/environment';
import {XxxDataService} from '@app/xxx-common/xxx-data/xxx-data.service';
import {XxxCameraInterface} from './xxx-camera.interface';
import {XxxCameraAssignmentInterface} from './xxx-camera-assignment.interface';
import {XxxVehicleInterface} from '@app/modules/xxx-camera-manager/xxx-vehicle.interface';

export interface XxxDroppedCameraInterface {
  cameraId: number;
  time: number;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'xxx-camera-manager',
  styleUrls: ['./xxx-camera-manager.component.scss'],
  templateUrl: './xxx-camera-manager.component.html'
})

export class XxxCameraManagerComponent implements OnInit {
  availableCameras: XxxCameraInterface[] = [];
  droppedCamera: XxxDroppedCameraInterface = null;
  isAvailableCameras = false;
  isError = false;
  isVehicles = false;
  isLoading = true;
  vehicles: XxxVehicleInterface[] = [];
  private cameraAssignments: XxxCameraAssignmentInterface[] = [];
  private cameras: XxxCameraInterface[] = [];
  private isCameras = false;
  private isCameraAssignments = false;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private xxxDataService: XxxDataService
  ) {
  }

  ngOnInit() {
    this.loadData();
  }

  getCameraDeviceAssigned(vehicleId: number): string {
    let device = '';
    if (this.isCameraAssignments) {
      const foundAssignment = this.cameraAssignments.find((item) => {
        return ((item.vehicleId === vehicleId) && !item.deleted);
      });
      if (typeof foundAssignment !== 'undefined') {
        const foundCamera = this.cameras.find((item) => {
          return item.id === foundAssignment.cameraId;
        });
        if (typeof foundCamera !== 'undefined') {
          device = foundCamera.deviceNo;
        }
      }
    }
    return device;
  }

  isCameraAssigned(vehicleId: number): boolean {
    let isAssigned = false;
    if (this.isCameraAssignments) {
      const foundAssignment = this.cameraAssignments.find((item) => {
        return ((item.vehicleId === vehicleId) && !item.deleted);
      });
      if (typeof foundAssignment !== 'undefined') {
        const foundCamera = this.cameras.find((item) => {
          return item.id === foundAssignment.cameraId;
        });
        isAssigned = (typeof foundCamera !== 'undefined');
      }
    }
    return isAssigned;
  }

  unassignCamera(vehicleId) {
    const found = this.cameraAssignments.find((item) => {
      return ((item.vehicleId === vehicleId) && !item.deleted);
    });
    if (typeof found !== 'undefined') {
      found.deleted = true;
    }
    this.getAvailableCameras();
    this.changeDetectorRef.detectChanges();
  }

  drop(event: any) {
    this.droppedCamera = {
      cameraId: event.item.data.id,
      time: (new Date()).getTime()
    };
  }

  onMouseupVehicle(event: any) {
    const vehicleId: number = this.getVehicleIdFromEvent(event);
    if (!isNaN(vehicleId) && (vehicleId !== null)) {
      const currentTime = (new Date()).getTime();
      if (this.droppedCamera) {
        if ((currentTime - this.droppedCamera.time) < 100) {
          const cameraId = this.droppedCamera.cameraId;
          this.droppedCamera = null;
          this.assignCamera(cameraId, vehicleId);
          this.getAvailableCameras();
          this.changeDetectorRef.detectChanges();
        }
      }
    }
  }

  private getVehicleIdFromEvent(event: any): number {
    let vehicleId: number = null;
    let id = '';
    if (event.target.id && event.target.id.includes('vehicle')) {
      id = event.target.id.substr(7);
    } else {
      if ((event.target.parentElement.id) && event.target.parentElement.id.includes('vehicle')) {
        id = event.target.parentElement.id.substr(7);
      }
    }
    if (id.length > 0) {
      vehicleId = parseInt(id, 10);
    }
    return vehicleId;
  }

  private loadData() {
    this.isAvailableCameras = false;
    this.isCameraAssignments = false;
    this.isCameras = false;
    this.isError = false;
    this.isLoading = true;
    this.isVehicles = false;
    this.changeDetectorRef.detectChanges();
    Promise.all([
      this.xxxDataService.getData(environment.url.cameraAssignments),
      this.xxxDataService.getData(environment.url.cameras),
      this.xxxDataService.getData(environment.url.vehicles)
    ])
      .then((result) => this.onSuccessLoadData(result),
        result => this.onErrorLoadData(result));
  }

  private onSuccessLoadData(result: any[]) {
    this.onSuccessGetCameraAssignments(result[0]);
    this.onSuccessGetCameras(result[1]);
    this.onSuccessGetVehicles(result[2]);
    this.getAvailableCameras();
    this.isLoading = false;
    this.changeDetectorRef.detectChanges();
  }

  private onErrorLoadData(result: any) {
    this.isError = true;
    this.isLoading = false;
    this.changeDetectorRef.detectChanges();
  }

  private onSuccessGetCameraAssignments(result: any) {
    if ((typeof result === 'object')
      && (result.hasOwnProperty('cameraAssignments')
        && (Array.isArray(result.cameraAssignments)
        ))) {
      this.cameraAssignments = result.cameraAssignments;
      this.isCameraAssignments = this.cameraAssignments.length > 0;
    }
  }

  private onSuccessGetCameras(result: any) {
    if ((typeof result === 'object')
      && (result.hasOwnProperty('cameras')
        && (Array.isArray(result.cameras)
        ))) {
      this.cameras = result.cameras;
      this.isCameras = this.cameras.length > 0;
    }
  }

  private onSuccessGetVehicles(response) {
    if ((typeof response === 'object')
      && (response.hasOwnProperty('vehicles')
        && (Array.isArray(response.vehicles)
        ))) {
      this.vehicles = response.vehicles;
      this.isVehicles = this.vehicles.length > 0;
    }
  }

  private getAvailableCameras() {
    if (this.isCameras) {
      this.availableCameras = this.cameras.filter((camera) => {
        return this.isCameraAvailable(camera);
      });
    }
    this.isAvailableCameras = this.availableCameras.length > 0;
  }

  private isCameraAvailable(camera: XxxCameraInterface): boolean {
    let result = false;
    if (this.isCameraAssignments) {
      const found = this.cameraAssignments.find((item: XxxCameraAssignmentInterface) => {
        return (item.cameraId === camera.id) && (item.deleted === false);
      });
      result = typeof found === 'undefined';
    } else {
      result = true;
    }
    return result;
  }

  private assignCamera(cameraId: number, vehicleId: number) {
    if (this.isCameraAssignments) {
      const found = this.cameraAssignments.find((item: XxxCameraAssignmentInterface) => {
        return ((item.vehicleId === vehicleId) && !item.deleted);
      });
      if (typeof found === 'undefined') {
        this.insertCameraAssignment(cameraId, vehicleId);
      }
    } else {
      this.insertCameraAssignment(cameraId, vehicleId);
      this.isCameraAssignments = true;
    }
  }

  private insertCameraAssignment(cameraId: number, vehicleId: number) {
    // TODO add call to data service to do this on backend
    this.cameraAssignments.push({
      id: this.getNewId(this.cameraAssignments),
      cameraId: cameraId,
      vehicleId: vehicleId,
      dateCreated: this.getTodaysDate(),
      deleted: false
    });
  }

  private getNewId(theArray: any[]): number {
    let result = 1;
    if (theArray.length > 0) {
      let maxValue = 0;
      theArray.forEach(item => {
        if (item.id > maxValue) {
          maxValue = item.id;
        }
      });
      result = maxValue;
    }
    return result;
  }

  private getTodaysDate(): string {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const yyyy = today.getFullYear().toString();
    let dd = day.toString();
    if (day < 10) {
      dd = '0' + dd;
    }
    let mm = month.toString();
    if (month < 10) {
      mm = '0' + mm;
    }
    return mm + '/' + dd + '/' + yyyy;
  }
}
