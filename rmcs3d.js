(function(){
var V=THREE.Vector3,PI=Math.PI,$=function(i){return document.getElementById(i);};
var P=[{n:'You',shirt:0x2563eb,skin:0xf1c27d,hair:0x2b1a10},{n:'Ramu',shirt:0xe11d48,skin:0xc68642,hair:0x111111},{n:'Sita',shirt:0x9333ea,skin:0xe0ac69,hair:0x3b2414,bun:1},{n:'Golu',shirt:0xf59e0b,skin:0xd8a070,hair:0x1a1a1a}];
var R=[{n:'Raja',e:'👑',p:1000,s:'R'},{n:'Mantri',e:'🧑‍💼',p:800,s:'M'},{n:'Sipahi',e:'💂',p:500,s:'S'},{n:'Chor',e:'🦹',p:0,s:'C'}];
var ANG=[0,-PI/2,PI,PI/2],U=ANG.map(function(a){return new V(Math.sin(a),0,Math.cos(a));});
var SEATR=2.75,SPOTR=1.3,TOPY=1.56;
var S=$('stage'),score=[0,0,0,0],hist=[],round=0,total=7,deal=[0,1,2,3],tok=0,sound=true,ac;
/* renderer */
var renderer=new THREE.WebGLRenderer({antialias:true});
renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.outputEncoding=THREE.sRGBEncoding;
S.appendChild(renderer.domElement);if($('load'))$('load').remove();
var scene=new THREE.Scene();scene.background=new THREE.Color(0x14213a);scene.fog=new THREE.Fog(0x14213a,13,28);
var camera=new THREE.PerspectiveCamera(45,1,0.1,100);
function size(){var w=S.clientWidth,h=Math.round(w*(w<600?0.9:0.6));renderer.setSize(w,h);S.style.height=h+'px';camera.aspect=w/h;camera.updateProjectionMatrix();}
window.addEventListener('resize',size);size();
function std(c,r){return new THREE.MeshStandardMaterial({color:c,roughness:r==null?0.7:r});}
function add(m,par,x,y,z){m.position.set(x||0,y||0,z||0);m.castShadow=true;m.receiveShadow=true;(par||scene).add(m);return m;}
function box(w,h,d,c){return new THREE.Mesh(new THREE.BoxGeometry(w,h,d),std(c));}
function cyl(a,b,h,c,s){return new THREE.Mesh(new THREE.CylinderGeometry(a,b,h,s||24),std(c));}
function sph(r,c){return new THREE.Mesh(new THREE.SphereGeometry(r,24,18),std(c,0.6));}
/* lights & room */
scene.add(new THREE.HemisphereLight(0xc8d8ff,0x3a2a1a,0.55));
var spot=new THREE.SpotLight(0xffe2b0,1.6,22,PI/3.6,0.5,1);spot.position.set(0,7,0);spot.target.position.set(0,1.5,0);
spot.castShadow=true;spot.shadow.mapSize.set(1024,1024);spot.shadow.bias=-0.0005;scene.add(spot,spot.target);
var fl=new THREE.DirectionalLight(0x9fbfff,0.35);fl.position.set(-5,6,7);scene.add(fl);
var floor=add(new THREE.Mesh(new THREE.PlaneGeometry(50,50),std(0x4a3322,0.95)));floor.rotation.x=-PI/2;
var rug=add(new THREE.Mesh(new THREE.CircleGeometry(4.8,64),std(0x7a1f2b,1)),scene,0,0.01,0);rug.rotation.x=-PI/2;
var ring=add(new THREE.Mesh(new THREE.RingGeometry(4.3,4.5,64),std(0xd4a24c,1)),scene,0,0.015,0);ring.rotation.x=-PI/2;
add(cyl(0.02,0.02,2.2,0x222222),scene,0,6.4,0);
var shade=add(new THREE.Mesh(new THREE.ConeGeometry(0.75,0.55,32,1,true),new THREE.MeshStandardMaterial({color:0x1f2937,side:THREE.DoubleSide})),scene,0,5.1,0);shade.castShadow=false;
var bulb=new THREE.Mesh(new THREE.SphereGeometry(0.16,16,12),new THREE.MeshBasicMaterial({color:0xfff1c4}));bulb.position.set(0,4.92,0);scene.add(bulb);
/* table */
var wood=0x8b4a22;
add(cyl(2.1,2.1,0.12,wood,64),scene,0,1.49,0);
var felt=add(new THREE.Mesh(new THREE.CircleGeometry(1.8,64),std(0x1f5a3a,1)),scene,0,1.552,0);felt.rotation.x=-PI/2;
var rim=add(new THREE.Mesh(new THREE.TorusGeometry(2.1,0.07,12,64),std(0x5c2e0d,0.5)),scene,0,1.49,0);rim.rotation.x=PI/2;
add(cyl(0.22,0.35,1.35,0x5c2e0d),scene,0,0.78,0);add(cyl(0.9,1,0.1,0x5c2e0d,32),scene,0,0.05,0);
/* faces */
function drawFace(p,t){var c=p.fc;c.clearRect(0,0,256,256);c.lineCap='round';c.lineWidth=10;c.strokeStyle=c.fillStyle='#2a1a12';
 function dot(x,y,r){c.beginPath();c.arc(x,y,r,0,7);c.fill();}
 function arc(x,y,r,a,b){c.beginPath();c.arc(x,y,r,a,b);c.stroke();}
 function line(a,b,d,e){c.beginPath();c.moveTo(a,b);c.lineTo(d,e);c.stroke();}
 function blush(){c.fillStyle='rgba(255,90,90,.35)';dot(66,152,18);dot(190,152,18);c.fillStyle='#2a1a12';}
 if(t==='happy'||t==='win'){arc(92,122,18,PI*1.15,PI*1.85);arc(164,122,18,PI*1.15,PI*1.85);c.beginPath();c.arc(128,165,36,0,PI);c.closePath();c.fill();c.fillStyle='#e8737a';c.beginPath();c.arc(128,190,15,PI,0);c.fill();blush();}
 else if(t==='laugh'){line(76,104,104,116);line(76,128,104,116);line(180,104,152,116);line(180,128,152,116);c.beginPath();c.ellipse(128,175,42,32,0,0,PI);c.closePath();c.fill();c.fillStyle='#60a5fa';dot(62,140,9);dot(194,140,9);}
 else if(t==='sad'){dot(92,118,11);dot(164,118,11);line(74,92,108,102);line(182,92,148,102);arc(128,212,34,PI*1.2,PI*1.8);c.fillStyle='#60a5fa';dot(86,148,9);}
 else if(t==='think'){dot(98,118,11);dot(170,118,11);line(150,88,184,80);line(76,96,108,96);line(108,178,150,170);}
 else if(t==='cool'){c.fillRect(66,100,56,30);c.fillRect(134,100,56,30);c.fillRect(118,108,20,8);arc(132,158,28,PI*0.15,PI*0.7);}
 else if(t==='shock'){c.fillStyle='#fff';dot(92,116,20);dot(164,116,20);c.fillStyle='#2a1a12';dot(92,116,9);dot(164,116,9);c.beginPath();c.ellipse(128,182,16,22,0,0,7);c.fill();}
 else if(t==='angry'){dot(92,122,10);dot(164,122,10);line(72,94,110,108);line(184,94,146,108);line(104,182,152,182);}
 else{dot(92,118,12);dot(164,118,12);arc(128,150,28,PI*0.2,PI*0.8);}
 p.ft.needsUpdate=true;}
/* players */
var people=P.map(function(d,i){
 var pos=U[i].clone().multiplyScalar(SEATR),cg=new THREE.Group(),g=new THREE.Group();
 cg.position.copy(pos);g.position.copy(pos);scene.add(cg,g);cg.lookAt(0,0,0);g.lookAt(0,0,0);
 add(box(0.85,0.08,0.8,0x6b3410),cg,0,0.82,0);add(box(0.85,1,0.08,0x6b3410),cg,0,1.35,-0.42);
 [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(function(q){add(cyl(0.04,0.04,0.8,0x4a230a,8),cg,q[0]*0.36,0.4,q[1]*0.34);});
 add(box(0.17,0.15,0.6,0x1f2937),g,0.13,0.93,0.22);add(box(0.17,0.15,0.6,0x1f2937),g,-0.13,0.93,0.22);
 var body=add(cyl(0.3,0.42,0.85,d.shirt),g,0,1.3,0);
 var sh=add(sph(0.3,d.shirt),g,0,1.7,0);sh.scale.set(1.3,0.6,0.9);
 add(cyl(0.09,0.09,0.16,d.skin),g,0,1.83,0);
 var hg=new THREE.Group();hg.position.set(0,2.06,0);g.add(hg);
 add(new THREE.Mesh(new THREE.SphereGeometry(0.3,32,24),std(d.skin,0.6)),hg);
 var hair=add(new THREE.Mesh(new THREE.SphereGeometry(0.315,24,16,0,PI*2,0,PI*0.45),std(d.hair,0.9)),hg,0,0.02,0);hair.rotation.x=-0.3;
 if(d.bun)add(sph(0.13,d.hair),hg,0,0.12,-0.28);
 var cv=document.createElement('canvas');cv.width=cv.height=256;var ft=new THREE.CanvasTexture(cv);ft.encoding=THREE.sRGBEncoding;
 hg.add(new THREE.Mesh(new THREE.SphereGeometry(0.304,32,16,PI/2-0.9,1.8,PI/2-0.75,1.5),new THREE.MeshBasicMaterial({map:ft,transparent:true})));
 var arms=[1,-1].map(function(s){var pv=new THREE.Object3D();pv.position.set(0.42*s,1.66,0);g.add(pv);
  add(cyl(0.075,0.065,0.6,d.shirt),pv,0,-0.3,0);add(sph(0.085,d.skin),pv,0,-0.63,0);
  var q=new THREE.Quaternion().setFromEuler(new THREE.Euler(-1.15,0,0.1*s));pv.quaternion.copy(q);return {pv:pv,s:s,q:q.clone()};});
 var tag=document.createElement('div');tag.className='ov tag';S.appendChild(tag);
 var bub=document.createElement('div');bub.className='ov bub';S.appendChild(bub);
 var p={i:i,g:g,hg:hg,body:body,arms:arms,fc:cv.getContext('2d'),ft:ft,tag:tag,bub:bub,anim:'idle',t0:0,look:null};
 drawFace(p,'neutral');return p;});
function headPos(i){return U[i].clone().multiplyScalar(SEATR).setY(2.06);}
function setFace(i,t,a){drawFace(people[i],t);people[i].anim=a||'idle';people[i].t0=performance.now()/1000;}
function armsDefault(i){people[i].arms.forEach(function(a){a.q.setFromEuler(new THREE.Euler(-1.15,0,0.1*a.s));});}
function armsUp(i){people[i].arms.forEach(function(a){a.q.setFromEuler(new THREE.Euler(-2.9,0,0.45*a.s));});}
function pointAt(i,w){var p=people[i],a=p.arms[1];p.g.updateMatrixWorld();var l=p.g.worldToLocal(w.clone()).sub(a.pv.position).normalize();a.q.setFromUnitVectors(new V(0,-1,0),l);}
var bt={};
function say(i,txt,ms){var b=people[i].bub;b.textContent=txt;b.classList.add('on');clearTimeout(bt[i]);bt[i]=setTimeout(function(){b.classList.remove('on');},ms||1800);}
/* chits */
function chitCanvas(){var c=document.createElement('canvas');c.width=256;c.height=320;return c;}
function paintChit(c,front,r){var x=c.getContext('2d');x.fillStyle='#fff6d8';x.fillRect(0,0,256,320);x.strokeStyle='#d9c98f';x.lineWidth=6;x.strokeRect(6,6,244,308);
 x.textAlign='center';x.textBaseline='middle';
 if(front){x.strokeStyle='rgba(160,130,60,.4)';x.lineWidth=3;x.beginPath();x.moveTo(128,0);x.lineTo(128,320);x.moveTo(0,160);x.lineTo(256,160);x.stroke();x.fillStyle='#8a6d1f';x.font='bold 120px Caveat, cursive';x.fillText('?',128,165);}
 else{x.font='110px serif';x.fillText(r.e,128,130);x.fillStyle='#1e3a8a';x.font='bold 64px Caveat, cursive';x.fillText(r.n,128,250);}}
var chits=P.map(function(d,i){
 var outer=new THREE.Group(),flip=new THREE.Group();outer.add(flip);scene.add(outer);
 var fc=chitCanvas(),bc=chitCanvas();paintChit(fc,true);
 var ft=new THREE.CanvasTexture(fc),btx=new THREE.CanvasTexture(bc);ft.encoding=btx.encoding=THREE.sRGBEncoding;
 var fm=new THREE.MeshStandardMaterial({map:ft,roughness:0.85}),bm=new THREE.MeshStandardMaterial({map:btx,roughness:0.85});
 var front=new THREE.Mesh(new THREE.PlaneGeometry(0.42,0.52),fm);front.rotation.x=-PI/2;front.position.y=0.007;
 var back=new THREE.Mesh(new THREE.PlaneGeometry(0.42,0.52),bm);back.rotation.x=PI/2;back.position.y=-0.007;
 var edge=new THREE.Mesh(new THREE.BoxGeometry(0.42,0.012,0.52),std(0xf3e6b8));
 [front,back,edge].forEach(function(m){m.castShadow=true;m.userData.idx=i;flip.add(m);});
 outer.position.set(0,TOPY+0.01+i*0.015,0);
 return {outer:outer,flip:flip,fm:fm,bm:bm,bc:bc,bt:btx,open:false};});
function spot(i){return U[i].clone().multiplyScalar(SPOTR).setY(TOPY+0.01);}
function spotRot(i){return i===0?Math.atan2(U[i].x,U[i].z):Math.atan2(-U[i].x,-U[i].z);}
/* tweens, timing */
var tweens=[];
function tw(d,fn){return new Promise(function(res){tweens.push({t0:performance.now(),d:d,fn:fn,res:res});});}
function ease(k){return k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;}
function wait(ms,t){return new Promise(function(res,rej){setTimeout(function(){t===tok?res():rej('stop');},ms);});}
function chk(t){if(t!==tok)throw 'stop';}
function beep(f,d,ty){if(!sound)return;try{ac=ac||new(window.AudioContext||window.webkitAudioContext)();var o=ac.createOscillator(),g=ac.createGain();o.type=ty||'sine';o.frequency.value=f;o.connect(g);g.connect(ac.destination);g.gain.setValueAtTime(.13,ac.currentTime);g.gain.exponentialRampToValueAtTime(.001,ac.currentTime+d);o.start();o.stop(ac.currentTime+d);}catch(e){}}
async function flipChit(i){var c=chits[i];if(c.open)return;c.open=true;beep(620,.12,'triangle');var y=c.outer.position.y;await tw(600,function(k){c.flip.rotation.x=PI*k;c.outer.position.y=y+Math.sin(PI*k)*0.35;});}
/* camera */
var camPos=new V(0,5.8,7.6),camLook=new V(0,1.4,0),gPos=camPos.clone(),gLook=camLook.clone();
function cam(p,l){gPos.copy(p);gLook.copy(l);}
function home(){cam(new V(0,5.8,7.6),new V(0,1.4,0));}
function focus(i){var u=U[i],side=new V(u.z,0,-u.x);cam(u.clone().multiplyScalar(-0.4).add(side.multiplyScalar(0.9)).setY(2.75),headPos(i).setY(1.95));}
/* picking */
var pickable=[],ray=new THREE.Raycaster(),mouse=new THREE.Vector2(),pickRes=null;
renderer.domElement.addEventListener('click',function(e){if(!pickRes)return;var r=renderer.domElement.getBoundingClientRect();
 mouse.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(mouse,camera);
 var hits=ray.intersectObjects(pickable.map(function(i){return chits[i].outer;}),true);
 if(hits.length){var f=pickRes;pickRes=null;f(hits[0].object.userData.idx);}});
/* floating points & confetti */
var floats=[];
function floatPts(i,txt){var el=document.createElement('div');el.className='ov fl';el.textContent=txt;S.appendChild(el);floats.push({el:el,pos:headPos(i).add(new V(0,0.6,0)),t0:performance.now()});}
function confetti(n){for(var k=0;k<n;k++){var d=document.createElement('div');d.className='cf';d.textContent=['🎉','✨','🎊','⭐','💛'][k%5];d.style.left=Math.random()*100+'%';d.style.animationDuration=(1.6+Math.random()*1.4)+'s';d.style.animationDelay=Math.random()*.5+'s';S.appendChild(d);setTimeout(function(x){return function(){x.remove();};}(d),3600);}}
/* loop */
var tmp=new V();
function place(el,w){tmp.copy(w).project(camera);var vis=tmp.z<1;el.style.display=vis?'':'none';el.style.left=((tmp.x+1)/2*S.clientWidth)+'px';el.style.top=((1-tmp.y)/2*S.clientHeight)+'px';}
function loop(now){requestAnimationFrame(loop);var t=now/1000;
 for(var j=tweens.length-1;j>=0;j--){var w=tweens[j],k=Math.min(1,(now-w.t0)/w.d);w.fn(ease(k));if(k>=1){tweens.splice(j,1);w.res();}}
 people.forEach(function(p,i){var dt=t-p.t0,jump=0,hx=0,hy=Math.sin(t*0.8+i)*0.12,hz=0;
  if(p.anim==='happy'&&dt<1.6)jump=Math.abs(Math.sin(dt*9))*0.18*(1-dt/1.6);
  if(p.anim==='win')jump=Math.abs(Math.sin(dt*7))*0.2;
  if(p.anim==='sad'){hx=0.35;hy=dt<1.2?Math.sin(dt*14)*0.3:0;}
  if(p.anim==='think'){hz=0.25;hx=-0.1;}
  if(p.look){var l=p.g.worldToLocal(p.look.clone());hy=Math.max(-1.1,Math.min(1.1,Math.atan2(l.x,l.z)));}
  p.g.position.y=jump;p.body.scale.y=1+Math.sin(t*2+i)*0.012;
  p.hg.rotation.x+=(hx-p.hg.rotation.x)*0.12;p.hg.rotation.y+=(hy-p.hg.rotation.y)*0.12;p.hg.rotation.z+=(hz-p.hg.rotation.z)*0.12;
  p.arms.forEach(function(a){a.pv.quaternion.slerp(a.q,0.12);});
  p.tag.innerHTML=P[i].n+'<b>'+score[i]+'</b>';place(p.tag,headPos(i).add(new V(0,0.45+jump,0)));place(p.bub,headPos(i).add(new V(0,0.95+jump,0)));});
 pickable.forEach(function(i){var c=chits[i];c.fm.emissive.setHex(0x34d399);c.fm.emissiveIntensity=0.35+0.3*Math.sin(t*7);});
 floats=floats.filter(function(f){var k=(now-f.t0)/1500;if(k>=1){f.el.remove();return false;}place(f.el,f.pos.clone().add(new V(0,k*0.8,0)));f.el.style.opacity=1-k;return true;});
 camPos.lerp(gPos,0.045);camLook.lerp(gLook,0.06);camera.position.copy(camPos);camera.lookAt(camLook);
 renderer.render(scene,camera);}
requestAnimationFrame(loop);
/* notebook */
function notebook(final){var mx=Math.max.apply(null,score);
 var h='<tr><th>Round</th>'+P.map(function(p){return '<th>'+p.n+'</th>';}).join('')+'</tr>';
 hist.forEach(function(r,k){h+='<tr><td>'+(k+1)+'</td>'+r.map(function(c){return '<td'+(c.cz?' class="cz"':'')+'>'+c.p+' <small>'+c.s+'</small></td>';}).join('')+'</tr>';});
 h+='<tr class="tot"><td>Total</td>'+score.map(function(s){var w=final&&s===mx;return '<td'+(w?' class="wn"':'')+'>'+s+(w?' 🏆':'')+'</td>';}).join('')+'</tr>';
 $('sc').innerHTML=h;}
function msg(t){$('msg').textContent=t;}
function shuffle(a){for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),x=a[i];a[i]=a[j];a[j]=x;}return a;}
/* one round */
async function playRound(t){
 $('next').hidden=true;pickable=[];pickRes=null;
 people.forEach(function(p,i){setFace(i,'neutral');p.look=null;armsDefault(i);p.bub.classList.remove('on');});
 msg('Round '+round+' of '+total+': collecting the chits…');
 cam(new V(0,7.2,4.4),new V(0,1.5,0));
 await Promise.all(chits.map(function(c,i){var p0=c.outer.position.clone(),r0=c.flip.rotation.x,p1=new V(0,TOPY+0.01+i*0.015,0);
  return tw(500,function(k){c.flip.rotation.x=r0*(1-k);c.outer.position.lerpVectors(p0,p1,k);c.outer.position.y+=Math.sin(PI*k)*0.3;});}));
 chk(t);
 deal=shuffle([0,1,2,3]);
 chits.forEach(function(c,i){c.open=false;c.fm.emissive.setHex(0);paintChit(c.bc,false,R[deal[i]]);c.bt.needsUpdate=true;c.r0=c.outer.rotation.y;});
 msg('Shuffling…');
 var bp=setInterval(function(){beep(180+Math.random()*120,.05,'square');},140);
 await tw(1100,function(k){chits.forEach(function(c,i){c.outer.rotation.y=c.r0+Math.sin(k*PI*6+i)*0.7;c.outer.position.x=Math.sin(k*PI*8+i*1.7)*0.15*(1-k);c.outer.position.z=Math.cos(k*PI*7+i)*0.12*(1-k);});});
 clearInterval(bp);chk(t);
 msg('Dealing the chits…');
 for(var i=0;i<4;i++){(function(i){var c=chits[i],p0=c.outer.position.clone(),p1=spot(i),r0=c.outer.rotation.y,r1=spotRot(i)+PI*2;beep(440+i*60,.08,'triangle');
  tw(520,function(k){c.outer.position.lerpVectors(p0,p1,k);c.outer.position.y+=Math.sin(PI*k)*0.6;c.outer.rotation.y=r0+(r1-r0)*k;});})(i);
  await wait(300,t);}
 await wait(500,t);
 cam(new V(0,3.9,5.1),new V(0,1.5,1.1));await wait(700,t);
 await flipChit(0);chk(t);
 msg('You got '+R[deal[0]].e+' '+R[deal[0]].n+'!');setFace(0,deal[0]===3?'shock':deal[0]===0?'cool':'happy');
 await wait(1300,t);
 var raja=deal.indexOf(0),mantri=deal.indexOf(1),chor=deal.indexOf(3),sip=deal.indexOf(2);
 focus(raja);await wait(900,t);if(raja)await flipChit(raja);
 setFace(raja,'cool','happy');armsUp(raja);say(raja,'Main Raja hoon! 👑',1500);msg(P[raja].n+' is the Raja 👑');
 await wait(1600,t);armsDefault(raja);people[raja].look=headPos(mantri);
 say(raja,'Mantri, chor ko pakdo! 🫵',1600);beep(523,.12);setTimeout(function(){beep(659,.15);},150);
 await wait(1700,t);
 focus(mantri);await wait(900,t);if(mantri)await flipChit(mantri);
 say(mantri,'Main Mantri hoon 🧑‍💼',1400);msg(P[mantri].n+' is the Mantri. Who is the Chor?');
 await wait(1500,t);
 var sus=[0,1,2,3].filter(function(x){return x!==raja&&x!==mantri;}),guess;
 if(mantri===0){
  cam(new V(0,6.6,6.2),new V(0,1.4,0));msg('🧑‍💼 You are the Mantri! Tap the chit of the player you think is the Chor.');
  pickable=sus.slice();
  guess=await new Promise(function(res){pickRes=res;});chk(t);
  sus.forEach(function(x){chits[x].fm.emissive.setHex(0);});pickable=[];
 }else{
  setFace(mantri,'think','think');say(mantri,'Hmm… kaun hai chor? 🤔',2400);
  sus.forEach(function(x){setFace(x,x===chor?'shock':'neutral');});
  for(var k=0;k<4;k++){people[mantri].look=headPos(sus[k%2]);await wait(600,t);}
  guess=sus[Math.floor(Math.random()*2)];
 }
 people[mantri].look=headPos(guess);pointAt(mantri,chits[guess].outer.position);beep(300,.25,'square');
 if(mantri!==0)focus(mantri);
 await wait(900,t);
 say(mantri,(guess===0?'Tum':P[guess].n)+' chor ho! 👉',1700);
 await wait(1500,t);
 focus(guess);sus.forEach(function(x){people[x].look=headPos(mantri);});
 await wait(800,t);
 await Promise.all(sus.map(function(x){return flipChit(x);}));chk(t);
 var ok=guess===chor;
 if(ok){setFace(mantri,'happy','happy');say(mantri,'Pakad liya! 😄',2200);setFace(chor,'sad','sad');say(chor,'Arre yaar! 😭',2200);setFace(sip,'cool');setFace(raja,'happy','happy');
  beep(784,.15);setTimeout(function(){beep(988,.15);},150);setTimeout(function(){beep(1319,.3);},300);confetti(18);
  msg('🎉 Caught! '+P[chor].n+' was the Chor. Mantri keeps 800.');}
 else{setFace(mantri,'sad','sad');say(mantri,'Galti ho gayi! 🤦',2200);setFace(chor,'laugh','happy');say(chor,'Bach gaya! 😂',2200);setFace(sip,'shock');setFace(raja,'angry');
  beep(330,.2,'sawtooth');setTimeout(function(){beep(220,.4,'sawtooth');},200);
  msg('😅 Wrong guess! '+P[chor].n+' was the Chor and takes the 800 points.');}
 await wait(900,t);focus(chor);await wait(1500,t);
 armsDefault(mantri);people.forEach(function(p){p.look=null;});home();
 var pts=deal.map(function(r){return R[r].p;});if(!ok){pts[mantri]=0;pts[chor]=800;}
 hist.push(pts.map(function(p,i){return {p:p,s:R[deal[i]].s,cz:i===chor&&ok};}));
 pts.forEach(function(p,i){score[i]+=p;floatPts(i,'+'+p);});notebook(false);
 await wait(1200,t);
 if(round<total){$('next').hidden=false;return;}
 var mx=Math.max.apply(null,score),w=[];score.forEach(function(s,i){if(s===mx)w.push(i);});
 people.forEach(function(p,i){if(w.indexOf(i)>-1){setFace(i,'win','win');armsUp(i);say(i,'Main jeet gaya! 🏆',5000);}else setFace(i,'sad');});
 notebook(true);confetti(40);[523,659,784,1047].forEach(function(f,k){setTimeout(function(){beep(f,.25);},k*150);});
 msg('🏆 '+(w.indexOf(0)>-1?'You win':w.map(function(i){return P[i].n;}).join(' & ')+' wins')+' with '+mx+' points! Press New game to play again.');
}
function go(){round++;var t=tok;playRound(t).catch(function(){});}
$('start').onclick=function(){tok++;score=[0,0,0,0];hist=[];round=0;total=+$('rn').value;notebook(false);home();go();};
$('next').onclick=go;
$('snd').onclick=function(){sound=!sound;this.textContent=sound?'🔊 Sound on':'🔇 Sound off';};
notebook(false);
})();
