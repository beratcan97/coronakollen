import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: "root"
})
export class CrudService {


  constructor(
    private angularFirestore: AngularFirestore) {}

  getCurrentCaseInSweden() {
    return this.angularFirestore.collection('currentCasesInSweden')
      .doc('currentCasesInSwedenDoc').snapshotChanges();
  }

  getHistoryData() {
    let tmpArray = [];
    this.angularFirestore.collection('stats').get()
    .toPromise().then(snapshot => {
        snapshot.docs.map(doc => {
          tmpArray.push(doc.data());
        });
        console.log(tmpArray);
      }).catch(function(error){
        console.log("got an error",error);        
    })
  }
}
