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