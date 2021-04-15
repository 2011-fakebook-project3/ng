import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UploadImageService {
  url = `${environment.baseUrls.profile}/api/profiles/`;

  constructor(private http: HttpClient, private oktaAuth: OktaAuthService) {}

  public UploadImage(formData: FormData): Promise<any> {
    const headers = {
      headers: {
        Authorization: 'Bearer ' + this.oktaAuth.getAccessToken(),
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
