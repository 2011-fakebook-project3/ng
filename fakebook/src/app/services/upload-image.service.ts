import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../authentication/core/authentication/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UploadImageService {
  url = `${environment.baseUrls.profile}/api/profiles/`;

  constructor(private http: HttpClient, private auth: AuthService) {}

  public UploadImage(formData: FormData): Promise<any> {
    const headers = {
      headers: {
        Authorization: this.auth.authorizationHeaderValue,
      },
    };

    return this.http
      .post<{ path: string; userId: number }>(
        `${environment.baseUrls.profile}/api/ProfilePicture`,
        formData,
        headers
      )
      .toPromise();
  }
}
