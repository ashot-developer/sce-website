document.addEventListener('DOMContentLoaded', function () {
  MicroModal.init();

  // Mobile menu toggle
  document.querySelector('.header-toggle--btn').addEventListener('click', function () {
    let el = this;

    while (el) {
      if (el.tagName === 'HEADER') {
        let hasClass = el.classList.contains('active');
        if (!hasClass) {
          el.classList.add('active');
        } else {
          el.classList.remove('active');
        }
        break;
      }
      el = el.parentElement;
    }
  })

  // Textarea custom resizer
  const wrapper = document.querySelector('.textarea-wrapper');
  if(wrapper) {
    const textarea = wrapper.querySelector('textarea');
    const handle = wrapper.querySelector('.resize-handle');
  
    handle.addEventListener('mousedown', function (e) {
      e.preventDefault();
      const startY = e.clientY;
      const startHeight = textarea.offsetHeight;
  
      function resize(e) {
        const newHeight = startHeight + (e.clientY - startY);
        textarea.style.height = newHeight + 'px';
      }
  
      function stopResize() {
        document.removeEventListener('mousemove', resize);
        document.removeEventListener('mouseup', stopResize);
      }
  
      document.addEventListener('mousemove', resize);
      document.addEventListener('mouseup', stopResize);
    });
  }

  // Contact form success popup
  const submitBtn = document.querySelector('.contact-form__form .sce-btn');
  if(submitBtn) {
    submitBtn.addEventListener('click', function(e){
      e.preventDefault();
      MicroModal.show('cf7-modal');
    })
  }
})