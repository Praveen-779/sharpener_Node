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
            document.getElementById('Player').reset();
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
    <p><strong>Photo:</strong> <img src="${player.photourl}" alt="${player.name}'s photo"></p>
    <p><strong>Birthplace:</strong> ${player.birthplace}</p>
    <p><strong>Career:</strong> ${player.career}</p>
    <p><strong>Number of Matches:</strong> ${player.numberofmatches}</p>
    <p><strong>Score:</strong> ${player.score}</p>
    <p><strong>Fifties:</strong> ${player.fifties}</p>
    <p><strong>Centuries:</strong> ${player.centuries}</p>
    <p><strong>Wickets:</strong> ${player.wickets}</p>
    <p><strong>Average:</strong> ${player.average}</p>
    <button onclick="edit(${player.id})">EDIT</button>
`;

                displayDiv.appendChild(playerInfo);
            } else {
                // Display a message if no player is found
                displayDiv.innerHTML = '<p>No player found with that name.</p>';
            }
            document.getElementById('search').value = '';
        })
        .catch(err => console.error(err));
}



function edit(id) {
    axios.get(`http://localhost:7000/players/get-data-byId/${id}`)
        .then(response => {
            const player = response.data.player;
            console.log(player);

            // Populate form fields with player data for editing
            document.getElementById('name').value = player.name;
            document.getElementById('dob').value = player.dateofbirth;
            document.getElementById('url').value = player.photourl;
            document.getElementById('birthplace').value = player.birthplace;
            document.getElementById('career').value = player.career;
            document.getElementById('matches').value = player.numberofmatches;
            document.getElementById('score').value = player.score;
            document.getElementById('fifties').value = player.fifties;
            document.getElementById('centuries').value = player.centuries;
            document.getElementById('wickets').value = player.wickets;
            document.getElementById('average').value = player.average;

            const displayDiv = document.getElementById('display');
            displayDiv.innerHTML = '';
            // Call the deletePlayer function after populating form fields
            deletePlayer(id);
        })
        .catch(err => console.error(err));
}




function deletePlayer(id) {
    axios.delete(`http://localhost:7000/players/delete/${id}`)
        .then(() => console.log('delete success'))
        .catch(err => console.log(err));
}