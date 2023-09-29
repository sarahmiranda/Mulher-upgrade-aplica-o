const logoutBtn = document.getElementById("logout--btn");
const userName = document.getElementById("user--name")

let db = JSON.parse(localStorage.getItem("db_logged_user"));

const fillUserInfo = () => {
  const {name, familyName} = db?.user;
  
  userName.innerHTML =`${name} ${familyName}`;
}

const isLoggedIn = () => {
  if (!db || !db?.user) {
    window.location = "login.html";
  }

  fillUserInfo();
};

const logout = () => {
  localStorage.removeItem("db_logged_user");
  window.location = "HomePage.html";
}

window.addEventListener('load',isLoggedIn );
logoutBtn.addEventListener('click',logout);