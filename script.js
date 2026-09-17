// Vanitas Portfolio — Working Audio + Interactions

document.addEventListener('DOMContentLoaded', () => {
  const audioMain = document.getElementById('audioMain');
  const audioMini = document.getElementById('audioMini');
  const playMain = document.getElementById('playMain');
  const playMini = document.getElementById('playMini');
  const progressMain = document.getElementById('progressMain');
  const progressMainTrack = document.getElementById('progressMainTrack');
  const timeCurrent = document.getElementById('timeCurrent');
  const timeTotal = document.getElementById('timeTotal');
  const mainAlbum = document.getElementById('mainAlbum');
  const miniAlbum = document.getElementById('miniAlbum');

  function formatTime(sec) {
    if (!sec || isNaN(sec)) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return m + ':' + s.toString().padStart(2, '0');
  }

  function setPlaying(btn, album, isPlaying) {
    const icon = btn.querySelector('i');
    if (isPlaying) {
      icon.classList.remove('fa-play');
      icon.classList.add('fa-pause');
      btn.classList.add('playing');
      if (album) album.classList.add('spinning');
    } else {
      icon.classList.remove('fa-pause');
      icon.classList.add('fa-play');
      btn.classList.remove('playing');
      if (album) album.classList.remove('spinning');
    }
  }

  // Main player
  if (playMain && audioMain) {
    playMain.addEventListener('click', () => {
      if (audioMain.paused) {
        if (audioMini && !audioMini.paused) {
          audioMini.pause();
          setPlaying(playMini, miniAlbum, false);
        }
        audioMain.play().catch(e => console.warn('Play blocked:', e));
        setPlaying(playMain, mainAlbum, true);
      } else {
        audioMain.pause();
        setPlaying(playMain, mainAlbum, false);
      }
    });

    audioMain.addEventListener('timeupdate', () => {
      if (audioMain.duration) {
        const pct = (audioMain.currentTime / audioMain.duration) * 100;
        progressMain.style.width = pct + '%';
        timeCurrent.textContent = formatTime(audioMain.currentTime);
      }
    });

    audioMain.addEventListener('loadedmetadata', () => {
      timeTotal.textContent = formatTime(audioMain.duration);
    });

    audioMain.addEventListener('ended', () => {
      setPlaying(playMain, mainAlbum, false);
      progressMain.style.width = '0%';
      timeCurrent.textContent = '0:00';
    });

    if (progressMainTrack) {
      progressMainTrack.addEventListener('click', (e) => {
        if (!audioMain.duration) return;
        const rect = progressMainTrack.getBoundingClientRect();
        const pct = (e.clientX - rect.left) / rect.width;
        audioMain.currentTime = pct * audioMain.duration;
      });
    }
  }

  // Mini player
  if (playMini && audioMini) {
    playMini.addEventListener('click', () => {
      if (audioMini.paused) {
        if (audioMain && !audioMain.paused) {
          audioMain.pause();
          setPlaying(playMain, mainAlbum, false);
        }
        audioMini.play().catch(e => console.warn('Play blocked:', e));
        setPlaying(playMini, miniAlbum, true);
      } else {
        audioMini.pause();
        setPlaying(playMini, miniAlbum, false);
      }
    });

    audioMini.addEventListener('ended', () => {
      setPlaying(playMini, miniAlbum, false);
    });
  }

  // Mobile menu
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
      const icon = menuToggle.querySelector('i');
      if (navLinks.classList.contains('mobile-open')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
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

  // View Profile
  const profileBtn = document.getElementById('viewProfile');
  if (profileBtn) {
    profileBtn.addEventListener('click', () => {
      const original = profileBtn.textContent;
      profileBtn.textContent = 'Opening…';
      setTimeout(() => {
        profileBtn.textContent = original;
        alert('Vanitas — “I am a doctor who cures vampires of their curses.”\\n\\nBook of Vanitas in hand. Blue Moon blood in my veins.');
      }, 500);
    });
  }

  // Floating buttons feedback
  document.querySelectorAll('.float-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.style.transform = 'scale(0.9)';
      setTimeout(() => btn.style.transform = '', 180);
    });
  });

  // Tag click
  document.querySelectorAll('.tags span').forEach(tag => {
    tag.addEventListener('click', () => {
      tag.style.transform = 'scale(0.92)';
      setTimeout(() => tag.style.transform = '', 150);
    });
  });

  // Gentle parallax on character (desktop)
  const char = document.querySelector('.character-art');
  if (char && window.matchMedia('(min-width: 768px)').matches) {
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 6;
      char.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
    });
  }

  console.log('%c✧ Vanitas Portfolio ✧', 'color: #38bdf8; font-size: 16px; font-weight: bold;');
  console.log('%c“I will save every last one of them.”', 'color: #7dd3fc; font-style: italic;');
});
