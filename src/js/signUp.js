const form = document.getElementById("signUp--form");

const initialUsers = {
  users: [],
};

let db = JSON.parse(localStorage.getItem("db_users"));

if (!db) {
  db = initialUsers;
}

const s4 = () =>
  Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);

//simula o formato de um uuid #######-####-####-####-########
const generateUserId = () =>
  `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;

const isUniqueUser = (cpf, email) =>
  db?.users?.filter((user) => user?.cpf === cpf || user?.email === email).length
    ? false
    : true;

const displayErrorMessage = (message) => {
  alert(message);
};

const displaySuccessMessage = (message) => {
  alert(message);
  form.reset();
  window.location = "userProfile.html";
};

const saveNewUser = (user) => {
  const updatedUsersList = { users: [...db?.users, { ...user }] };

  localStorage.setItem("db_users", JSON.stringify(updatedUsersList));
};

const createUser = (user) => {
  const { confirmPassword, password, cpf, email } = user;
  const isPasswordValid = confirmPassword === password;
  const isUnique = isUniqueUser(cpf, email);

  if (!isUnique) {
    displayErrorMessage("Usuário já cadastrado. Faça login para continuar");
    return (window.location = "login.html");
  }

  if (!isPasswordValid) {
    return displayErrorMessage(
      "Os campos confirmar senha e senha devem ter o mesmo valor"
    );
  }

  saveNewUser(user);

  localStorage.setItem("db_logged_user", JSON.stringify({ user: { ...user } }));

  displaySuccessMessage("Usuário cadastrado com sucesso!");
};

const handleSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const userData = [...formData.entries()].reduce(
    (acc, entry) => ({ ...acc, [entry[0]]: entry[1] }),
    {}
  );

  const userId = generateUserId();

  const { contactGridCheck, genderGridCheck } = userData;

  const user = {
    user_id: userId,
    contactGridCheck: Boolean(contactGridCheck),
    genderGridCheck: Boolean(genderGridCheck),
    ...userData,
  };

  createUser(user);
};

form.addEventListener("submit", handleSubmit);
