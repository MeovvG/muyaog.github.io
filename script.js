function flipMarkup(id,label,compact=false,imageSrc='',alt=''){
  const copy=compact?'A short description of the place, moment, and feeling behind this photograph.':'A short description of where this was taken, what caught your attention, and why the frame matters.';
  const number=String(id).replace(/\D/g,'').slice(-2).padStart(2,'0');
  const front=imageSrc
    ? `<div class="flip-face flip-front has-photo"><img src="${imageSrc}" alt="${alt || label}" loading="lazy"><span class="photo-number">${number}</span></div>`
    : `<div class="flip-face flip-front"><span class="placeholder-mark"><span>Image placeholder</span><span>${number}</span></span></div>`;
  return `<div class="flip-inner">${front}<div class="flip-face flip-back"><strong>${label}</strong><p>${copy}</p><span class="edit-hint">Click anywhere to return</span></div></div>`;
}

function activateFlips(root=document){
  root.querySelectorAll('.flip-card,.gallery-card').forEach(card=>{
    card.addEventListener('click',()=>card.classList.toggle('flipped'));
  });
}

const featureGrid=document.querySelector('#feature-grid');
if(featureGrid){
  const selectedPhotos=[
    {file:'selected-02.jpg',shape:'portrait',title:'A moment of warmth',alt:'A smiling Buddhist nun in deep red robes and hat'},
    {file:'selected-03.jpg',shape:'portrait',title:'Faith, framed',alt:'An ornate Tibetan temple seen through a sculptural opening'},
    {file:'selected-01.jpg',shape:'landscape',title:'At altitude',alt:'A snow-covered mountain beneath dramatic clouds'},
    {file:'selected-06.jpg',shape:'portrait',title:'Keeping tradition',alt:'An artist painting a vivid Buddhist figure on an ochre wall'},
    {file:'selected-05.jpg',shape:'landscape',title:'A quiet witness',alt:'A black bird beside a puddle reflecting the sky'},
    {file:'selected-07.jpg',shape:'portrait',title:'Island geometry',alt:'Sunlit modern architecture framed by tropical greenery'},
    {file:'selected-04.jpg',shape:'landscape',title:'Evening by the water',alt:'People beside the water under a bridge in warm evening light'},
    {file:'selected-08.jpg',shape:'landscape',title:'The long view',alt:'Hikers crossing snow beneath a bright mountain range'}
  ];
  selectedPhotos.forEach((photo,index)=>{
    const i=index+1;
    const card=document.createElement('article');
    card.className=`flip-card ${photo.shape} reveal`;
    card.style.transitionDelay=`${(i%4)*80}ms`;
    card.setAttribute('aria-label',`Selected photograph ${i}; click to flip`);
    card.innerHTML=flipMarkup(`selected-${i}`,photo.title,false,`./assets/selected/${photo.file}`,photo.alt);
    featureGrid.appendChild(card);
  });
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


// Scroll-linked hero reveal: lift the title away to uncover the photograph.
const hero=document.querySelector('.intro');
if(hero){
  let heroTicking=false;
  const updateHeroReveal=()=>{
    const distance=Math.max(window.innerHeight*.42,1);
    const progress=Math.min(Math.max(window.scrollY/distance,0),1);
    const eased=1-Math.pow(1-progress,3);
    hero.style.setProperty('--title-shift-first',`${-eased*118}px`);
    hero.style.setProperty('--title-shift-second',`${-eased*154}px`);
    hero.style.setProperty('--title-opacity',String(Math.max(0,1-progress*1.32)));
    hero.style.setProperty('--title-effect-opacity',String(Math.max(0,.72-progress*1.7)));
    hero.style.setProperty('--hero-meta-opacity',String(Math.max(0,1-progress*1.8)));
    hero.style.setProperty('--scroll-cue-opacity',String(Math.max(0,.78-progress*2.4)));
    heroTicking=false;
  };
  const requestHeroReveal=()=>{
    if(!heroTicking){heroTicking=true;requestAnimationFrame(updateHeroReveal)}
  };
  updateHeroReveal();
  addEventListener('scroll',requestHeroReveal,{passive:true});
  addEventListener('resize',requestHeroReveal,{passive:true});
}
