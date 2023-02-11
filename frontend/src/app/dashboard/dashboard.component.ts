import { Component, AfterViewInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DahsboardService } from '../services/dahsboard.service';
import { SnackbarService } from '../services/snackbar.service';
import { GlobalConstants } from '../shared/accordion/global-constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements AfterViewInit {
  responseMessage: any;
  data: any;

  ngAfterViewInit() {}

  constructor(
    private dashboardService: DahsboardService,
    private ngxService: NgxUiLoaderService,
    private snackbarService: SnackbarService
  ) {
    this.ngxService.start();
    this.dahsboardData();
  }

  dahsboardData() {
    this.dashboardService.getDetails().subscribe(
      (response) => {
        console.log(response);
        this.ngxService.stop();
        this.data = response;
      },
      (err: any) => {
        this.ngxService.stop();
        console.log(err);
        if (err.error?.message) {
          this.responseMessage = err.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackbarService.openSnackBar(
          this.responseMessage,
          GlobalConstants.error
        );
      }
    );
  }
}
