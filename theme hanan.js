// Apply theme IMMEDIATELY to prevent flash
(function() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
})();

const themeToggle = document.getElementById('themeToggle');
const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');
const html = document.documentElement;

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', currentTheme);

// Update icon visibility based on current theme
if (currentTheme === 'light') {
  sunIcon.style.display = 'none';
  moonIcon.style.display = 'block';
}

// Theme toggle click handler
themeToggle.addEventListener('click', function() {
  const theme = html.getAttribute('data-theme');
  const newTheme = theme === 'dark' ? 'light' : 'dark';
  
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  
  // Toggle icons
  if (newTheme === 'light') {
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
  } else {
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
  }
});

