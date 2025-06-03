document.addEventListener('DOMContentLoaded', function () {
  MicroModal.init({
    onClose: modal => {
      // Move focus to body or another element to avoid accessibility warning
      document.activeElement.blur(); // or document.body.focus()
    },
    disableFocus: true
  });

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
  if (wrapper) {
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
  if (submitBtn) {
    submitBtn.addEventListener('click', function (e) {
      e.preventDefault();
      MicroModal.show('cf7-modal');
    })
  }

  // Team item popup
  const teamItems = [...document.querySelectorAll('.team__list-item')];
  if (teamItems.length) {
    teamItems.forEach(item => item.addEventListener('click', function (e) {
      e.preventDefault();
      MicroModal.show('team-item');
    }))
  }

  // Initialize Lenis for smooth scrolling
  const lenis = new Lenis({
    duration: 2,
    easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Parallax effect on sections
  document.querySelectorAll(".home section").forEach((section) => {
    gsap.to(section, {
      y: -10, // customize amount of parallax here
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  // Optional: fade + slide in content inside each section
  gsap.utils.toArray(".anim-up, .what-we-do--content, .about-us--head, .press-content, .sce-heading--main, .serv-block__content--list-item").forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
  });

  gsap.registerPlugin(ScrollTrigger);

  // Animate each number block on scroll (parallax-like)
  gsap.utils.toArray(".about-us--content_numbers").forEach((el, i) => {
    gsap.to(el, {
      y: -200, // adjust how far each item moves
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",    // when the element enters the viewport
        end: "bottom top",      // until it leaves the viewport
        scrub: true,            // connects to scroll progress
      }
    });
  });

  // Animate each number block on scroll (parallax-like)
  gsap.utils.toArray(".about-us--content_map").forEach((el, i) => {
    gsap.to(el, {
      y: -200, // adjust how far each item moves
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",    // when the element enters the viewport
        end: "bottom top",      // until it leaves the viewport
        scrub: true,            // connects to scroll progress
      }
    });
  });

  // Animate each number block on scroll (parallax-like)
  gsap.utils.toArray(".what-we-do--list").forEach((el, i) => {
    gsap.to(el, {
      y: -30, // adjust how far each item moves
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",    // when the element enters the viewport
        end: "bottom top",      // until it leaves the viewport
        scrub: true,            // connects to scroll progress
      }
    });
  });

  // GSAP animation on scroll
  gsap.fromTo(".what-we-do_pattern",
    { x: 100, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".what-we-do_pattern",
        start: "top 80%",
        end: "top 20%",
        toggleActions: "play reverse play reverse",
        // toggleActions: "onEnter onLeave onEnterBack onLeaveBack"
      }
    }
  );
if(document.querySelector('.header.home-header')) {
  document.querySelector('.header.home-header .header-logo img').classList.add('animate');
  document.querySelector('.header.home-header .header-menu').classList.add('animate');
  document.querySelector('.sce-heading--main__desc ').classList.add('animate');
}


  const connections = [
    ['dot1', 'dot2'],
    ['dot2', 'dot3'],
    ['dot3', 'dot4'],
    ['dot4', 'dot5'],
    ['dot5', 'dot6'],
    ['dot6', 'dot7'],
    ['dot7', 'dot8'],
    ['dot8', 'dot9'],
    ['dot9', 'dot10'],
    ['dot10', 'dot11'],
    ['dot12', 'dot14'],
  ];


  function updateLineLayerSize() {
    const svg = document.getElementById('line-layer');
    svg.setAttribute('width', document.documentElement.scrollWidth);
    svg.setAttribute('height', document.documentElement.scrollHeight);
  }

  function drawSelectedLines() {
    const svg = document.getElementById('line-layer');
    svg.innerHTML = ''; // Clear previous lines

    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

    connections.forEach(([idA, idB]) => {
      const dotA = document.getElementById(idA);
      const dotB = document.getElementById(idB);

      if (!dotA || !dotB) return;

      const rectA = dotA.getBoundingClientRect();
      const rectB = dotB.getBoundingClientRect();

      const x1 = rectA.left + rectA.width / 2 + scrollLeft;
      const y1 = rectA.top + rectA.height / 2 + scrollTop;
      const x2 = rectB.left + rectB.width / 2 + scrollLeft;
      const y2 = rectB.top + rectB.height / 2 + scrollTop;

      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', x1);
      line.setAttribute('y1', y1);
      line.setAttribute('x2', x2);
      line.setAttribute('y2', y2);
      line.setAttribute('stroke', '#5edc3b');
      line.setAttribute('stroke-width', '1');
      svg.appendChild(line);
      svg.classList.add('animate');
    });
  }

  function updateLines() {
    updateLineLayerSize();
    drawSelectedLines();
  }
  updateLines();
  window.addEventListener('load', updateLines);
  window.addEventListener('resize', updateLines);
  window.addEventListener('scroll', updateLines);



  const header = document.getElementById('main-header');
  const firstSection = document.querySelector('.hero');
  const sectionBottom = firstSection.offsetTop + firstSection.offsetHeight;

  function hideHeader() {
    const scrollY = window.scrollY + 200;
    const sectionTop = firstSection.offsetTop;
    const sectionHeight = firstSection.offsetHeight;
    const sectionBottom = sectionTop + sectionHeight;

    if (scrollY >= sectionBottom) {
      header.classList.add('hidden'); // Hide if below the first section
    } else {
      header.classList.remove('hidden'); // Show if inside or above the section
    }
  }
  window.addEventListener('load', hideHeader);
  window.addEventListener('scroll', hideHeader);

})