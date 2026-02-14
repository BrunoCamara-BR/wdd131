const input = document.querySelector("#favchap");
const button = document.querySelector("button");
const list = document.querySelector("#list");

// se storage existe ja contruir
if (localStorage.getItem("Chapter") != null) {
  buildCard();
} else {
  // localStorage.setItem("Chapter", "[]");
}

// contrutor
function buildCard() {
  const strStorage = localStorage.getItem("Chapter");

  storage = JSON.parse(strStorage);

  storage.forEach((item) => {
    const li = document.createElement("li");
    const deleteButton = document.createElement("button");
    li.textContent = item;
    deleteButton.textContent = "❌";
    deleteButton.setAttribute("aria-label", "Remove");
    li.append(deleteButton);
    list.append(li);
  });
}

function addChapter() {
  if (input.value != "") {
    let storage = JSON.parse(localStorage.getItem("Chapter")) || [];

    storage.push(input.value);
    strStorage = JSON.stringify(storage);
    localStorage.setItem("Chapter", strStorage);
  }
}

// Add Chapter button
button.addEventListener("click", function () {
  list.innerHTML = "";

  addChapter();

  buildCard();
});

// delete button
list.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const li = e.target.parentElement;
    li.removeChild(e.target);
    let storage = JSON.parse(localStorage.getItem("Chapter"));
    storage = storage.filter((item) => {
      return item != li.textContent;
    });

    // localStorage.removeItem("Chapter")
    localStorage.setItem("Chapter", JSON.stringify(storage));
    list.innerHTML = "";

    input.value = "";
    input.focus();

    buildCard();
  }
});

// shortcut Enter
input.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    list.innerHTML = "";

    addChapter();

    buildCard();
  }
});
