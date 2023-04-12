import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent {
  reservationForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UploadComponent>,
    private formBuilder: FormBuilder
  ) {
    this.reservationForm = this.formBuilder.group({
      numOfPeople: ['', Validators.required],
      time: ['', Validators.required],
    });
  }

  onSave(): void {
    if (this.reservationForm.valid) {
      const time = this.reservationForm.get('time')?.value;
      const numOfPeople = this.reservationForm.get('numOfPeople')?.value;
      this.dialogRef.close({ numOfPeople, time });
    }
  }
}
