document.addEventListener('DOMContentLoaded', function(){
  document.querySelector('.header-toggle--btn').addEventListener('click', function(){
    let el = this;
  
    while (el) {
      if (el.tagName === 'HEADER') {
        let hasClass = el.classList.contains('active');
        if(!hasClass) {
          el.classList.add('active');
        } else {
          el.classList.remove('active');
        }
        break;
      }
      el = el.parentElement;
    }
  })
})