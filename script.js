//The first part of the code uses the fetch function to make a request to the Citybik API for the JSON containing info on bikes in New York City. The response is then stored in the "response" variable.

async function searchBikeStations() {
  const response = await fetch("http://api.citybik.es/v2/networks/citi-bike-nyc");
//This part of the function uses the json() method to parse the response data into a JavaScript object, which is stored in the "data" variable.
  const data = await response.json();
//In this part of the function it extracts an array of bike stations from the "data" object and stores it in the "bikeStations" variable.
  const bikeStations = data.network.stations;

//The fourth spart of the function retrieves the user's search input from the HTML input element with the ID "searchInput". Then it converts it to lowercase, and splits it into an array of individual words. These words are stored in the "userWords" variable.
  const userInput = document.getElementById("searchInput").value.toLowerCase();
  const userWords = userInput.split(" ");
//This part of the function initializes an empty array called matches.
  let matches = [];
//this part of the function uses a nested for of loop to iterate over each station in the bikeStations array and each word in the userWords array. The matchCount variable is used to keep track of how many words in the user's input match words in the station's name. If the word contains a number, the station's name is searched for the word surrounded by spaces (to prevent partial matches) using a regular expression. If the word does not contain a number, the station's name is searched for the word as-is.
  for (const station of bikeStations) {
    let matchCount = 0;
    for (const word of userWords) {
      if (/\d+/.test(word)) {
        if (station.name.toLowerCase().includes(` ${word} `) ||
            station.name.toLowerCase().startsWith(`${word} `) ||
            station.name.toLowerCase().endsWith(` ${word}`)) {
          matchCount++;
        }
      } else if (station.name.toLowerCase().includes(word)) {
        matchCount++;
      }
    }
//If the matchCount equals the length of the userWords array, it means that all of the words in the user's input matched at least one word in the station's name. Therefore, the current station is added to the matches array.    
    if (matchCount === userWords.length) {
      matches.push(station);
    }
  }
//If the matches array is empty, it means that no bike stations were found that match the user's input. The code checks if any of the words in the user's input are numbers using the isNaN() function, and if so, joins them together to create a string called invalidEntry. The message variable is then set to a string that informs the user that no bikes were found, along with the invalidEntry string if it exists. Finally, an alert is displayed to the user using the alert() function with the message string and some bike emojis.
if (matches.length === 0) {
  const invalidEntry = userWords.filter(word => isNaN(word)).join(" ");
  const message = invalidEntry ? `No bikes found for "${invalidEntry}". Please do not use ordinal suffix "2nd" "nd" "4th" "th". Write only numbers.` : "Please enter a valid number.";
  alert(`🚲🛑🚲🛑🚲${message}🚲🛑🚲🛑🚲`);
} else {
//If the matches array is not empty, it means that one or more bike stations were found that match the user's input. The code retrieves the HTML element with the class "bike.return" using the querySelector() method and stores it in the resultDiv variable. The innerHTML property of resultDiv is then set to an empty string to clear any previous search results.
    const resultDiv = document.querySelector(".bike.return");
    resultDiv.innerHTML = "";
//lastly the function uses a for of loop to iterate over each match in the matches array. For each match, a new div element is created using the createElement() method and stored in the "stationDiv" variable. The innerHTML property of "stationDiv" is then set to a string that contains the name of the match station and the number of free bikes at that station. Finally, the "stationDiv" element is appended to the "resultDiv" element using the appendChild() method.
    for (const match of matches) {
      const stationDiv = document.createElement("div");
      stationDiv.innerHTML = `<p>Name: ${match.name}</p><p>Free bikes: ${match.free_bikes}</p>`;
      resultDiv.appendChild(stationDiv);
    }
  }
}














