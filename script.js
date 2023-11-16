const APIURL = "https://api.github.com/users/";
const main = document.querySelector("#main");
const form = document.getElementById("form");
const searchBox = document.getElementById("search");


const profileData = async function(username){
  try{
  const response = await fetch(APIURL + username);
  if(!response.ok) {
    throw new Error("User not found");
    return;
  }
  
  const userData = await response.json();
  const repoData = await fetch(userData.repos_url);
  if(!repoData.ok) {
      throw new Error("Faild to load repo");
      return;
    }
  const repoArr= await repoData.json();
  
  const repos = repoArr.map(repo => `<a class="repo" href="${repo.html_url}" target="_blank">${repo.name}</a>`).join('');
                    
    // console.log(repoArr);
  const html = `<div class="card">
          <div>
              <img class="avatar" src="${userData.avatar_url}" alt="Florin Pop">
          </div>
          <div class="user-info">
              <h2>${userData.name}</h2>
              <p>${userData.bio}</p>

              <ul class="info">
                  <li>${userData.followers}<strong>Followers</strong></li>
                  <li>${userData.following}<strong>Following</strong></li>
                  <li>${userData.public_repos}<strong>Repos</strong></li>
              </ul>

              <div id="repos">
              ${repos}
          </div>
      </div>`;
    
    main.innerHTML = html;
  
  }catch(error){
    alert(error);
  }
}

// profileData("mandip47");

form.addEventListener("submit", function(e){
  e.preventDefault();
  const searchTerm = searchBox.value;
  profileData(searchTerm);
  searchBox.value = "";
});