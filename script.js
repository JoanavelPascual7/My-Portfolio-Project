async function searchBikeStations() {
  const response = await fetch("http://api.citybik.es/v2/networks/citi-bike-nyc");
  const data = await response.json();
  const bikeStations = data.network.stations;
  const userInput = document.getElementById("searchInput").value.toLowerCase();
  const userWords = userInput.split(" ");

  let matches = [];
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
    if (matchCount === userWords.length) {
      matches.push(station);
    }
  }
if (matches.length === 0) {
  const invalidEntry = userWords.filter(word => isNaN(word)).join(" ");
  const message = invalidEntry ? `No bikes found for "${invalidEntry}". Please do not use ordinal suffix "2nd" "nd" "4th" "th". Write only numbers.` : "Please enter a valid number.";
  alert(`🚲🛑🚲🛑🚲${message}🚲🛑🚲🛑🚲`);
} else {
    const resultDiv = document.querySelector(".bike.return");
    resultDiv.innerHTML = "";
    for (const match of matches) {
      const stationDiv = document.createElement("div");
      stationDiv.innerHTML = `<p>Name: ${match.name}</p><p>Free bikes: ${match.free_bikes}</p>`;
      resultDiv.appendChild(stationDiv);
    }
  }
}

