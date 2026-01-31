// wind chill
const temperature = document.querySelector("#temperature");
const winds = document.querySelector("#winds");
const windsChill = document.querySelector("#wind-chill");

// convert to float
const temp = parseFloat(temperature.textContent);
const wind = parseFloat(winds.textContent);


const calculateWindChill = (temperature, winds) => {
    return 13.12 + 0.6215 * temperature - 11.37 * winds ** 0.16 + 0.3965 * temperature * winds ** 0.16;
};

  if (temp <= 10 && wind > 4.8) {
    windsChill.textContent = calculateWindChill(temp, wind).toFixed(2);
  } else {
    windsChill.textContent = "N/A";
  }

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
