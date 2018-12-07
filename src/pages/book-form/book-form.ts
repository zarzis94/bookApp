import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BookProvider } from '../../providers/book/book';

/**
 * Generated class for the BookFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-book-form',
  templateUrl: 'book-form.html',
})
export class BookFormPage {

  private book;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public bookprovider:BookProvider) {

      this.book = bookprovider.getBook();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookFormPage');
  }
   validateForm() {
     this.bookprovider.saveBook().then(
       (data)=>{
         this.navCtrl.pop();
       }
     )
   }
}

