// Set up the request parameters
var apiUrl = 'https://discoveryengine.googleapis.com/v1alpha/projects/1008121697399/locations/global/collections/default_collection/engines/tron-q-a_1723642895525/servingConfigs/default_search:search';
var authToken = 'Bearer ' + await gcloud.auth.print-access-token();
var query = 'What is tron';
var pageSize = 10;
var session = 'projects/1008121697399/locations/global/collections/default_collection/engines/tron-q-a_1723642895525/sessions/-';
var spellCorrectionSpec = { mode: 'AUTO' };

// Make the AJAX request
$.ajax({
  type: 'POST',
  url: apiUrl,
  headers: {
    'Authorization': authToken,
    'Content-Type': 'application/json'
  },
  data: JSON.stringify({
    query: query,
    pageSize: pageSize,
    session: session,
    spellCorrectionSpec: spellCorrectionSpec
  }),
  success: function(data) {
    // Handle the response data
    console.log(data);
  },
  error: function(xhr, status, error) {
    // Handle any errors
    console.error(error);
  }
});