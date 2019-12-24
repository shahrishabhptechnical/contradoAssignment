import { Component } from '@angular/core';
import { SearchService } from './search.service';

export interface GitUser {
  login: string;
  name: string;
  location: string;
  avatar_url: string;
  repository: Array<Repository>;
}

export interface Repository {
  name: string;
  stargazers_count: string;
}

@Component({
  selector: 'contrado-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'contradoAssignment';
  search: string;
  gitUserData: any = {};
  noDataFound = 'No User Found';
  userRepositoryErrMsg = 'No Repository Found';

  constructor(
    private searchService: SearchService
  ) {

  }

  onSubmitForm() {
    if (this.search.length)  {
      this.searchService.getGitUserDetails(this.search).subscribe(
        (resp: any) => {    
          this.getGitUserRepo(resp);
        },
        (err) => {
          console.log(err.error.message);
        })
    }
  }

  getGitUserRepo(userDetails: any) {
    const repoUrl = userDetails.repos_url;
    this.userRepositoryErrMsg = '';
    this.searchService.getGirUserRepository(repoUrl).subscribe(
      (resp) => {        
        const top5Repo = this.findHighestStargazerCount(resp);
        for (const key in userDetails) {        
            this.gitUserData[key] = userDetails[key];
          }        
        this.gitUserData.repository = top5Repo;
        if (top5Repo.length === 0) {
          this.userRepositoryErrMsg = 'No Repository Found';
        }
      },
      (err) => {
        this.userRepositoryErrMsg = err.error.message
      }
    )
  }

  findHighestStargazerCount(usersRepo) {
    if (usersRepo && usersRepo.length) {
      return usersRepo.sort((repo1, repo2) => {
        return repo2.stargazers_count - repo1.stargazers_count;
      })
      .slice(0, 5)
      .map((repo) => ({ name: repo.name, stargazers_count: repo.stargazers_count}));
    }
  }


  onClearSearch() {
    this.search = '';
    this.gitUserData = {};
  }



  


}
