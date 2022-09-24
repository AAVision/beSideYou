import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Quote } from '../models/quote';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  constructor(private _http:HttpClient) { }

  public getQuote(): Observable<Quote[]> {
    return this._http.get<Quote[]>("../../assets/data.json");
  }



}
