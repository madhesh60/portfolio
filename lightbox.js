/* Image preview using the native <dialog> element.
   Without JavaScript, thumbnails are plain links that open the image. */
(function () {
  var dlg = document.getElementById('lightbox');
  if (!dlg || typeof dlg.showModal !== 'function') return;

  var img = dlg.querySelector('img');
  var caption = dlg.querySelector('figcaption');

  document.querySelectorAll('a.thumb').forEach(function (link) {
    link.addEventListener('click', function (event) {
      if (event.metaKey || event.ctrlKey || event.shiftKey) return; // keep open-in-new-tab working
      event.preventDefault();
      var thumb = link.querySelector('img');
      img.src = link.href;
      img.alt = thumb ? thumb.alt : '';
      caption.textContent = link.dataset.title || img.alt;
      dlg.showModal();
    });
  });

  dlg.addEventListener('click', function (event) {
    if (event.target === dlg || event.target.closest('.close')) dlg.close();
  });

  dlg.addEventListener('close', function () {
    img.removeAttribute('src');
  });
})();
