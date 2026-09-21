document.addEventListener('DOMContentLoaded',()=>{
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const nav=$('[data-nav]'), menu=$('[data-nav-toggle]');
  menu?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'Close':'Menu';});
  $$('a',nav).forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
  const theme=$('[data-theme-toggle]'), key='lhhosting-theme';
  if(localStorage.getItem(key)==='light')document.body.classList.add('theme-light');
  theme?.addEventListener('click',()=>{document.body.classList.toggle('theme-light');localStorage.setItem(key,document.body.classList.contains('theme-light')?'light':'dark');});
  const toast=$('[data-toast]');let tt;const notify=m=>{if(!toast)return;toast.textContent=m;toast.classList.add('show');clearTimeout(tt);tt=setTimeout(()=>toast.classList.remove('show'),2300)};

  const search=$('.catalog-search'), filter=$('.catalog-filter'), cards=$$('.catalog-grid .searchable-card'), empty=$('.catalog-empty');
  function apply(){if(!cards.length)return;const q=(search?.value||'').trim().toLowerCase(),c=filter?.value||'all';let n=0;cards.forEach(card=>{const show=(!q||(card.dataset.search||'').includes(q))&&(c==='all'||card.dataset.category===c);card.hidden=!show;if(show)n++;});if(empty)empty.hidden=n!==0;}
  search?.addEventListener('input',apply);filter?.addEventListener('change',apply);

  const compareKey='lhhosting-compare';let compare=[];try{compare=JSON.parse(localStorage.getItem(compareKey)||'[]')}catch{}
  const compareList=$('[data-compare-list]'),compareCount=$('[data-compare-count]');
  function renderCompare(){if(compareList)compareList.innerHTML=compare.map(x=>`<li>${x}</li>`).join('');if(compareCount)compareCount.textContent=`${compare.length} selected`;localStorage.setItem(compareKey,JSON.stringify(compare));}
  $$('[data-demo-add]').forEach(btn=>btn.addEventListener('click',()=>{const n=btn.dataset.demoAdd;if(!compare.includes(n)){compare.push(n);renderCompare();notify(n+' added to compare');}else notify(n+' is already selected');}));
  $('[data-clear-compare]')?.addEventListener('click',()=>{compare=[];renderCompare();});renderCompare();

  $('[data-domain-form]')?.addEventListener('submit',e=>{e.preventDefault();const input=e.currentTarget.querySelector('input[name=domain]');const out=$('[data-domain-result]');const d=(input.value||'').trim().toLowerCase();if(out)out.textContent=d?`${d} — demo checker only. Connect a registrar API to verify real availability.`:'Enter a domain name.';});

  $$('[data-demo-form]').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();const status=form.querySelector('.form-status');if(status)status.textContent='Demo only — no request was transmitted. Connect a real support/CRM endpoint before launch.';notify('Demo request prepared — nothing was sent.');}));

  const sections=$$('main > section');sections.forEach(s=>s.classList.add('reveal'));
  if('IntersectionObserver' in window){const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.06});sections.forEach(s=>io.observe(s));}else sections.forEach(s=>s.classList.add('visible'));
});
