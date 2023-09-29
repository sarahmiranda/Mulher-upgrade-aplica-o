const form = document.getElementById("login--form");

const initialUsers = {
  users: [],
};

const loggedUser = {
  user: {},
};

let db_users = JSON.parse(localStorage.getItem("db_users"));
let db = JSON.parse(localStorage.getItem("db_logged_user"));

if (!db_users) {
  db = initialUsers;
}

if (!db) {
  db = loggedUser;
}

const displayErrorMessage = (message) => {
  alert(message);
};

const validateUser = (userData) => {
  const { email, password } = userData;

  const filteredUser = db_users?.users?.filter((user) => user?.email === email);

  if (!filteredUser.length) {
    return false;
  }

  if (filteredUser[0]?.password !== password) {
    return false;
  }

  const user = { user: { ...filteredUser[0] }};

  localStorage.setItem("db_logged_user", JSON.stringify(user));
  return true;
};

const handleSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const userData = [...formData.entries()].reduce(
    (acc, entry) => ({ ...acc, [entry[0]]: entry[1] }),
    {}
  );

  const isUserValid = validateUser(userData);

  if (!isUserValid) {
    return displayErrorMessage(
      "Dados inválidos. Tente novamente ou cadastre-se"
    );
  }

  form.reset();
  window.location = "userProfile.html";
};

form.addEventListener("submit", handleSubmit);
