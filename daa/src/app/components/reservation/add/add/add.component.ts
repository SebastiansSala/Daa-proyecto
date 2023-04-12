import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CommentService } from 'src/app/services/comment.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  comment = {
    comentario: '',
    email: '',
  }

  constructor(private authService: AuthService, private commentService: CommentService, private dialogRef: MatDialogRef<AddComponent>){}

  onSubmitComment(){
    this.comment.email = this.authService.getUserEmail();
    this.commentService.createComment(this.comment).subscribe(
      response => {
        console.log(response)
        this.dialogRef.close();
      },
      error => console.log(error)
    );
  }

}
