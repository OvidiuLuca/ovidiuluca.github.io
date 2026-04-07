emailjs.init('hGRXPG-mP7R1Pvs8m');

/* Header scroll */
var header = document.getElementById('site-header');
var hero   = document.getElementById('home');

function updateHeader() {
  var pastHero = window.scrollY > hero.offsetTop + hero.offsetHeight - header.offsetHeight - 10;
  header.classList.toggle('scrolled', pastHero);
  header.classList.toggle('shrunk', window.scrollY > 10);
}
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

/* Contact form */
var form = document.getElementById('contact-form');
var btn  = document.getElementById('send-btn');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  var name    = document.getElementById('f-name').value;
  var email   = document.getElementById('f-email').value;
  var message = document.getElementById('f-message').value;

  if (!name || !email || !message) return;

  btn.textContent = 'Sending...';
  btn.disabled = true;

  emailjs.send('service_49dntx2', 'template_rut1ctu', {
    name:    name,
    email:   email,
    message: message
  }).then(function() {
    btn.textContent = 'Message Sent!';
    btn.style.background = '#2a7a2a';
    form.reset();
    setTimeout(function() {
      btn.textContent = 'Send Message';
      btn.style.background = '';
      btn.disabled = false;
    }, 3000);
  }, function(error) {
    console.error('EmailJS error:', error);
    btn.textContent = 'Failed — Try Again';
    btn.style.background = '#a02020';
    btn.disabled = false;
    setTimeout(function() {
      btn.textContent = 'Send Message';
      btn.style.background = '';
    }, 3000);
  });
});
