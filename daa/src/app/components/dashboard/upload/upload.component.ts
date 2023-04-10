import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {
  reservationForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UploadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {
    this.reservationForm = this.formBuilder.group({
      name: ['', Validators.required],
      guests: ['', Validators.required],
      time: ['', Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.reservationForm.valid) {
      this.dialogRef.close(this.reservationForm.value);
    }
  }
}
