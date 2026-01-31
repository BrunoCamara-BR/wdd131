const button = document.querySelector("button");
const firstName = document.querySelector("#fname");
const lastName = document.querySelector("#lname");
const output = document.querySelector("#show");

button.addEventListener("click", (e) => {
  e.preventDefault();
  let fullName = `${firstName.value} ${lastName.value}`;
  output.textContent = fullName;
});


