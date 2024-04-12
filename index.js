const navLinks = document.querySelectorAll('nav a');

navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    // Prevent default anchor tag behavior (jumping to top of page)
    e.preventDefault();

    const targetSection = document.getElementById(this.getAttribute('href').slice(1));

    // Smooth scrolling animation (replace with your preferred animation library if needed)
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const targetTop = targetSection.offsetTop;
    const distance = targetTop - scrollTop;
    const duration = 500; // Adjust duration for scrolling speed (milliseconds)

    let start = null;

    const easeInOutQuad = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    };

    const animate = () => {
      const now = window.performance.now();
      if (start === null) start = now;
      const time = now - start;
      let newTop = easeInOutQuad(time, scrollTop, distance, duration);

      if (time < duration) {
        window.scrollTo(0, newTop);
        requestAnimationFrame(animate);
      } else {
        window.scrollTo(0, targetTop);
      }
    };

    animate();
  });
});
