function flipMarkup(id,label,compact=false){
  const copy=compact?'A short description of the place, moment, and feeling behind this photograph.':'A short description of where this was taken, what caught your attention, and why the frame matters.';
  return `<div class="flip-inner"><div class="flip-face flip-front"><span class="placeholder-mark"><span>Image placeholder</span><span>${String(id).replace(/\D/g,'').slice(-2).padStart(2,'0')}</span></span></div><div class="flip-face flip-back"><strong>${label}</strong><p>${copy}</p><span class="edit-hint">Click anywhere to return</span></div></div>`;
}

function activateFlips(root=document){
  root.querySelectorAll('.flip-card,.gallery-card').forEach(card=>{
    card.addEventListener('click',()=>card.classList.toggle('flipped'));
  });
}

const featureGrid=document.querySelector('#feature-grid');
if(featureGrid){
  for(let i=1;i<=8;i++){
    const card=document.createElement('article');
    card.className='flip-card reveal';
    card.style.transitionDelay=`${(i%4)*80}ms`;
    card.setAttribute('aria-label',`Selected photograph ${i}; click to flip`);
    card.innerHTML=flipMarkup(`selected-${i}`,`Frame ${String(i).padStart(2,'0')}`);
    featureGrid.appendChild(card);
  }
  activateFlips(featureGrid);
}

document.querySelectorAll('.category-row').forEach((row,index)=>{
  row.classList.add('reveal');
  row.style.transitionDelay=`${index*70}ms`;
  row.addEventListener('click',()=>{
    const open=row.dataset.category==='travel';
    document.querySelectorAll('.category-row').forEach(item=>{item.classList.toggle('active',item===row);item.querySelector('b').textContent=item===row?'−':'+'});
    document.querySelector('#travel-panel').hidden=!open;
  });
});

document.querySelectorAll('.hex,.section-heading,.collection-back').forEach((el,index)=>{el.classList.add('reveal');el.style.transitionDelay=`${(index%4)*90}ms`});

const places={hawaii:['Hawaii','Light, water, and island rhythm.'],tibet:['Tibet','Ritual, color, and life at altitude.'],beijing:['Beijing','Old geometry in a changing city.'],seattle:['Seattle','Rain, distance, and Northwest quiet.']};
const gallery=document.querySelector('#collection-gallery');
if(gallery){
  const slug=new URLSearchParams(location.search).get('place')||'tibet';
  const [name,description]=places[slug]||places.tibet;
  document.title=`${name} — Aria Guo`;
  document.querySelector('#place-title').textContent=name;
  document.querySelector('#place-description').textContent=description;
  for(let i=1;i<=6;i++){
    const card=document.createElement('article');
    card.className='gallery-card reveal';
    card.style.transitionDelay=`${(i%3)*90}ms`;
    card.innerHTML=flipMarkup(`${slug}-photo-${i}`,`${name} · ${String(i).padStart(2,'0')}`,true);
    gallery.appendChild(card);
  }
  activateFlips(gallery);
}

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
  entry.target.classList.toggle('in-view',entry.isIntersecting);
}),{threshold:.12,rootMargin:'0px 0px -5% 0px'});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
requestAnimationFrame(()=>document.body.classList.add('ready'));
document.querySelectorAll('#year').forEach(el=>el.textContent=new Date().getFullYear());
