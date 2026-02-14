function fetchData(callback) {
  // using setTimeout to simulate fetching data from a server
  setTimeout(() => {
    // This calls the 'callback' function and passes data to it.
    callback("Data has been fetched");
  }, 2000); // This simulates a 2-second delay from a service.
}

// function that processes the data
function processData(data) {
  console.log("Data received:", data);
}

// Call the fetchData function and pass the processData function as an argument.
fetchData(processData);
