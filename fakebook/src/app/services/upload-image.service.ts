import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UploadImageService {
  url = `${environment.baseUrls.profile}/api/profiles/`;

  constructor(private http: HttpClient) {}

  public UploadImage(formData: FormData): Promise<any> {
    return this.http
      .post<{ path: string; userId: number }>(
        `${environment.baseUrls.profile}/api/ProfilePicture`,
        formData
      )
      .toPromise();
  }
}
