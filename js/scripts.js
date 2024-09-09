const inputField = document.getElementById('input-field');
let toggleBtn = document.getElementById('toggleBtn');


inputField.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    saveInput();
  }
});

function saveInput() {
  const inputValue = inputField.value.trim();
  if (inputValue === '') {
    alert('Please enter some text in the input field.');
  } else {
    console.log('Input value:', inputValue);
    localStorage.setItem('inputValue', inputValue);
    window.location.href = 'AI.html';
  }
}

///////
//Modal Script
///////
const modal = document.getElementById("myModal");
const btn = document.getElementById("openModal");
const span = document.getElementById("closeModal");

btn.onclick = function() {
    modal.style.display = "block"; // Show the modal
    setTimeout(() => {
        modal.classList.add("show"); // Add the slide-in effect
    }, 10); // Delay to allow display to take effect
}

span.onclick = function() {
    modal.classList.remove("show"); // Remove the slide-in effect
    setTimeout(() => {
        modal.style.display = "none"; // Hide the modal after animation
    }, 300); // Match the duration of the transition
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.classList.remove("show");
        setTimeout(() => {
            modal.style.display = "none";
        }, 300);
    }
}
