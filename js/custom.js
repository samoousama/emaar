const gallery = document.querySelector('.lux-gallery');
const track = gallery.querySelector('.lux-gallery-track');
const items = gallery.querySelectorAll('.lux-item');
let scrollAmount = 0;
const speed = 0.5; // adjust auto-scroll speed
let isPaused = false;

// -------------------------
// 1. Duplicate items for seamless loop
track.innerHTML += track.innerHTML;

// -------------------------
// 2. Auto-scroll function
function autoScroll() {
  if (!isPaused) {
    scrollAmount += speed;
    if (scrollAmount >= track.scrollWidth / 2) scrollAmount = 0;
    track.style.transform = `translateX(-${scrollAmount}px)`;
    updateActiveCenter(); // update active image brightness
  }
  requestAnimationFrame(autoScroll);
}
autoScroll();

// -------------------------
// 3. Pause auto-scroll on hover
gallery.addEventListener('mouseenter', () => { isPaused = true; });
gallery.addEventListener('mouseleave', () => { isPaused = false; });

// -------------------------
// 4. Custom cursor inside gallery
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
gallery.appendChild(cursor);

// Move cursor with mouse inside gallery
gallery.addEventListener('mousemove', (e) => {
  const rect = gallery.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  cursor.style.left = `${x}px`;
  cursor.style.top = `${y}px`;
});

// Cursor hover interaction on images
const images = gallery.querySelectorAll('.lux-item img');
images.forEach(img => {
  img.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1.2)';
    cursor.style.background = 'rgba(31,110,105,0.1)';
  });
  img.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    cursor.style.background = 'transparent';
  });
});

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