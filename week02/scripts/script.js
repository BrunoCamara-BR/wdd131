const input = document.querySelector("#favchap");
const button = document.querySelector("button");
const list = document.querySelector("#list");

// Add Chapter button
button.addEventListener("click", function () {
  if (input.value != "") {
    const deleteButton = document.createElement("button");
    const li = document.createElement("li");
    li.textContent = input.value;
    deleteButton.textContent = "❌";
    deleteButton.setAttribute("aria-label", "Remove");
    li.append(deleteButton);
    list.append(li);
  }
});

// delete button
list.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const li = e.target.parentElement;
    list.removeChild(li);
    input.value = "";
    input.focus();
  }
});

// shortcut Enter
input.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    const deleteButton = document.createElement("button");
    const li = document.createElement("li");
    li.textContent = input.value;
    deleteButton.textContent = "❌";
    deleteButton.setAttribute("aria-label", "Remove");
    li.append(deleteButton);
    list.append(li);
  }
});
