import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class UploadService {
  constructor(private http: HttpClient) {}

  upload(formData: FormData): Promise<any> {
    return this.http
      .post<{ path: string; userId: number }>(
        `${environment.baseUrls.posts}/api/Posts/UploadPicture`,
        formData
      )
      .toPromise();
  }
}
