function flipMarkup(id,label,compact=false,imageSrc='',alt='',description='',meta='',backColor=''){
  const copy=description || (compact?'A short description of the place, moment, and feeling behind this photograph.':'A short description of where this was taken, what caught your attention, and why the frame matters.');
  const number=String(id).replace(/\D/g,'').slice(-2).padStart(2,'0');
  const front=imageSrc
    ? `<div class="flip-face flip-front has-photo"><img src="${imageSrc}" alt="${alt || label}" loading="lazy"><span class="photo-number">${number}</span></div>`
    : `<div class="flip-face flip-front"><span class="placeholder-mark"><span>Image placeholder</span><span>${number}</span></span></div>`;
  const style=backColor?` style="--photo-back:${backColor}"`:'';
  const footer=meta?`<span class="photo-meta">${meta}</span>`:'<span class="edit-hint">Click anywhere to return</span>';
  return `<div class="flip-inner">${front}<div class="flip-face flip-back photo-back"${style}><strong>${label}</strong><p>${copy}</p>${footer}</div></div>`;
}

function activateFlips(root=document){
  root.querySelectorAll('.flip-card,.gallery-card').forEach(card=>{
    card.addEventListener('click',()=>card.classList.toggle('flipped'));
  });
}

const featureGrid=document.querySelector('#feature-grid');
if(featureGrid){
  const selectedPhotos=[
    {file:'selected-02.jpg',shape:'portrait',title:'A moment of warmth',alt:'A smiling Buddhist nun in deep red robes and hat',description:'A quick smile softens the formality of deep red robes—an intimate moment held between ritual and everyday life.',meta:'2026 · Tibet',color:'#6c3b41'},
    {file:'selected-03.jpg',shape:'portrait',title:'Faith, framed',alt:'An ornate temple seen through a sculptural opening',description:'The opening turns architecture into an apparition, revealing color and ornament through a narrow, unexpected frame.',meta:'2026 · Beijing',color:'#414e5c'},
    {file:'selected-01.jpg',shape:'landscape',title:'At altitude',alt:'A snow-covered mountain beneath dramatic clouds',description:'Cloud and shadow move across the snow, making the mountain feel less like a backdrop than a living presence.',meta:'2026 · Tibet',color:'#46515f'},
    {file:'selected-06.jpg',shape:'portrait',title:'Keeping tradition',alt:'An artist painting a vivid Buddhist figure on an ochre wall',description:'A careful hand renews a sacred image, joining contemporary labor to a visual tradition carried across generations.',meta:'2026 · Tibet',color:'#9c7e46'},
    {file:'selected-05.jpg',shape:'landscape',title:'A quiet witness',alt:'A black bird beside a puddle reflecting the sky',description:'A crow pauses beside a small pool of reflected sky, turning an ordinary patch of pavement into a quiet double world.',meta:'2026 · Seattle',color:'#6b7278'},
    {file:'selected-07.jpg',shape:'portrait',title:'Island geometry',alt:'Sunlit modern architecture framed by tropical greenery',description:'Hard concrete lines meet bright leaves and open water, balancing the built edge of the island with its tropical light.',meta:'2026 · Hawaii',color:'#595b43'},
    {file:'selected-04.jpg',shape:'landscape',title:'Evening by the water',alt:'People beside the water under a bridge in warm evening light',description:'The last light settles over the shoreline as small figures linger beneath the repeating span of the bridge.',meta:'2026 · Seattle',color:'#817961'},
    {file:'selected-08.jpg',shape:'landscape',title:'The long view',alt:'Hikers crossing snow beneath a bright mountain range',description:'Tiny hikers move across the snowfield, giving scale to a landscape that seems to stretch far beyond them.',meta:'2026 · Washington, USA',color:'#6d879b'}
  ];
  const sequence=['selected-02.jpg','selected-06.jpg','selected-07.jpg','selected-03.jpg','selected-01.jpg','selected-05.jpg','selected-04.jpg','selected-08.jpg'];
  selectedPhotos.sort((a,b)=>sequence.indexOf(a.file)-sequence.indexOf(b.file));
  const portraitRow=document.createElement('div');
  portraitRow.className='photo-row portrait-row';
  const landscapeRow=document.createElement('div');
  landscapeRow.className='photo-row landscape-row';
  featureGrid.append(portraitRow,landscapeRow);
  selectedPhotos.forEach((photo,index)=>{
    const i=index+1;
    const card=document.createElement('article');
    card.className=`flip-card ${photo.shape} reveal`;
    card.style.transitionDelay=`${(i%4)*80}ms`;
    card.setAttribute('aria-label',`Selected photograph ${i}; click to flip`);
    card.innerHTML=flipMarkup(`selected-${i}`,photo.title,false,`./assets/selected/${photo.file}`,photo.alt,photo.description,photo.meta,photo.color);
    (photo.shape==='portrait'?portraitRow:landscapeRow).appendChild(card);
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
