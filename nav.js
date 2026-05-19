(function() {
  const stepKey = window.STEP_KEY || 'guide-cur';
  const titles = window.STEP_TITLES || [];
  const steps = document.querySelectorAll('.step');
  const total = steps.length;
  document.getElementById('total').textContent = total;
  const jump = document.getElementById('jump');
  titles.forEach((t, i) => {
    const o = document.createElement('option');
    o.value = i;
    o.textContent = t;
    jump.appendChild(o);
  });
  let cur = parseInt(localStorage.getItem(stepKey) || '0', 10);
  if (cur >= total) cur = 0;

  function show(i) {
    steps.forEach((s, idx) => s.classList.toggle('active', idx === i));
    document.getElementById('cur').textContent = i + 1;
    document.getElementById('back').disabled = i === 0;
    document.getElementById('next').disabled = i === total - 1;
    jump.value = i;
    localStorage.setItem(stepKey, i);
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  document.getElementById('back').addEventListener('click', () => { if (cur > 0) { cur--; show(cur); } });
  document.getElementById('next').addEventListener('click', () => { if (cur < total - 1) { cur++; show(cur); } });
  jump.addEventListener('change', e => { cur = parseInt(e.target.value, 10); show(cur); });

  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-target');
      const text = document.getElementById(id).textContent;
      try {
        await navigator.clipboard.writeText(text);
      } catch (e) {
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
      }
      const orig = btn.textContent;
      btn.textContent = 'Copied!';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.textContent = orig;
        btn.classList.remove('copied');
      }, 1200);
    });
  });

  show(cur);
})();
