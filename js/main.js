
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





// هذه الوظيفة تعمل عند دخول الماوس (Hover In)
function handleHover(element) {
    // 1. تحويل الخلفية للأبيض وإضافة ظل بارز
    element.classList.add('bg-white', 'shadow');
    
    // 2. إظهار الخط الجانبي الملون (تأكد أن العنصر لديه border-right أصلاً)
    element.style.borderRightColor = '#62508b';

    // 3. تغيير شكل الدائرة (الخلفية بنفسجي والنص أبيض)
    const circle = element.querySelector('.step-num');
    if (circle) {
        circle.style.backgroundColor = '#62508b';
        circle.style.color = '#ffffff';
        circle.style.borderColor = '#62508b';
    }

    // 4. إظهار الوصف المخفي (حذف كلاس d-none)
    const desc = element.querySelector('.step-desc');
    if (desc) {
        desc.classList.remove('d-none');
    }

    // 5. تغيير لون العنوان للأزرق الداكن
    const title = element.querySelector('.step-title');
    if (title) {
        title.style.color = '#2c4a7c';
    }
}

// هذه الوظيفة تعمل عند خروج الماوس (Hover Out)
function handleLeave(element) {
    // 1. إزالة الخلفية والظل ليعود شفافاً
    element.classList.remove('bg-white', 'shadow');
    element.style.borderRightColor = 'transparent';

    // 2. إعادة الدائرة لألوانها الأصلية (الهادئة)
    const circle = element.querySelector('.step-num');
    if (circle) {
        circle.style.backgroundColor = '#f2f0f5';
        circle.style.color = '#62508b';
        circle.style.borderColor = '#dee2e6';
    }

    // 3. إخفاء الوصف مرة أخرى
    const desc = element.querySelector('.step-desc');
    if (desc) {
        desc.classList.add('d-none');
    }

    // 4. إعادة العنوان للون الأسود الطبيعي
    const title = element.querySelector('.step-title');
    if (title) {
        title.style.color = '#333';
    }
}