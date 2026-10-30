import { VW, VH, box, pixel, ellipse, poly, withAlpha, speckle, glow, rectOutline } from './pixel';
import { chicken, plankWall, chapaRoof, hayPile, plateDirty, wireFence } from './props';
import { alambreMan, marta, plateServed } from './figures';
import { dust, steam, fly, flicker } from './fx';

const W = 576, H = VH;
const sky = (c, top, bottom) => {
  for (let y=0;y<120;y++) { const k=y/120; c.fillStyle=`rgb(${Math.round(24+(91-24)*k)},${Math.round(29+(104-29)*k)},${Math.round(35+(95-35)*k)})`; c.fillRect(0,y,W,1); }
};
function ground(c, y=150, night=false) {
  box(c,0,y,W,H-y,night?'#292720':'#74613d');
  for(let i=0;i<250;i++){ const x=(i*83)%W, yy=y+((i*37)%(H-y)); pixel(c,x,yy, i%3===0?'#9b8352':(night?'#38352b':'#8c7548')); }
  box(c,0,y,W,2,night?'#484337':'#a18a56');
}
function house(c,x,y,w=150,h=85,night=false) {
  const wall=night?'#302a26':'#79634a';
  box(c,x,y,w,h,wall); plankWall(c,x,y,w,h,wall,night?'#211e1b':'#4c3c2e',night?'#453831':'#92785a',{step:9,seed:x+4});
  chapaRoof(c,[[x-8,y+2],[x+w*0.48,y-26],[x+w+8,y+2]],night?'#393b3b':'#6d6b62',{rust:true,seed:x+1});
  box(c,x+w*0.14,y+18,22,25,night?'#151a20':'#263b3c'); rectOutline(c,x+w*0.14,y+18,22,25,night?'#6c6552':'#b19a6b');
  box(c,x+w*0.63,y+35,25,h-35,night?'#1c1715':'#46372a'); rectOutline(c,x+w*0.63,y+35,25,h-35,'#b19a6b');
  box(c,x+w*0.63+17,y+52,2,2,'#d8b66f');
}
function drawPatio(c,mode,flags={}) {
 const night=mode==='night'; sky(c,0,0); ground(c,145,night);
 // distant horizon and windbreak
 box(c,0,118,W,4,night?'#3b3c36':'#526047');
 for(let i=0;i<18;i++){const x=i*36+7; box(c,x,91+(i%4)*3,4,28,night?'#252a25':'#433b2a'); poly(c,[[x-12,100],[x+2,67+(i%3)*4],[x+17,101]],night?'#29352d':'#46513a');}
 house(c,30,63,155,84,night); house(c,228,82,94,65,night);
 // fence + mail box
 wireFence(c,0,132,W,30,night?'#6d6a5e':'#b6a47e');
 for(let x=15;x<W;x+=72) box(c,x,125,3,38,night?'#5e4e39':'#6b4d32');
 box(c,315,116,16,14,'#584433'); box(c,313,114,20,4,'#9a7144');
 // chicken yard and trapdoor
 box(c,360,120,120,37,night?'#342f26':'#5d4b32');
 box(c,397,132,57,22,night?'#1d1a18':'#40362a'); rectOutline(c,397,132,57,22,night?'#726b5b':'#2c251c');
 for(let i=0;i<4;i++) chicken(c,376+i*22,148,0.4+i, i+1);
 hayPile(c,487,154,42,26,4); 
 if(flags.alambre) alambreMan(c,530,150,1,{h:37});
}
function drawKitchen(c,mode) {
 const night=mode==='night'; box(c,0,0,W,H,night?'#171719':'#4c4035');
 plankWall(c,0,0,W,153,night?'#302a25':'#80674d',night?'#1e1b1a':'#594633',night?'#42372e':'#987e60',{step:10,seed:9});
 box(c,0,151,W,65,night?'#28211b':'#51402d');
 for(let x=0;x<W;x+=20) box(c,x,151,1,65,night?'#1c1917':'#3f3023');
 // stove and counter
 box(c,22,102,115,40,night?'#393b3b':'#817b6b'); box(c,17,98,124,7,'#aaa08a');
 for(let i=0;i<3;i++){ellipse(c,43+i*37,112,9,3,'#252525'); ellipse(c,43+i*37,112,5,2,'#6b665a');}
 box(c,155,120,210,25,night?'#3b2d22':'#725239'); box(c,150,114,220,8,night?'#65503b':'#a1825b');
 // sink, plate, kettle, mate
 box(c,183,100,48,15,'#9d9b8c'); box(c,188,103,37,9,'#4d5b59');
 plateDirty(c,257,113,5); plateServed(c,300,113); box(c,91,79,14,20,'#343c39'); box(c,94,75,8,6,'#777a6a');
 box(c,420,48,86,100,night?'#251e1b':'#554333'); plankWall(c,420,48,86,100,night?'#302521':'#6c513a','#201b18','#8c6b4b',{vertical:true,step:12,seed:3});
 box(c,435,77,56,49,night?'#10151b':'#233637'); rectOutline(c,435,77,56,49,'#a18c69');
 if(!night) glow(c,98,80,24,'#ffd78a',0.08,4); else glow(c,98,80,19,'#f2bd69',0.13,4);
 steam(c,99,74,1,{height:20});
}
function drawCoop(c,mode,flags={}) {
 const night=mode==='night'; sky(c,0,0); ground(c,150,night);
 box(c,40,72,218,82,night?'#332c25':'#69523a'); plankWall(c,40,72,218,82,night?'#332c25':'#765a3e',night?'#211d19':'#4a3728',night?'#44382e':'#8b6d4c',{step:10,seed:6});
 chapaRoof(c,[[30,75],[143,38],[269,75]],night?'#3d3d3a':'#777066',{rust:true,seed:4});
 for(let i=0;i<6;i++){box(c,52+i*32,104,3,48,night?'#191715':'#3e3023');}
 box(c,76,119,149,35,night?'#171514':'#30271d');
 for(let i=0;i<5;i++) chicken(c,85+i*31,148,0.8,i+3);
 // trapdoor
 box(c,304,131,75,24,night?'#211a15':'#4b3826'); rectOutline(c,304,131,75,24,'#9b7b4f');
 for(let i=0;i<5;i++) box(c,308+i*14,133,2,20,'#2e241a');
 if(night){box(c,323,134,35,17,'#08090b'); glow(c,342,145,14,'#6c7d9b',0.07,4);}
 wireFence(c,0,153,W,26,night?'#555249':'#b6a47e');
 if(flags.alambre) alambreMan(c,500,153,2,{h:38});
}
function drawBedroom(c,mode) {
 const night=mode==='night'; box(c,0,0,W,H,night?'#17161b':'#55473e');
 plankWall(c,0,0,W,155,night?'#302a2c':'#756051',night?'#211d21':'#51433a',night?'#453b3e':'#8b7562',{step:12,seed:8}); box(c,0,155,W,61,night?'#282327':'#483a31');
 box(c,50,94,190,48,night?'#39323a':'#77685b'); box(c,42,88,207,13,night?'#62545a':'#b0a28e');
 box(c,58,100,174,38,night?'#5b4650':'#b7a98f'); box(c,60,101,68,18,night?'#a59ba0':'#e0d6c2');
 box(c,340,36,95,113,night?'#1e2026':'#3c4948'); rectOutline(c,340,36,95,113,'#a08b68');
 box(c,354,49,66,86,night?'#11131a':'#6e8a87');
 if(night){alambreMan(c,388,130,1,{h:35});}
 box(c,466,100,55,49,'#4d392a'); box(c,460,94,67,9,'#8b6c4b');
}
function drawBasement(c,mode,flags={}) {
 const night=mode==='night'; box(c,0,0,W,H,night?'#111116':'#292421');
 plankWall(c,0,0,W,216,night?'#211e22':'#42352e',night?'#121115':'#2b211c',night?'#30282c':'#57443a',{vertical:true,step:15,seed:11});
 // floor perspective
 poly(c,[[0,142],[W,142],[W,H],[0,H]],night?'#262329':'#4b3b31');
 for(let x=0;x<W;x+=34) box(c,x,143,1,73,night?'#18161a':'#30241e');
 box(c,40,54,140,88,night?'#0c0b0e':'#211b18'); rectOutline(c,40,54,140,88,'#75644d');
 for(let i=0;i<6;i++){box(c,52+i*20,63,2,72,'#57463a');}
 // wall names
 for(let i=0;i<7;i++){box(c,214,28+i*12,48+(i%3)*8,2,i%2?'#897c6c':'#b0a18c'); if(i===4) box(c,220,74,52,2,'#9b3f36');}
 // chair and contract tin
 box(c,358,100,42,4,'#7e674c'); box(c,361,104,4,34,'#6b523a'); box(c,394,104,4,34,'#6b523a'); box(c,357,82,44,20,'#71583e'); rectOutline(c,357,82,44,20,'#9a7d59');
 plateServed(c,381,99); box(c,442,121,31,20,'#4c4940'); rectOutline(c,442,121,31,20,'#827966');
 if(flags.alambre) alambreMan(c,520,152,1,{h:38});
 glow(c,381,94,35,'#d6a65e',night?0.12:0.07,5);
}

function room(id, name, entryX, floorY, drawStatic, drawDynamic, hotspots) {
 return {id,name,width:W,height:H,entryX,floorY,drawStatic,drawDynamic,hotspots};
}
export const ROOMS = {
 patio: room('patio','EL PATIO',90,174,(c,m)=>drawPatio(c,m), (c,t,o)=>{if(o.flags?.alambre) alambreMan(c,530,150,t,{h:37}); dust(c,t,{x:0,y:60,w:W,h:90,count:20,seed:13,alpha:0.24});},[
  {id:'cocina',label:'Ir a la cocina',x:35,y:65,w:145,h:90,walkX:95},
  {id:'gallinero',label:'Ir al gallinero',x:350,y:95,w:135,h:70,walkX:365},
  {id:'buzon',label:'Revisar el buzón',x:305,y:106,w:40,h:36,walkX:315},
  {id:'alambrado',label:'Mirar el alambrado',x:455,y:95,w:100,h:68,walkX:470},
  {id:'trampilla',label:'Mirar la trampilla',x:390,y:120,w:75,h:42,walkX:400},
  {id:'pieza',label:'Entrar a la pieza',x:220,y:80,w:105,h:78,walkX:245},
  {id:'radio',label:'Escuchar la radio',x:105,y:90,w:38,h:40,walkX:125},
  {id:'puerta',label:'Atender la puerta',x:190,y:70,w:95,h:95,walkX:235},
 ]),
 cocina: room('cocina','LA COCINA',90,174,(c,m)=>drawKitchen(c,m),(c,t)=>{steam(c,99,75,t,{height:18}); fly(c,250,107,t,7,3);},[
  {id:'patio',label:'Salir al patio',x:0,y:0,w:42,h:200,walkX:25},
  {id:'mate',label:'Cebar unos mates',x:75,y:70,w:42,h:55,walkX:95},
  {id:'pileta',label:'Mirar la pileta',x:175,y:90,w:62,h:58,walkX:190},
  {id:'plato',label:'Examinar el plato servido',x:285,y:90,w:40,h:40,walkX:280},
  {id:'radio',label:'Escuchar la radio',x:430,y:55,w:72,h:80,walkX:430},
  {id:'buzon',label:'Volver al buzón',x:515,y:105,w:40,h:50,walkX:515},
 ]),
 gallinero: room('gallinero','EL GALLINERO',110,174,(c,m,f)=>drawCoop(c,m,f),(c,t,o)=>{for(let i=0;i<4;i++) chicken(c,85+i*31,148,t,i+3); if(o.mode==='night') glow(c,342,145,12,'#7185a4',0.1,4);},[
  {id:'patio',label:'Volver al patio',x:0,y:0,w:30,h:210,walkX:20},
  {id:'trampilla',label:'Bajar por la trampilla',x:300,y:120,w:85,h:44,walkX:340},
  {id:'gallinas',label:'Dar de comer a las gallinas',x:48,y:100,w:210,h:58,walkX:150},
  {id:'buzon',label:'Mirar el sobre del buzón',x:400,y:110,w:60,h:45,walkX:405},
  {id:'cocina',label:'Ir a la cocina',x:470,y:85,w:90,h:80,walkX:480},
 ]),
 pieza: room('pieza','LA PIEZA',90,174,(c,m)=>drawBedroom(c,m),(c,t,o)=>{if(o.mode==='night') dust(c,t,{x:0,y:30,w:W,h:100,count:12,seed:5,alpha:0.3});},[
  {id:'patio',label:'Salir al patio',x:0,y:0,w:45,h:210,walkX:25},
  {id:'cama',label:'Examinar la cama',x:45,y:80,w:205,h:68,walkX:145},
  {id:'ventana',label:'Mirar la ventana',x:330,y:25,w:115,h:120,walkX:350},
  {id:'espejo',label:'Mirar el espejo',x:455,y:80,w:90,h:70,walkX:470},
 ]),
 sotano: room('sotano','EL SÓTANO',90,174,(c,m,f)=>drawBasement(c,m,f),(c,t,o)=>{dust(c,t,{x:0,y:20,w:W,h:140,count:25,seed:21,alpha:0.2}); if(o.flags?.alambre) alambreMan(c,520,152,t,{h:38});},[
  {id:'gallinero',label:'Volver a la trampilla',x:0,y:0,w:48,h:210,walkX:25},
  {id:'pared',label:'Leer los nombres de la pared',x:200,y:18,w:100,h:115,walkX:240},
  {id:'caja',label:'Revisar la lata de galletitas',x:435,y:110,w:48,h:45,walkX:450},
  {id:'silla',label:'Examinar la silla',x:350,y:72,w:65,h:72,walkX:380},
  {id:'puerta',label:'Cruzar la puerta del túnel',x:35,y:45,w:150,h:105,walkX:100},
  {id:'cama',label:'Examinar el catre',x:285,y:125,w:45,h:45,walkX:300},
 ])
};
