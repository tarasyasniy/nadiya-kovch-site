(function(){
  var D=null, UID=0;
  function lang(){var l="en";try{l=localStorage.getItem("nk-lang")||"";}catch(e){}
    if(l!=="en"&&l!=="uk"&&l!=="ru"){l="uk";}return l;}
  function setLang(l){try{localStorage.setItem("nk-lang",l);}catch(e){}}
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});}
  function fmt(d,l){try{return new Date(d+"T12:00:00").toLocaleDateString(l==="uk"?"uk-UA":l==="ru"?"ru-RU":"en-US",{year:"numeric",month:"long",day:"numeric"});}catch(e){return d;}}
  function load(cb){if(D)return cb(D);fetch("news.json",{cache:"no-cache"}).then(function(r){return r.json();}).then(function(j){D=j;cb(D);}).catch(function(){});}
  function sorted(d){return d.items.slice().sort(function(a,b){return a.date<b.date?1:-1;});}
  window.NK_NEWS={lang:lang,setLang:setLang,load:load,esc:esc,fmt:fmt,sorted:sorted};

  /* ---------- vector illustrations (flat with depth, gradients, detail) ---------- */
  function shade(hex,amt){var n=parseInt(hex.slice(1),16),r=n>>16,g=(n>>8)&255,b=n&255;
    function f(v){v=Math.round(v+(amt>0?(255-v)*amt:v*amt));return Math.max(0,Math.min(255,v));}
    return "#"+((1<<24)+(f(r)<<16)+(f(g)<<8)+f(b)).toString(16).slice(1);}
  function art(name,c){
    var id="g"+(++UID),k="#14304F",w="#FFFFFF",lt=shade(c,.55),dk=shade(c,-.25),paper="#F4F7FB",sky="#E6EEF7";
    var defs='<defs><linearGradient id="'+id+'a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+lt+'"/><stop offset="1" stop-color="'+c+'"/></linearGradient><linearGradient id="'+id+'b" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#DCE6F2"/></linearGradient><radialGradient id="'+id+'c"><stop offset="0" stop-color="#FFFFFF" stop-opacity=".9"/><stop offset="1" stop-color="#FFFFFF" stop-opacity="0"/></radialGradient></defs>';
    var bg='<rect width="240" height="160" fill="'+sky+'"/><circle cx="196" cy="26" r="46" fill="url(#'+id+'c)"/><ellipse cx="120" cy="150" rx="104" ry="8" fill="#0E2740" opacity=".08"/>';
    var s='<svg viewBox="0 0 240 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">'+defs+bg;
    if(name==="calendar"){
      s+='<g transform="rotate(-4 120 84)"><rect x="54" y="30" width="132" height="112" rx="10" fill="url(#'+id+'b)" stroke="'+k+'" stroke-width="2.5"/><path d="M54 30 h132 v34 h-132 z" fill="url(#'+id+'a)"/><rect x="54" y="30" width="132" height="34" rx="10" fill="none"/>';
      s+='<rect x="84" y="20" width="7" height="22" rx="3.5" fill="'+k+'"/><rect x="149" y="20" width="7" height="22" rx="3.5" fill="'+k+'"/>';
      for(var r=0;r<3;r++)for(var q=0;q<5;q++){var on=(r===1&&q===2);s+='<rect x="'+(68+q*21)+'" y="'+(76+r*22)+'" width="14" height="12" rx="3" fill="'+(on?c:"#C9D7E6")+'"/>';}
      s+='<circle cx="176" cy="132" r="15" fill="'+w+'" stroke="'+c+'" stroke-width="3"/><path d="M176 124 v9 l6 4" stroke="'+k+'" stroke-width="2.5" fill="none" stroke-linecap="round"/></g></svg>';return s;}
    if(name==="doc"){
      s+='<g transform="rotate(-6 120 80)"><rect x="70" y="24" width="104" height="128" rx="6" fill="#DCE6F2"/></g><g transform="rotate(3 120 80)"><rect x="62" y="18" width="110" height="130" rx="6" fill="url(#'+id+'b)" stroke="'+k+'" stroke-width="2.5"/>';
      for(var i=0;i<5;i++){s+='<rect x="80" y="'+(40+i*15)+'" width="'+(i===4?50:72)+'" height="6" rx="3" fill="#B9C9DB"/>';}
      s+='<circle cx="146" cy="116" r="20" fill="'+c+'"/><circle cx="146" cy="116" r="14" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="3 3"/><path d="M138 116 l6 6 l11 -12" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>';
      s+='<path d="M170 118 l30 -36 l8 6 l-30 36 z" fill="'+k+'"/><path d="M198 88 l8 6 l-4 5 z" fill="'+c+'"/></svg>';return s;}
    if(name==="card"){
      s+='<rect x="34" y="50" width="172" height="100" rx="14" fill="'+k+'" opacity=".12" transform="translate(6 8)"/><rect x="30" y="44" width="176" height="104" rx="14" fill="url(#'+id+'a)"/>';
      s+='<rect x="30" y="44" width="176" height="104" rx="14" fill="none" stroke="'+dk+'" stroke-width="2"/><rect x="48" y="66" width="30" height="24" rx="5" fill="#E0B44B"/><path d="M48 78 h30 M63 66 v24" stroke="#B88A2A" stroke-width="1.5"/>';
      s+='<circle cx="164" cy="88" r="20" fill="#fff" opacity=".9"/><path d="M146 122 q18 -22 36 0" fill="#fff" opacity=".9"/><rect x="48" y="118" width="80" height="6" rx="3" fill="#fff" opacity=".9"/><rect x="48" y="130" width="54" height="5" rx="2.5" fill="#fff" opacity=".6"/></svg>';return s;}
    if(name==="car"){
      s+='<rect x="0" y="122" width="240" height="38" fill="#B8C7D8"/><path d="M0 122 H240" stroke="#fff" stroke-width="2" stroke-dasharray="14 12"/>';
      s+='<path d="M24 112 q40 -40 96 -30 q40 -10 92 36 z" fill="'+c+'" opacity=".22"/>';
      s+='<rect x="34" y="84" width="172" height="36" rx="12" fill="url(#'+id+'a)" stroke="'+dk+'" stroke-width="2"/><path d="M70 84 L96 56 Q101 52 110 52 L152 52 Q162 52 168 60 L184 84 Z" fill="url(#'+id+'b)" stroke="'+dk+'" stroke-width="2"/>';
      s+='<path d="M100 84 L116 60 L126 60 L126 84 Z M132 84 V60 H150 L162 84 Z" fill="#9DB6D2"/><rect x="50" y="96" width="20" height="5" rx="2.5" fill="#fff" opacity=".8"/><rect x="170" y="94" width="10" height="8" rx="2" fill="#FFE08A"/>';
      s+='<circle cx="72" cy="122" r="16" fill="'+k+'"/><circle cx="72" cy="122" r="7" fill="#C9D7E6"/><circle cx="170" cy="122" r="16" fill="'+k+'"/><circle cx="170" cy="122" r="7" fill="#C9D7E6"/></svg>';return s;}
    if(name==="basket"){
      s+='<ellipse cx="120" cy="134" rx="90" ry="8" fill="#0E2740" opacity=".08"/><circle cx="66" cy="72" r="16" fill="#D64545"/><circle cx="90" cy="64" r="14" fill="#F2B630"/><circle cx="58" cy="54" r="5" fill="#fff" opacity=".5"/><circle cx="160" cy="62" r="14" fill="#7AB648"/><circle cx="182" cy="70" r="12" fill="#D64545"/>';
      s+='<path d="M108 40 l10 -12 l8 10" stroke="#5A8A32" stroke-width="3" fill="none"/><ellipse cx="118" cy="86" rx="46" ry="14" fill="#E9C27A"/><rect x="72" y="86" width="96" height="6" fill="#E9C27A"/>';
      s+='<path d="M60 92 H180 L168 136 H72 Z" fill="url(#'+id+'a)"/><path d="M72 104 H168 M74 118 H166" stroke="#fff" stroke-width="2" opacity=".5"/><path d="M80 92 C80 66 158 66 158 92" fill="none" stroke="'+k+'" stroke-width="5" stroke-linecap="round"/>';
      s+='<rect x="96" y="104" width="10" height="16" rx="3" fill="#fff"/><rect x="118" y="100" width="18" height="20" rx="3" fill="#fff" opacity=".9"/><circle cx="150" cy="112" r="6" fill="#fff"/></svg>';return s;}
    if(name==="book"){
      s+='<path d="M26 116 Q120 84 214 116 V56 Q120 26 26 56 Z" fill="url(#'+id+'b)" stroke="'+k+'" stroke-width="2"/><path d="M120 40 V110" stroke="'+k+'" stroke-width="2"/>';
      s+='<path d="M26 56 Q72 44 120 58 V110 Q72 96 26 116 Z" fill="'+c+'" opacity=".92"/><path d="M120 58 Q168 44 214 56 V116 Q168 96 120 110 Z" fill="#fff" opacity=".96"/>';
      s+='<text x="72" y="92" text-anchor="middle" font-family="Georgia,serif" font-size="34" font-weight="700" fill="#fff">A</text><text x="168" y="92" text-anchor="middle" font-family="Georgia,serif" font-size="34" font-weight="700" fill="'+c+'">Я</text>';
      s+='<rect x="128" y="104" width="62" height="5" rx="2.5" fill="#B9C9DB"/><rect x="128" y="64" width="50" height="5" rx="2.5" fill="#B9C9DB"/>';
      s+='<g transform="translate(196 28) rotate(35)"><rect x="-4" y="-22" width="8" height="30" rx="2" fill="#F2B630"/><path d="M-4 8 L0 18 L4 8 Z" fill="#E9C27A"/><rect x="-4" y="-26" width="8" height="5" fill="'+k+'"/></g></svg>';return s;}
    if(name==="coins"){
      s+='<ellipse cx="120" cy="134" rx="84" ry="10" fill="#0E2740" opacity=".1"/>';
      s+='<rect x="40" y="36" width="160" height="72" rx="8" fill="url(#'+id+'a)" stroke="'+dk+'" stroke-width="2" transform="rotate(-6 120 72)"/><circle cx="120" cy="72" r="20" fill="#fff" opacity=".85" transform="rotate(-6 120 72)"/><text x="120" y="80" text-anchor="middle" font-family="Georgia,serif" font-size="26" font-weight="700" fill="'+c+'" transform="rotate(-6 120 72)">$</text>';
      for(var j=0;j<4;j++){var cy=124-j*11;s+='<ellipse cx="156" cy="'+cy+'" rx="36" ry="11" fill="#D9A93A"/><rect x="120" y="'+(cy-6)+'" width="72" height="12" fill="#D9A93A"/><ellipse cx="156" cy="'+(cy-6)+'" rx="36" ry="11" fill="#F2C75C" stroke="#B8862B" stroke-width="1.5"/>';}
      s+='<circle cx="84" cy="116" r="18" fill="#F2C75C" stroke="#B8862B" stroke-width="2"/><circle cx="84" cy="116" r="11" fill="none" stroke="#B8862B" stroke-width="1.5"/></svg>';return s;}
    if(name==="passport"){
      s+='<ellipse cx="120" cy="140" rx="70" ry="7" fill="#0E2740" opacity=".1"/><g transform="rotate(-5 120 80)"><rect x="66" y="26" width="108" height="124" rx="10" fill="url(#'+id+'a)" stroke="'+dk+'" stroke-width="2"/><rect x="74" y="34" width="92" height="108" rx="6" fill="none" stroke="#E0B44B" stroke-width="1.5" opacity=".7"/>';
      s+='<circle cx="120" cy="78" r="22" fill="none" stroke="#E0B44B" stroke-width="3"/><path d="M98 78 H142 M120 56 Q132 78 120 100 Q108 78 120 56" fill="none" stroke="#E0B44B" stroke-width="2"/><rect x="86" y="118" width="68" height="5" rx="2.5" fill="#fff" opacity=".7"/><rect x="86" y="128" width="50" height="5" rx="2.5" fill="#fff" opacity=".5"/></g>';
      s+='<g transform="translate(164 98) rotate(14)"><circle r="22" fill="none" stroke="#D64545" stroke-width="3.5" opacity=".85"/><circle r="15" fill="none" stroke="#D64545" stroke-width="1.5" opacity=".85"/><text text-anchor="middle" y="5" font-family="Arial,sans-serif" font-size="10" font-weight="700" fill="#D64545">OK</text></g></svg>';return s;}
    if(name==="truck"){
      s+='<rect x="0" y="130" width="240" height="30" fill="#B8C7D8"/><path d="M0 130 H240" stroke="#fff" stroke-width="2" stroke-dasharray="14 12"/>';
      s+='<rect x="30" y="50" width="118" height="72" rx="8" fill="url(#'+id+'b)" stroke="'+k+'" stroke-width="2.5"/><rect x="40" y="62" width="58" height="10" rx="3" fill="'+c+'"/><rect x="40" y="80" width="40" height="8" rx="3" fill="#C9D7E6"/>';
      s+='<path d="M150 74 H186 L210 100 V122 H150 Z" fill="url(#'+id+'a)" stroke="'+dk+'" stroke-width="2"/><path d="M158 82 H180 L196 100 H158 Z" fill="#D7E6F5"/><rect x="200" y="112" width="10" height="6" rx="2" fill="#FFE08A"/>';
      s+='<circle cx="62" cy="128" r="15" fill="'+k+'"/><circle cx="62" cy="128" r="6" fill="#C9D7E6"/><circle cx="178" cy="128" r="15" fill="'+k+'"/><circle cx="178" cy="128" r="6" fill="#C9D7E6"/><circle cx="204" cy="128" r="15" fill="'+k+'"/><circle cx="204" cy="128" r="6" fill="#C9D7E6"/>';
      s+='<path d="M20 124 l8 -22 l8 22 Z" fill="#F08A24"/><path d="M26 124 h-6" stroke="#fff" stroke-width="2"/></svg>';return s;}
    if(name==="globe"){
      s+='<circle cx="120" cy="82" r="58" fill="url(#'+id+'a)" stroke="'+dk+'" stroke-width="2"/><ellipse cx="120" cy="82" rx="26" ry="58" fill="none" stroke="#fff" stroke-width="1.5" opacity=".55"/><ellipse cx="120" cy="82" rx="58" ry="20" fill="none" stroke="#fff" stroke-width="1.5" opacity=".55"/><path d="M62 82 H178 M76 56 H164 M76 108 H164" stroke="#fff" stroke-width="1.5" opacity=".5"/>';
      s+='<path d="M92 70 q14 -14 30 -4 q8 10 -6 18 q-14 4 -24 -14 z" fill="#7AB648" opacity=".9"/><path d="M130 96 q16 -6 24 8 q-4 14 -18 12 q-10 -6 -6 -20 z" fill="#7AB648" opacity=".9"/>';
      s+='<path d="M28 136 Q120 110 212 130" fill="none" stroke="#F2B630" stroke-width="3" stroke-dasharray="6 6"/><g transform="translate(206 44)"><path d="M0 0 c-8 -12 -8 -22 0 -22 c8 0 8 10 0 22z" fill="#D64545"/><circle cy="-14" r="3.5" fill="#fff"/></g></svg>';return s;}
    s+='<circle cx="120" cy="80" r="50" fill="url(#'+id+'a)"/><ellipse cx="120" cy="80" rx="22" ry="50" fill="none" stroke="#fff" stroke-width="3" opacity=".8"/></svg>';
    return s;
  }
  window.NK_NEWS.art=art;

  /* ---------- article bodies ---------- */
  function bodyHTML(t,cls){var h="";t.body.forEach(function(p,i){h+='<p class="nk-p'+(cls?" "+cls:"")+(i===0?" nk-first":"")+'">'+esc(p)+'</p>';});return h;}
  function sourcesHTML(it,u){var h='<h3 class="nk-h3">'+esc(u.source)+'</h3><ul class="nk-src">';it.sources.forEach(function(s){h+='<li><a href="'+esc(s.url)+'" target="_blank" rel="noopener">'+esc(s.name)+'</a></li>';});return h+'</ul>';}
  function patternCSS(p,c){
    var dot="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='22' height='22'%3E%3Ccircle cx='3' cy='3' r='1.6' fill='%23"+c.slice(1)+"' opacity='.16'/%3E%3C/svg%3E";
    var line="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18'%3E%3Cpath d='M0 18 L18 0' stroke='%23"+c.slice(1)+"' stroke-width='1' opacity='.14'/%3E%3C/svg%3E";
    var grid="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30'%3E%3Cpath d='M30 0 H0 V30' fill='none' stroke='%23"+c.slice(1)+"' stroke-width='1' opacity='.13'/%3E%3C/svg%3E";
    var wave="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='16'%3E%3Cpath d='M0 8 Q10 0 20 8 T40 8' fill='none' stroke='%23"+c.slice(1)+"' stroke-width='1.2' opacity='.16'/%3E%3C/svg%3E";
    var m={dots:dot,lines:line,grid:grid,waves:wave}[p]||dot;
    return 'background-image:url("'+m+'"),linear-gradient(180deg,'+c+'14 0,#ffffff 420px);';
  }
  function discFoot(d,l,u){return '<p class="nk-foot">'+esc(u.footnote)+' '+esc(d.disclaimer[l])+'</p>';}

  function renderArticle(it,l,u,d){
    var t=it[l],c=it.accent||"#1A4F82",lay=it.layout||"brief",p=it.pattern||"dots";
    var kick='<div class="nk-kicker" style="color:'+c+'">'+esc(it.tag)+' · '+esc(fmt(it.date,l))+'</div>';
    var h='<a class="nk-back" href="news.html">← '+esc(u.back)+'</a>';
    var wrap='<article class="nk-art nk-'+lay+'" style="'+patternCSS(p,c)+'">';
    if(lay==="hero"){
      h+=wrap+'<div class="nk-band" style="background:'+c+'"><div class="nk-band-txt">'+kick+'<h1>'+esc(t.title)+'</h1></div><div class="nk-band-art">'+art(it.art,c)+'</div></div><p class="nk-lead">'+esc(t.summary)+'</p>'+bodyHTML(t)+sourcesHTML(it,u)+'</article>';
    }else if(lay==="centered"){
      h+=wrap+'<div class="nk-center"><div class="nk-center-art">'+art(it.art,c)+'</div>'+kick+'<h1>'+esc(t.title)+'</h1><p class="nk-lead">'+esc(t.summary)+'</p></div><div class="nk-center-body">'+bodyHTML(t)+sourcesHTML(it,u)+'</div></article>';
    }else if(lay==="columns"){
      h+=wrap+'<div class="nk-col-top"><div>'+kick+'<h1>'+esc(t.title)+'</h1><p class="nk-lead">'+esc(t.summary)+'</p></div><div class="nk-col-art">'+art(it.art,c)+'</div></div><div class="nk-cols2" style="border-top:4px solid '+c+'">'+bodyHTML(t)+'</div>'+sourcesHTML(it,u)+'</article>';
    }else if(lay==="steps"){
      h+=wrap+'<div class="nk-top">'+kick+'<h1>'+esc(t.title)+'</h1><p class="nk-lead">'+esc(t.summary)+'</p></div><div class="nk-steps-art">'+art(it.art,c)+'</div><ol class="nk-ol">';
      t.body.forEach(function(x,i){h+='<li><span class="nk-num" style="background:'+c+'">'+(i+1)+'</span><p>'+esc(x)+'</p></li>';});
      h+='</ol>'+sourcesHTML(it,u)+'</article>';
    }else if(lay==="facts"){
      h+=wrap+'<div class="nk-top">'+kick+'<h1>'+esc(t.title)+'</h1><p class="nk-lead">'+esc(t.summary)+'</p></div><div class="nk-two"><div>'+bodyHTML(t)+sourcesHTML(it,u)+'</div><aside class="nk-box" style="border-top:6px solid '+c+'"><div class="nk-box-art">'+art(it.art,c)+'</div>';
      if(t.facts){h+='<h4 style="color:'+c+'">'+esc(u.facts)+'</h4><ul>';t.facts.forEach(function(f){h+='<li>'+esc(f)+'</li>';});h+='</ul>';}
      h+='</aside></div></article>';
    }else if(lay==="compare"){
      h+=wrap+'<div class="nk-top">'+kick+'<h1>'+esc(t.title)+'</h1><p class="nk-lead">'+esc(t.summary)+'</p></div><div class="nk-cmp-art">'+art(it.art,c)+'</div>'+bodyHTML(t);
      if(t.cols){h+='<div class="nk-cols">';t.cols.forEach(function(col){h+='<section class="nk-col" style="border-top:6px solid '+c+'"><h2>'+esc(col.h)+'</h2><ul>';col.items.forEach(function(x){h+='<li>'+esc(x)+'</li>';});h+='</ul></section>';});h+='</div>';}
      h+=sourcesHTML(it,u)+'</article>';
    }else{
      h+=wrap+'<div class="nk-rule" style="background:'+c+'"></div>'+kick+'<h1>'+esc(t.title)+'</h1><p class="nk-lead">'+esc(t.summary)+'</p><div class="nk-brief-art">'+art(it.art,c)+'</div><div class="nk-body2">'+bodyHTML(t)+'</div>'+sourcesHTML(it,u)+'</article>';
    }
    return h;
  }

  function renderNav(d,l){var n=(d.nav&&d.nav[l])||[],h='';n.forEach(function(x){h+='<a href="'+esc(x[1])+'">'+esc(x[0])+'</a>';});return h;}

  /* ---------- homepage rail (unchanged) ---------- */
  var rail=document.getElementById("nk-news-rail");
  if(rail){
    var cur="";
    function drawRail(){load(function(d){var l=lang();if(l===cur)return;cur=l;var u=d.ui[l];
      var h='<h2>'+esc(u.title)+'</h2><div class="nk-nr-scroll">';
      sorted(d).slice(0,7).forEach(function(it){var t=it[l],c=it.accent||"#1A4F82";
        h+='<a class="nk-nr-item" style="--c:'+c+'" href="news.html#'+esc(it.id)+'"><span class="nk-nr-thumb">'+art(it.art,c).replace('<svg ','<svg preserveAspectRatio="xMidYMid slice" ')+'</span><span class="nk-nr-body"><span class="nk-nr-meta" style="color:'+c+'">'+esc(it.tag)+' · '+esc(fmt(it.date,l))+'</span><strong>'+esc(t.title)+'</strong><span class="nk-nr-sum">'+esc(t.summary)+'</span></span></a>';});
      h+='</div><a class="nk-nr-all" href="news.html">'+esc(u.all)+' →</a>';
      rail.innerHTML=h;});}
    function place(){var t=document.getElementById("services");if(t&&t.parentNode&&rail.nextSibling!==t){t.parentNode.insertBefore(rail,t);}}
    drawRail();place();setInterval(function(){drawRail();place();},600);
  }

  /* ---------- news page ---------- */
  var app=document.getElementById("nk-news-app"), nav=document.getElementById("nk-news-nav"), foot=document.getElementById("nk-news-foot");
  if(app){
    var curL="",curH=null;
    function draw(){load(function(d){var l=lang(),h=location.hash.slice(1);if(l===curL&&h===curH)return;curL=l;curH=h;var u=d.ui[l];
      document.documentElement.lang=l;
      var btns=document.querySelectorAll("[data-l]");for(var i=0;i<btns.length;i++){btns[i].setAttribute("aria-pressed",btns[i].getAttribute("data-l")===l);}
      if(nav)nav.innerHTML=renderNav(d,l);
      if(foot)foot.innerHTML='© Nadiya Kovch · '+esc(d.disclaimer[l]);
      var it=null;d.items.forEach(function(x){if(x.id===h)it=x;});
      var out="";
      if(it){document.title=it[l].title+" | Nadiya Kovch";out=renderArticle(it,l,u,d);}
      else{document.title=u.title+" | Nadiya Kovch";
        out+='<header class="nk-mast"><div class="nk-mast-date">'+esc(fmt(d.updated,l))+'</div><h1>'+esc(u.title)+'</h1></header><div class="nk-grid">';
        sorted(d).forEach(function(x,idx){var t=x[l],c=x.accent||"#1A4F82";
          out+='<a class="nk-tile'+(idx===0?' nk-tile-lead':'')+'" href="#'+esc(x.id)+'" style="border-top:6px solid '+c+'"><div class="nk-tile-art">'+art(x.art,c)+'</div><span class="nk-kicker" style="color:'+c+'">'+esc(x.tag)+' · '+esc(fmt(x.date,l))+'</span><strong>'+esc(t.title)+'</strong><span class="nk-tile-sum">'+esc(t.summary)+'</span><span class="nk-more" style="color:'+c+'">'+esc(u.more)+' →</span></a>';});
        out+='</div>';}
      app.innerHTML=out;if(it)window.scrollTo(0,0);});}
    window.addEventListener("hashchange",draw);
    document.addEventListener("click",function(e){var b=e.target.closest&&e.target.closest("[data-l]");if(b){setLang(b.getAttribute("data-l"));draw();}});
    draw();setInterval(draw,600);
  }
})();
