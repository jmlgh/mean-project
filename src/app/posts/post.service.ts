import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

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
    this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
      // before we subscribe the new value transform the data to solve the id - _id problem
      // args: a function that gets applied to every element (response data)
      // pipe -> allows us to add more operators to data (it accepts multiple operators)
      .pipe( map( (postData) => {
        // this is already an observable
        return postData.posts.map( post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          };
        });
      }))
      .subscribe((transformedPostData) => {
        this.posts = transformedPostData;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string){
    const post: Post = { id: null, title: title, content: content };
    this.http.post<{message: string}>('http://localhost:3000/api/posts', post)
      .subscribe( (responseData) => {
        console.log(responseData.message);
        this.posts.push(post);
        // next() -> "emit" the new value created
        this.postsUpdated.next([...this.posts]);
      });
  }

  deletePost(postId: string){
    this.http.delete('http://localhost:3000/api/posts/' + postId)
      .subscribe(() => {
        console.log('Post deleted')
      });
  }
}
