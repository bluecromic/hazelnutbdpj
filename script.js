
var $ = function (i) {
  return document.getElementById(i);
};

function f(s) {
  return s.replace(/\{nama\}/g, C.nama)
          .replace(/\{pengirim\}/g, C.pengirim);
}

function mk(t, c, x) {
  var e = document.createElement(t);
  if (c) e.className = c;
  if (x != null) e.textContent = x;
  return e;
}

var cur = 0;
var N = 10;
var aud = new Audio();
var typed = false;

$('dots').innerHTML = new Array(N + 1).join('<i></i>');

function go(n) {
  cur = n;

  for (var i = 0; i < N; i++) {
    $('s' + i).classList.toggle('on', i == n);
  }

  [].forEach.call($('dots').children, function (d, i) {
    d.className = i <= n ? 'd' : '';
  });

  $('s' + n).scrollTop = 0;
  $('app').classList.toggle('night', n == 9);

  // Musik tetap berjalan saat berpindah halaman.
  if (n == 4 && aud.paused) {
    $('pp').textContent = '▶ Putar';
  }

  if (n == 1) runChat();
  if (n == 9) startEnd();
}

go(0);


/* 1. LOCK */

function tick() {
  var d = new Date();

  $('tm').textContent =
    ('0' + d.getHours()).slice(-2) + ':' +
    ('0' + d.getMinutes()).slice(-2);

  $('dt').textContent = d.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });
}

tick();
setInterval(tick, 30000);

$('nt').innerHTML =
  '<b>💬 new message</b><br>From ' +
  C.pengirim +
  ': "Masukkan kode untuk membuka."';

var buf = '';
var miss = 0;

function dots() {
  [].forEach.call($('pin').children, function (d, i) {
    d.className = i < buf.length ? 'f' : '';
  });
}

'123456789<0✓'.split('').forEach(function (k) {
  var b = document.createElement('button');

  b.textContent = k;
  b.setAttribute(
    'aria-label',
    k == '<' ? 'Hapus' : k == '✓' ? 'Buka' : k
  );

  b.onclick = function () {
    if (k == '<') {
      buf = buf.slice(0, -1);
    } else if (k == '✓') {
      return check();
    } else if (buf.length < 4) {
      buf += k;
    }

    dots();

    if (buf.length == 4 && k != '<') {
      check();
    }
  };

  $('pad').appendChild(b);
});

function check() {
  if (buf == C.pin) {
    hearts(14);

    setTimeout(function () {
      go(1);
    }, 500);

    return;
  }

  if (buf.length < 4) return;

  miss++;

  $('pin').classList.add('bad');

  setTimeout(function () {
    $('pin').classList.remove('bad');
  }, 400);

  buf = '';
  dots();

  $('hint').textContent =
    miss >= 2
      ? C.petunjuk
      : 'Kodenya belum tepat, coba lagi ♡';
}

$('hb').onclick = function () {
  $('hint').textContent = C.petunjuk;
};


/* 2. CHAT */

var ci = 0;
var started = false;

$('c-t').textContent = C.chatJudul;

function bub(t, me) {
  var b = document.createElement('div');

  b.className = 'b' + (me ? ' me' : '');
  b.textContent = t;

  $('chat').appendChild(b);
  $('chat').scrollTop = 1e5;
}

function runChat() {
  if (started) return;

  started = true;
  step();
}

function step() {
  if (ci >= C.chat.length) {
    $('n1').classList.remove('hide');
    return;
  }

  var s = C.chat[ci++];

  if (typeof s == 'string') {
    var t = document.createElement('div');

    t.className = 'b';
    t.textContent = '…';

    $('chat').appendChild(t);

    setTimeout(function () {
      t.remove();
      bub(f(s));

      setTimeout(step, 500);
    }, 900);

  } else {
    $('ch').innerHTML = '';

    s.forEach(function (o) {
      var b = document.createElement('button');

      b.textContent = o;

      b.onclick = function () {
        $('ch').innerHTML = '';

        bub(o, true);

        setTimeout(step, 500);
      };

      $('ch').appendChild(b);
    });
  }
}

$('n1').onclick = function () {
  go(2);
};


/* 3. PHOTO STRIP */

$('strip').innerHTML = C.foto.map(function (p) {
  return (
    '<button class="card" aria-label="Balik foto">' +
      '<span class="ft">' +
        '<img src="' + p[0] + '" alt="Foto kenangan">' +
      '</span>' +
      '<span class="bk">' + p[1] + '</span>' +
    '</button>'
  );
}).join('');

[].forEach.call(
  document.querySelectorAll('.card'),
  function (c) {
    c.onclick = function () {
      c.classList.toggle('fl');
    };
  }
);

$('n2').onclick = function () {
  go(3);
};


/* 4. COLLAGE */

var bgs = [
  'var(--soft)',
  'var(--blue)',
  'var(--lilac)',
  '#fff3b0'
];

C.kolase.forEach(function (k, i) {
  var d;

  if (k.t == 'f') {
    d = mk('div', 'ct ph');

    d.style.background =
      'linear-gradient(135deg,' +
      bgs[i % 4] +
      ',var(--pink))';

    if (k.src) {
      var im = new Image();

      im.src = k.src;
      im.alt = 'Foto kita';

      d.appendChild(im);
    } else {
      d.textContent = k.e || '💗';
    }

  } else {
    d = mk('div', 'ct tx', f(k.x));
    d.style.background = bgs[(i + 1) % 4];
  }

  if (k.w) {
    d.classList.add('w');
  }

  $('col').appendChild(d);
});

$('n3').onclick = function () {
  go(4);
};


/* 5. SOUNDTRACK */

var si = 0;

function showSongs() {
  $('sl').innerHTML = '';

  C.lagu.forEach(function (s, i) {
    var b = mk(
      'button',
      i == si ? 'a' : '',
      '♪ ' + s.j + ' — ' + s.a
    );

    b.onclick = function () {
      aud.pause();
      si = i;
      showSongs();
    };

    $('sl').appendChild(b);
  });

  var s = C.lagu[si];

  $('pj').textContent = s.j;
  $('pa').textContent = s.a;
  $('pc').textContent = s.cerita || '';

  $('pp').textContent = '▶ Putar';

  if ($('pn')) {
    $('pn').textContent = '';
  }

  aud.src = s.src || '';
}

$('pp').onclick = function () {
  if (aud.paused) {
    if (!aud.src) {
      if ($('pn')) {
        $('pn').textContent = 'File musik belum tersedia.';
      }
      return;
    }

    aud.play().catch(function () {
      $('pp').textContent = '▶ Putar';

      if ($('pn')) {
        $('pn').textContent =
          'Lagu tidak bisa diputar. Periksa nama file musik.';
      }
    });

  } else {
    aud.pause();
  }
};

aud.onended = function () {
  $('pp').textContent = '▶ Putar';
};

aud.onpause = function () {
  $('pp').textContent = '▶ Putar';
};

aud.onplay = function () {
  $('pp').textContent = '⏸ Jeda';
};

showSongs();

$('n4').onclick = function () {
  go(5);
};


/* 6. CAKE */

var out = 0;
var L = C.lilin;

function snuff(x) {
  if (x.classList.contains('off')) return;

  x.classList.add('off');

  for (var j = 0; j < 4; j++) {
    var s = mk('span', 'sm');

    s.style.animationDelay = j * 0.18 + 's';
    s.style.left = (10 + Math.random() * 10) + 'px';

    x.appendChild(s);

    setTimeout(function (e) {
      e.remove();
    }, 2200, s);
  }

  out++;

  if (out == L) {
    $('say').textContent = f(C.harapan);

    hearts(36, ['🎉', '🎊', '✨', '💗', '🎈']);

    $('bl').classList.add('hide');
    $('n5').classList.remove('hide');
  }
}

for (var i = 0; i < L; i++) {
  var b = mk('button', 'cn');

  b.setAttribute('aria-label', 'Tiup lilin');

  b.innerHTML =
    '<span class="fl"></span>' +
    '<span class="st"></span>';

  b.onclick = function (e) {
    snuff(e.currentTarget);
  };

  $('cd').appendChild(b);
}

$('bl').onclick = function () {
  [].forEach.call($('cd').children, function (x, i) {
    setTimeout(snuff, i * 250, x);
  });
};

$('n5').onclick = function () {
  go(6);
};


/* 7. REASONS */

var opened = 0;
var R = C.alasan;

var deco = [
  '💗', '✨', '🎀', '🌸', '⭐', '🦋'
];

function rcount() {
  $('rcn').textContent =
    'Ketuk kartu untuk membuka alasannya (' +
    opened + '/' + R.length + ')';
}

rcount();

R.forEach(function (t, i) {
  var b = mk('button', 'rc');

  b.setAttribute('aria-label', 'Kartu ' + (i + 1));

  b.innerHTML =
    '<span class="ft"><b>' +
      (i + 1) +
      '<small>' + deco[i % 6] + '</small>' +
    '</b></span>' +
    '<span class="bk"></span>';

  b.lastChild.textContent = f(t);

  b.onclick = function () {
    if (b.classList.contains('fl')) return;

    b.classList.add('fl');
    opened++;

    rcount();

    if (opened == R.length) {
      $('rs').textContent = f(C.alasanAkhir);
      $('rs').classList.remove('hide');
      $('n6').classList.remove('hide');

      hearts(20);

      setTimeout(function () {
        $('rs').scrollIntoView({
          behavior: 'smooth'
        });
      }, 300);
    }
  };

  $('rg').appendChild(b);
});

$('n6').onclick = function () {
  go(7);
};


/* 8. UNIVERSE */

var P = [
  [14, 14],
  [42, 8],
  [74, 16],
  [88, 40],
  [60, 38],
  [28, 42],
  [10, 66],
  [42, 62],
  [76, 70],
  [52, 88]
];

var lastS = null;
var seen = 0;

var ic = {
  Kenangan: '✦',
  Alasan: '♥',
  Harapan: '☾'
};

C.bintang.slice(0, 10).forEach(function (s, i) {
  var b = mk('button', 'sk', ic[s.k] || '✦');
  var p = P[i % 10];

  b.style.left = p[0] + '%';
  b.style.top = p[1] + '%';

  b.setAttribute('aria-label', 'Bintang ' + (i + 1));

  b.onclick = function () {
    $('sm').textContent = s.k + ': ' + f(s.p);

    if (!b.classList.contains('on')) {
      b.classList.add('on');
      seen++;

      $('skn').textContent =
        '(' + seen + '/' + C.bintang.length + ')';

      if (lastS != null) {
        var l = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'line'
        );

        l.setAttribute('x1', P[lastS][0]);
        l.setAttribute('y1', P[lastS][1]);
        l.setAttribute('x2', p[0]);
        l.setAttribute('y2', p[1]);

        $('sv').appendChild(l);
      }

      lastS = i;

      if (seen == C.bintang.length) {
        $('n7').classList.remove('hide');
      }
    }
  };

  $('sky').appendChild(b);
});

$('n7').onclick = function () {
  go(8);
};

$('n8').onclick = function () {
  go(9);
};

var P = [
  [14, 14],
  [42, 8],
  [74, 16],
  [88, 40],
  [60, 38],
  [28, 42],
  [10, 66],
  [42, 62],
  [76, 70],
  [52, 88]
];

var lastS = null;
var seen = 0;

var ic = '✦';

C.bintang.slice(0, 10).forEach(function (s, i) {
  var b = mk('button', 'sk', ic);
  var p = P[i % 10];

  b.style.left = p[0] + '%';
  b.style.top = p[1] + '%';

  b.setAttribute('aria-label', 'Bintang ' + (i + 1));

  b.onclick = function () {
    $('sm').textContent = f(s.p);

    if (!b.classList.contains('on')) {
      b.classList.add('on');
      seen++;

      $('skn').textContent =
        '(' + seen + '/' + C.bintang.length + ')';

      if (lastS != null) {
        var l = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'line'
        );

        l.setAttribute('x1', P[lastS][0]);
        l.setAttribute('y1', P[lastS][1]);
        l.setAttribute('x2', p[0]);
        l.setAttribute('y2', p[1]);

        $('sv').appendChild(l);
      }

      lastS = i;

      if (seen == C.bintang.length) {
        $('n7').classList.remove('hide');
      }
    }
  };

  $('sky').appendChild(b);
});

$('n7').onclick = function () {
  go(8);
};

$('n8').onclick = function () {
  go(9);
};

/* 9. ENDING */

for (var i = 0; i < 60; i++) {
  var s = mk('i');

  s.style.left = Math.random() * 100 + '%';
  s.style.top = Math.random() * 100 + '%';
  s.style.animationDelay = Math.random() * 2 + 's';

  $('ns').appendChild(s);
}

$('lj').textContent = f(C.judulAkhir);

C.surat.split(/\n\s*\n/).forEach(function (t) {
  $('lb2').appendChild(mk('p', '', f(t)));
});

if (C.fotoSurat.src) {
  var i2 = new Image();

  i2.src = C.fotoSurat.src;
  i2.alt = 'Foto kita';

  $('lf').appendChild(i2);
} else {
  $('lf').textContent = C.fotoSurat.e;
}

$('ft').textContent = f(C.judulPenutup);



if (C.fotoFav.src) {
  var im = new Image();

  im.src = C.fotoFav.src;
  im.alt = 'Foto favorit kita';

  $('fav').appendChild(im);
} else {
  $('fav').textContent = C.fotoFav.e;
}


function startEnd() {
  if (typed) return;

  typed = true;

  var t = f(C.penutup);
  var i = 0;

  (function w() {
    $('et').textContent = t.slice(0, i);
    i++;

    $('s9').scrollTop = 1e5;

    if (i <= t.length) {
      setTimeout(w, t[i - 2] === '\n' ? 250 : 45);
    } else {
      // Tampilkan tombol tanpa bergantung pada elemen voucher
      $('hug').classList.remove('hide');
      $('rp').classList.remove('hide');

      $('s9').scrollTop = 1e5;
    }
  })();
}


$('hug').onclick = function () {
  var e = [
    '💗', '💖', '💕', '🤗', '💞', '❤️'
  ];

  var big = mk('div', 'pop', '🤗');

  big.style.cssText =
    'left:50%;top:45%;font-size:120px;' +
    'margin:-60px 0 0 -60px';

  document.body.appendChild(big);

  setTimeout(function () {
    big.remove();
  }, 2800);

  for (var i = 0; i < 90; i++) {
    var h = mk('div', 'pop', e[i % 6]);

    h.style.left = Math.random() * 94 + 'vw';
    h.style.top = Math.random() * 92 + 'vh';
    h.style.fontSize = (22 + Math.random() * 34) + 'px';
    h.style.animationDelay = Math.random() * 1.4 + 's';

    document.body.appendChild(h);

    setTimeout(function (x) {
      x.remove();
    }, 4500, h);
  }

  $('rp').classList.remove('hide');
};

$('rp').onclick = function () {
  location.reload();
};


/* HEART ANIMATION */

function hearts(n, a) {
  a = a || ['💗', '✨', '💖', '🎀'];

  for (var i = 0; i < n; i++) {
    var h = document.createElement('div');

    h.className = 'heart';
    h.textContent = a[i % a.length];

    h.style.left = Math.random() * 100 + 'vw';
    h.style.fontSize = (16 + Math.random() * 20) + 'px';

    h.style.animationDuration =
      (2.5 + Math.random() * 2.5) + 's';

    h.style.animationDelay = Math.random() + 's';

    document.body.appendChild(h);

    setTimeout(function (x) {
      x.remove();
    }, 6500, h);
  }
}
