(function(){var id='G-BXNLHN3GQX';var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id='+id;document.head.appendChild(s);window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments);};gtag('js',new Date());gtag('config',id);})();
(function(){
/* ===== नाम यहीं बदलिए ===== */
var NAME='Cooridor Store';
var TAG='TAX · GST · ACCOUNTS';
/* ========================== */
var LOGO='<svg width="36" height="36" viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="10" fill="#0b3d91"/><path d="M27 13.5A9.5 9.5 0 1 0 27 26.5" fill="none" stroke="#fff" stroke-width="3.6" stroke-linecap="round"/><path d="M17 20.5l3 3 6-6.5" fill="none" stroke="#34d399" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
function m(h,i,en,hi,sen,shi){return '<a href="'+h+'"><b style="font-size:1.15rem;width:24px;text-align:center">'+i+'</b><div><div data-en="'+en+'" data-hi="'+hi+'">'+en+'</div><span data-en="'+sen+'" data-hi="'+shi+'">'+sen+'</span></div></a>';}
function dd(en,hi,items){return '<div class="dd"><button type="button" data-en="'+en+' ▾" data-hi="'+hi+' ▾">'+en+' ▾</button><div class="menu">'+items+'</div></div>';}
var brand='<a href="index.html" class="brand" style="color:var(--txt)">'+LOGO+'<div class="brand-t">'+NAME+'<small>'+TAG+'</small></div></a>';
var header='<header class="hdr"><div class="container">'+brand+'<nav class="nav" id="nav">'+
 dd('Calculators','कैलकुलेटर',
  m('gst-calculator.html','🧮','GST Calculator','GST कैलकुलेटर','Add or remove GST','GST जोड़ें या निकालें')+
  m('income-tax-calculator.html','📊','Income Tax','इनकम टैक्स','Old vs new regime','पुरानी बनाम नई रिजीम')+
  m('hra-calculator.html','🏠','HRA Calculator','HRA कैलकुलेटर','Exempt and taxable HRA','छूट और टैक्सेबल HRA')+
  m('tds-calculator.html','✂️','TDS Calculator','TDS कैलकुलेटर','TDS by section','सेक्शन के हिसाब से TDS'))+
 dd('Reconciliation','रिकंसिलिएशन',
  m('gstr-2b-reconciliation.html','🔄','GSTR-2B Reconciliation','GSTR-2B रिकंसिलिएशन','Purchase register vs 2B','परचेज़ रजिस्टर बनाम 2B')+
  m('gstr-1-einvoice-reconciliation.html','🧾','GSTR-1 vs e-Invoice','GSTR-1 बनाम ई-इनवॉइस','Find missing e-invoices','छूटे ई-इनवॉइस खोजें')+
  m('bank-reconciliation.html','🏦','Bank Reconciliation','बैंक रिकंसिलिएशन','Statement vs ledger, BRS','स्टेटमेंट बनाम लेजर, BRS')+
  m('tally-import.html','📥','Invoices to Tally','इनवॉइस से Tally','Excel to Tally XML','Excel से Tally XML'))+
 dd('Generators','जनरेटर',
  m('invoice-generator.html','🧾','GST Invoice Generator','GST इनवॉइस जनरेटर','Create and print invoices','इनवॉइस बनाएँ और प्रिंट करें')+
  m('word-to-pdf.html','📄','Word to PDF','Word से PDF','Convert .docx to PDF','.docx को PDF में बदलें'))+
 dd('Learn','सीखें',
  m('tax-quiz.html','🎯','Tax Quiz','टैक्स क्विज़','Test your GST and tax knowledge','अपना GST और टैक्स ज्ञान परखें'))+
 '<div class="tools"><div class="seg"><button type="button" id="l-en">EN</button><button type="button" id="l-hi">हिं</button></div><button type="button" class="icon-btn" id="theme" aria-label="Dark mode">🌙</button></div></nav><button type="button" class="icon-btn burger" id="burger" aria-label="Menu">☰</button></div></header>';
var footer='<footer class="ftr"><div class="container"><div class="ftr-g"><div>'+brand+'<p style="margin-top:14px" data-en="Free, accurate and private tax &amp; accounting tools for India." data-hi="भारत के लिए फ्री, सटीक और सुरक्षित टैक्स और अकाउंटिंग टूल्स।">Free, accurate and private tax &amp; accounting tools for India.</p></div>'+
 '<div><h4 data-en="Calculators" data-hi="कैलकुलेटर">Calculators</h4><a href="gst-calculator.html">GST</a><a href="income-tax-calculator.html">Income Tax</a><a href="hra-calculator.html">HRA</a><a href="tds-calculator.html">TDS</a></div>'+
 '<div><h4 data-en="Tools" data-hi="टूल्स">Tools</h4><a href="gstr-2b-reconciliation.html">GSTR-2B Reco</a><a href="gstr-1-einvoice-reconciliation.html">GSTR-1 vs e-Invoice</a><a href="bank-reconciliation.html">Bank Reco</a><a href="tally-import.html">Invoices to Tally</a><a href="invoice-generator.html">Invoice Generator</a><a href="word-to-pdf.html">Word to PDF</a><a href="tax-quiz.html">Tax Quiz</a></div>'+
 '<div><h4 data-en="Company" data-hi="कंपनी">Company</h4><a href="about.html">About</a><a href="contact.html">Contact</a><a href="privacy-policy.html">Privacy Policy</a><a href="terms.html">Terms</a></div></div>'+
 '<div class="copy">© 2026 '+NAME+' · cooridorstore.in</div></div></footer>';
function get(k,d){try{return localStorage.getItem(k)||d;}catch(e){return d;}}
function put(k,v){try{localStorage.setItem(k,v);}catch(e){}}
document.addEventListener('DOMContentLoaded',function(){
 var h=document.getElementById('site-header'),f=document.getElementById('site-footer');
 if(h)h.outerHTML=header; if(f)f.outerHTML=footer;
 document.title=document.title.replace(/Cooridor Store/g,NAME);
 document.querySelectorAll('.dd>button').forEach(function(b){b.onclick=function(e){e.stopPropagation();var p=b.parentNode,o=p.classList.contains('open');document.querySelectorAll('.dd').forEach(function(d){d.classList.remove('open')});if(!o)p.classList.add('open');}});
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
