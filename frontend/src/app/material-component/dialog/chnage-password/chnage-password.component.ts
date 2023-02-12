import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/shared/accordion/global-constants';

@Component({
  selector: 'app-chnage-password',
  templateUrl: './chnage-password.component.html',
  styleUrls: ['./chnage-password.component.scss'],
})
export class ChnagePasswordComponent implements OnInit {
  changePasswordForm: any = FormGroup;
  responseMessage: any;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<ChnagePasswordComponent>,
    private ngxService: NgxUiLoaderService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.changePasswordForm = this.fb.group({
      oldPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    });
  }

  validateSubmit() {
    if (
      this.changePasswordForm.controls['newPassword'].value !=
      this.changePasswordForm.controls['confirmPassword'].value
    ) {
      return true;
    } else {
      return false;
    }
  }

  handleChangePassword() {
    this.ngxService.start();
    var formData = this.changePasswordForm.value;
    var data = {
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
      confirmPassword: formData.confirmPassword,
    };
    this.userService.changePassword(data).subscribe(
      (response: any) => {
        this.ngxService.stop();
        this.responseMessage = response?.message;
        this.dialogRef.close();
        this.snackbarService.openSnackBar(this.responseMessage, 'success');
      },
      (error) => {
        console.log(error);
        this.ngxService.stop();
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
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
