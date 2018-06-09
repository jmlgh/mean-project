import { Post } from './post.model';
import { Injectable } from '@angular/core';

// this is kind of an EventEmitter but with more functionalities
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PostService {
  private posts: Array<Post> = [];
  private postsUpdated = new Subject<Post[]>();

  getPosts() {
    // using the spread operator
    // this actually copies the array instead of returning a reference of the oringinal array
    return [...this.posts];
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string){
    const post: Post = { title: title, content: content };
    this.posts.push(post);
    // next() -> "emit" the new value created
    this.postsUpdated.next([...this.posts]);
  }
}
