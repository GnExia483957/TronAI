// Define the query variable
let query = 'what is tron'; // Change this to your desired query

// Use the variable in the fetch request
let request = `https://95bf-182-239-122-127.ngrok-free.app/v1/g_query?query=${encodeURIComponent(query)}`


console.log("This is what will get sent to the api when we make the call");
console.log(request);