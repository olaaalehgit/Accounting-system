
(function () {

  function animate(el) {
    const text = el.textContent.trim();
    const number = parseInt(text.replace(/\D/g, ''), 10);
    const suffix = text.replace(/[0-9]/g, '');
    const duration = 1600;
    const startTime = performance.now();

    el.textContent = '0' + suffix;

    function update(time) {
      const progress = Math.min((time - startTime) / duration, 1);
      const value = Math.floor(progress * number);
      el.textContent = value + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = number + suffix;
      }
    }

    requestAnimationFrame(update);
  }

  const counters = document.querySelectorAll('.stat-number');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        entry.target.classList.add('counted');
        animate(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });

  counters.forEach(el => observer.observe(el));

})();


  const counters = document.querySelectorAll('.count-up');

  counters.forEach(counter => {
    const target = +counter.getAttribute('data-count');
    const suffix = counter.getAttribute('data-suffix') || '';
    let count = 0;

    const speed = 40; // كل ما كبر الرقم كان أبطأ

    const updateCount = () => {
      const increment = Math.ceil(target / speed);

      if (count < target) {
        count += increment;
        counter.textContent = count + suffix;
        setTimeout(updateCount, 40);
      } else {
        counter.textContent = target + suffix;
      }
    };

    updateCount();
  });
