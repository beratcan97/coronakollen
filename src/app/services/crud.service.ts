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
}
