//temples dynamic

const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg",
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg",
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg",
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg",
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg",
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg",
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg",
  },

  {
    templeName: "Belém Brazil",
    location: "Belém–PA, Brazil",
    dedicated: "2019, August, 17",
    area: 28675,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/belem-brazil-temple/belem-brazil-temple-31310-main.jpg",
  },

  {
    templeName: "Fortaleza Brazil",
    location: "Fortaleza–CE, Brazil",
    dedicated: "2011, November, 15",
    area: 36000,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/fortaleza-brazil-temple/fortaleza-brazil-temple-5569-main.jpg",
  },

  {
    templeName: "São Paulo Brazil",
    location: "São Paulo–SP, Brazil",
    dedicated: "1976, March, 20",
    area: 28675,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/_temp/017-S%C3%A3o-Paulo-Brazil-Temple.jpg",
  },
];




function builderCards (templesObj) {

document.querySelector("#main").innerHTML = templesObj.reduce(function (total, temples, indice){

return total + ` 
<figure>
  <figcaption class="layout-medium ${indice % 2 == 0 ? "left" : "right"}">
    <strong>${temples.templeName}</strong>
    <br />
    Location: ${temples.location}
    <br />
    Dedicated: ${temples.dedicated}
    <br />
    Size: ${temples.area} sq ft
    <br />
  </figcaption>

  <img
    src="${temples.imageUrl}"
    alt="Picture of ${temples.templeName} lds"
    loading="lazy"
    width="400"
    height="250"
  />
</figure>
`
},"");
};


builderCards(temples)





const homeButton = document.querySelector("#homeButton")
const oldButton = document.querySelector("#oldButton")
const newButton = document.querySelector("#newButton")
const largeButton = document.querySelector("#largeButton")
const smallButton = document.querySelector("#smallButton")




homeButton.addEventListener("click", () => {
builderCards(temples)
})

newButton.addEventListener("click", () => {
builderCards(temples.filter(temple => {
age = parseInt(temple.dedicated.charAt(0)+temple.dedicated.charAt(1)+temple.dedicated.charAt(2)+temple.dedicated.charAt(3))
return age > 2000
}))})



oldButton.addEventListener("click", () => {
builderCards(temples.filter(temple => {
age = parseInt(temple.dedicated.charAt(0)+temple.dedicated.charAt(1)+temple.dedicated.charAt(2)+temple.dedicated.charAt(3))
return age < 1900
}))
})


largeButton.addEventListener("click", () => {
builderCards(temples.filter(temple => {
size = temple.area
return size > 90000
}))
})

smallButton.addEventListener("click", () => {
builderCards(temples.filter(temple => {
size = temple.area
return size < 10000
}))
})








// hamburger button:
const hambutton = document.querySelector("#hambutton");
const menu = document.querySelector(".menu");
const mainTitle = document.querySelector(".main-title");
const header = document.querySelector("header");

hambutton.addEventListener("click", () => {
  hambutton.classList.toggle("show");
  menu.classList.toggle("show");
  mainTitle.classList.toggle("show");
  header.classList.toggle("show");
});

// footer update time
const today = new Date();
const yearSpan = document.querySelector("#currentyear");

const currentYear = today.getFullYear();

yearSpan.textContent = currentYear;

const day = String(today.getDate()).padStart(2, "0");
const month = String(today.getMonth() + 1).padStart(2, "0");
const hours = String(today.getHours()).padStart(2, "0");
const minutes = String(today.getMinutes()).padStart(2, "0");
const seconds = String(today.getSeconds()).padStart(2, "0");

const fullDateTime = `Last modification: ${month}/${day}/${currentYear} ${hours}:${minutes}:${seconds}`;

document.getElementById("lastmodified").textContent = fullDateTime;
