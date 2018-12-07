import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the BookProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BookProvider {
  

  private book:any = {
    title: null,
    price: null,
    genre: [],
    author:{
      name: null,
      firstName: null
    }
  }

  private bookList:any = [];
  private API_URL = "http://localhost:3000";

  constructor(public http: HttpClient) {
    console.log('Hello BookProvider Provider');
  }
  deleteOne(id: any, pos: any): any {
    this.http.delete(this.API_URL+"/book/"+id).subscribe(
     ()=> {
       this.bookList.splice(pos, 1);
          },
          (err)=>{
          console.log(err);
          }
    )
  }
  saveBook(){
    if("_id" in this.book){
      return this.updateBook();
    } else {
      return this.addBook();
    }
  }
  updateBook(): any {
    return new Promise( (resolve, reject)=>{
      this.http.put(this.API_URL+"/book",this.book).subscribe(
        (data)=>{
          this.clearBook();
          resolve(data);
        },(err)=>{
          console.log(err);
          reject(err);                                                                                                                                                                                                                                                                                                                                                         
        }
      );
    });
  }

  clearBook(){
    this.book = {
    title: null,
    price: null,
    genre: [],
    author:{
      name: null,
      firstName: null
    }
  };
}
   getBook(){
     return this.book;
   }

   setBook(book){
    this.book = book;
   }
   getBookList(){
     return this.bookList
   }
   loadBooks(){
     return new Promise((resolve,reject) =>{
        this.http.get(this.API_URL+"/book/all").subscribe(
            (data)=>{
              this.bookList = data;
              resolve(data);
            },
            (error)=> {
              reject(error);
            }
        );
     });
   }
   addBook(){
     return new Promise( (resolve,reject) =>{
       this.http.post("http://localhost:3000/book/insert", this.book)
       .subscribe(
         (data:any)=>{
           this.book._id = data._id;
           this.bookList.push(this.book);
           this.clearBook();
           resolve(this.bookList);
         },
         (error)=>{
           console.log(error);
           reject(error);
         }
       );
     });
   }
}
