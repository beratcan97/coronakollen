import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: "root"
})
export class CrudService {

  dateDATA = new Date();

  constructor(
    private angularFirestore: AngularFirestore) {}

  /*
  publish(currentCasesInSweden) {
    this.angularFirestore.collection('currentCasesInSweden').add({
      'currentCasesInSweden': currentCasesInSweden,
      'displayDate': this.dateDATA.getFullYear() + '-' + (this.dateDATA.getMonth() + 1) + '-' + this.dateDATA.getDate(),
      'date': this.dateDATA
    })
      .then(
        res => {
          console.log('published');
        }
      ),
      err => {
        console.log(err);
      }
  };
  */

  updateCurrentCaseInSweden(currentCases) {
    const currentCasesInSweden = {
      currentCasesInSweden: currentCases,
      deaths: 2,
      recovered: 1,
      severeCases: 3,
      displayDate: this.dateDATA.getFullYear() + '-' + (this.dateDATA.getMonth() + 1) + '-' + this.dateDATA.getDate(),
      date: this.dateDATA
    };
    return this.angularFirestore.collection('currentCasesInSweden').doc('2HyjMvn4c6gw1J1w36Cy').set(currentCasesInSweden);
  }
  
  getCurrentCaseInSweden() {
    return this.angularFirestore.collection('currentCasesInSweden')
      .doc('2HyjMvn4c6gw1J1w36Cy').snapshotChanges();
  }

  getCurrentCasesInSweden() {
    return this.angularFirestore.collection('currentCasesInSweden', ref =>
      ref
        .orderBy('date')).snapshotChanges();
  }

  /*
  createCustomer(customer: any): void {
    this.customersRef.push(customer);
  }

  updateCustomer(key: string, value: any): Promise<void> {
    return this.customersRef.update(key, value);
  }

  deleteCustomer(key: string): Promise<void> {
    return this.customersRef.remove(key);
  }

  getCustomersList(): AngularFireList<any> {
    return this.customersRef;
  }

  deleteAll(): Promise<void> {
    return this.customersRef.remove();
  }*/
}
