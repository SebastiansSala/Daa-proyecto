import { Component } from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent {
  
  allowedHours = ['6pm', '7pm', '8pm', '9pm'];
  numOfPeopleAllowed = [1, 2, 3, 4];

  numOfPeople: number | undefined;
  time: string | undefined;

  constructor(
    public dialogRef: MatDialogRef<UploadComponent>){}
  
    onSave(): void {
      if (this.numOfPeople && this.time) {
        this.dialogRef.close({ numOfPeople: this.numOfPeople, time: this.time });
      }
    }
    
  
}
