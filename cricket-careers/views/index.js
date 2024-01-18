function addData(event) {
    event.preventDefault();

    // Collect data from the form
    const obj = {
        name: document.getElementById('name').value,
        dob: document.getElementById('dob').value,
        url: document.getElementById('url').value,
        birthplace: document.getElementById('birthplace').value,
        career: document.getElementById('career').value,
        matches: document.getElementById('matches').value,
        score: document.getElementById('score').value,
        fifties: document.getElementById('fifties').value,
        centuries: document.getElementById('centuries').value,
        wickets: document.getElementById('wickets').value,
        average: document.getElementById('average').value,
    };

    axios.post('http://localhost:7000/players/add-data', obj)
        .then(response => {
            console.log(response);
        }).catch(err => console.log(err));
}

function display() {
const name = document.getElementById('search').value;

axios.get(`http://localhost:7000/players/get-data/${name}`)
    .then(response => {
        const player = response.data.players[0];

        // Update the UI with player information
        const displayDiv = document.getElementById('display');
        displayDiv.innerHTML = ''; // Clear previous content

       // ...

if (player) {
const playerInfo = document.createElement('div');

// Add player information to the display div
playerInfo.innerHTML = `
    <h2>${player.name}</h2>
    <p><strong>Date of Birth:</strong> ${player.dateofbirth}</p>
    <p><strong>Photo:</strong> <img src="${player.url}" alt="${player.name}'s photo"></p>
    <p><strong>Birthplace:</strong> ${player.birthplace}</p>
    <p><strong>Career:</strong> ${player.career}</p>
    <p><strong>Number of Matches:</strong> ${player.numberofmatches}</p>
    <p><strong>Score:</strong> ${player.score}</p>
    <p><strong>Fifties:</strong> ${player.fifties}</p>
    <p><strong>Centuries:</strong> ${player.centuries}</p>
    <p><strong>Wickets:</strong> ${player.wickets}</p>
    <p><strong>Average:</strong> ${player.average}</p>
`;

displayDiv.appendChild(playerInfo);
} else {
// Display a message if no player is found
displayDiv.innerHTML = '<p>No player found with that name.</p>';
}
    })
    .catch(err => console.error(err));
}