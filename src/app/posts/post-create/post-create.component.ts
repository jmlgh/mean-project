import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  enteredTitle = '';
  enteredContent = '';
  // create a new event which can be listened to from the outside (direct parent)
  // this has become obsolete since we are using a service to pass Post data around the classes
  // @Output() postCreated = new EventEmitter<Post>();

  constructor(public postService: PostService){}

  onAddPost(form: NgForm) {
    if(form.invalid){
      // no post added
      return;
    }
    // emit the newly created post
    // this has become obsolete since we are now using a service to pass Post data to the classes
    // this.postCreated.emit(post)
    this.postService.addPost(form.value.title, form.value.content);
    // default Angular method that sets fields to empty string and resets validators
    form.resetForm();
  }
}
