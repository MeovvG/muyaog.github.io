if(new URLSearchParams(location.search).get('place')==='beijing'){
  document.body.classList.add('tibet-masonry');
  const photos=[
    ['IMG_8138-2.jpg','A temple tower framed through weathered stone'],
    ['IMG_8164(2).jpg','Golden roof ornaments against a clear blue sky'],
    ['IMG_8198.jpg','Two people beside the lake in evening light'],
    ['IMG_8153.jpg','A layered pavilion rising above tiled roofs'],
    ['IMG_8202-2.jpg','Mandarin ducks crossing rippled blue water'],
    ['IMG_8191.jpg','A moon gate opening onto lotus leaves'],
    ['IMG_8174.jpg','Painted eaves meeting across the sky'],
    ['IMG_8195.jpg','Sunlight sparkling across the lake'],
    ['IMG_8184.jpg','Decorated temple eaves beneath open sky'],
    ['IMG_8199.jpg','A silhouetted figure at the lakeside'],
    ['IMG_8117.jpg','Pink lotus flowers among broad green leaves'],
    ['IMG_8195-2.jpg','Warm reflections moving across dark water'],
    ['IMG_8201.jpg','Mandarin ducks swimming together']
  ];
  const gallery=document.querySelector('#collection-gallery');
  gallery.replaceChildren();
  photos.forEach(([file,alt])=>{
    const figure=document.createElement('figure');
    const img=document.createElement('img');
    img.src=`./assets/beijing/${file}`;
    img.alt=alt; img.loading='lazy'; img.decoding='async';
    figure.append(img); gallery.append(figure);
  });
}
