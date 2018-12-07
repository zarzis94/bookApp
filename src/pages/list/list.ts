import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BookFormPage } from '../book-form/book-form';
import { BookProvider } from '../../providers/book/book';
/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
  private bookList:any = [];
  BookList: any;
  book: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public bookProvider: BookProvider) {

      bookProvider.loadBooks().then(
        (data)=>{
          this.bookList = data;
        }
      )


  }

  ionViewDidEnter(){
    this.bookProvider.clearBook();
  }
  goToForm(){
    this.navCtrl.push(BookFormPage);
  }
  deleteBook(id, pos){
    this.bookProvider.deleteOne(id,pos);
  }
  UpDateBook(book){
    this.bookProvider.setBook(book);
    this.goToForm();
    
  }
}
