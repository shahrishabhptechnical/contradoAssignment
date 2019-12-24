import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private http: HttpClient
  ) { }

  getGitUserDetails(userId) {   
    return this.http.get(`${environment.userUrl}${userId}`);
  }

  getGirUserRepository(repoURL) {
    return this.http.get(repoURL);
  }
}
