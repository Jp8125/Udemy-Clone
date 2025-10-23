import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckService {
  url:string=environment.apiUrl
  constructor(private htttp:HttpClient) { }
  checkConnection():Observable<{message:string}>{
   return this.htttp.get<{message:string}>(this.url+"/TestConnection")
  }
}
