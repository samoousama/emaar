// -------------------------
// 5. Brighten active/hovered image
function updateActiveCenter() {
  const trackRect = track.getBoundingClientRect();
  const trackCenter = trackRect.left + trackRect.width / 2;

  let closestIndex = 0;
  let closestDistance = Infinity;

  items.forEach((item, index) => {
    const itemRect = item.getBoundingClientRect();
    const itemCenter = itemRect.left + itemRect.width / 2;
    const distance = Math.abs(trackCenter - itemCenter);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  });

  items.forEach(item => {
    item.querySelector('img').style.filter = 'brightness(0.5)'; // dim all
    item.querySelector('img').style.transform = 'scale(0.95)';
  });

  // Brighten active center image
  const activeImg = items[closestIndex].querySelector('img');
  activeImg.style.filter = 'brightness(1)';
  activeImg.style.transform = 'scale(1.05)';
}



jQuery(document).ready(function($) {
  var header = $('header');
  var scrollPoint = 100;

  $(window).on('scroll', function () {
    if ($(this).scrollTop() > scrollPoint) {
      header.addClass('header-scrolled');
    } else {
      header.removeClass('header-scrolled');
    }
  });
});


const mainTrack = document.querySelector('.mobile-main-track')
const mains = document.querySelectorAll('.mobile-main')
const thumbsTrack = document.querySelector('.mobile-thumbs')
let thumbs = Array.from(document.querySelectorAll('.mobile-thumbs img'))
const prev = document.querySelector('.prev')
const next = document.querySelector('.next')

let index = 0
const gap = 10

/* ===== CLONE THUMBS (for infinite feel) ===== */
const cloneBefore = thumbs.map(t => t.cloneNode(true))
const cloneAfter  = thumbs.map(t => t.cloneNode(true))

cloneBefore.forEach(c => thumbsTrack.prepend(c))
cloneAfter.forEach(c => thumbsTrack.append(c))

thumbs = Array.from(document.querySelectorAll('.mobile-thumbs img'))

const realCount = mains.length
const startIndex = realCount
index = startIndex

/* ===== SET INITIAL POSITION ===== */
function getThumbWidth() {
  return thumbs[0].offsetWidth + gap
}

function setThumbPosition(noAnim = false) {
  const offset = getThumbWidth() * (index - 1)
  thumbsTrack.style.transition = noAnim ? 'none' : 'transform .4s ease'
  thumbsTrack.style.transform = `translateX(-${offset}px)`
}

/* ===== UPDATE ===== */
function updateGallery(i) {
  index = i

  // main slide (real images only)
  const realIndex = (index - startIndex + realCount) % realCount
  mainTrack.style.transform = `translateX(-${realIndex * 100}%)`

  // active thumb
  thumbs.forEach(t => t.classList.remove('active'))
  thumbs[index].classList.add('active')

  setThumbPosition()
}

/* ===== LOOP FIX (no ends) ===== */
thumbsTrack.addEventListener('transitionend', () => {
  if (index <= realCount - 1) {
    index += realCount
    setThumbPosition(true)
  }

  if (index >= realCount * 2) {
    index -= realCount
    setThumbPosition(true)
  }
})

/* ===== EVENTS ===== */
thumbs.forEach((thumb, i) => {
  thumb.addEventListener('click', () => updateGallery(i))
})

prev.addEventListener('click', () => updateGallery(index - 1))
next.addEventListener('click', () => updateGallery(index + 1))

/* ===== INIT ===== */
setThumbPosition(true)
updateGallery(startIndex)


window.addEventListener('load', function() {
  const firstBox = document.querySelector('.hero-payment-plan .hero-plan-block:nth-child(1)');
  firstBox.classList.add('active');
});