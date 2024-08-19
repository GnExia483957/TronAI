// Set the request parameters
const apiUrl = 'https://discoveryengine.googleapis.com/v1alpha/projects/1008121697399/locations/global/collections/default_collection/engines/tron-q-a_1723642895525/servingConfigs/default_search:search';
const authToken = 'Bearer ya29.a0AcM612xLgfJtlMQPKPtWtwi-VQZFYyICH24iOptNZqcpd-v1-PrRFxh2X7x8Y5CabXq3o8LLz6S0XeY_Ym9dlPz2TOLPuaLaMr3nrMXK5ecn03F4U_tO01vzDl0kXAK1tfiGB86N0ZNCVWmH3vuKh9FFXotwU-8V6okGVDMGcC2XZAaCgYKAX8SARESFQHGX2MiWcHNpBXwzJSLn3yF_qa4xw0181';
const query = 'what is tron';
const pageSize = 10;
const session = 'projects/1008121697399/locations/global/collections/default_collection/engines/tron-q-a_1723642895525/sessions/-';
const spellCorrectionSpec = { mode: 'AUTO' };

// Make the AJAX request
fetch(apiUrl, {
  method: 'POST',
  headers: {
    'Authorization': authToken,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    query: query,
    pageSize: pageSize,
    session: session,
    spellCorrectionSpec: spellCorrectionSpec
  })
})
.then(response => response.json())
.then(data => {
  // Handle the response data
  console.log(data);
})
.catch(error => {
  // Handle any errors
  console.error(error);
});