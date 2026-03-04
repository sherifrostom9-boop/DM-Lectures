// Authentication logic for login.html
// NOTE: This is a front-end demo. Do NOT store real credentials in client-side code.

const facultyCredentials = [
  { username: 'Dr.Sherif Rostom', password: 'Sherif@123', redirectURL: 'HP(dr.sherif).html' },
  { username: 'Dr.Hanan Ghaly', password: 'Hanan@123', redirectURL: 'HP(dr.hanan).html' },
  { username: 'Dr.Norhane El Gebaly', password: 'Norhane@123', redirectURL: 'HP(dr.norhane).html' },
  { username: 'Dr.Asmaa Al Sharif', password: 'AsmaaSH@123', redirectURL: 'HP(dr.asmaaSH).html' },
  { username: 'Dr.Asmaa Abdulmajeed', password: 'AsmaaA@123', redirectURL: 'HP(dr.asmaaA).html' },
  { username: 'Dr.Reem', password: 'Reem@123', redirectURL: 'HP(dr.reem).html' },
  { username: 'Dr.Farid Haddad', password: 'Farid@123', redirectURL: 'HP(dr.farid).html' },
  { username: 'Dr.Khaled', password: 'Khaled@123', redirectURL: 'HP(dr.khaled).html' },
  { username: 'Dr.Manal Mohamed', password: 'Manal@123', redirectURL: 'HP(dr.manal).html' },
  { username: 'Dr.Ehab Barssoum', password: 'Ehab@123', redirectURL: 'HP(dr.ehab).html' },
  { username: 'Dr.Mohamed Thabet', password: 'Mohamed@123', redirectURL: 'HP(dr.mohamed).html' },
  { username: 'Dr.Hesham', password: 'Hesham@123', redirectURL: 'HP(dr.hesham).html' },
];

function validateFacultyCredentials(username, password) {
  const u = (username || '').trim();
  const p = String(password || '');

  return facultyCredentials.find((prof) => prof.username === u && prof.password === p) || null;
}

(() => {
  const form = document.getElementById('loginForm');
  const messageEl = document.getElementById('message');
  const usernameEl = document.getElementById('username');
  const passwordEl = document.getElementById('password');

  if (!form) return;

  const showMessage = (msg) => {
    if (messageEl) messageEl.textContent = msg;
    else alert(msg);
  };

  const clearMessage = () => {
    if (messageEl) messageEl.textContent = '';
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearMessage();

    const username = usernameEl ? usernameEl.value : '';
    const password = passwordEl ? passwordEl.value : '';

    const match = validateFacultyCredentials(username, password);
    if (!match) {
      showMessage('Invalid credentials. Please try again.');
      return;
    }

    // ✅ NEW: Set user role in localStorage for doctors
    localStorage.setItem('userRole', 'doctor');
    localStorage.setItem('userName', username);

    // Smooth-ish redirect: small delay allows button active state to be perceived
    window.setTimeout(() => {
      window.location.href = match.redirectURL;
    }, 120);
  });
})();