const input = document.querySelector("#favchap");
const button = document.querySelector("button");
const list = document.querySelector("#list");

let chaptersArray = getChapterList() || [];

chaptersArray.forEach((chapter) => {
  displayList(chapter);
});

button.addEventListener("click", () => {
  if (input.value != "") {
    displayList(input.value);
    chaptersArray.push(input.value);
    setChapterList();
    input.value = "";
    input.focus();
  }
});

// shortcut Enter (ativa o mesmo comportamento do botão)
input.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    button.click();
  }
});

function displayList(item) {
  const li = document.createElement("li");
  const deleteButton = document.createElement("button");

  li.textContent = item;

  deleteButton.textContent = "❌";
  deleteButton.classList.add("delete");
  deleteButton.setAttribute("aria-label", "Remove");

  li.append(deleteButton);
  list.append(li);

  deleteButton.addEventListener("click", () => {
    list.removeChild(li);
    deleteChapter(li.textContent);
    input.focus();
  });
}

function setChapterList() {
  localStorage.setItem("myFavBOMList", JSON.stringify(chaptersArray));
}

function getChapterList() {
  return JSON.parse(localStorage.getItem("myFavBOMList"));
}

function deleteChapter(chapter) {
  // remove o "❌" que vai junto quando você pega li.textContent
  chapter = chapter.slice(0, chapter.length - 1);
  chaptersArray = chaptersArray.filter((item) => item !== chapter);
  setChapterList();
}

