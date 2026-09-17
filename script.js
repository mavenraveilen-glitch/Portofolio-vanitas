// Vanitas Portfolio — Interactive Scripts

document.addEventListener('DOMContentLoaded', () => {
  // Play / Pause buttons
  const playButtons = document.querySelectorAll('.play-btn');
  playButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const icon = btn.querySelector('i');
      if (icon.classList.contains('fa-play')) {
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
        btn.classList.add('playing');
      } else {
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
        btn.classList.remove('playing');
      }
    });
  });

  // Mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.querySelector('.nav-links');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
      const icon = menuToggle.querySelector('i');
      if (navLinks.classList.contains('mobile-open')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
        // Inject mobile styles if needed
        if (!document.getElementById('mobile-nav-style')) {
          const style = document.createElement('style');
          style.id = 'mobile-nav-style';
          style.textContent = `
            .nav-links.mobile-open {
              display: flex !important;
              flex-direction: column;
              position: absolute;
              top: 70px;
              left: 16px;
              right: 16px;
              background: rgba(15, 23, 42, 0.95);
              backdrop-filter: blur(16px);
              border: 1px solid rgba(56, 189, 248, 0.25);
              border-radius: 16px;
              padding: 12px;
              z-index: 100;
              box-shadow: 0 10px 40px rgba(0,0,0,0.5);
            }
            .nav-links.mobile-open a {
              padding: 12px 16px;
              border-radius: 10px;
            }
          `;
          document.head.appendChild(style);
        }
      } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });
  }

  // Smooth hover on glass cards (extra polish)
  const cards = document.querySelectorAll('.float-hover');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // Tag click effect
  document.querySelectorAll('.tags span').forEach(tag => {
    tag.addEventListener('click', () => {
      tag.style.transform = 'scale(0.92)';
      setTimeout(() => tag.style.transform = '', 150);
    });
  });

  // View Profile button
  const profileBtn = document.querySelector('.action-btn');
  if (profileBtn) {
    profileBtn.addEventListener('click', () => {
      profileBtn.textContent = 'Opening…';
      setTimeout(() => {
        profileBtn.textContent = 'View Profile';
        alert('Vanitas profile — “I am a doctor who cures vampires of their curses.”');
      }, 600);
    });
  }

  // Floating buttons
  document.querySelectorAll('.float-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.style.transform = 'scale(0.9)';
      setTimeout(() => btn.style.transform = '', 200);
    });
  });

  // Subtle parallax on character
  const char = document.querySelector('.character-art');
  if (char && window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 12;
      const y = (e.clientY / window.innerHeight - 0.5) * 8;
      char.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  // Console easter egg
  console.log('%c✧ Vanitas Portfolio ✧', 'color: #38bdf8; font-size: 18px; font-weight: bold;');
  console.log('%c“I will save every last one of them.” — Vanitas', 'color: #7dd3fc; font-style: italic;');
});
