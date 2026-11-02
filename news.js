(function(){
  var D=null;
  function lang(){var l="en";try{l=localStorage.getItem("nk-lang")||"";}catch(e){}
    if(l!=="en"&&l!=="uk"&&l!=="ru"){var n=(navigator.language||"en").slice(0,2);l=n==="uk"?"uk":n==="ru"?"ru":"en";}return l;}
  function setLang(l){try{localStorage.setItem("nk-lang",l);}catch(e){}}
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});}
  function fmt(d,l){try{return new Date(d+"T12:00:00").toLocaleDateString(l==="uk"?"uk-UA":l==="ru"?"ru-RU":"en-US",{year:"numeric",month:"long",day:"numeric"});}catch(e){return d;}}
  function load(cb){if(D)return cb(D);fetch("news.json",{cache:"no-cache"}).then(function(r){return r.json();}).then(function(j){D=j;cb(D);}).catch(function(){});}
  function sorted(d){return d.items.slice().sort(function(a,b){return a.date<b.date?1:-1;});}
  window.NK_NEWS={lang:lang,setLang:setLang,load:load,esc:esc,fmt:fmt,sorted:sorted};

  // rail on the home test page
  var rail=document.getElementById("nk-news-rail");
  if(rail){
    var cur="";
    function drawRail(){load(function(d){var l=lang();if(l===cur)return;cur=l;var u=d.ui[l];
      var h='<h2>'+esc(u.title)+'</h2><div class="nk-nr-scroll">';
      sorted(d).slice(0,4).forEach(function(it){var t=it[l];
        h+='<a class="nk-nr-item" href="news.html#'+esc(it.id)+'"><span class="nk-nr-meta">'+esc(it.tag)+' · '+esc(fmt(it.date,l))+'</span><strong>'+esc(t.title)+'</strong><span class="nk-nr-sum">'+esc(t.summary)+'</span></a>';});
      h+='</div><a class="nk-nr-all" href="news.html">'+esc(u.all)+' →</a>';
      rail.innerHTML=h;});}
    function place(){var t=document.getElementById("services");if(window.innerWidth<1100&&t&&t.parentNode&&rail.nextSibling!==t){t.parentNode.insertBefore(rail,t);}}
    drawRail();place();setInterval(function(){drawRail();place();},600);
  }

  // news page
  var app=document.getElementById("nk-news-app");
  if(app){
    var curL="",curH=null;
    function draw(){load(function(d){var l=lang(),h=location.hash.slice(1);if(l===curL&&h===curH)return;curL=l;curH=h;var u=d.ui[l];
      document.documentElement.lang=l;
      var btns=document.querySelectorAll("[data-l]");for(var i=0;i<btns.length;i++){btns[i].setAttribute("aria-pressed",btns[i].getAttribute("data-l")===l);}
      var it=null;d.items.forEach(function(x){if(x.id===h)it=x;});
      var out="";
      if(it){var t=it[l];document.title=t.title+" | Nadiya Kovch";
        out+='<a class="nk-back" href="news.html">← '+esc(u.back)+'</a><article class="nk-art"><div class="nk-nr-meta">'+esc(it.tag)+' · '+esc(fmt(it.date,l))+'</div><h1>'+esc(t.title)+'</h1><p class="nk-lead">'+esc(t.summary)+'</p>';
        t.body.forEach(function(p){out+='<p>'+esc(p)+'</p>';});
        out+='<h3>'+esc(u.source)+'</h3><ul>';it.sources.forEach(function(s){out+='<li><a href="'+esc(s.url)+'" target="_blank" rel="noopener">'+esc(s.name)+'</a></li>';});
        out+='</ul><p class="nk-disc">'+esc(d.disclaimer[l])+'</p></article>';
      }else{document.title=u.title+" | Nadiya Kovch";
        out+='<h1>'+esc(u.title)+'</h1><p class="nk-disc">'+esc(d.disclaimer[l])+' '+esc(u.updated)+': '+esc(fmt(d.updated,l))+'.</p><div class="nk-list">';
        sorted(d).forEach(function(x){var t=x[l];out+='<a class="nk-card2" href="#'+esc(x.id)+'"><span class="nk-nr-meta">'+esc(x.tag)+' · '+esc(fmt(x.date,l))+'</span><strong>'+esc(t.title)+'</strong><span class="nk-nr-sum">'+esc(t.summary)+'</span><span class="nk-more">'+esc(u.more)+' →</span></a>';});
        out+='</div>';}
      app.innerHTML=out;if(it)window.scrollTo(0,0);});}
    window.addEventListener("hashchange",draw);
    document.addEventListener("click",function(e){var b=e.target.closest&&e.target.closest("[data-l]");if(b){setLang(b.getAttribute("data-l"));draw();}});
    draw();setInterval(draw,600);
  }
})();
