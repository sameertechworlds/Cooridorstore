/* Cooridor Store – E-commerce Reconciliation engine (runs fully in the browser) */
(function(root){
'use strict';

/* ---------- platforms ---------- */
var PLATFORMS={
 amazon:{name:'Amazon',kw:['amazon','amzn']},
 flipkart:{name:'Flipkart',kw:['flipkart','fkrt']},
 meesho:{name:'Meesho',kw:['meesho','fashnear']},
 myntra:{name:'Myntra',kw:['myntra']},
 jiomart:{name:'JioMart',kw:['jiomart','jio mart','reliance retail']}
};
function canonPlatform(v){
 var s=String(v||'').toLowerCase();
 if(!s.trim())return '';
 for(var k in PLATFORMS){if(PLATFORMS[k].kw.some(function(w){return s.indexOf(w)>-1;}))return PLATFORMS[k].name;}
 return String(v).trim().replace(/\b\w/g,function(c){return c.toUpperCase();});
}
function bankPlatform(narr){
 var s=String(narr||'').toLowerCase();
 for(var k in PLATFORMS){if(PLATFORMS[k].kw.some(function(w){return s.indexOf(w)>-1;}))return PLATFORMS[k].name;}
 return '';
}

/* ---------- field definitions with header aliases ---------- */
var PF={k:'platform',en:'Platform / channel',opt:1,al:['platform','channel','marketplace','portal','sales channel']};
var FIELDS={
 orders:[PF,
  {k:'order',en:'Order ID',al:['order id','orderid','order no','order number','sub order no','suborder no','sub order id','order item id','amazon order id','order-id','order ref']},
  {k:'invoice',en:'Invoice No',opt:1,al:['invoice no','invoice number','invoice id','invoice num','bill no','invoice']},
  {k:'date',en:'Order / invoice date',opt:1,al:['order date','invoice date','order created date','purchase date','dispatch date','date']},
  {k:'type',en:'Type (Sale / Return)',opt:1,al:['transaction type','event type','order status','type','status','txn type','event']},
  {k:'taxable',en:'Taxable value',opt:1,al:['taxable value','taxable amount','tax exclusive gross','net taxable value','taxable','value before tax']},
  {k:'gst',en:'GST amount',opt:1,al:['gst amount','total tax amount','total tax','tax amount','gst']},
  {k:'total',en:'Invoice value (incl. GST)',al:['invoice value','invoice amount','final invoice amount','total invoice value','order value','total amount','sale amount','selling price','total','amount']}
 ],
 books:[PF,
  {k:'invoice',en:'Voucher / invoice No',al:['voucher no','vch no','voucher number','invoice no','invoice number','bill no','reference no','ref no','invoice']},
  {k:'order',en:'Order ID (if recorded)',opt:1,al:['order id','order no','order number','sub order no','order ref']},
  {k:'date',en:'Date',opt:1,al:['voucher date','invoice date','date']},
  {k:'taxable',en:'Taxable value',opt:1,al:['taxable value','taxable amount','assessable value']},
  {k:'gst',en:'GST amount',opt:1,al:['gst amount','tax amount','total tax','gst']},
  {k:'total',en:'Invoice value (incl. GST)',al:['invoice value','invoice amount','gross total','net amount','total amount','total','amount','debit']}
 ],
 settle:[PF,
  {k:'order',en:'Order ID',al:['order id','order-id','sub order no','suborder no','order item id','amazon order id','order no','order number']},
  {k:'date',en:'Settlement / payment date',opt:1,al:['settlement date','payment date','payout date','deposit date','posted date','transfer date','date']},
  {k:'utr',en:'UTR / payment reference',opt:1,al:['utr','utr no','neft id','neft no','payment ref','payment reference','settlement id','bank ref','reference id','transaction id']},
  {k:'value',en:'Order / sale value',opt:1,al:['order value','sale amount','product sales','principal','total sale amount','invoice value','gross amount','sale value','selling price']},
  {k:'commission',en:'Commission',opt:1,al:['commission','referral fee','marketplace fee','platform fee','selling fee','commission fee']},
  {k:'shipping',en:'Shipping / fulfilment fee',opt:1,al:['shipping fee','shipping charges','fulfilment fee','fulfillment fee','fba fee','logistics fee','delivery charges','shipping']},
  {k:'other',en:'Other fees & penalties',opt:1,al:['other charges','other fees','closing fee','fixed fee','collection fee','penalty','ads fee','other fee','other']},
  {k:'feegst',en:'GST on fees',opt:1,al:['gst on fees','gst on commission','gst on charges','tax on fees','fee gst']},
  {k:'tcs',en:'TCS (GST)',opt:1,al:['tcs amount','gst tcs','tcs deducted','tcs']},
  {k:'tds',en:'TDS (income tax)',opt:1,al:['tds amount','tds deducted','194o','tds']},
  {k:'refund',en:'Refund / return amount',opt:1,al:['refund amount','return amount','customer refund','refund','rto charges','return value']},
  {k:'net',en:'Net settlement (paid to you)',opt:1,al:['net settlement','final settlement amount','bank settlement value','settlement value','net payout','payout amount','amount settled','net payable','net amount']}
 ],
 bank:[
  {k:'date',en:'Date',al:['transaction date','txn date','tran date','value date','date']},
  {k:'narration',en:'Narration',al:['narration','description','particulars','transaction details','remarks','details']},
  {k:'credit',en:'Credit / deposit',al:['credit amount','credit','deposits','deposit','cr amount','cr']},
  {k:'ref',en:'Reference / UTR',opt:1,al:['chq/ref no','ref no','reference no','reference','utr','cheque no']}
 ],
 tcs:[PF,
  {k:'month',en:'Month / period',opt:1,al:['tax period','return period','period','month']},
  {k:'net',en:'Net value of supplies',opt:1,al:['net amount liable for tcs','net value of supplies','net value','net amount']},
  {k:'tcs',en:'TCS amount',opt:1,al:['total tcs','tcs amount','tcs']},
  {k:'igst',en:'IGST (TCS)',opt:1,al:['igst','integrated tax']},
  {k:'cgst',en:'CGST (TCS)',opt:1,al:['cgst','central tax']},
  {k:'sgst',en:'SGST (TCS)',opt:1,al:['sgst','state tax','sgst/utgst']}
 ],
 bfees:[PF,
  {k:'head',en:'Ledger / head',al:['ledger name','ledger','head','particulars','account']},
  {k:'amount',en:'Amount',al:['closing balance','amount','balance','debit','value']}
 ]
};
var SETS=[
 {k:'orders',en:'Platform orders / sales report',hi:'प्लेटफ़ॉर्म ऑर्डर / सेल्स रिपोर्ट',req:1,sheet:'1_Platform_Orders'},
 {k:'books',en:'Sales register from your books',hi:'आपकी books का सेल्स रजिस्टर',req:1,sheet:'2_Books_Sales'},
 {k:'settle',en:'Payment / settlement report',hi:'पेमेंट / सेटलमेंट रिपोर्ट',sheet:'3_Settlement'},
 {k:'bank',en:'Bank statement',hi:'बैंक स्टेटमेंट',sheet:'4_Bank'},
 {k:'tcs',en:'Platform TCS report (GSTR-8 / 2A)',hi:'प्लेटफ़ॉर्म TCS रिपोर्ट (GSTR-8 / 2A)',sheet:'5_Platform_TCS'},
 {k:'bfees',en:'Fees & TCS ledgers from books',hi:'books के फ़ीस और TCS लेजर',sheet:'6_Books_Fees_TCS'}
];

/* ---------- helpers ---------- */
function nh(s){return String(s==null?'':s).toLowerCase().replace(/[^a-z0-9]/g,'');}
function key(s){return String(s==null?'':s).toUpperCase().replace(/[^A-Z0-9]/g,'');}
function num(v){
 if(v==null||v==='')return 0;
 if(typeof v==='number')return isFinite(v)?v:0;
 var s=String(v).replace(/₹|rs\.?|inr/gi,'').trim();if(!s)return 0;
 var neg=/^\(.*\)$/.test(s)||/\bdr\.?$/i.test(s)||/^-/.test(s.replace(/\s/g,''));
 var n=parseFloat(s.replace(/[^0-9.]/g,''));
 if(!isFinite(n))return 0;
 return neg?-n:n;
}
function r2(n){return Math.round(n*100)/100;}
var MON='janfebmaraprmayjunjulaugsepoctnovdec';
function pd(v){
 if(v==null||v==='')return null;
 if(v instanceof Date)return isNaN(v)?null:v;
 if(typeof v==='number'){
  if(v>20000&&v<80000){var u=new Date(Math.round((v-25569)*864e5));return new Date(u.getUTCFullYear(),u.getUTCMonth(),u.getUTCDate());}
  return null;
 }
 var s=String(v).trim(),m;
 if((m=s.match(/^(\d{4})[-\/.](\d{1,2})[-\/.](\d{1,2})/)))return new Date(+m[1],m[2]-1,+m[3]);
 if((m=s.match(/^(\d{1,2})[-\/.](\d{1,2})[-\/.](\d{2,4})/))){var y=+m[3];if(y<100)y+=2000;return new Date(y,m[2]-1,+m[1]);}
 if((m=s.match(/^(\d{1,2})[\s\-]+([A-Za-z]{3})[A-Za-z]*[\s\-,]+(\d{2,4})/))){var mo=MON.indexOf(m[2].toLowerCase());if(mo>=0&&mo%3===0){var y2=+m[3];if(y2<100)y2+=2000;return new Date(y2,mo/3,+m[1]);}}
 if((m=s.match(/^([A-Za-z]{3})[A-Za-z]*\s+(\d{1,2}),?\s+(\d{4})/))){var mo2=MON.indexOf(m[1].toLowerCase());if(mo2>=0&&mo2%3===0)return new Date(+m[3],mo2/3,+m[2]);}
 return null;
}
function dn(d){return d?Math.round(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())/864e5):null;}
function fd(d){if(!d)return '';var z=function(x){return (x<10?'0':'')+x;};return z(d.getDate())+'-'+z(d.getMonth()+1)+'-'+d.getFullYear();}
function isReturn(t){return /return|refund|credit note|reverse/i.test(String(t||''));}
function isCancel(t){return /rto|cancel/i.test(String(t||''));}

/* ---------- header detection & mapping ---------- */
function aliasScore(h,al){
 var x=nh(h);if(!x)return 0;
 for(var i=0;i<al.length;i++){var a=nh(al[i]);if(x===a)return 100-i;}
 for(var j=0;j<al.length;j++){var b=nh(al[j]);if(b.length>=4&&x.indexOf(b)>-1)return 50-j;}
 return 0;
}
function detectHeader(rows,setKey){
 var fields=FIELDS[setKey],best=-1,bestScore=0,lim=Math.min(rows.length,25);
 for(var r=0;r<lim;r++){
  var row=rows[r]||[],sc=0;
  fields.forEach(function(f){for(var c=0;c<row.length;c++){if(aliasScore(row[c],f.al)>0){sc++;break;}}});
  if(sc>bestScore){bestScore=sc;best=r;}
 }
 return bestScore>=2||(bestScore>=1&&fields.length<=3)?best:0;
}
function autoMap(headers,setKey){
 var map={},used={};
 var cand=[];
 FIELDS[setKey].forEach(function(f){headers.forEach(function(h,c){var s=aliasScore(h,f.al);if(s>0)cand.push({f:f.k,c:c,s:s+(f.opt?0:0.5)});});});
 cand.sort(function(a,b){return b.s-a.s;});
 cand.forEach(function(x){if(map[x.f]==null&&!used[x.c]){map[x.f]=x.c;used[x.c]=1;}});
 return map;
}
/* Amazon-style long settlement (one row per amount-description) */
function isLongSettlement(headers){
 var h=headers.map(nh);
 return h.indexOf('amountdescription')>-1&&h.indexOf('amount')>-1&&(h.indexOf('orderid')>-1);
}
function pivotLong(headers,rows){
 var h=headers.map(nh),ci=function(n){return h.indexOf(n);};
 var cO=ci('orderid'),cD=ci('amountdescription'),cA=ci('amount'),cT=ci('transactiontype'),cDt=ci('postedate')>-1?ci('postedate'):ci('posteddate')>-1?ci('posteddate'):ci('postedatetime'),cS=ci('settlementid');
 var byO={},out=[];
 rows.forEach(function(r){
  var o=r[cO];if(!o)return;var d=String(r[cD]||'').toLowerCase(),a=num(r[cA]),t=cT>-1?String(r[cT]||'').toLowerCase():'';
  var x=byO[o]||(byO[o]={platform:'Amazon',order:o,date:cDt>-1?r[cDt]:'',utr:cS>-1?r[cS]:'',value:0,commission:0,shipping:0,other:0,feegst:0,tcs:0,tds:0,refund:0,net:0});
  x.net+=a;
  if(/tcs/.test(d))x.tcs+=-a;
  else if(/tds/.test(d))x.tds+=-a;
  else if(t.indexOf('refund')>-1&&/principal|tax|product|price/.test(d))x.refund+=-a;
  else if(/commission|referral/.test(d))x.commission+=-a;
  else if(/fba|shipping|weight|pick|fulfil|fulfill|delivery/.test(d))x.shipping+=-a;
  else if(/principal|itemprice|product|tax/.test(d))x.value+=a;
  else x.other+=-a;
 });
 for(var k in byO)out.push(byO[k]);
 return out;
}

/* ---------- parse a sheet (array of arrays) into records ---------- */
function parseRows(aoa,setKey,manualMap){
 aoa=(aoa||[]).filter(function(r){return r&&r.some(function(c){return String(c).trim()!=='';});});
 if(!aoa.length)return {headers:[],map:{},records:[],headerRow:0};
 var hr=detectHeader(aoa,setKey),headers=(aoa[hr]||[]).map(function(x){return String(x).trim();}),body=aoa.slice(hr+1);
 if(setKey==='settle'&&isLongSettlement(headers)){
  var recs=pivotLong(headers,body);
  return {headers:headers,map:{},records:recs,headerRow:hr,long:true};
 }
 var map=manualMap||autoMap(headers,setKey),records=[];
 body.forEach(function(r){
  var o={};
  FIELDS[setKey].forEach(function(f){o[f.k]=map[f.k]!=null?r[map[f.k]]:'';});
  records.push(o);
 });
 return {headers:headers,map:map,records:records,headerRow:hr};
}
function remap(parsed,setKey,map,aoa){return parseRows(aoa,setKey,map);}

/* ---------- reconciliation ---------- */
function platOf(rec,fixed){return fixed||canonPlatform(rec.platform)||'Other';}
function keepPlatform(rec,cfg){
 if(!cfg.platform||cfg.platform==='ALL')return true;
 var p=String(rec.platform||'').trim();
 if(!p)return true;
 return canonPlatform(p)===cfg.platformName;
}

function reconcile(data,cfg){
 cfg=cfg||{};
 var tol=cfg.tol!=null?cfg.tol:1,tcsRate=cfg.tcsRate!=null?cfg.tcsRate:0.5,tdsRate=cfg.tdsRate!=null?cfg.tdsRate:0.1,win=cfg.window!=null?cfg.window:7;
 var single=cfg.platform&&cfg.platform!=='ALL',fixed=single?cfg.platformName:'';
 var R={platforms:{},orders:[],settle:[],bank:[],bankExtra:[],fees:[],tcs:[],has:{}};
 function P(p){return R.platforms[p]||(R.platforms[p]={name:p,platSales:0,platReturns:0,platTaxable:0,booksSales:0,ordersN:0,matched:0,mismatch:0,missingBooks:0,missingBooksAmt:0,extraBooks:0,extraBooksAmt:0,settledValue:0,netPayout:0,commission:0,shipping:0,other:0,feegst:0,tcs:0,tds:0,refund:0,unsettledN:0,unsettledAmt:0,bankExpected:0,bankMatched:0,bankMissingN:0,platTcsReport:null,booksFees:{commission:0,shipping:0,other:0,feegst:0,tcs:0,tds:0},hasBooksFees:false});}
 var orders=(data.orders||[]).filter(function(r){return key(r.order)&&keepPlatform(r,cfg);});
 var books=(data.books||[]).filter(function(r){return (key(r.invoice)||key(r.order))&&keepPlatform(r,cfg);});
 var settle=(data.settle||[]).filter(function(r){return key(r.order)&&keepPlatform(r,cfg);});
 var bank=(data.bank||[]).filter(function(r){return num(r.credit)>0;});
 var tcsRows=(data.tcs||[]).filter(function(r){return keepPlatform(r,cfg);});
 var bfees=(data.bfees||[]).filter(function(r){return String(r.head||'').trim()&&keepPlatform(r,cfg);});
 R.has={orders:orders.length>0,books:books.length>0,settle:settle.length>0,bank:bank.length>0,tcs:tcsRows.length>0,bfees:bfees.length>0};

 /* 1. orders aggregated by order key */
 var oAgg={},oList=[];
 orders.forEach(function(r){
  var k=key(r.order),tot=num(r.total),tx=num(r.taxable),g=num(r.gst);
  if(!tot&&(tx||g))tot=tx+g;
  var ret=isReturn(r.type),can=!ret&&isCancel(r.type);
  if(ret){tot=-Math.abs(tot);tx=-Math.abs(tx);}
  var p=platOf(r,fixed);
  var a=oAgg[k];
  if(!a){a=oAgg[k]={k:k,order:String(r.order).trim(),invoice:String(r.invoice||'').trim(),date:pd(r.date),platform:p,total:0,taxable:0,sale:0,ret:0,saleN:0,canN:0,canAmt:0,canTx:0};oList.push(a);}
  if(can){a.canN++;a.canAmt+=Math.abs(tot);a.canTx+=Math.abs(tx);}
  else{a.total+=tot;a.taxable+=tx;if(ret)a.ret+=tot;else{a.sale+=tot;a.saleN++;}}
  if(!a.invoice&&r.invoice)a.invoice=String(r.invoice).trim();
 });
 /* RTO / cancelled: with a sale row it reverses the sale; on its own it means no sale */
 oList.forEach(function(a){
  if(a.canN&&a.saleN){a.total-=a.canAmt;a.taxable-=a.canTx;a.ret-=a.canAmt;}
  a.cancelOnly=a.canN>0&&a.saleN===0&&a.ret===0;
  var pp=P(a.platform);pp.platSales+=a.sale;pp.platReturns+=a.ret;pp.platTaxable+=a.taxable;
 });
 /* books indexes */
 var bAgg={},bList=[],byOrder={},byInv={};
 books.forEach(function(r){
  var ik=key(r.invoice),ok=key(r.order),k=ik||('O'+ok),tot=num(r.total);
  if(!tot)tot=num(r.taxable)+num(r.gst);
  var p=platOf(r,fixed);
  var b=bAgg[k];
  if(!b){b=bAgg[k]={k:k,invoice:String(r.invoice||'').trim(),order:String(r.order||'').trim(),date:pd(r.date),platform:p,total:0,used:false};bList.push(b);}
  b.total+=tot;
  if(ik)byInv[ik]=b;
  if(ok)(byOrder[ok]=byOrder[ok]||[]).push(b);
  P(p).booksSales+=tot;
 });
 oList.forEach(function(a){
  var pp=P(a.platform);pp.ordersN++;
  var hits=[];
  if(byOrder[a.k])hits=byOrder[a.k].filter(function(b){return !b.used;});
  if(!hits.length){var ik=key(a.invoice);if(ik&&byInv[ik]&&!byInv[ik].used)hits=[byInv[ik]];}
  if(!hits.length&&byInv[a.k]&&!byInv[a.k].used)hits=[byInv[a.k]];
  var bt=0;hits.forEach(function(b){b.used=true;bt+=b.total;});
  var row={platform:a.platform,order:a.order,invoice:a.invoice,date:fd(a.date),platform_amt:r2(a.total),books_amt:hits.length?r2(bt):null,books_ref:hits.map(function(b){return b.invoice||b.order;}).join(', '),diff:0,status:''};
  if(!hits.length&&a.cancelOnly){row.status='RTO / cancelled, no sale';row.diff=0;}
  else if(!hits.length){row.status='Missing in books';row.diff=r2(a.total);pp.missingBooks++;pp.missingBooksAmt+=a.total;}
  else{row.diff=r2(a.total-bt);if(Math.abs(row.diff)<=tol){row.status='Matched';pp.matched++;}else{row.status='Amount differs';pp.mismatch++;}}
  R.orders.push(row);
 });
 bList.forEach(function(b){
  if(b.used)return;
  var pp=P(b.platform);pp.extraBooks++;pp.extraBooksAmt+=b.total;
  R.orders.push({platform:b.platform,order:b.order,invoice:b.invoice,date:fd(b.date),platform_amt:null,books_amt:r2(b.total),books_ref:b.invoice||b.order,diff:r2(-b.total),status:'In books, not on platform'});
 });

 /* 2. settlement vs orders */
 var sAgg={},sList=[];
 settle.forEach(function(r){
  var k=key(r.order),p=platOf(r,fixed);
  var s=sAgg[k];
  if(!s){s=sAgg[k]={k:k,order:String(r.order).trim(),platform:p,date:pd(r.date),utr:String(r.utr||'').trim(),value:0,commission:0,shipping:0,other:0,feegst:0,tcs:0,tds:0,refund:0,net:0,netGiven:false,lines:[]};sList.push(s);}
  var v=num(r.value),c=Math.abs(num(r.commission)),sh=Math.abs(num(r.shipping)),ot=num(r.other),fg=Math.abs(num(r.feegst)),tc=Math.abs(num(r.tcs)),td=Math.abs(num(r.tds)),rf=Math.abs(num(r.refund));
  ot=Math.abs(ot);
  var hasNet=String(r.net==null?'':r.net).trim()!=='';
  var n=hasNet?num(r.net):v-c-sh-ot-fg-tc-td-rf;
  s.value+=v;s.commission+=c;s.shipping+=sh;s.other+=ot;s.feegst+=fg;s.tcs+=tc;s.tds+=td;s.refund+=rf;s.net+=n;if(hasNet)s.netGiven=true;
  var d=pd(r.date);if(d&&(!s.date||d>s.date))s.date=d;
  if(!s.utr&&r.utr)s.utr=String(r.utr).trim();
  s.lines.push({date:d,utr:String(r.utr||'').trim(),net:n});
 });
 sList.forEach(function(s){
  var pp=P(s.platform);
  pp.settledValue+=s.value;pp.netPayout+=s.net;pp.commission+=s.commission;pp.shipping+=s.shipping;pp.other+=s.other;pp.feegst+=s.feegst;pp.tcs+=s.tcs;pp.tds+=s.tds;pp.refund+=s.refund;
 });
 if(R.has.settle){
  oList.forEach(function(a){
   var s=sAgg[a.k],fees=s?s.commission+s.shipping+s.other+s.feegst:0;
   var row={platform:a.platform,order:a.order,order_value:r2(a.total),settled_value:s?r2(s.value):null,fees:s?r2(fees):null,tcs_tds:s?r2(s.tcs+s.tds):null,refund:s?r2(s.refund):null,net_received:s?r2(s.net):null,fee_pct:s&&s.value?r2(fees/s.value*100):null,status:''};
   if(!s){
    if(a.cancelOnly)row.status='RTO / cancelled, no sale';
    else if(a.total>0){row.status='Payment pending';P(a.platform).unsettledN++;P(a.platform).unsettledAmt+=a.total;}
    else row.status='Return, no payment line';
   }else if(s.value&&Math.abs(s.value-a.total)>tol&&a.total>0)row.status='Settled value differs';
   else if(s.net<0)row.status='Negative payout (return / penalty)';
   else row.status='Settled';
   if(s)s.seen=true;
   R.settle.push(row);
  });
  sList.forEach(function(s){
   if(s.seen)return;
   R.settle.push({platform:s.platform,order:s.order,order_value:null,settled_value:r2(s.value),fees:r2(s.commission+s.shipping+s.other+s.feegst),tcs_tds:r2(s.tcs+s.tds),refund:r2(s.refund),net_received:r2(s.net),fee_pct:s.value?r2((s.commission+s.shipping+s.other+s.feegst)/s.value*100):null,status:'Paid, not in order report'});
  });
 }

 /* 3. payouts vs bank */
 if(R.has.settle){
  var groups={},gl=[];
  sList.forEach(function(s){
   s.lines.forEach(function(l){
    var gk=s.platform+'|'+(l.utr?'U'+key(l.utr):'D'+(l.date?dn(l.date):'NA'));
    var g=groups[gk];
    if(!g){g=groups[gk]={platform:s.platform,utr:l.utr,date:l.date,amount:0,orders:0};gl.push(g);}
    g.amount+=l.net;g.orders++;
    if(l.date&&(!g.date||l.date>g.date))g.date=l.date;
   });
  });
  gl=gl.filter(function(g){return Math.abs(g.amount)>0.005;});
  var bk=bank.map(function(b){var d=pd(b.date);return {date:d,dn:dn(d),narration:String(b.narration||''),ref:String(b.ref||''),amount:num(b.credit),plat:bankPlatform(b.narration+' '+(b.ref||'')),used:false};});
  gl.sort(function(a,b){return (a.date?dn(a.date):0)-(b.date?dn(b.date):0);});
  gl.forEach(function(g){
   var pp=P(g.platform);
   if(g.amount>0)pp.bankExpected+=g.amount;
   var best=null,bestScore=-1;
   if(R.has.bank&&g.amount>0){
    var uk=key(g.utr);
    bk.forEach(function(b){
     if(b.used||Math.abs(b.amount-g.amount)>tol)return;
     if(b.plat&&b.plat!==g.platform)return;
     var sc=0;
     if(uk&&uk.length>=6&&key(b.narration+' '+b.ref).indexOf(uk)>-1)sc+=1000;
     if(b.plat===g.platform)sc+=200;
     if(g.date&&b.dn!=null){var dd=Math.abs(b.dn-dn(g.date));if(dd>win&&sc<1000)return;sc+=100-dd;}
     if(sc>bestScore){bestScore=sc;best=b;}
    });
   }
   var row={platform:g.platform,payout_date:fd(g.date),utr:g.utr,orders:g.orders,expected:r2(g.amount),bank_date:best?fd(best.date):'',bank_amount:best?r2(best.amount):null,narration:best?best.narration:'',status:''};
   if(g.amount<=0)row.status='Negative / nil payout';
   else if(!R.has.bank)row.status='Bank not uploaded';
   else if(best){best.used=true;row.status='Received in bank';pp.bankMatched+=best.amount;}
   else{row.status='Not found in bank';pp.bankMissingN++;}
   R.bank.push(row);
  });
  bk.forEach(function(b){
   if(b.used||!b.plat)return;
   if(single&&b.plat!==fixed)return;
   R.bankExtra.push({platform:b.plat,date:fd(b.date),amount:r2(b.amount),narration:b.narration,status:'Bank credit not in settlement report'});
  });
 }

 /* 4. books fees & TCS */
 bfees.forEach(function(r){
  var h=String(r.head).toLowerCase(),a=Math.abs(num(r.amount)),p=platOf(r,fixed),pp=P(p),b=pp.booksFees;pp.hasBooksFees=true;
  if(/tcs/.test(h))b.tcs+=a;
  else if(/tds|194/.test(h))b.tds+=a;
  else if(/commission|referral|marketplace fee|platform fee/.test(h))b.commission+=a;
  else if(/ship|freight|courier|logistic|delivery|fulfil|fulfill|fba/.test(h))b.shipping+=a;
  else if(/gst|igst|cgst|sgst|input/.test(h))b.feegst+=a;
  else b.other+=a;
 });
 tcsRows.forEach(function(r){
  var p=platOf(r,fixed),pp=P(p),t=num(r.tcs);
  if(!t)t=num(r.igst)+num(r.cgst)+num(r.sgst);
  pp.platTcsReport=(pp.platTcsReport||0)+Math.abs(t);
  pp.tcsNetValue=(pp.tcsNetValue||0)+num(r.net);
 });
 Object.keys(R.platforms).forEach(function(n){
  var p=R.platforms[n],bf=p.booksFees;
  [['commission','Commission'],['shipping','Shipping / fulfilment'],['other','Other fees & penalties'],['feegst','GST on fees'],['tcs','TCS (GST)'],['tds','TDS (income tax)']].forEach(function(h){
   if(!R.has.settle&&!p.hasBooksFees)return;
   R.fees.push({platform:n,head:h[1],platform_amt:r2(p[h[0]]),books_amt:p.hasBooksFees?r2(bf[h[0]]):null,diff:p.hasBooksFees?r2(p[h[0]]-bf[h[0]]):null,status:!p.hasBooksFees?'Books not uploaded':Math.abs(p[h[0]]-bf[h[0]])<=tol?'Matched':'Difference'});
  });
  var netTaxable=p.platTaxable||(p.platSales+p.platReturns)/1.18;
  p.netTaxableUsed=netTaxable;p.taxableEstimated=!p.platTaxable;
  var expTcs=netTaxable*tcsRate/100,expTds=(p.platSales+p.platReturns)*tdsRate/100;
  var tcsPlat=p.platTcsReport!=null?p.platTcsReport:p.tcs;
  R.tcs.push({platform:n,net_taxable:r2(netTaxable),expected_tcs:r2(expTcs),tcs_in_settlement:r2(p.tcs),tcs_in_report:p.platTcsReport!=null?r2(p.platTcsReport):null,tcs_in_books:p.hasBooksFees?r2(bf.tcs):null,diff_books:p.hasBooksFees?r2(tcsPlat-bf.tcs):null,expected_tds:r2(expTds),tds_in_settlement:r2(p.tds),tds_in_books:p.hasBooksFees?r2(bf.tds):null});
 });
 R.list=Object.keys(R.platforms).sort().map(function(n){return R.platforms[n];});
 R.cfg={tol:tol,tcsRate:tcsRate,tdsRate:tdsRate,window:win,platform:cfg.platform,platformName:cfg.platformName};
 return R;
}

/* ---------- template & sample data ---------- */
var TPL={
 orders:['Platform','Order ID','Invoice No','Order Date','Type','Taxable Value','GST Amount','Invoice Value'],
 books:['Platform','Voucher No','Order ID','Date','Taxable Value','GST Amount','Invoice Value'],
 settle:['Platform','Order ID','Settlement Date','UTR','Order Value','Commission','Shipping Fee','Other Charges','GST on Fees','TCS','TDS','Refund','Net Settlement'],
 bank:['Date','Narration','Credit','Ref No'],
 tcs:['Platform','Month','Net Value of Supplies','TCS Amount'],
 bfees:['Platform','Ledger','Amount']
};
function rng(seed){var s=seed||7;return function(){s=(s*9301+49297)%233280;return s/233280;};}
function sample(platformName){
 var plats=platformName&&platformName!=='ALL'?[platformName]:['Amazon','Flipkart','Meesho'];
 var D={orders:[],books:[],settle:[],bank:[],tcs:[],bfees:[]},rnd=rng(11),inv=1001;
 var narr={Amazon:'NEFT-AMAZON SELLER SERVICES',Flipkart:'NEFT-FLIPKART INTERNET PVT LTD',Meesho:'NEFT-FASHNEAR TECHNOLOGIES MEESHO',Myntra:'NEFT-MYNTRA DESIGNS PVT LTD',JioMart:'NEFT-RELIANCE RETAIL JIOMART'};
 plats.forEach(function(pl,pi){
  var pre=pl.slice(0,2).toUpperCase(),feeRate=[0.12,0.15,0.08,0.18,0.1][pi%5],groups=[[],[]],totTcs=0,totTds=0,fee={c:0,s:0,o:0,g:0};
  for(var i=1;i<=12;i++){
   var taxable=Math.round((300+rnd()*1700))*1,gst=r2(taxable*0.05),tot=r2(taxable+gst),oid=pre+'-'+(40000+pi*1000+i),day=1+i,date=new Date(2026,9,day),ino='INV-'+(inv++);
   var ret=(i===9);
   D.orders.push([pl,oid,ino,fd(date),'Sale',taxable,gst,tot]);
   if(ret)D.orders.push([pl,oid,'CN-'+ino,fd(new Date(2026,9,day+6)),'Return',taxable,gst,tot]);
   if(i!==4){var bt=i===7?r2(tot-50):tot;D.books.push([pl,ino,oid,fd(date),i===7?taxable-50:taxable,gst,bt]);}
   if(ret)D.books.push([pl,'CN-'+ino,oid,fd(new Date(2026,9,day+6)),-taxable,-gst,-tot]);
   if(i===11)continue;
   var c=r2(tot*feeRate),s=r2(40+rnd()*40),o=i===5?100:0,g=r2((c+s+o)*0.18),tc=r2(taxable*0.005),td=r2(tot*0.001),rf=ret?tot:0;
   var net=r2(tot-c-s-o-g-tc-td-rf);
   var gi=i<=6?0:1,sdate=new Date(2026,9,gi?24:15),utr='UTR'+(pl.toUpperCase().slice(0,3))+(gi?'2':'1')+'0'+(pi+1)+'778';
   D.settle.push([pl,oid,fd(sdate),utr,tot,c,s,o,g,tc,td,rf,net]);
   groups[gi].push(net);totTcs+=tc;totTds+=td;fee.c+=c;fee.s+=s;fee.o+=o;fee.g+=g;
  }
  groups.forEach(function(g,gi){
   var amt=r2(g.reduce(function(a,b){return a+b;},0)),sdate=new Date(2026,9,gi?24:15),utr='UTR'+(pl.toUpperCase().slice(0,3))+(gi?'2':'1')+'0'+(pi+1)+'778';
   if(gi===1&&pi===0)return; /* one payout not yet in bank */
   D.bank.push([fd(new Date(2026,9,(gi?24:15)+1)),narr[pl]+' '+utr,amt,utr]);
  });
  D.tcs.push([pl,'Oct-2026',0,r2(totTcs)]);
  D.bfees.push([pl,pl+' Commission',r2(fee.c)],[pl,pl+' Shipping Charges',r2(fee.s)],[pl,pl+' Other Charges',r2(fee.o)],[pl,'Input GST on '+pl+' fees',r2(fee.g)],[pl,'TCS Receivable - '+pl,r2(totTcs-(pi===0?5:0))],[pl,'TDS Receivable 194-O - '+pl,r2(totTds)]);
 });
 D.bank.push(['20-10-2026','UPI-RENT RECEIVED',15000,'']);
 return D;
}
function sampleAoa(platformName){
 var D=sample(platformName),A={};
 for(var k in TPL)A[k]=[TPL[k]].concat(D[k]);
 return A;
}

var API={FIELDS:FIELDS,SETS:SETS,TPL:TPL,PLATFORMS:PLATFORMS,parseRows:parseRows,reconcile:reconcile,sample:sample,sampleAoa:sampleAoa,num:num,pd:pd,fd:fd,canonPlatform:canonPlatform};
if(typeof module!=='undefined'&&module.exports){module.exports=API;return;}
root.EcomReco=API;

/* =================== UI =================== */
if(typeof document==='undefined')return;
var CFG=root.ECOM||{platform:'ALL'};
var PN=CFG.platform==='ALL'?'ALL':(PLATFORMS[CFG.platform]?PLATFORMS[CFG.platform].name:CFG.platform);
var STATE={};/* setKey -> {aoa,parsed,file} */
function $(id){return document.getElementById(id);}
function T(en,hi){return document.documentElement.lang==='hi'?hi:en;}
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
function inr(n){if(n==null||n==='')return '–';var v=Math.round(n*100)/100;return (v<0?'−':'')+'₹'+Math.abs(v).toLocaleString('en-IN',{minimumFractionDigits:2,maximumFractionDigits:2});}

function buildUploads(){
 var host=$('ez-up');if(!host)return;
 host.innerHTML=SETS.map(function(s){
  return '<div class="ez-zone" id="z-'+s.k+'"><label class="ez-drop"><input type="file" accept=".xlsx,.xls,.csv" data-set="'+s.k+'"><span class="ez-t"><b data-en="'+s.en+'" data-hi="'+s.hi+'">'+s.en+'</b>'+(s.req?' <em class="ez-req" data-en="required" data-hi="ज़रूरी">required</em>':' <em data-en="optional" data-hi="ज़रूरी नहीं">optional</em>')+'</span><span class="ez-f" id="f-'+s.k+'" data-en="Choose Excel or CSV" data-hi="Excel या CSV चुनिए">Choose Excel or CSV</span></label><div class="ez-map" id="m-'+s.k+'"></div></div>';
 }).join('');
 host.querySelectorAll('input[type=file]').forEach(function(inp){inp.addEventListener('change',function(){if(inp.files[0])readFile(inp.files[0],inp.dataset.set);});});
}
function readWB(file,cb){
 var fr=new FileReader();
 fr.onload=function(){try{cb(XLSX.read(new Uint8Array(fr.result),{type:'array',raw:true,cellDates:false}));}catch(e){alert(T('Could not read this file. Please upload .xlsx, .xls or .csv.','यह फ़ाइल नहीं पढ़ी जा सकी। .xlsx, .xls या .csv डालिए।'));}};
 fr.readAsArrayBuffer(file);
}
function aoaOf(ws){return XLSX.utils.sheet_to_json(ws,{header:1,raw:true,defval:''});}
function readFile(file,setKey){
 readWB(file,function(wb){
  var names=wb.SheetNames,sh=null;
  var want=SETS.filter(function(s){return s.k===setKey;})[0].sheet;
  names.forEach(function(n){if(!sh&&nh(n).indexOf(nh(want).slice(1))>-1)sh=n;});
  if(!sh){var best=0;names.forEach(function(n){var a=aoaOf(wb.Sheets[n]);if(a.length>best){best=a.length;sh=n;}});}
  load(setKey,aoaOf(wb.Sheets[sh]),file.name+(names.length>1?' › '+sh:''));
 });
}
function readTemplate(file){
 readWB(file,function(wb){
  var got=0;
  SETS.forEach(function(s){
   var sh=null;wb.SheetNames.forEach(function(n){if(!sh&&(nh(n)===nh(s.sheet)||nh(n).indexOf(nh(s.sheet).slice(1))>-1))sh=n;});
   if(sh){var a=aoaOf(wb.Sheets[sh]);if(a.length>1){load(s.k,a,file.name+' › '+sh);got++;}}
  });
  if(!got)alert(T('No template sheets found. Use the template, or upload each report separately below.','टेम्पलेट की शीट नहीं मिलीं। टेम्पलेट इस्तेमाल कीजिए, या नीचे हर रिपोर्ट अलग से डालिए।'));
 });
}
function load(setKey,aoa,label){
 var parsed=parseRows(aoa,setKey);
 STATE[setKey]={aoa:aoa,parsed:parsed,label:label};
 $('f-'+setKey).textContent='✓ '+label+' · '+parsed.records.length+' '+T('rows','लाइनें');
 $('z-'+setKey).classList.add('ok');
 drawMap(setKey);
}
function drawMap(setKey){
 var st=STATE[setKey],box=$('m-'+setKey);if(!st||!box)return;
 var p=st.parsed;
 if(p.long){box.innerHTML='<p class="ez-note">'+T('Amazon-style settlement file detected. Amounts are grouped by order automatically.','Amazon जैसी सेटलमेंट फ़ाइल मिली। रकमें ऑर्डर के हिसाब से अपने आप जोड़ी गईं।')+'</p>';return;}
 var miss=FIELDS[setKey].filter(function(f){return !f.opt&&p.map[f.k]==null;});
 var opts=function(sel){return '<option value="">—</option>'+p.headers.map(function(h,i){return '<option value="'+i+'"'+(sel===i?' selected':'')+'>'+esc(h||('Column '+(i+1)))+'</option>';}).join('');};
 box.innerHTML='<details'+(miss.length?' open':'')+'><summary>'+(miss.length?'⚠ '+T('Please choose: ','कृपया चुनिए: ')+miss.map(function(f){return f.en;}).join(', '):T('✓ Columns detected – check or change','✓ कॉलम पहचान लिए – जाँचें या बदलें'))+'</summary><div class="ez-grid">'+
  FIELDS[setKey].map(function(f){return '<label><span>'+f.en+(f.opt?'':' *')+'</span><select data-f="'+f.k+'">'+opts(p.map[f.k])+'</select></label>';}).join('')+'</div></details>';
 box.querySelectorAll('select').forEach(function(sel){sel.addEventListener('change',function(){
  var m={};box.querySelectorAll('select').forEach(function(s){if(s.value!=='')m[s.dataset.f]=+s.value;});
  st.parsed=parseRows(st.aoa,setKey,m);
  $('f-'+setKey).textContent='✓ '+st.label+' · '+st.parsed.records.length+' '+T('rows','लाइनें');
  drawMap(setKey);
 });});
}
function downloadTemplate(){
 var wb=XLSX.utils.book_new(),S=sampleAoa(PN);
 var ins=[['Cooridor Store – E-commerce Reconciliation Template'],[''],['How to use'],['1. Fill each sheet with your data (delete the example rows first). Keep the column names in row 1.'],['2. Platform column: write Amazon, Flipkart, Meesho, Myntra, JioMart or your marketplace name.'],['3. Type column in Orders: write Sale or Return. Returns are subtracted automatically.'],['4. Fees can be positive numbers; the tool treats them as deductions.'],['5. Sheets 3 to 6 are optional. Fill them for payment, bank, fees and TCS reconciliation.'],['6. Upload this file on '+(location?location.href:'cooridorstore.in')+' using "Upload filled template".'],[''],['Your data never leaves your computer. The file is read inside your browser.']];
 var w0=XLSX.utils.aoa_to_sheet(ins);w0['!cols']=[{wch:110}];XLSX.utils.book_append_sheet(wb,w0,'Instructions');
 SETS.forEach(function(s){var ws=XLSX.utils.aoa_to_sheet(S[s.k].slice(0,6));ws['!cols']=TPL[s.k].map(function(h){return {wch:Math.max(14,h.length+4)};});XLSX.utils.book_append_sheet(wb,ws,s.sheet);});
 XLSX.writeFile(wb,'ecommerce-reconciliation-template'+(PN==='ALL'?'':'-'+PN.toLowerCase())+'.xlsx');
}
function loadSample(){
 var S=sampleAoa(PN);
 SETS.forEach(function(s){load(s.k,S[s.k],T('Sample data','सैंपल डेटा'));});
 run();
}
function cfgNow(){
 return {platform:CFG.platform,platformName:PN,tol:num($('ez-tol')?$('ez-tol').value:1),tcsRate:num($('ez-tcs')?$('ez-tcs').value:0.5),tdsRate:num($('ez-tds')?$('ez-tds').value:0.1),window:num($('ez-win')?$('ez-win').value:7)};
}
var LAST=null;
function run(){
 if(!STATE.orders||!STATE.books){alert(T('Please upload at least the platform orders report and your books sales register.','कम से कम प्लेटफ़ॉर्म ऑर्डर रिपोर्ट और books का सेल्स रजिस्टर डालिए।'));return;}
 var data={};SETS.forEach(function(s){data[s.k]=STATE[s.k]?STATE[s.k].parsed.records:[];});
 var R=reconcile(data,cfgNow());LAST=R;render(R);
 var out=$('ez-out');out.hidden=false;out.scrollIntoView({behavior:'smooth',block:'start'});
}
function sum(list,f){return list.reduce(function(a,p){return a+(f(p)||0);},0);}
function card(lbl,val,cls,sub){return '<div class="ez-card '+(cls||'')+'"><span>'+lbl+'</span><b>'+val+'</b>'+(sub?'<small>'+sub+'</small>':'')+'</div>';}
var STATUS_CLS={'Matched':'g','RTO / cancelled, no sale':'g','Settled':'g','Received in bank':'g','Amount differs':'a','Settled value differs':'a','Difference':'a','Missing in books':'r','In books, not on platform':'r','Payment pending':'a','Not found in bank':'r','Paid, not in order report':'a','Bank credit not in settlement report':'a','Negative payout (return / penalty)':'a'};
function pill(s){return '<span class="ez-pill '+(STATUS_CLS[s]||'')+'">'+esc(s)+'</span>';}
function render(R){
 var L=R.list,platSales=sum(L,function(p){return p.platSales+p.platReturns;}),books=sum(L,function(p){return p.booksSales;}),diff=platSales-books;
 var payout=sum(L,function(p){return p.bankExpected;}),bankIn=sum(L,function(p){return p.bankMatched;});
 var fees=sum(L,function(p){return p.commission+p.shipping+p.other+p.feegst;});
 var issues=sum(L,function(p){return p.mismatch+p.missingBooks+p.extraBooks;});
 var h='<div class="ez-cards">'+
  card(T('Platform sales (net of returns)','प्लेटफ़ॉर्म सेल्स (रिटर्न घटाकर)'),inr(platSales))+
  card(T('Sales in your books','आपकी books में सेल्स'),inr(books))+
  card(T('Difference','फ़र्क'),inr(diff),Math.abs(diff)<=R.cfg.tol?'g':'r',issues+' '+T('invoices to check','इनवॉइस जाँचने हैं'))+
  (R.has.settle?card(T('Payouts expected','अपेक्षित पेआउट'),inr(payout),'',T('Fees deducted: ','कटी फ़ीस: ')+inr(fees)):'')+
  (R.has.settle&&R.has.bank?card(T('Received in bank','बैंक में आया'),inr(bankIn),Math.abs(payout-bankIn)<=R.cfg.tol?'g':'r',T('Not traced: ','नहीं मिला: ')+inr(payout-bankIn)):'')+
 '</div>';
 /* platform summary */
 h+='<h3>'+T('Books vs platform – summary','Books बनाम प्लेटफ़ॉर्म – सार')+'</h3><div class="ez-tw"><table class="ez-t"><tr><th>'+T('Platform','प्लेटफ़ॉर्म')+'</th><th>'+T('Platform sales','प्लेटफ़ॉर्म सेल्स')+'</th><th>'+T('Books sales','Books सेल्स')+'</th><th>'+T('Difference','फ़र्क')+'</th><th>'+T('Missing in books','Books में नहीं')+'</th><th>'+T('Amount differs','रकम में फ़र्क')+'</th>'+(R.has.settle?'<th>'+T('Payment pending','पेमेंट बाकी')+'</th><th>'+T('Fees','फ़ीस')+'</th><th>TCS</th><th>'+T('Payout expected','अपेक्षित पेआउट')+'</th>':'')+(R.has.settle&&R.has.bank?'<th>'+T('In bank','बैंक में')+'</th><th>'+T('Not in bank','बैंक में नहीं')+'</th>':'')+'</tr>'+
 L.map(function(p){var d=p.platSales+p.platReturns-p.booksSales;return '<tr><td><b>'+esc(p.name)+'</b></td><td>'+inr(p.platSales+p.platReturns)+'</td><td>'+inr(p.booksSales)+'</td><td class="'+(Math.abs(d)<=R.cfg.tol?'gt':'rt')+'">'+inr(d)+'</td><td>'+p.missingBooks+' · '+inr(p.missingBooksAmt)+'</td><td>'+p.mismatch+'</td>'+(R.has.settle?'<td>'+p.unsettledN+' · '+inr(p.unsettledAmt)+'</td><td>'+inr(p.commission+p.shipping+p.other+p.feegst)+'</td><td>'+inr(p.tcs)+'</td><td>'+inr(p.bankExpected)+'</td>':'')+(R.has.settle&&R.has.bank?'<td>'+inr(p.bankMatched)+'</td><td class="'+(Math.abs(p.bankExpected-p.bankMatched)<=R.cfg.tol?'gt':'rt')+'">'+inr(p.bankExpected-p.bankMatched)+'</td>':'')+'</tr>';}).join('')+'</table></div>';
 /* waterfall for single platform / combined */
 if(R.has.settle){
  var c=sum(L,function(p){return p.commission;}),s=sum(L,function(p){return p.shipping;}),o=sum(L,function(p){return p.other;}),g=sum(L,function(p){return p.feegst;}),tc=sum(L,function(p){return p.tcs;}),td=sum(L,function(p){return p.tds;}),rf=sum(L,function(p){return p.refund;}),sv=sum(L,function(p){return p.settledValue;}),np=sum(L,function(p){return p.netPayout;});
  h+='<h3>'+T('From sale value to money in bank','सेल वैल्यू से बैंक तक')+'</h3><div class="ez-tw"><table class="ez-t ez-wf">'+
   [[T('Sale value in settlement report','सेटलमेंट रिपोर्ट में सेल वैल्यू'),sv],[T('Less: commission','घटाएँ: कमीशन'),-c],[T('Less: shipping / fulfilment','घटाएँ: शिपिंग / फ़ुलफ़िलमेंट'),-s],[T('Less: other fees & penalties','घटाएँ: अन्य फ़ीस और पेनल्टी'),-o],[T('Less: GST on fees','घटाएँ: फ़ीस पर GST'),-g],[T('Less: TCS (GST)','घटाएँ: TCS (GST)'),-tc],[T('Less: TDS (income tax)','घटाएँ: TDS (इनकम टैक्स)'),-td],[T('Less: refunds / returns','घटाएँ: रिफ़ंड / रिटर्न'),-rf]].map(function(x){return '<tr><td>'+x[0]+'</td><td>'+inr(x[1])+'</td></tr>';}).join('')+
   '<tr class="tot"><td>'+T('Net payout as per settlement','सेटलमेंट के हिसाब से नेट पेआउट')+'</td><td>'+inr(np)+'</td></tr>'+
   (R.has.bank?'<tr><td>'+T('Traced in bank statement','बैंक स्टेटमेंट में मिला')+'</td><td>'+inr(bankIn)+'</td></tr>':'')+'</table></div>';
 }
 /* tabs */
 var tabs=[['o',T('Orders vs books','ऑर्डर बनाम books'),R.orders,['platform','order','invoice','date','platform_amt','books_amt','books_ref','diff','status'],['Platform','Order ID','Invoice','Date','Platform ₹','Books ₹','Books ref','Difference ₹','Status']]];
 if(R.has.settle)tabs.push(['s',T('Payments vs orders','पेमेंट बनाम ऑर्डर'),R.settle,['platform','order','order_value','settled_value','fees','fee_pct','tcs_tds','refund','net_received','status'],['Platform','Order ID','Order ₹','Settled ₹','Fees ₹','Fee %','TCS+TDS ₹','Refund ₹','Net ₹','Status']]);
 if(R.has.settle)tabs.push(['b',T('Payouts vs bank','पेआउट बनाम बैंक'),R.bank.concat(R.bankExtra.map(function(x){return {platform:x.platform,payout_date:'',utr:'',orders:'',expected:null,bank_date:x.date,bank_amount:x.amount,narration:x.narration,status:x.status};})),['platform','payout_date','utr','orders','expected','bank_date','bank_amount','narration','status'],['Platform','Payout date','UTR','Orders','Expected ₹','Bank date','Bank ₹','Narration','Status']]);
 if(R.fees.length)tabs.push(['f',T('Fees vs books','फ़ीस बनाम books'),R.fees,['platform','head','platform_amt','books_amt','diff','status'],['Platform','Head','Platform ₹','Books ₹','Difference ₹','Status']]);
 tabs.push(['t',T('TCS & TDS','TCS और TDS'),R.tcs,['platform','net_taxable','expected_tcs','tcs_in_settlement','tcs_in_report','tcs_in_books','diff_books','expected_tds','tds_in_settlement','tds_in_books'],['Platform','Net taxable ₹','Expected TCS ₹','TCS in settlement ₹','TCS in GSTR-8/2A ₹','TCS in books ₹','Platform − books ₹','Expected TDS ₹','TDS in settlement ₹','TDS in books ₹']]);
 TABS=tabs;
 h+='<div class="ez-tabs">'+tabs.map(function(t,i){var bad=t[2].filter(function(r){return r.status&&STATUS_CLS[r.status]&&STATUS_CLS[r.status]!=='g';}).length;return '<button type="button" data-t="'+i+'"'+(i===0?' class="on"':'')+'>'+t[1]+(bad?' <i>'+bad+'</i>':'')+'</button>';}).join('')+'</div><div class="ez-filter" id="ez-filter"></div><div class="ez-tw" id="ez-tab"></div>'+
  '<p class="ez-note">'+(L.some(function(p){return p.taxableEstimated;})?T('Expected TCS uses taxable value; where it was not given, it is estimated as sales ÷ 1.18. ','अपेक्षित TCS टैक्सेबल वैल्यू पर है; जहाँ नहीं दी, वहाँ सेल्स ÷ 1.18 से अंदाज़ा लगाया। '):'')+T('TCS rate ','TCS दर ')+R.cfg.tcsRate+'%, TDS '+R.cfg.tdsRate+'%. '+T('Tolerance ','छूट ')+inr(R.cfg.tol)+'.</p>';
 $('ez-res').innerHTML=h;
 $('ez-res').querySelectorAll('.ez-tabs button').forEach(function(b){b.onclick=function(){$('ez-res').querySelectorAll('.ez-tabs button').forEach(function(x){x.classList.toggle('on',x===b);});showTab(+b.dataset.t,'');};});
 showTab(0,'');
}
var TABS=[];
function showTab(i,flt){
 var t=TABS[i],rows=t[2],stats={};
 rows.forEach(function(r){if(r.status)stats[r.status]=(stats[r.status]||0)+1;});
 $('ez-filter').innerHTML=Object.keys(stats).length>1?'<button type="button" data-s=""'+(!flt?' class="on"':'')+'>'+T('All','सभी')+' ('+rows.length+')</button>'+Object.keys(stats).map(function(s){return '<button type="button" data-s="'+esc(s)+'"'+(flt===s?' class="on"':'')+'>'+esc(s)+' ('+stats[s]+')</button>';}).join(''):'';
 $('ez-filter').querySelectorAll('button').forEach(function(b){b.onclick=function(){showTab(i,b.dataset.s);};});
 var shown=rows.filter(function(r){return !flt||r.status===flt;}),cut=shown.slice(0,400);
 var money=/₹/;
 $('ez-tab').innerHTML='<table class="ez-t"><tr>'+t[4].map(function(x){return '<th>'+x+'</th>';}).join('')+'</tr>'+cut.map(function(r){return '<tr>'+t[3].map(function(f,j){var v=r[f];if(f==='status')return '<td>'+pill(v)+'</td>';if(money.test(t[4][j]))return '<td class="n">'+(v==null?'–':inr(v))+'</td>';if(f==='fee_pct')return '<td class="n">'+(v==null?'–':v+'%')+'</td>';return '<td>'+esc(v)+'</td>';}).join('')+'</tr>';}).join('')+'</table>'+(shown.length>400?'<p class="ez-note">'+T('Showing first 400 rows. Download Excel for all ','पहली 400 लाइनें दिख रही हैं। सभी के लिए Excel डाउनलोड कीजिए ')+'('+shown.length+').</p>':'')+(!shown.length?'<p class="ez-note">'+T('Nothing to show.','दिखाने को कुछ नहीं।')+'</p>':'');
}
function exportXlsx(){
 if(!LAST)return;var R=LAST,wb=XLSX.utils.book_new();
 var sumRows=[['Platform','Platform sales (net)','Books sales','Difference','Orders','Matched','Amount differs','Missing in books','Missing in books ₹','In books not on platform','Payment pending (orders)','Payment pending ₹','Commission','Shipping','Other fees','GST on fees','TCS','TDS','Refunds','Net payout (settlement)','Payout expected','Traced in bank','Not traced in bank']];
 R.list.forEach(function(p){sumRows.push([p.name,r2(p.platSales+p.platReturns),r2(p.booksSales),r2(p.platSales+p.platReturns-p.booksSales),p.ordersN,p.matched,p.mismatch,p.missingBooks,r2(p.missingBooksAmt),p.extraBooks,p.unsettledN,r2(p.unsettledAmt),r2(p.commission),r2(p.shipping),r2(p.other),r2(p.feegst),r2(p.tcs),r2(p.tds),r2(p.refund),r2(p.netPayout),r2(p.bankExpected),r2(p.bankMatched),r2(p.bankExpected-p.bankMatched)]);});
 var ws=XLSX.utils.aoa_to_sheet(sumRows);ws['!cols']=sumRows[0].map(function(h){return {wch:Math.max(12,h.length+2)};});XLSX.utils.book_append_sheet(wb,ws,'Summary');
 TABS.forEach(function(t){var a=[t[4]].concat(t[2].map(function(r){return t[3].map(function(f){return r[f]==null?'':r[f];});}));var w=XLSX.utils.aoa_to_sheet(a);w['!cols']=t[4].map(function(h){return {wch:Math.max(12,h.length+3)};});XLSX.utils.book_append_sheet(wb,w,{o:'Orders vs Books',s:'Payments vs Orders',b:'Payouts vs Bank',f:'Fees vs Books',t:'TCS and TDS'}[t[0]]);});
 XLSX.writeFile(wb,'ecommerce-reconciliation'+(PN==='ALL'?'':'-'+PN.toLowerCase())+'.xlsx');
}
function init(){
 buildUploads();
 var tp=$('ez-tpl-file');if(tp)tp.addEventListener('change',function(){if(tp.files[0])readTemplate(tp.files[0]);});
 if($('ez-dl'))$('ez-dl').onclick=downloadTemplate;
 if($('ez-sample'))$('ez-sample').onclick=loadSample;
 if($('ez-run'))$('ez-run').onclick=run;
 if($('ez-xlsx'))$('ez-xlsx').onclick=exportXlsx;
 if(window.setLang){try{setLang(document.documentElement.lang||'en');}catch(e){}}
 document.addEventListener('langchange',function(){SETS.forEach(function(s){if(STATE[s.k]){$('f-'+s.k).textContent='✓ '+STATE[s.k].label+' · '+STATE[s.k].parsed.records.length+' '+T('rows','लाइनें');drawMap(s.k);}});if(LAST)render(LAST);});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})(this);
