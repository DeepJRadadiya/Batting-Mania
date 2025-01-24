document.addEventListener('DOMContentLoaded', () => {
const isLoggedIn = localStorage.getItem('loggedIn'); 

if (!isLoggedIn) {
  // Redirect to login page if not login
  window.location.href = 'signup.html';
}
else{
    window.location.href = 'index.html'; 
}
});