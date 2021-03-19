import { Component } from '@angular/core';
import {
  AngularFirestore,
  DocumentData,
  DocumentReference,
  QueryDocumentSnapshot,
  SnapshotOptions
} from '@angular/fire/firestore';
import firebase from 'firebase/app';

const FieldValue = firebase.firestore.FieldValue;
type FirestoreDataConverter<T> = firebase.firestore.FirestoreDataConverter<T>;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private readonly firestore: AngularFirestore) { }

  private collectionReference = this.firestore.firestore.collection('posts').withConverter(Post.converter);
  private postsCollection = this.firestore.collection<Post>(this.collectionReference, ref => ref.orderBy('createTime'));

  public posts = this.postsCollection.valueChanges();

  public async addPost(): Promise<void> {
    const post = Post.of({ title: 'Learning Firestore', author: 'Harry Scheuerle' });
    await this.postsCollection.add(post);
  }
}

class Post {
  private constructor(
    private readonly ref: DocumentReference<DocumentData> | null,
    public readonly title: string,
    public readonly author: string,
    public readonly count: number,
  ) { }

  public static converter: FirestoreDataConverter<Post> = {
    toFirestore(post: Post): DocumentData {
      return {
        title: post.title,
        author: post.author,
        count: post.count
      };
    },
    fromFirestore(
      snapshot: QueryDocumentSnapshot<DocumentData>,
      options: SnapshotOptions
    ): Post {
      const data = snapshot.data(options);
      return new Post(snapshot.ref, data.title, data.author, data.count);
    }
  };

  public readonly highlighted = this.count >= 5;

  public static of(data: { title: string, author: string }): Post {
    return new Post(null, data.title, data.author, 0);
  }

  public async setRandomAuthor(): Promise<void> {
    const url = 'https://randomuser.me/api/?inc=name';
    const data = await fetch(url).then(res => res.json());
    const name = data.results[0].name;
    await this.ref?.update({ author: `${name.first} ${name.last}` });
  }

  public async incrementCount(): Promise<void> {
    await this.ref?.update({ count: FieldValue.increment(1) });
  }

  public async delete(): Promise<void> {
    await this.ref?.delete();
  }

  public toString(): string {
    return `${this.title} ${this.author}`;
  }
}
