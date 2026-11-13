(function(){
var LOGO='';
var BRAND=''+LOGO+' Cooridor StoreTAX · GST · ACCOUNTS';
function m(href,icon,en,hi,sen,shi){return ''+icon+''+en+''+sen+'';}
var header='';
var footer=''+BRAND+' Free, accurate and private tax & accounting tools for India.'+
' Calculators GSTIncome TaxHRATDS'+
' Tools InvoiceWord to PDFBlog'+
' Company AboutContactPrivacy PolicyTerms'+
' © 2026 Cooridor Store · cooridorstore.in';
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
