// Define the query variable
let query = 'what is tron'; // Change this to your desired query

// Use the variable in the fetch request
fetch(`https://95bf-182-239-122-127.ngrok-free.app/v1/g_query?query=${encodeURIComponent(query)}`, {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
})
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
})
.then(data => {
    console.log(data);
})
.catch(error => {
    console.error('Error:', error);
});
