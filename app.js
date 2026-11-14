(function(){var id='G-BXNLHN3GQX';var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id='+id;document.head.appendChild(s);window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments);};gtag('js',new Date());gtag('config',id);})();
(function(){
/* ===== नाम यहीं बदलिए ===== */
var NAME='Cooridor Store';
var TAG='ACCOUNTS · TAX · PDF';
/* ========================== */
var css=document.createElement('style');css.textContent='.ftr-g.f5{grid-template-columns:repeat(5,1fr)}@media(max-width:860px){.ftr-g.f5{grid-template-columns:1fr 1fr}}';document.head.appendChild(css);
var LOGO='<svg width="36" height="36" viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="10" fill="#0b3d91"/><path d="M27 13.5A9.5 9.5 0 1 0 27 26.5" fill="none" stroke="#fff" stroke-width="3.6" stroke-linecap="round"/><path d="M17 20.5l3 3 6-6.5" fill="none" stroke="#34d399" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
function m(h,i,en,hi,sen,shi){return '<a href="'+h+'"><b style="font-size:1.15rem;width:24px;text-align:center">'+i+'</b><div><div data-en="'+en+'" data-hi="'+hi+'">'+en+'</div><span data-en="'+sen+'" data-hi="'+shi+'">'+sen+'</span></div></a>';}
function dd(en,hi,items){return '<div class="dd"><button type="button" data-en="'+en+' ▾" data-hi="'+hi+' ▾">'+en+' ▾</button><div class="menu">'+items+'</div></div>';}
function col(en,hi,links){return '<div><h4 data-en="'+en+'" data-hi="'+hi+'">'+en+'</h4>'+links.map(function(l){return '<a href="'+l[0]+'">'+l[1]+'</a>';}).join('')+'</div>';}
var brand='<a href="/" class="brand" style="color:var(--txt)">'+LOGO+'<div class="brand-t">'+NAME+'<small>'+TAG+'</small></div></a>';
var header='<header class="hdr"><div class="container">'+brand+'<nav class="nav" id="nav">'+
 dd('Calculators','कैलकुलेटर',
  m('gst-calculator.html','🧮','GST Calculator','GST कैलकुलेटर','Add or remove GST','GST जोड़ें या निकालें')+
  m('gst-late-fee-calculator.html','⏰','GST Late Fee','GST लेट फ़ीस','Late fee and interest','लेट फ़ीस और ब्याज')+
  m('income-tax-calculator.html','📊','Income Tax','इनकम टैक्स','Old vs new regime','पुरानी बनाम नई रिजीम')+
  m('hra-calculator.html','🏠','HRA Calculator','HRA कैलकुलेटर','Exempt and taxable HRA','छूट और टैक्सेबल HRA')+
  m('tds-calculator.html','✂️','TDS Calculator','TDS कैलकुलेटर','TDS by section','सेक्शन के हिसाब से TDS')+
  m('emi-calculator.html','🏦','EMI Calculator','EMI कैलकुलेटर','Loan EMI and schedule','लोन EMI और शेड्यूल')+
  m('sip-calculator.html','📈','SIP Calculator','SIP कैलकुलेटर','SIP returns with step-up','step-up के साथ SIP रिटर्न'))+
 dd('Reconciliation','रिकंसिलिएशन',
  m('gstr-2b-reconciliation.html','🔄','GSTR-2B Reconciliation','GSTR-2B रिकंसिलिएशन','Purchase register vs 2B','परचेज़ रजिस्टर बनाम 2B')+
  m('gstr-1-einvoice-reconciliation.html','🧾','GSTR-1 vs e-Invoice','GSTR-1 बनाम ई-इनवॉइस','Find missing e-invoices','छूटे ई-इनवॉइस खोजें')+
  m('bank-reconciliation.html','🏦','Bank Reconciliation','बैंक रिकंसिलिएशन','Statement vs ledger, BRS','स्टेटमेंट बनाम लेजर, BRS'))+
 dd('Generators','जनरेटर',
  m('invoice-generator.html','🧾','GST Invoice Generator','GST इनवॉइस जनरेटर','Create and print invoices','इनवॉइस बनाएँ और प्रिंट करें')+
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
 '<div class="tools"><div class="seg"><button type="button" id="l-en">EN</button><button type="button" id="l-hi">हिं</button></div><button type="button" class="icon-btn" id="theme" aria-label="Dark mode">🌙</button></div></nav><button type="button" class="icon-btn burger" id="burger" aria-label="Menu">☰</button></div></header>';
var footer='<footer class="ftr"><div class="container">'+
 '<div style="margin-bottom:26px">'+brand+'<p style="margin-top:12px" data-en="Free tax, accounting, finance and PDF tools for India. No signup, nothing uploaded." data-hi="भारत के लिए फ्री टैक्स, अकाउंटिंग, फ़ाइनेंस और PDF टूल्स। बिना साइनअप, कुछ अपलोड नहीं।">Free tax, accounting, finance and PDF tools for India. No signup, nothing uploaded.</p></div>'+
 '<div class="ftr-g f5">'+
 col('Calculators','कैलकुलेटर',[['gst-calculator.html','GST'],['gst-late-fee-calculator.html','GST Late Fee'],['income-tax-calculator.html','Income Tax'],['hra-calculator.html','HRA'],['tds-calculator.html','TDS'],['emi-calculator.html','EMI'],['sip-calculator.html','SIP'],['tax-quiz.html','Tax Quiz'],['accounting-games.html','Games']])
 col('Reconciliation','रिकंसिलिएशन',[['gstr-2b-reconciliation.html','GSTR-2B Reco'],['gstr-1-einvoice-reconciliation.html','GSTR-1 vs e-Invoice'],['bank-reconciliation.html','Bank Reco']])+
 col('Generators','जनरेटर',[['invoice-generator.html','Invoice Generator'],['rent-receipt-generator.html','Rent Receipt'],['tally-import.html','Invoices to Tally']])+
 col('PDF Tools','PDF टूल्स',[['bank-statement-pdf-to-excel.html','Bank Statement to Excel'],['word-to-pdf.html','Word to PDF'],['pdf-to-word.html','PDF to Word'],['compress-pdf.html','Compress PDF'],['merge-pdf.html','Merge PDF']])+
 col('Company','कंपनी',[['about.html','About'],['contact.html','Contact'],['privacy-policy.html','Privacy Policy'],['terms.html','Terms']])+
 '</div><div class="copy">© 2026 '+NAME+' · cooridorstore.in</div></div></footer>';
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
