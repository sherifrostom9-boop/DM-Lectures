  const card = document.querySelector('.auth__card');
  
  if (card) {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const midX = rect.width / 2;
      const midY = rect.height / 2;
      
      const rotateY = ((x - midX) / midX) * 8;
      const rotateX = -((y - midY) / midY) * 8;
      
      card.style.setProperty('--rx', rotateX + 'deg');
      card.style.setProperty('--ry', rotateY + 'deg');
      card.style.setProperty('--mx', (x / rect.width) * 100 + '%');
      card.style.setProperty('--my', (y / rect.height) * 100 + '%');
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
      card.style.setProperty('--mx', '50%');
      card.style.setProperty('--my', '50%');
    });
  }

      // Login Logic
      document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    const msg = document.getElementById('message');

    if (user === "Admin" && pass === "Admin@2026") {
      localStorage.setItem('userRole', 'admin');
      msg.style.color = "#4BB543";
      msg.textContent = "Admin verified. Redirecting...";
      setTimeout(() => { window.location.href = "admin page/doctorsportal.html"; }, 1000);
    } 
    else if (user !== "Admin" && user !== "" && pass !== "") {
      // Universal doctor password or logic
      localStorage.setItem('userRole', 'doctor');
      localStorage.setItem('userName', user);
      msg.style.color = "#4BB543";
      msg.textContent = "Redirecting to your portal...";
      const fileName = user.replace(/[\s.]/g, ''); 
      setTimeout(() => { window.location.href = "portals/" + fileName + ".html"; }, 1000);
    } 
    else {
      msg.style.color = "#ff4d4d";
      msg.textContent = "Invalid username or password.";
    }
  });


<!-- Scroll to top on load -->
  window.onload = function () {
    window.scrollTo(0, 0);
  };

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

  // Function to fix white text in light mode
  function applyLightModeStyles(isLight) {
    // Get all text elements
    const allElements = document.querySelectorAll('*');
    
    allElements.forEach(el => {
      const computedStyle = window.getComputedStyle(el);
      const currentColor = computedStyle.color;
      
      if (isLight) {
        // In light mode: change white/light text to dark
        // Check if color is white or very light
        const rgb = currentColor.match(/\d+/g);
        if (rgb) {
          const r = parseInt(rgb[0]);
          const g = parseInt(rgb[1]);
          const b = parseInt(rgb[2]);
          
          // If text is very light (white or near-white), make it dark
          if (r > 200 && g > 200 && b > 200) {
            el.style.color = '#0f172a';
          }
        }
        
        // Fix specific elements that might have white text
        if (el.classList.contains('nav__logo') || 
            el.tagName === 'H1' || 
            el.tagName === 'H2' || 
            el.tagName === 'H3' ||
            el.tagName === 'LABEL') {
          el.style.color = '#0f172a';
        }
      } else {
        // In dark mode: remove inline color styles to use CSS defaults
        if (el.style.color === 'rgb(15, 23, 42)' || el.style.color === '#0f172a') {
          el.style.color = '';
        }
      }
    });
    
    // Fix button text - always keep white on gradient buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
      btn.style.color = '#ffffff';
    });
  }

  // Apply styles on page load
  applyLightModeStyles(currentTheme === 'light');

  // Theme toggle click handler
  themeToggle.addEventListener('click', function() {
    const theme = html.getAttribute('data-theme');
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Apply light mode text fixes
    applyLightModeStyles(newTheme === 'light');
    
    // Toggle icons
    if (newTheme === 'light') {
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
    } else {
      sunIcon.style.display = 'block';
      moonIcon.style.display = 'none';
    }
  });

  // Re-apply styles after a short delay to catch dynamically loaded content
  setTimeout(() => {
    applyLightModeStyles(html.getAttribute('data-theme') === 'light');
  }, 100);
