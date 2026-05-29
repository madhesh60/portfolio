/**
 * Lightbox Overlay Component
 * Dynamically builds and manages the image popup lightbox.
 */

document.addEventListener('DOMContentLoaded', function() {
  // Create overlay markup dynamically to keep index.html clean
  var overlay = document.createElement('div');
  overlay.id = 'img-overlay';
  overlay.style.display = 'none';
  overlay.onclick = closeLightbox;

  var img = document.createElement('img');
  img.id = 'img-overlay-img';
  img.src = '';
  img.alt = '';

  var closeBtn = document.createElement('span');
  closeBtn.className = 'close-btn';
  closeBtn.innerHTML = '&times;';
  closeBtn.onclick = function(e) {
    e.stopPropagation();
    closeLightbox();
  };

  overlay.appendChild(img);
  overlay.appendChild(closeBtn);
  document.body.appendChild(overlay);

  // Bind click events to all portfolio images
  document.querySelectorAll('.project-row img').forEach(function(imgEl) {
    imgEl.addEventListener('click', function() {
      openLightbox(this.src, this.alt);
    });
  });
});

function openLightbox(src, alt) {
  var overlay = document.getElementById('img-overlay');
  var img = document.getElementById('img-overlay-img');
  if (!overlay || !img) return;

  img.src = src;
  img.alt = alt || '';

  overlay.style.display = 'flex';
  // Force a reflow to trigger opacity and scaling transitions
  overlay.offsetHeight;
  overlay.classList.add('active');

  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  var overlay = document.getElementById('img-overlay');
  if (!overlay) return;

  overlay.classList.remove('active');

  // Hide display after transitions finish (200ms)
  setTimeout(function() {
    if (!overlay.classList.contains('active')) {
      overlay.style.display = 'none';
    }
  }, 200);

  document.body.style.overflow = '';
}

// Close lightbox on Escape keypress
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeLightbox();
  }
});
