/* Interacciones de muestra: sin envío, API ni almacenamiento de datos personales. */
(()=>{'use strict';
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const norm=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const params=new URLSearchParams(location.search);
if($('#filters')){
 const q=params.get('q')||'',sector=params.get('sector')||'',tipo=params.get('tipo')||'';
 $('#q').value=q;$('#sector').value=sector;$('#tipo').value=tipo;
 let total=0;$$('[data-service]').forEach(el=>{const matches=norm(q).split(/\s+/).filter(Boolean).every(w=>norm(el.dataset.search).includes(w))&&(!sector||el.dataset.sector===sector)&&(!tipo||el.dataset.type===tipo);el.hidden=!matches;if(matches)total++;});
 $('#result-count').textContent=`${total} ${total===1?'servicio':'servicios'} en esta muestra`;
 $('#empty').hidden=total>0;
 $('#filters').addEventListener('submit',e=>{e.preventDefault();const p=new URLSearchParams();if($('#q').value.trim())p.set('q',$('#q').value.trim());if($('#sector').value)p.set('sector',$('#sector').value);if($('#tipo').value)p.set('tipo',$('#tipo').value);location.href='servicios.html?'+p;});
 $('.dl-search').addEventListener('submit',e=>{e.preventDefault();$('#filters').requestSubmit();});
}
if($('#service-name')){
 const id=params.get('id')||'granulometria',x=window.DIRLAB_DEMO.find(x=>x.id===id);
 if(x){$('#service-name').textContent=x.name;$('#service-type').textContent=x.type;$('#service-intro').textContent=x.text;$('#service-description').textContent=x.text;$('#service-lab').textContent=x.lab;$('#service-source').href=x.source;$('#request-link').href='solicitar.html?servicio='+encodeURIComponent(x.id);$('#lab-link').href=x.lab.includes('Geotecnia')?'laboratorio.html':x.source;}
 else{$('#service-name').textContent='Servicio no encontrado en esta muestra';$('#service-intro').textContent='Vuelve al catálogo para consultar los servicios disponibles en el prototipo.';$('.dl-detail').hidden=true;$('.unal-quicknav').hidden=true;}
}
if($('#request-context')){const x=window.DIRLAB_DEMO.find(x=>x.id===params.get('servicio'));if(x){$('#request-context').hidden=false;$('#request-context').textContent='Servicio de interés: '+x.name+'. Conserva este nombre para el aplicativo; no se transfiere automáticamente.';}}
if($('#labs-filter')){
 const fac=params.get('facultad')||'';$('#faculty').value=fac;let n=0;$$('[data-faculty]').forEach(el=>{el.hidden=!!fac&&el.dataset.faculty!==fac;if(!el.hidden)n++;});$('#lab-count').textContent=`${n} ${n===1?'laboratorio':'laboratorios'} en esta muestra`;
}
const nav=$('.unal-quicknav');if(nav&&'IntersectionObserver'in window){const links=[...nav.querySelectorAll('a')];const observer=new IntersectionObserver(entries=>{for(const e of entries)if(e.isIntersecting){links.forEach(a=>{if(a.hash==='#'+e.target.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}},{rootMargin:'-10% 0px -55% 0px'});links.forEach(a=>{const target=document.getElementById(a.hash.slice(1));if(target)observer.observe(target);});}
})();
