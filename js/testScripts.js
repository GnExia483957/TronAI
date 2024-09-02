const url = 'http://192.168.1.59:8810/agent';
const data = {
    query: 'what is tron',
    session_id: '749530f51b5f11d14364c208c5822acd531384be4a1ae5f514e98ebda2daf72f'
};

fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
})
.then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json(); // Parse the JSON from the response
})
.then(data => {
    console.log('Success:', data);
})
.catch(error => {
    console.error('Error:', error);
});