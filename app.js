(function(){var l=document.createElement('link');l.rel='icon';l.type='image/svg+xml';l.href='/favicon.svg';document.head.appendChild(l);})();
(function(){var id='G-BXNLHN3GQX';var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id='+id;document.head.appendChild(s);window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments);};gtag('js',new Date());gtag('config',id);})();
(function(){
/* ===== नाम यहीं बदलिए ===== */
var NAME='Cooridor Store';
var TAG='ACCOUNTS · TAX · PDF';
/* ========================== */
var css=document.createElement('style');
css.textContent='.ftr .ftr-g.f5{display:grid;grid-template-columns:repeat(5,1fr);gap:30px}'+
 '.ftr a.brand{display:inline-flex;align-items:center;gap:10px;padding:0}'+
 '.ftr-top{display:flex;justify-content:space-between;align-items:center;gap:20px;flex-wrap:wrap;margin-bottom:30px;padding-bottom:24px;border-bottom:1px solid var(--line)}'+
 '.ftr-top p{max-width:460px;margin:0}'+
 '@media(min-width:861px){'+
  '.dd .menu{max-height:calc(100vh - 100px);overflow-y:auto;overscroll-behavior:contain}'+
  '.dd .menu.wide{columns:2;column-gap:4px;width:min(580px,92vw)}'+
  '.dd .menu.wide a{break-inside:avoid}'+
 '}'+
  '.nav>a.nav-link{font-weight:600;padding:8px 12px;border-radius:10px;color:var(--txt)}.nav>a.nav-link:hover{background:var(--soft)}'+
 '@media(max-width:860px){.ftr .ftr-g.f5{grid-template-columns:1fr 1fr}.dd .menu.wide{columns:1;width:auto}}';
document.head.appendChild(css);
var LOGO='<svg width="36" height="36" viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="10" fill="#0b3d91"/><g stroke="#fff" stroke-width="2.6" stroke-linecap="round"><path d="M9 13h16M9 20h12M9 27h8"/></g><path d="M21 26.5l4 4 7.5-9" stroke="#34d399" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';
function m(h,i,en,hi,sen,shi){return '<a href="'+h+'"><b style="font-size:1.15rem;width:24px;text-align:center">'+i+'</b><div><div data-en="'+en+'" data-hi="'+hi+'">'+en+'</div><span data-en="'+sen+'" data-hi="'+shi+'">'+sen+'</span></div></a>';}
function dd(en,hi,items,wide){return '<div class="dd"><button type="button" data-en="'+en+' ▾" data-hi="'+hi+' ▾">'+en+' ▾</button><div class="menu'+(wide?' wide':'')+'">'+items+'</div></div>';}
function col(en,hi,links){return '<div><h4 data-en="'+en+'" data-hi="'+hi+'">'+en+'</h4>'+links.map(function(l){return '<a href="'+l[0]+'">'+l[1]+'</a>';}).join('')+'</div>';}
var brand='<a href="/" class="brand" style="color:var(--txt)">'+LOGO+'<div class="brand-t">'+NAME+'<small>'+TAG+'</small></div></a>';
var header='<header class="hdr"><div class="container">'+brand+'<nav class="nav" id="nav">'+
 dd('Calculators','कैलकुलेटर',
  m('gst-calculator.html','🧮','GST Calculator','GST कैलकुलेटर','Add or remove GST','GST जोड़ें या निकालें')+
  m('gst-late-fee-calculator.html','⏰','GST Late Fee','GST लेट फ़ीस','Late fee and interest','लेट फ़ीस और ब्याज')+
  m('income-tax-calculator.html','📊','Income Tax','इनकम टैक्स','Old vs new regime','पुरानी बनाम नई रिजीम')+
  m('hra-calculator.html','🏠','HRA Calculator','HRA कैलकुलेटर','Exempt and taxable HRA','छूट और टैक्सेबल HRA')+
  m('tds-calculator.html','✂️','TDS Calculator','TDS कैलकुलेटर','TDS by section','सेक्शन के हिसाब से TDS')+
  m('80gg-calculator.html','🏠','80GG Calculator','80GG कैलकुलेटर','Rent deduction without HRA','बिना HRA किराये पर छूट')+
  m('in-hand-salary-calculator.html','💰','In-hand Salary','इन-हैंड सैलरी','CTC to take-home pay','CTC से हाथ में सैलरी')+
  m('gratuity-calculator.html','🎁','Gratuity','ग्रेच्युटी','Gratuity on leaving a job','नौकरी छोड़ने पर ग्रेच्युटी')+
  m('emi-calculator.html','🏦','EMI Calculator','EMI कैलकुलेटर','Loan EMI and schedule','लोन EMI और शेड्यूल')+
  m('sip-calculator.html','📈','SIP Calculator','SIP कैलकुलेटर','SIP returns with step-up','step-up के साथ SIP रिटर्न'),true)+
 dd('Reconciliation','रिकंसिलिएशन',
  m('ecommerce-reconciliation.html','🛒','E-commerce Reco','ई-कॉमर्स रिको','All marketplaces vs books','सभी मार्केटप्लेस बनाम books')+
  m('amazon-reconciliation.html','🛒','Amazon Reco','Amazon रिको','Orders, payouts, fees, TCS','ऑर्डर, पेआउट, फ़ीस, TCS')+
  m('flipkart-reconciliation.html','🛍️','Flipkart Reco','Flipkart रिको','Orders, payouts, fees, TCS','ऑर्डर, पेआउट, फ़ीस, TCS')+
  m('meesho-reconciliation.html','🧵','Meesho Reco','Meesho रिको','Orders, payouts, fees, TCS','ऑर्डर, पेआउट, फ़ीस, TCS')+
  m('myntra-reconciliation.html','👗','Myntra Reco','Myntra रिको','Orders, payouts, fees, TCS','ऑर्डर, पेआउट, फ़ीस, TCS')+
  m('jiomart-reconciliation.html','🏪','JioMart Reco','JioMart रिको','Orders, payouts, fees, TCS','ऑर्डर, पेआउट, फ़ीस, TCS')+
  m('gstr-2b-reconciliation.html','🔄','GSTR-2B Reconciliation','GSTR-2B रिकंसिलिएशन','Purchase register vs 2B','परचेज़ रजिस्टर बनाम 2B')+
  m('gstr-1-einvoice-reconciliation.html','🧾','GSTR-1 vs e-Invoice','GSTR-1 बनाम ई-इनवॉइस','Find missing e-invoices','छूटे ई-इनवॉइस खोजें')+
  m('bank-reconciliation.html','🏦','Bank Reconciliation','बैंक रिकंसिलिएशन','Statement vs ledger, BRS','स्टेटमेंट बनाम लेजर, BRS'),true)+
 dd('Generators','जनरेटर',
  m('invoice-generator.html','🧾','GST Invoice Generator','GST इनवॉइस जनरेटर','Create and print invoices','इनवॉइस बनाएँ और प्रिंट करें')+
   m('gstin-validator.html','✅','GSTIN Validator','GSTIN वैलिडेटर','Check GST number, state, PAN','GST नंबर, राज्य, PAN जाँचें')+
    m('qr-code-generator.html','🔳','QR Code Generator','QR कोड जनरेटर','UPI, link, WhatsApp, WiFi','UPI, लिंक, WhatsApp, WiFi')+
  m('rent-receipt-generator.html','🏘️','Rent Receipt Generator','किराया रसीद जनरेटर','Monthly receipts for HRA','HRA के लिए मासिक रसीदें')+
  m('tally-import.html','📥','Invoices to Tally','इनवॉइस से Tally','Excel to Tally XML','Excel से Tally XML'))+
 dd('PDF Tools','PDF टूल्स',
  m('bank-statement-pdf-to-excel.html','🏦','Bank Statement to Excel','बैंक स्टेटमेंट से Excel','PDF statement to Excel','PDF स्टेटमेंट को Excel में')+
  m('word-to-pdf.html','📄','Word to PDF','Word से PDF','Convert .docx to PDF','.docx को PDF में बदलें')+
  m('pdf-to-word.html','📝','PDF to Word','PDF से Word','Editable .docx from PDF','PDF से बदलने लायक़ .docx')+
  m('compress-pdf.html','🗜️','Compress PDF','PDF छोटी करें','Reduce PDF file size','PDF का साइज़ घटाएँ')+
  m('merge-pdf.html','📑','Merge PDF','PDF जोड़ें','Combine PDFs into one','कई PDF को एक बनाएँ'))+
 dd('Learn','सीखें',
  m('accounting-games.html','🎮','Accounting Games','अकाउंटिंग गेम्स','Refresh your mind','दिमाग़ ताज़ा कीजिए')+
  m('tax-quiz.html','🎯','Tax Quiz','टैक्स क्विज़','Test your GST and tax knowledge','अपना GST और टैक्स ज्ञान परखें'))+
 '<a class="nav-link" href="blog.html" data-en="Blog" data-hi="ब्लॉग">Blog</a>'+'<div class="tools"><div class="seg"><button type="button" id="l-en">EN</button><button type="button" id="l-hi">हिं</button></div><button type="button" class="icon-btn" id="theme" aria-label="Dark mode">🌙</button></div></nav><button type="button" class="icon-btn burger" id="burger" aria-label="Menu">☰</button></div></header>';
var footer='<footer class="ftr"><div class="container">'+
 '<div class="ftr-top">'+brand+'<p data-en="Free tax, accounting, finance and PDF tools for India. No signup, nothing uploaded." data-hi="भारत के लिए फ्री टैक्स, अकाउंटिंग, फ़ाइनेंस और PDF टूल्स। बिना साइनअप, कुछ अपलोड नहीं।">Free tax, accounting, finance and PDF tools for India. No signup, nothing uploaded.</p></div>'+
 '<div class="ftr-g f5">'+
 col('Calculators','कैलकुलेटर',[['gst-calculator.html','GST'],['gst-late-fee-calculator.html','GST Late Fee'],['income-tax-calculator.html','Income Tax'],['hra-calculator.html','HRA'],['tds-calculator.html','TDS'],['80gg-calculator.html','80GG'],['in-hand-salary-calculator.html','In-hand Salary'],['gratuity-calculator.html','Gratuity'],['emi-calculator.html','EMI'],['sip-calculator.html','SIP']])+
 col('Reconciliation','रिकंसिलिएशन',[['ecommerce-reconciliation.html','E-commerce Reco'],['amazon-reconciliation.html','Amazon Reco'],['flipkart-reconciliation.html','Flipkart Reco'],['meesho-reconciliation.html','Meesho Reco'],['myntra-reconciliation.html','Myntra Reco'],['jiomart-reconciliation.html','JioMart Reco'],['gstr-2b-reconciliation.html','GSTR-2B Reco'],['gstr-1-einvoice-reconciliation.html','GSTR-1 vs e-Invoice'],['bank-reconciliation.html','Bank Reco']])+
 col('Generators','जनरेटर',[['invoice-generator.html','Invoice Generator'],['qr-code-generator.html','QR Code Generator'],['rent-receipt-generator.html','Rent Receipt'],['tally-import.html','Invoices to Tally']])+
 col('PDF Tools','PDF टूल्स',[['bank-statement-pdf-to-excel.html','Bank Statement to Excel'],['word-to-pdf.html','Word to PDF'],['pdf-to-word.html','PDF to Word'],['compress-pdf.html','Compress PDF'],['merge-pdf.html','Merge PDF']])+
 col('Learn &amp; Company','सीखें और कंपनी',[['accounting-games.html','Accounting Games'],['tax-quiz.html','Tax Quiz'],['blog.html','Blog'],['about.html','About'],['contact.html','Contact'],['privacy-policy.html','Privacy Policy'],['terms.html','Terms']])+
 '</div><div class="copy">© 2026 '+NAME+' · cooridorstore.in</div></div></footer>';
function get(k,d){try{return localStorage.getItem(k)||d;}catch(e){return d;}}
function put(k,v){try{localStorage.setItem(k,v);}catch(e){}}
document.addEventListener('DOMContentLoaded',function(){
 var h=document.getElementById('site-header'),f=document.getElementById('site-footer');
 if(h)h.outerHTML=header; if(f)f.outerHTML=footer;
 document.title=document.title.replace(/Cooridor Store/g,NAME);
 document.querySelectorAll('.dd>button').forEach(function(b){b.onclick=function(e){e.stopPropagation();var p=b.parentNode,o=p.classList.contains('open');document.querySelectorAll('.dd').forEach(function(d){d.classList.remove('open')});if(!o)p.classList.add('open');}});
 document.querySelectorAll('.dd .menu').forEach(function(mn){mn.addEventListener('click',function(e){e.stopPropagation();});});
 document.addEventListener('click',function(){document.querySelectorAll('.dd').forEach(function(d){d.classList.remove('open')})});
 var bg=document.getElementById('burger');if(bg)bg.onclick=function(){document.getElementById('nav').classList.toggle('show')};
 document.getElementById('l-en').onclick=function(){setLang('en')};
 document.getElementById('l-hi').onclick=function(){setLang('hi')};
 document.getElementById('theme').onclick=function(){setTheme(document.documentElement.dataset.theme==='dark'?'light':'dark')};
 setTheme(get('theme','light')); setLang(get('lang','en'));
});
function setTheme(t){document.documentElement.dataset.theme=t;put('theme',t);var b=document.getElementById('theme');if(b)b.textContent=t==='dark'?'☀️':'🌙';}
window.setLang=function(l){put('lang',l);document.documentElement.lang=l;
 document.querySelectorAll('[data-en]').forEach(function(e){e.innerHTML=e.getAttribute('data-'+l)});
 document.querySelectorAll('[data-ph-en]').forEach(function(e){e.placeholder=e.getAttribute('data-ph-'+l)});
 var a=document.getElementById('l-en'),b=document.getElementById('l-hi');if(a){a.className=l==='en'?'on':'';b.className=l==='hi'?'on':'';}
 document.dispatchEvent(new Event('langchange'));};
})();
/* ===== Share button on every tool page ===== */
(function(){
function ready(f){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',f);else f();}
ready(function(){
 var ph=document.querySelector('.ph')||document.querySelector('article.post');
 if(!ph||document.getElementById('shr'))return;
 var can=document.querySelector('link[rel=canonical]');
 var url=can?can.href:location.href.split('#')[0];
 var h1=ph.querySelector('h1');
 var title=(h1?h1.textContent.trim():document.title)+(ph.matches('article')?'':' – free tool');
 var text=title+': '+url;
 var e=encodeURIComponent;
 var L={
  wa:['WhatsApp','https://wa.me/?text='+e(text),'#25d366','<path d="M12 2a10 10 0 0 0-8.7 15l-1.3 5 5.1-1.3A10 10 0 1 0 12 2Zm5.6 14.1c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1a17 17 0 0 1-1.7-.6 13.4 13.4 0 0 1-5.2-4.6c-.4-.6-1-1.6-1-2.6 0-1.1.6-1.6.8-1.8.2-.3.5-.3.6-.3h.5c.2 0 .4 0 .6.4l.8 2c.1.2.1.3 0 .5l-.4.6c-.1.2-.3.3-.1.6.2.3.7 1.1 1.4 1.8 1 .9 1.8 1.1 2.1 1.3.3.1.4.1.6-.1l.8-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.1.1.6-.1 1.2Z"/>'],
  tg:['Telegram','https://t.me/share/url?url='+e(url)+'&text='+e(title),'#229ed9','<path d="M21.9 4.6 18.7 19.7c-.2 1-.9 1.3-1.7.8l-4.8-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.9 8.9-8c.4-.3-.1-.5-.6-.2L6.4 13.5l-4.7-1.5c-1-.3-1-1 .2-1.5L20.4 3.4c.9-.3 1.6.2 1.5 1.2Z"/>'],
  fb:['Facebook','https://www.facebook.com/sharer/sharer.php?u='+e(url),'#1877f2','<path d="M14 8V6.3c0-.8.2-1.3 1.4-1.3H17V2.1C16.6 2 15.6 2 14.4 2 12 2 10.4 3.5 10.4 6.1V8H8v3.2h2.4V22H14V11.2h2.7L17 8h-3Z"/>'],
  x:['X','https://twitter.com/intent/tweet?url='+e(url)+'&text='+e(title),'#111111','<path d="M17.7 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.3-8.3L2 3h6.4l4.4 5.8L17.7 3Zm-1.1 16.2h1.7L7.5 4.7H5.7l10.9 14.5Z"/>'],
  li:['LinkedIn','https://www.linkedin.com/sharing/share-offsite/?url='+e(url),'#0a66c2','<path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4V21H3V9.5Zm6.5 0h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.1c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4V9.5Z"/>'],
  em:['Email','mailto:?subject='+e(title)+'&body='+e(text),'#64748b','<path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm9 7.6L4 7.3V17h16V7.3l-8 5.3Zm0-2.4L19.3 7H4.7l7.3 3.2Z"/>']
 };
 var css=document.createElement('style');
 css.textContent='.shr{position:relative;display:inline-flex;gap:8px;align-items:center;margin-top:12px}'+
 '.shr-b{display:inline-flex;align-items:center;gap:8px;padding:9px 16px;border:1px solid var(--line);border-radius:99px;background:var(--sur);color:var(--txt);font:inherit;font-size:.9rem;font-weight:600;cursor:pointer;transition:.15s}'+
 '.shr-b:hover{border-color:var(--pri);color:var(--pri)}.shr-b svg{width:17px;height:17px}'+
 '.shr-wa{background:#25d366;border-color:#25d366;color:#fff}.shr-wa:hover{color:#fff;filter:brightness(.95)}'+
 '.shr-m{position:absolute;top:calc(100% + 8px);left:0;z-index:60;min-width:230px;padding:8px;border:1px solid var(--line);border-radius:14px;background:var(--sur);box-shadow:0 18px 40px -12px rgba(0,0,0,.3);display:none}'+
 '.shr-m.on{display:block}.shr-m a,.shr-m button{display:flex;width:100%;align-items:center;gap:10px;padding:9px 10px;border:none;border-radius:9px;background:none;color:var(--txt);font:inherit;font-size:.9rem;cursor:pointer;text-align:left}'+
 '.shr-m a:hover,.shr-m button:hover{background:var(--soft)}.shr-m i{width:30px;height:30px;border-radius:8px;display:grid;place-items:center;flex:none}.shr-m i svg{width:16px;height:16px;fill:#fff}';
 document.head.appendChild(css);
 var box=document.createElement('div');box.className='shr';box.id='shr';
 var ic='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/></svg>';
 var wa='<svg viewBox="0 0 24 24" fill="currentColor">'+L.wa[3]+'</svg>';
 var items='';
 for(var k in L)items+='<a href="'+L[k][1]+'" target="_blank" rel="noopener" data-m="'+k+'"><i style="background:'+L[k][2]+'"><svg viewBox="0 0 24 24">'+L[k][3]+'</svg></i>'+L[k][0]+'</a>';
 items+='<button type="button" data-m="copy"><i style="background:var(--pri)"><svg viewBox="0 0 24 24"><path d="M8 3h11a2 2 0 0 1 2 2v11h-2V5H8V3Zm-3 4h11a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Zm0 2v11h11V9H5Z"/></svg></i><span class="shr-cp"></span></button>';
 box.innerHTML='<button type="button" class="shr-b" id="shr-o">'+ic+'<span class="shr-t"></span></button>'+
  '<a class="shr-b shr-wa" href="'+L.wa[1]+'" target="_blank" rel="noopener" data-m="wa">'+wa+'WhatsApp</a>'+
  '<div class="shr-m" id="shr-m">'+items+'</div>';
 var meta=ph.querySelector('.meta');
 if(meta)meta.insertAdjacentElement('afterend',box);else ph.appendChild(box);
 function hi(){return document.documentElement.lang==='hi';}
 function labels(){box.querySelector('.shr-t').textContent=hi()?'शेयर करें':'Share';box.querySelector('.shr-cp').textContent=hi()?'लिंक कॉपी करें':'Copy link';}
 labels();document.addEventListener('langchange',labels);
 function track(m){try{if(window.gtag)gtag('event','share',{method:m,content_type:'tool',item_id:location.pathname});}catch(x){}}
 var menu=box.querySelector('#shr-m');
 box.querySelector('#shr-o').addEventListener('click',function(ev){
  ev.stopPropagation();
  if(navigator.share&&matchMedia('(pointer:coarse)').matches){navigator.share({title:title,text:title,url:url}).then(function(){track('native');}).catch(function(){});return;}
  menu.classList.toggle('on');
 });
 box.querySelectorAll('[data-m]').forEach(function(a){a.addEventListener('click',function(){
  var m=a.getAttribute('data-m');track(m);
  if(m==='copy'){var s=a.querySelector('.shr-cp');
   var done=function(){s.textContent=hi()?'✓ कॉपी हो गया':'✓ Copied';setTimeout(labels,1600);};
   if(navigator.clipboard)navigator.clipboard.writeText(url).then(done,function(){prompt('Copy link:',url);});else prompt('Copy link:',url);}
  else menu.classList.remove('on');
 });});
 document.addEventListener('click',function(ev){if(!box.contains(ev.target))menu.classList.remove('on');});
 document.addEventListener('keydown',function(ev){if(ev.key==='Escape')menu.classList.remove('on');});
});
})();
