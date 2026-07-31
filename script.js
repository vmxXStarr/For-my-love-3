/* ---------------- ambient floating hearts ---------------- */
(function ambientHearts(){
  const wrap = document.getElementById('ambient');
  const symbols = ['♥','✿','♥','❀'];
  for(let i=0;i<14;i++){
    const s = document.createElement('span');
    s.textContent = symbols[Math.floor(Math.random()*symbols.length)];
    s.style.left = Math.random()*100 + '%';
    s.style.animationDuration = (10 + Math.random()*10) + 's';
    s.style.animationDelay = (Math.random()*10) + 's';
    s.style.fontSize = (1 + Math.random()*1.2) + 'rem';
    wrap.appendChild(s);
  }
})();

/* ---------------- loader ---------------- */
window.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  const main = document.getElementById('main-content');

  setTimeout(() => {
    loader.classList.add('fade-out');
    setTimeout(() => {
      loader.classList.add('hidden');
      main.classList.add('show');
    }, 1000);
  }, 5000);
});

/* ---------------- No button game ---------------- */
const playArea = document.getElementById('playArea');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const teaseText = document.getElementById('teaseText');

let noClicks = 0;
let originalNoRect = null; // {left, top} relative to playArea

const teaseMessages = [
  "You clicked this by mistake, right? 🧐",
  "It's okayy, mistakes happen  >_< try again~~",
  "Dont give up just like how i'm never gonna give up on you"
];

function rectRelativeTo(el, container){
  const a = el.getBoundingClientRect();
  const b = container.getBoundingClientRect();
  return { left: a.left - b.left, top: a.top - b.top, width: a.width, height: a.height };
}

function overlaps(r1, r2, pad = 12){
  return !(
    r1.left + r1.width + pad < r2.left ||
    r2.left + r2.width + pad < r1.left ||
    r1.top + r1.height + pad < r2.top ||
    r2.top + r2.height + pad < r1.top
  );
}

function placeAbsolute(el, rect){
  el.style.position = 'absolute';
  el.style.left = rect.left + 'px';
  el.style.top = rect.top + 'px';
}

function positionTeaseAbove(rect){
  teaseText.style.left = (rect.left + rect.width / 2) + 'px';
  teaseText.style.top = (rect.top - 34) + 'px';
}

noBtn.addEventListener('click', () => {
  noClicks++;

  const areaRect = playArea.getBoundingClientRect();
  const noRect = rectRelativeTo(noBtn, playArea);
  const yesRect = rectRelativeTo(yesBtn, playArea);

  if (!originalNoRect) originalNoRect = { ...noRect };
  if (noBtn.style.position !== 'absolute') placeAbsolute(noBtn, noRect);

  if (noClicks <= 3) {
    let newLeft, newTop, tries = 0, candidate;
    const maxLeft = areaRect.width - noRect.width;
    const maxTop = areaRect.height - noRect.height;

    do {
      const angle = Math.random() * Math.PI * 2;
      const distance = 20 + Math.random() * 14;
      newLeft = noRect.left + Math.cos(angle) * distance;
      newTop = noRect.top + Math.sin(angle) * distance;
      newLeft = Math.max(0, Math.min(maxLeft, newLeft));
      newTop = Math.max(0, Math.min(maxTop, newTop));
      candidate = { left: newLeft, top: newTop, width: noRect.width, height: noRect.height };
      tries++;
    } while (overlaps(candidate, yesRect) && tries < 40);

    noBtn.style.left = newLeft + 'px';
    noBtn.style.top = newTop + 'px';

    teaseText.textContent = teaseMessages[noClicks - 1];
    positionTeaseAbove(candidate);
  } else if (noClicks === 4) {
    // replace No with "Absolutely Yes", back at its ORIGINAL spot
    noBtn.classList.add('hidden');

    const absBtn = document.createElement('button');
    absBtn.id = 'absolutelyYesBtn';
    absBtn.className = 'btn btn-absolutely';
    absBtn.textContent = 'Absolutely Yes';
    placeAbsolute(absBtn, originalNoRect);
    playArea.appendChild(absBtn);
    absBtn.addEventListener('click', openGifts);

    teaseText.textContent = "Okay now im getting sad 😞💔";
    positionTeaseAbove(originalNoRect);
  }
});

yesBtn.addEventListener('click', openGifts);

/* ---------------- gifts overlay ---------------- */
const giftsOverlay = document.getElementById('giftsOverlay');
const appGrid = document.getElementById('appGrid');
const letterApp = document.getElementById('letterApp');
const musicApp = document.getElementById('musicApp');
const picsApp = document.getElementById('picsApp');

function openGifts(){
  giftsOverlay.classList.remove('hidden');
  requestAnimationFrame(() => giftsOverlay.classList.add('show'));
  showAppGrid();
}

function showAppGrid(){
  appGrid.classList.remove('hidden');
  letterApp.classList.add('hidden');
  musicApp.classList.add('hidden');
  picsApp.classList.add('hidden');
}

document.querySelectorAll('.app-icon').forEach(icon => {
  icon.addEventListener('click', () => {
    const app = icon.dataset.app;
    appGrid.classList.add('hidden');
    if (app === 'letter') { letterApp.classList.remove('hidden'); startTyping(); }
    else if (app === 'music') { musicApp.classList.remove('hidden'); }
    else if (app === 'pics') { picsApp.classList.remove('hidden'); }
    else if (app === 'surprise') { window.location.href = 'page.html'; }
  });
});

document.querySelectorAll('.back-btn').forEach(btn => {
  btn.addEventListener('click', showAppGrid);
});

/* ---------------- letter typing effect ---------------- */
const letterContent = document.getElementById('letterContent');
const letterText = `HAPPY GIRLFRIEND'S DAY BABYYYYY!!!
Ik  we  couldn't  be  today,  but  I  still  wanna  show  my  love  to  you!!!  I  js  wanna  say  that  ILYSMMMM  and  I  appreciate  and  cherish  every  lovely  moment  we  spent  together,  from  the  beginning  of  how  we  met  till  now,  the  countless  times  I've  sneaked  in  kisses,  all  of  them!!!!

I  love  every  moment  when  I'm  with  you,  no  matter  what  we're  doing.  I  love  your  smile,  I  love  your  face,  I  love  your  shy  but  cuteness  and  that  sass!!  I  LOVEEEEE  YOUUUUU  js  cuz  of  your  literal  existence!!!  I  still  can't  believe  how  I  have  such  a  beautiful  and  sweet  girl  as  mine,  but  I  could  NEVERRRRRRR  complain.  I  would  genuinely  worship  the  very  ground  you  walk  on.  You're  my  goddess  and  my  everything!!!

I  LOVEEEEE  YOUUUUU  SOOOOO  MUCHHHH  🤧💗🛐✨️😭🫶🏻  ILYSMMMM.  I'd  kiss  every  part  of  your  body  till  you  feel  loved  enough,  treat  you  the  best  I  can,  and  I'm  sorryyyyy  I  can't  treat  you  even  better,  cuz  you  deserve  everything  🥹💖🫶🏻

So  once  again,  thank  you  for  promising  to  be  with  me  and  love  me  so  much  even  though  I'm  so  clingy  and  dumb,  and  idk  what  I'd  ever  do  without  you.  Thank  you  for  being  the  sunshine  in  my  life,  the  dawn  to  my  night,  the  comfort  of  my  heart,  mind,  and  soul  🛐😭💗💗💗.  And  a  very  Happy  Girlfriend's  Day  to  you,  babeeeeee!!!!  I  LOVE  YOUUUUUUU

Cuddles  and  Kisses,

Your  Cutu
`;

let typingTimer = null;

function startTyping(){
  clearTimeout(typingTimer);
  letterContent.textContent = '';
  let i = 0;
  function tick(){
    if (i <= letterText.length){
      letterContent.textContent = letterText.slice(0, i);
      i++;
      typingTimer = setTimeout(tick, 14);
    }
  }
  tick();
}

/* ---------------- music vinyl spin ---------------- */
const songAudio = document.getElementById('songAudio');
const vinyl = document.getElementById('vinyl');
if (songAudio){
  songAudio.addEventListener('play', () => vinyl.classList.add('playing'));
  songAudio.addEventListener('pause', () => vinyl.classList.remove('playing'));
  songAudio.addEventListener('ended', () => vinyl.classList.remove('playing'));
}

/* ---------------- pictures collage + modal ---------------- */
const imgModal = document.getElementById('imgModal');
const modalImg = document.getElementById('modalImg');

document.querySelectorAll('.collage img').forEach(img => {
  img.addEventListener('click', () => {
    modalImg.src = img.src;
    imgModal.classList.remove('hidden');
  });
});

document.getElementById('modalBackBtn').addEventListener('click', () => {
  imgModal.classList.add('hidden');
});
