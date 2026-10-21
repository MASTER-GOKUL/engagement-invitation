(function () {
  var target = new Date('2026-11-12T12:30:00+05:30');
  var grid = document.getElementById('timerGrid');
  var msg = document.getElementById('blessedMsg');
  function pad(n) { return String(n).padStart(2, '0'); }
  function tick() {
    var diff = target - new Date();
    if (diff <= 0) {
      grid.style.display = 'none';
      msg.style.display = 'block';
      return;
    }
    document.getElementById('days').textContent = pad(Math.floor(diff / 86400000));
    document.getElementById('hours').textContent = pad(Math.floor((diff % 86400000) / 3600000));
    document.getElementById('minutes').textContent = pad(Math.floor((diff % 3600000) / 60000));
    document.getElementById('seconds').textContent = pad(Math.floor((diff % 60000) / 1000));
  }
  tick();
  setInterval(tick, 1000);
}());

(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canvas = document.getElementById('petal-canvas');
  if (!canvas || reduce) {
    if (canvas) canvas.style.display = 'none';
    return;
  }
  var ctx = canvas.getContext('2d');
  var petals = [];
  var SYMBOLS = ['❀', '✦', '🌸', '♡'];
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);
  for (var i = 0; i < 22; i++) {
    petals.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight - window.innerHeight,
      speed: 0.5 + Math.random() * 0.9,
      drift: (Math.random() - 0.5) * 0.5,
      size: 12 + Math.random() * 12,
      rot: Math.random() * 360,
      rotS: (Math.random() - 0.5) * 1.1,
      sym: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      alpha: 0.28 + Math.random() * 0.4
    });
  }
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    petals.forEach(function (p) {
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.font = p.size + 'px serif';
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot * Math.PI / 180);
      ctx.fillText(p.sym, 0, 0);
      ctx.restore();
      p.y += p.speed;
      p.x += p.drift;
      p.rot += p.rotS;
      if (p.y > canvas.height + 30) { p.y = -30; p.x = Math.random() * canvas.width; }
      if (p.x > canvas.width + 30) p.x = -30;
      if (p.x < -30) p.x = canvas.width + 30;
    });
    requestAnimationFrame(draw);
  }
  draw();
}());

(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var els = document.querySelectorAll('.detail-card, .person-card, .blessing-box, .countdown-box');
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(32px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    io.observe(el);
  });
}());

