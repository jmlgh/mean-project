import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// this is kind of an EventEmitter but with more functionalities
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PostService {
  private posts: Array<Post> = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient){}

  getPosts() {
    // using the spread operator
    // this actually copies the array instead of returning a reference of the oringinal array
    // return [...this.posts];

    // no need to unsubscribe here becaouse when we listen on observables
    // that are Angular defaults, it gets handled automatically
    // get method automatically extracts data from json
    this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts')
      .subscribe((postData) => {
        this.posts = postData.posts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string){
    const post: Post = { id: null, title: title, content: content };
    this.posts.push(post);
    // next() -> "emit" the new value created
    this.postsUpdated.next([...this.posts]);
  }
}
