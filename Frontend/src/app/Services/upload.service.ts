import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  url:string=environment.apiUrl
  constructor(private http:HttpClient) { }
  GetProfileUrl(image:FormData):Observable<{message: string,url: string}>{
    return this.http.post<{message: string,url: string}>(this.url+"/S3/profile",image)
  }
  GetthumbnailUrl(image:FormData):Observable<{message: string,url: string}>{
    return this.http.post<{message: string,url: string}>(this.url+"/S3/thumbnails",image)
  }
  GetVideoUrl(Video:FormData,name:string){
    return this.http.post<{message: string,url: string}>(this.url+`/S3/Course/${name}`,Video)
  }
}
