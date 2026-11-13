(function(){
var LOGO='<svg width="38" height="38" viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="10" fill="var(--pri)"/><path d="M26 13.5a9 9 0 1 0 0 13" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round"/><path d="M19 20.5l2.6 2.6 5.4-5.6" fill="none" stroke="var(--acc)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
var BRAND='<a href="/" class="brand">'+LOGO+'<div class="brand-t">Cooridor Store<small>TAX · GST · ACCOUNTS</small></div></a>';
function m(href,icon,en,hi,sen,shi){return '<a href="'+href+'">'+icon+'<div><b data-en="'+en+'" data-hi="'+hi+'">'+en+'</b><span data-en="'+sen+'" data-hi="'+shi+'">'+sen+'</span></div></a>';}
var header='<header class="hdr"><div class="container">'+BRAND+
'<nav class="nav" id="nav">'+
'<div class="dd"><button data-en="Tax Calculators ▾" data-hi="टैक्स कैलकुलेटर ▾">Tax Calculators ▾</button><div class="menu">'+
 m('gst-calculator.html','🧮','GST Calculator','GST कैलकुलेटर','Add or remove GST','GST जोड़ें या निकालें')+
 m('income-tax-calculator.html','📊','Income Tax Calculator','इनकम टैक्स कैलकुलेटर','Old vs new regime','पुरानी बनाम नई रिजीम')+
 m('hra-calculator.html','🏠','HRA Calculator','HRA कैलकुलेटर','Tax-free HRA','टैक्स-फ़्री HRA')+
 m('tds-calculator.html','✂️','TDS Calculator','TDS कैलकुलेटर','Section-wise TDS','सेक्शन के हिसाब से TDS')+
'</div></div>'+
'<div class="dd"><button data-en="Reconciliation ▾" data-hi="रिकंसिलिएशन ▾">Reconciliation ▾</button><div class="menu">'+
 m('gstr-2b-reconciliation.html','🔄','GSTR-2B Reconciliation','GSTR-2B रिकंसिलिएशन','Match 2B with purchase books','2B को परचेज़ बुक्स से मिलाएँ')+
 m('bank-reconciliation.html','🏦','Bank Reconciliation','बैंक रिकंसिलिएशन','Auto BRS from Excel','Excel से ऑटो BRS')+
 m('tally-import.html','📥','Invoices to Tally','इनवॉइस से Tally','Tally-ready import file','Tally इम्पोर्ट फ़ाइल')+
 m('gstr-1-einvoice-reconciliation.html','🧾','GSTR-1 vs e-Invoice','GSTR-1 बनाम ई-इनवॉइस','Find missing e-invoices','छूटे ई-इनवॉइस खोजें')+
 '</div></div>'+
'<div class="dd"><button data-en="Generators ▾" data-hi="जनरेटर ▾">Generators ▾</button><div class="menu">'+
 m('invoice-generator.html','🧾','GST Invoice','GST इनवॉइस','Create & download PDF','बनाएँ और PDF लें')+
 m('word-to-pdf.html','📄','Word to PDF','Word से PDF','Convert .docx files','.docx फ़ाइल बदलें')+
'</div></div>'+
'<div class="dd"><button data-en="Learn ▾" data-hi="सीखें ▾">Learn ▾</button><div class="menu">'+
 m('blog.html','📚','Guides & Blog','गाइड और ब्लॉग','Tax made simple','टैक्स आसान भाषा में')+
'</div></div>'+
'<div class="tools"><div class="seg"><button id="l-en">EN</button><button id="l-hi">हिं</button></div><button class="icon-btn" id="theme" title="Dark mode">🌙</button></div>'+
'</nav><button class="icon-btn burger" id="burger">☰</button></div></header>';
var footer='<footer class="ftr"><div class="container"><div class="ftr-g"><div>'+BRAND+'<p style="margin-top:12px" data-en="Free, accurate and private tax & accounting tools for India." data-hi="भारत के लिए फ्री, सटीक और सुरक्षित टैक्स व अकाउंटिंग टूल्स।">Free, accurate and private tax & accounting tools for India.</p></div>'+
'<div><h4 data-en="Calculators" data-hi="कैलकुलेटर">Calculators</h4><a href="gst-calculator.html">GST</a><a href="income-tax-calculator.html">Income Tax</a><a href="hra-calculator.html">HRA</a><a href="tds-calculator.html">TDS</a></div>'+
'<div><h4 data-en="Tools" data-hi="टूल्स">Tools</h4><a href="gstr-2b-reconciliation.html">GSTR-2B Reco</a><a href="bank-reconciliation.html">Bank Reco</a><a href="invoice-generator.html">Invoice</a><a href="word-to-pdf.html">Word to PDF</a></div>'+
'<div><h4 data-en="Company" data-hi="कंपनी">Company</h4><a href="about.html">About</a><a href="contact.html">Contact</a><a href="privacy-policy.html">Privacy Policy</a><a href="terms.html">Terms</a></div>'+
'</div><div class="copy">© 2026 Cooridor Store · cooridorstore.in</div></div></footer>';
document.addEventListener('DOMContentLoaded',function(){
 var h=document.getElementById('site-header'),f=document.getElementById('site-footer');
 if(h)h.outerHTML=header; if(f)f.outerHTML=footer;
 document.querySelectorAll('.dd>button').forEach(function(b){b.onclick=function(e){e.stopPropagation();var p=b.parentNode,o=p.classList.contains('open');document.querySelectorAll('.dd').forEach(function(d){d.classList.remove('open')});if(!o)p.classList.add('open');}});
 document.addEventListener('click',function(){document.querySelectorAll('.dd').forEach(function(d){d.classList.remove('open')})});
 document.getElementById('burger').onclick=function(){document.getElementById('nav').classList.toggle('show')};
 document.getElementById('l-en').onclick=function(){setLang('en')};
 document.getElementById('l-hi').onclick=function(){setLang('hi')};
 document.getElementById('theme').onclick=function(){setTheme(document.documentElement.dataset.theme==='dark'?'light':'dark')};
 setTheme(localStorage.getItem('theme')||'light'); setLang(localStorage.getItem('lang')||'en');
});
function setTheme(t){document.documentElement.dataset.theme=t;localStorage.setItem('theme',t);var b=document.getElementById('theme');if(b)b.textContent=t==='dark'?'☀️':'🌙';}
window.setLang=function(l){localStorage.setItem('lang',l);document.documentElement.lang=l;
 document.querySelectorAll('[data-en]').forEach(function(e){e.innerHTML=e.getAttribute('data-'+l)});
 document.querySelectorAll('[data-ph-en]').forEach(function(e){e.placeholder=e.getAttribute('data-ph-'+l)});
 var a=document.getElementById('l-en'),b=document.getElementById('l-hi');if(a){a.className=l==='en'?'on':'';b.className=l==='hi'?'on':'';}
 document.dispatchEvent(new Event('langchange'));};
})();
