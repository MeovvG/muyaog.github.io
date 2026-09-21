if(new URLSearchParams(location.search).get('place')==='tibet'){
  document.body.classList.add('tibet-masonry');
  const photos=[
    ['IMG_8454','A smiling woman in burgundy robes'],
    ['IMG_8261','Golden roof ornaments against a blue sky'],
    ['IMG_8270','Purple flowers against green foliage'],
    ['IMG_8423','The Potala Palace above pale stone'],
    ['IMG_1258','People walking along a sunlit street'],
    ['IMG_8250','Yellow temple walls and a flower garden'],
    ['IMG_8452','A woman carrying a child'],
    ['IMG_8265','Golden temple roof framed by purple flowers'],
    ['IMG_8475','An artist working beside a painted religious figure'],
    ['IMG_8259','An ornate pavilion beneath trees'],
    ['IMG_8269','Pink flowers in a green garden'],
    ['IMG_8457.jpg','Red and white palace architecture'],
    ['IMG_1289','A monastery courtyard and golden roofs'],
    ['IMG_8467.jpg','Two women walking through a crowd'],
    ['IMG_8262','Terracotta roof details beneath blue sky'],
    ['IMG_1108','A quiet interior beside prayer wheels'],
    ['IMG_8469.jpg','A woman beside a small shrine in a yellow wall'],
    ['IMG_8266','A fountain surrounded by flowers'],
    ['IMG_1259','A person walking beside golden prayer wheels'],
    ['IMG_8267','Golden roof details above painted windows']
  ];
  const gallery=document.querySelector('#collection-gallery');
  gallery.replaceChildren();
  photos.forEach(([file,alt])=>{
    const figure=document.createElement('figure');
    const img=document.createElement('img');
    img.src=`./assets/tibet/${file}.jpg`;
    const tall=['IMG_8259','IMG_8423','IMG_8454','IMG_8457.jpg','IMG_8467.jpg','IMG_8469.jpg','IMG_8475'];
    const phone=['IMG_1108','IMG_1258','IMG_1259'];
    img.width=tall.includes(file)?800:phone.includes(file)?900:1200;
    img.height=tall.includes(file)||phone.includes(file)?1200:file==='IMG_1289'?900:800;
    img.alt=alt;img.loading='lazy';img.decoding='async';
    figure.append(img);gallery.append(figure);
  });
}
