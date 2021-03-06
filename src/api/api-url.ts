const BASE = `https://api.github.com`;

export const API_URL = {
  SEARCH_USER: `${BASE}/search/users`, //get
  USER_REPOS: (userName: string) => `${BASE}/users/${userName}/repos`, //get
  REPO_README: (userName: string, repoName: string) => `${BASE}/repos/${userName}/${repoName}/readme`, //get
  DOWNLOAD_REPO: (userName: string, repoName: string, format:'tarball' | 'zipball') => `${BASE}/repos/${userName}/${repoName}/${format}`, //get
};
