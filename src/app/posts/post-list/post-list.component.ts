import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { Post } from '../post.model';
import { PostService } from '../post.service';

import { Subscription } from 'rxjs';

@Component({
  selector : 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy{
  // @Input() posts: Array<Post> = [];
  posts: Array<Post> = [];
  // this property will ensure that when we destroy a Post, the listeners associated with it
  // get destroyed also, preventing in this way a memory leak
  private postSub: Subscription;

  // setting the postService public will automatically create a property in the class
  // with the same name
  constructor(public postService: PostService){}

  ngOnInit(){
    this.postService.getPosts();
    // subscribe args: next, error, completed
    this.postSub = this.postService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  ngOnDestroy(){
    // IMPORTANT!!: prevents memory leaks
    this.postSub.unsubscribe();
  }

}
