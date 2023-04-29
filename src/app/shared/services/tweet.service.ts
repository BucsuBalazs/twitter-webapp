import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Tweet } from '../models/Tweet';

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  constructor(private afs: AngularFirestore) { }

  collectionName = 'Tweets';

  create(tweet: Tweet) {
    tweet.id = this.afs.createId();
    return this.afs.collection<Tweet>(this.collectionName).doc(tweet.id).set(tweet);
  }

  getAll() {
    return this.afs.collection<Tweet>(this.collectionName).valueChanges();
  }

  getById(id: string) {
    return this.afs.collection<Tweet>(this.collectionName).doc(id).valueChanges();
  }

  update(tweet: Tweet) {
    return this.afs.collection<Tweet>(this.collectionName).doc(tweet.id).set(tweet);
  }

  delete(id: string) {
    return this.afs.collection<Tweet>(this.collectionName).doc(id).delete();
  }

  getTweetsByEmail(email: string) {
    return this.afs.collection<Tweet>(this.collectionName, ref => ref.where('email', '==', email).orderBy('date', 'asc')).valueChanges();
  }

  getTweetsInLikeOrder() {
    return this.afs.collection<Tweet>(this.collectionName, ref => ref.orderBy('likes', 'desc')).valueChanges();
  }

}
