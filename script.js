const base_url = "https://api.github.com/users/";
// console.log(url)
const input = document.querySelector(".search");
const buton = document.querySelector(".buton");
const userContainer = document.querySelector(".user-container");
const followersContainer = document.querySelector(".followers-Container");


buton.addEventListener("click", () => {
  
  if (input.value !== "") {
    getUser();
    
  }
  input.value = "";
});
input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    buton.click();
  }
});

// fetch then yapısı

// function getUser(user) {
//   const url = base_url + user
//   try {
//     fetch(url).then(res => res.json().then(data => console.log(data)))
//   } catch (error) {
//     console.log(error)
//   }
// }
// getUser()

// async await yapısı

async function getUser() {
  const url = base_url + input.value;

  try {
    const res = await fetch(url);
    const data = await res.json();

    const {
      avatar_url,
      followers,
      followers_url,
      following,
      following_url,
      html_url,
      public_repos,
      id,
      login,
      user,
      location,
    } = data;

    userContainer.innerHTML = `
 

    <div class="container d-flex justify-content-center align-items-center">
    <div class="card">
      <div class="upper">
        <img src="./geometric-1732847_1920.jpg" class="img-fluid" />
      </div>

      <div class="user text-center">
        <div class="profile">
          <img
            src="${avatar_url}"
            class="rounded-circle"
            width="80"
          />
        </div>
      </div>

      <div class="mt-5 text-center">
        <h4 class="mb-0">${login}</h4>
        <span class="text-muted d-block mb-2">${location}</span>

        

        <div
          class="d-flex justify-content-between align-items-center mt-4 px-4"
        >
          <div class="stats">
            <h6 class="mb-0">Followers</h6>
            <span>${followers}</span>
          </div>

          <div class="stats">
            <h6 class="mb-0">Projects</h6>
            <span>${public_repos}</span>
          </div>

          <div class="stats">
            <h6 class="mb-0">following</h6>
            <span>${following}</span>
          </div>
        </div>
      </div>
    </div>
  </div>  `;

  getFollowings(followers_url);
  } catch (error) {
    console.log(error);
    userContainer.innerHTML = `<h1 class="text-danger" > hata </h1>`;
  }
}
// getUser()

async function getFollowings(followers_url) {
  try {
    const res = await fetch(followers_url);
    const followers = await res.json();
    console.log(followers);
    followersContainer.innerHTML = ""
    followers.forEach((user) => {
      const {
        avatar_url,
        followers,
        followers_url,
        following,
        following_url,
        html_url,
        public_repos,
        id,
        login,

        location,
      } = user;

      
      followersContainer.innerHTML += `
      
      
      <div class="card mb-4 ">
      <div class="upper">
        <img src="./geometric-1732847_1920.jpg" class="img-fluid" />
      </div>

      <div class="user text-center">
        <div class="profile">
          <img src="${avatar_url}" class="rounded-circle" />
        </div>
      </div>

      <div class="mt-5 text-center">
        <h4 class="mb-0">${login}</h4>
      </div>
    </div> `;
    });
    
  } catch (error) {
    console.log(error);
  }
}
