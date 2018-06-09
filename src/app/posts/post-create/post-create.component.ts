import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  enteredTitle = '';
  enteredContent = '';
  // create a new event which can be listened to from the outside (direct parent)
  @Output() postCreated = new EventEmitter<Post>();

  onAddPost(form: NgForm) {
    if(form.invalid){
      // no post added
      return;
    }
    const post: Post = {
      title: form.value.title,
      content: form.value.content
    };
    // emit the newly created post
    this.postCreated.emit(post)
  }
}
