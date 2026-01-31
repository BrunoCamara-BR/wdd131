let temperature = document.querySelector("#temperature");
let winds = document.querySelector("#winds");
let windsChill = document.querySelector("#wind-chill");

const calculateWindChill = (temperature, winds) => {
  if (temperature <= 10 && winds > 3) {
    let windsC =
      13.12 +
      0.6215 * temperature -
      11.37 * winds ** 0.16 +
      0.3965 * temperature * winds ** 0.16;

    return windsC;
  } else {
    return "N/A";
  }
};

console.log(temperature.value)
console.log(temperature)
console.log(4444444)

let wchill = calculateWindChill(temperature.textContent, winds.textContent);

if (wchill === "N/A") {
    windsChill.textContent = wchill;
} else {
    windsChill.textContent = wchill.toFixed(2);
};

// time
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
