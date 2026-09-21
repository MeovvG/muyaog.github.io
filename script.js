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
    {file:'selected-02.jpg',shape:'portrait',title:'A moment of warmth',alt:'A smiling Buddhist nun in deep red robes and hat',description:'Her smile appeared for only a moment, but it changed the whole feeling of the scene. Surrounded by deep red robes and the quiet formality of ritual, that small expression felt open, warm, and completely human.',meta:'2026 · Tibet',color:'#6c3b41'},
    {file:'selected-03.jpg',shape:'portrait',title:'Faith, framed',alt:'An ornate temple seen through a sculptural opening',description:'I was drawn to the way the opening revealed only part of the temple, as if I were being invited to look more carefully. The layered colors and ornament felt almost hidden, making the view more intimate than a wide photograph could have been.',meta:'2026 · Beijing',color:'#414e5c'},
    {file:'selected-01.jpg',shape:'landscape',title:'When the mountain appeared',alt:'Mount Rainier beneath dramatic clouds near Seattle',description:'Seeing Mount Rainier rise beneath the moving clouds made everything around me feel suddenly quiet. I wanted to hold onto that sense of awe — the mountain distant and immense, yet close enough to make the whole landscape feel alive.',meta:'2026 · Mount Rainier',color:'#46515f'},
    {file:'selected-06.jpg',shape:'portrait',title:'Keeping tradition alive',alt:'An artist painting a vivid Buddhist figure on an ochre wall',description:'I watched the artist work slowly and carefully, adding new color to an image shaped by generations of tradition. What stayed with me was the patience in each gesture: a quiet act of care keeping something meaningful alive.',meta:'2026 · Tibet',color:'#9c7e46'},
    {file:'selected-05.jpg',shape:'landscape',title:'A quiet witness',alt:'A black bird beside a puddle reflecting the sky',description:'The crow stood beside the puddle as if it had stopped to look into another sky. It was an ordinary moment on an ordinary street, but the reflection made it feel strange and tender — the kind of small scene I might have missed if I had not slowed down.',meta:'2026 · Seattle',color:'#6b7278'},
    {file:'selected-07.jpg',shape:'portrait',title:'Between concrete and green',alt:'Sunlit modern architecture framed by tropical greenery',description:'I loved the tension between the clean concrete lines and the leaves growing freely around them. In the island light, the architecture did not feel separate from nature; the two seemed to soften and shape one another.',meta:'2026 · Hawaii',color:'#595b43'},
    {file:'selected-04.jpg',shape:'landscape',title:'Before the light disappeared',alt:'People beside the water under a bridge in warm evening light',description:'The day was ending, but no one seemed ready to leave. Warm light rested on the water while small figures lingered beneath the bridge, and I photographed the quiet feeling of sharing one last moment before evening slipped away.',meta:'2026 · Seattle',color:'#817961'},
    {file:'selected-08.jpg',shape:'landscape',title:'The long way across',alt:'Hikers crossing snow beneath a bright mountain range',description:'From a distance, the hikers looked almost impossibly small against the snow and mountains. Their steady movement made the landscape feel even larger, and reminded me how vulnerable — and determined — we can look inside the natural world.',meta:'2026 · Washington, USA',color:'#6d879b'}
  ];
  const sequence=['selected-01.jpg','selected-02.jpg','selected-04.jpg','selected-07.jpg','selected-05.jpg','selected-06.jpg','selected-08.jpg','selected-03.jpg'];
  selectedPhotos.sort((a,b)=>sequence.indexOf(a.file)-sequence.indexOf(b.file));
  let pair;
  selectedPhotos.forEach((photo,index)=>{
    if(index%2===0){pair=document.createElement('div');pair.className='photo-pair';featureGrid.append(pair);}
    const i=index+1;
    const card=document.createElement('article');
    card.className=`flip-card ${photo.shape} reveal`;
    card.style.transitionDelay=`${(i%4)*80}ms`;
    card.setAttribute('aria-label',`Selected photograph ${i}; click to flip`);
    card.innerHTML=flipMarkup(`selected-${i}`,photo.title,false,`./assets/selected/${photo.file}`,photo.alt,photo.description,photo.meta,photo.color);
    pair.appendChild(card);
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


if(new URLSearchParams(location.search).get('place')==='seattle'){
  requestAnimationFrame(()=>{
  document.body.classList.add('tibet-masonry');
  const seattlePhotos=[
    ['B0003433-4(1).webp','Seattle skyline and Space Needle reflected across calm blue water',2047,1544],
    ['B0003664-2.jpg','A pedestrian passing parked cars on a tree-lined Seattle street',2048,1536],
    ['B0003718(3).jpg','Mount Rainier rising beneath drifting summer clouds',1535,2048],
    ['B0002747.jpg','A crow beside a puddle reflecting the sky',2048,1365],
    ['B0003589.webp','White cherry blossoms against a clear blue Seattle sky',2048,1535],
    ['B0003703(1).jpg','Mount Rainier beneath dark dramatic clouds',2048,1535],
    ['B0002731.jpg','A brick alley and concrete overpass in Seattle',1535,2048],
    ['B0003714(1).jpg','Hikers crossing snow toward a bright mountain range',2048,1536],
    ['B0003669.jpg','A quiet house hidden behind deep green foliage',2048,1535],
    ['B0003717.jpg','An alpine waterfall among evergreen trees',1535,2048],
    ['B0003668-2.jpg','A red corner building behind a Seattle stop sign',2048,1535],
    ['B0003700.jpg','A small marmot standing on a rocky slope',2048,1536],
    ['B0003720.jpg','Late sunlight on a weathered wall and window',1536,2048],
    ['B0003670.jpg','A stop sign framed by twisting trunks and green leaves',2047,1534],
    ['B0002806.jpg','Abstract ribbons of colorful city lights at night',2048,1536],
    ['B0003698.jpg','A marmot resting among stones and alpine plants',2048,1536],
    ['B0003722.jpg','Warm evening light through trees beside the water',2048,1536],
    ['B0003604.webp','Mount Rainier beyond the tidal shoreline beneath a pale sky',1535,2048],
    ['B0003729.jpg','A resting goose on vivid green grass',2048,1535]
  ];
  const seattleGallery=document.querySelector('#collection-gallery');
  seattleGallery.replaceChildren();
  seattlePhotos.forEach(([file,alt,width,height])=>{
    const figure=document.createElement('figure');
    const img=document.createElement('img');
    img.src='./assets/seattle/'+file;
    img.width=width;
    img.height=height;
    img.alt=alt;
    img.loading='lazy';
    img.decoding='async';
    figure.append(img);
    seattleGallery.append(figure);
  });
  });
}

if(new URLSearchParams(location.search).get('place')==='hawaii'){
  requestAnimationFrame(()=>{
    document.body.classList.add('tibet-masonry');
    const hawaiiPhotos=[
      ['B0003545(2).webp','A surfer carrying a longboard across a sunny Waikiki street',2048,1536],
      ['B0003554(2).webp','Colorful market stalls beneath tropical greenery',1535,2048],
      ['B0003569(1).webp','Footprints along a sunlit shoreline',2048,1535],
      ['B0003558(2).webp','A restaurant worker preparing food in a black-and-white kitchen',1535,2048],
      ['B0003549 2(2).webp','Beachgoers beneath umbrellas beside the blue ocean',1536,2048],
      ['B0003560(1).webp','An evening crowd ordering food at a warm-lit counter',2048,1536],
      ['B0003563(2).webp','A beach pavilion framed by trees and blue water',1535,2048]
    ];
    const hawaiiGallery=document.querySelector('#collection-gallery');
    hawaiiGallery.replaceChildren();
    hawaiiPhotos.forEach(([file,alt,width,height])=>{
      const figure=document.createElement('figure');
      const img=document.createElement('img');
      img.src='./assets/hawaii/'+file;
      img.width=width;
      img.height=height;
      img.alt=alt;
      img.loading='lazy';
      img.decoding='async';
      figure.append(img);
      hawaiiGallery.append(figure);
    });
  });
}
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
