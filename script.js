const posts = [
  {id:1,user:"ruta_urbana",time:"Hace 42 min",community:"Transporte",title:"¿Alguien más quedó atrapado en el desvío de esta mañana?",text:"El cambio de ruta tomó por sorpresa a varios pasajeros. ¿Alguien sabe hasta cuándo estará así?",tag:"Transporte",votes:342,comments:58,avatar:"RU",avatarClass:"a1"},
  {id:2,user:"luz_de_barrio",time:"Hace 1 h",community:"Seguridad",title:"Otra vez sin alumbrado en mi calle",text:"Desde anoche hay tres postes apagados. Ya se reportó, pero quería saber si en otras cuadras ocurre lo mismo.",tag:"Seguridad",votes:187,comments:31,avatar:"LB",avatarClass:"a2"},
  {id:3,user:"marco_s",time:"Hace 2 h",community:"Servicios públicos",title:"Corte de agua: ¿alguien recibió aviso?",text:"En mi zona empezó el corte temprano y no encontramos información clara sobre la duración.",tag:"Servicios públicos",votes:266,comments:44,avatar:"MS",avatarClass:"a3"},
  {id:7,user:"foto_cotidiana",time:"Hace 2 h",community:"Lima",title:"Así estaba la calle esta mañana después de la lluvia",image:"calle-lluvia.jpg",tag:"Fotografía",votes:521,comments:73,avatar:"FC",avatarClass:"a4"},
  {id:5,user:"anónimo",time:"Hace 5 horas",community:"Ancón",title:"¿Hasta cuándo vamos a esperar?",location:"Ancón",image:"foro-cenisur.jpg",text:"Llevamos cuatro meses pidiendo que declaren inhabitable esta zona. Necesitamos ayuda para tener un lugar donde vivir. El municipio dice que no hay riesgo. Los medios dicen lo mismo. Ayer cedió parte del techo. Mi hijo de ocho años estaba adentro, ¿hasta cuándo vamos a esperar? ¿hasta que alguien muera para que esto sea noticia?",tag:"Denuncia",votes:128,downvotes:9,comments:24,avatar:"AN",avatarClass:"a7",special:true,
    commentList:[
      ["Sandra_Perez","¿Esto ocurrió en qué zona exactamente?","Hace 1 h"],
      ["vx_27","Llevamos meses reclamando por lo mismo.","Hace 52 min"],
      ["usuario_482","Esto también está pasando cerca de Cenisur.","Hace 38 min"],
      ["mariap","Ojalá puedan recibir una respuesta pronto.","Hace 21 min"]
    ]},
  {id:4,user:"vecino_del_sur",time:"Hace 3 h",community:"Comunidad",title:"La basura se está acumulando otra vez en esta esquina",text:"No es la primera vez. ¿Alguien sabe cuál es el canal correcto para reportarlo?",tag:"Problemas vecinales",votes:119,comments:22,avatar:"VS",avatarClass:"a5"},
  {id:6,user:"casa_en_busqueda",time:"Hace 3 h",community:"Vivienda",title:"¿Qué zonas recomiendan para alquilar cerca de una estación?",text:"Busco un lugar tranquilo para una persona, con acceso razonable a transporte. Se agradecen experiencias recientes.",tag:"Vivienda",votes:204,comments:67,avatar:"CB",avatarClass:"a6"},
  {id:8,user:"bus_21",time:"Hace 6 h",community:"Transporte",title:"¿Alguien sabe qué pasó con esta ruta de transporte?",text:"Hoy no pasó ninguno de los buses que normalmente tomo. La gente estuvo esperando bastante rato.",tag:"Transporte",votes:93,comments:18,avatar:"B2",avatarClass:"a8"},
  {id:9,user:"noche_lima",time:"Hace 7 h",community:"Seguridad",title:"¿Han visto este problema en sus barrios?",text:"Sería útil saber si el mismo patrón se está repitiendo en otras zonas o solo en nuestra cuadra.",tag:"Seguridad",votes:76,comments:14,avatar:"NL",avatarClass:"a2"},
  {id:10,user:"vida_comun",time:"Hace 8 h",community:"Comunidad",title:"Vecinos organizan jornada de limpieza este sábado",text:"La convocatoria es abierta. Si alguien tiene datos sobre horarios o puntos de encuentro, puede dejarlos aquí.",tag:"Comunidad",votes:154,comments:29,avatar:"VC",avatarClass:"a3"},
  {id:11,user:"trafico_real",time:"Hace 9 h",community:"Lima",title:"El tráfico está imposible esta mañana",text:"Compartan por aquí qué avenidas están más cargadas para quienes todavía tienen que salir.",tag:"Tránsito",votes:298,comments:102,avatar:"TR",avatarClass:"a1"},
  {id:12,user:"pregunta_local",time:"Hace 11 h",community:"Lima",title:"¿Dónde recomiendan comprar plantas para el balcón?",text:"Quiero empezar un pequeño huerto en casa y busco un lugar con variedad de aromáticas.",tag:"Recomendaciones",votes:61,comments:27,avatar:"PL",avatarClass:"a5"},
  {id:13,user:"mirada_vecinal",time:"Ayer",community:"Noticias",title:"¿Qué temas debería discutir la comunidad esta semana?",text:"Abro este hilo para reunir propuestas de temas locales que merezcan conversación.",tag:"Discusión",votes:231,comments:86,avatar:"MV",avatarClass:"a6"},
  {id:14,user:"archivo_de_barrio",time:"Ayer",community:"Lima",title:"Una fotografía antigua que encontré en casa",image:"https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?auto=format&fit=crop&w=1200&q=80",tag:"Fotografía",votes:416,comments:49,avatar:"AB",avatarClass:"a4"},
  {id:15,user:"datos_vecinales",time:"Hace 2 días",community:"Servicios públicos",title:"¿Cómo podemos organizar mejor los reportes de servicios?",text:"Quizá podamos reunir en un solo hilo los problemas recurrentes y las zonas donde aparecen.",tag:"Servicios públicos",votes:173,comments:35,avatar:"DV",avatarClass:"a8"}
];

const feed = document.getElementById("feed");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");
const clearSearch = document.getElementById("clearSearch");
const searchStatus = document.getElementById("searchStatus");
const toast = document.getElementById("toast");
let currentSort = "recent";
let query = "";
const state = {};

posts.forEach(p => state[p.id] = {votes:p.votes, voted:0, saved:false, commentsOpen:false});

function escapeHtml(value=""){
  return value.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
}
function score(p){ return state[p.id].votes; }

function renderPosts(){
  let filtered = posts.filter(p => {
    const hay = [p.user,p.community,p.title,p.text,p.tag,p.location||""].join(" ").toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  if(currentSort === "recent") filtered.sort((a,b)=>a.id-b.id);
  if(currentSort === "comments") filtered.sort((a,b)=>b.comments-a.comments);
  if(currentSort === "relevant") filtered.sort((a,b)=>score(b)-score(a));

  feed.innerHTML = filtered.map(renderPost).join("");
  emptyState.classList.toggle("hidden", filtered.length !== 0);

  if(query){
    searchStatus.classList.remove("hidden");
    searchStatus.textContent = `${filtered.length} publicación${filtered.length===1?"":"es"} encontrada${filtered.length===1?"":"s"} para “${query}”`;
  } else searchStatus.classList.add("hidden");
}

function renderPost(p){
  const s = state[p.id];
  const locationLine = p.location ? ` <span class="post-dot">·</span> <span class="post-location">${escapeHtml(p.location)}</span>` : "";
  const image = p.image ? `<img class="post-image ${p.special ? "ancón" : ""}" src="${escapeHtml(p.image)}" alt="${p.special ? "Fotografía documental de una vivienda gravemente dañada" : "Imagen de la publicación"}" onerror="this.style.display='none';this.nextElementSibling?.classList.remove('hidden')"><div class="image-fallback hidden">Coloca “foro-cenisur.jpg” en esta misma carpeta para mostrar la fotografía.</div>` : "";
  const comments = p.special ? `
    <div class="comments ${s.commentsOpen ? "open":""}" id="comments-${p.id}">
      ${p.commentList.map(c=>`<div class="comment"><div class="comment-avatar">${escapeHtml(c[0].slice(0,2).toUpperCase())}</div><div><div><span class="comment-user">${escapeHtml(c[0])}</span><span class="comment-time">${escapeHtml(c[2])}</span></div><p>${escapeHtml(c[1])}</p><div class="comment-actions">Responder · Me gusta</div></div></div>`).join("")}
    </div>` : `<div class="comments ${s.commentsOpen ? "open":""}" id="comments-${p.id}"><div class="comment"><div class="comment-avatar">VA</div><div><span class="comment-user">VozAbierta</span><p>La conversación de esta publicación aparecerá aquí.</p></div></div></div>`;

  return `<article class="post ${p.special ? "ancón-post":""}" id="post-${p.id}" data-id="${p.id}">
    <div class="post-inner">
      <div class="post-meta">
        <span class="post-avatar ${p.avatarClass}">${escapeHtml(p.avatar)}</span>
        <span class="post-user">${escapeHtml(p.user)}</span>
        <span class="post-dot">·</span><span>${escapeHtml(p.time)}</span>${locationLine}
      </div>
      <h2 class="post-title">${escapeHtml(p.title)}</h2>
      ${p.text ? `<p class="post-text">${escapeHtml(p.text)}</p>` : ""}
      ${image}
      <span class="tag">${escapeHtml(p.tag)}</span>
      <div class="post-actions">
        <div class="vote-box">
          <button class="vote-btn up ${s.voted===1?"active":""}" data-action="up" aria-label="Votar a favor">↑</button>
          <span class="vote-count">${score(p)}</span>
          <button class="vote-btn down ${s.voted===-1?"active":""}" data-action="down" aria-label="Votar en contra">↓</button>
        </div>
        <button class="action-btn ${s.commentsOpen?"saved":""}" data-action="comments">▢ <span>${p.comments} comentarios</span></button>
        <button class="action-btn" data-action="share">↗ <span class="label">Compartir</span></button>
        <button class="action-btn ${s.saved?"saved":""}" data-action="save">▱ <span class="label">${s.saved?"Guardado":"Guardar"}</span></button>
        <button class="action-btn more-btn" data-action="more" aria-label="Más opciones">•••</button>
      </div>
    </div>
    ${comments}
  </article>`;
}

feed.addEventListener("click", e => {
  const btn = e.target.closest("[data-action]");
  if(!btn) return;
  const post = e.target.closest(".post");
  const id = Number(post.dataset.id);
  const p = posts.find(x=>x.id===id);
  const s = state[id];
  const action = btn.dataset.action;

  if(action==="up" || action==="down"){
    const direction = action==="up" ? 1 : -1;
    if(s.voted===direction){ s.voted=0; s.votes-=direction; }
    else { if(s.voted!==0) s.votes-=s.voted; s.voted=direction; s.votes+=direction; }
    renderPosts();
  }
  if(action==="save"){ s.saved=!s.saved; renderPosts(); showToast(s.saved ? "Publicación guardada" : "Quitada de guardados"); }
  if(action==="comments"){
    s.commentsOpen=!s.commentsOpen; renderPosts();
    if(s.commentsOpen) setTimeout(()=>document.getElementById(`comments-${id}`)?.scrollIntoView({behavior:"smooth",block:"nearest"}),30);
  }
  if(action==="share"){
    const shareData={title:p.title,text:`${p.title} — Voz Abierta`,url:location.href};
    if(navigator.share) navigator.share(shareData).catch(()=>{});
    else {navigator.clipboard?.writeText(location.href); showToast("Enlace copiado");}
  }
  if(action==="more") showToast("Más opciones estarán disponibles próximamente");
});

function setSort(sort){
  currentSort=sort;
  document.querySelectorAll(".sort-btn").forEach(b=>b.classList.toggle("active",b.dataset.sort===sort));
  renderPosts();
}
document.querySelectorAll(".sort-btn").forEach(b=>b.addEventListener("click",()=>setSort(b.dataset.sort)));
document.querySelectorAll(".side-link[data-sort]").forEach(b=>b.addEventListener("click",()=>{
  document.querySelectorAll(".side-link").forEach(x=>x.classList.remove("active")); b.classList.add("active"); setSort(b.dataset.sort);
}));
document.querySelectorAll(".community-link").forEach(b=>b.addEventListener("click",()=>{
  searchInput.value=b.dataset.community; query=b.dataset.community; clearSearch.style.display="block"; renderPosts();
}));
document.querySelectorAll(".topic-list button").forEach(b=>b.addEventListener("click",()=>{
  searchInput.value=b.dataset.search; query=b.dataset.search; clearSearch.style.display="block"; renderPosts();
}));
searchInput.addEventListener("input",()=>{query=searchInput.value.trim();clearSearch.style.display=query?"block":"none";renderPosts();});
clearSearch.addEventListener("click",()=>{searchInput.value="";query="";clearSearch.style.display="none";renderPosts();searchInput.focus();});
document.getElementById("savedNav").addEventListener("click",()=>{
  const saved=posts.filter(p=>state[p.id].saved);
  if(!saved.length){showToast("Todavía no tienes publicaciones guardadas");return;}
  query="";searchInput.value="";
  feed.innerHTML=saved.map(renderPost).join("");searchStatus.classList.remove("hidden");searchStatus.textContent=`${saved.length} publicación${saved.length===1?"":"es"} guardada${saved.length===1?"":"s"}`;
});

const modal=document.getElementById("createModal");
function openModal(){modal.classList.add("open");modal.setAttribute("aria-hidden","false");document.getElementById("newTitle").focus();}
function closeModal(){modal.classList.remove("open");modal.setAttribute("aria-hidden","true");}
document.getElementById("openCreate").addEventListener("click",openModal);
document.getElementById("floatingCreate").addEventListener("click",openModal);
document.getElementById("closeCreate").addEventListener("click",closeModal);
modal.addEventListener("click",e=>{if(e.target===modal)closeModal();});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal();});

document.getElementById("createForm").addEventListener("submit",e=>{
  e.preventDefault();
  const title=document.getElementById("newTitle").value.trim();
  const text=document.getElementById("newText").value.trim();
  const community=document.getElementById("newCommunity").value;
  if(!title)return;
  const newPost={id:Date.now(),user:"tú",time:"Ahora",community,title,text,tag:community,votes:1,comments:0,avatar:"TU",avatarClass:"a7"};
  posts.unshift(newPost); state[newPost.id]={votes:1,voted:1,saved:false,commentsOpen:false};
  closeModal();e.target.reset();currentSort="recent";setSort("recent");showToast("Publicación creada");
});

document.getElementById("loginBtn").addEventListener("click",()=>showToast("Inicio de sesión disponible próximamente"));
document.querySelectorAll(".mobile-nav-btn").forEach(b=>b.addEventListener("click",()=>{
  document.querySelectorAll(".mobile-nav-btn").forEach(x=>x.classList.remove("active"));b.classList.add("active");
  if(b.dataset.section==="recent")setSort("recent"); else if(b.dataset.section==="popular")setSort("relevant");
}));
document.getElementById("mobileCommunities").addEventListener("click",()=>window.scrollTo({top:document.body.scrollHeight,behavior:"smooth"}));
function showToast(msg){toast.textContent=msg;toast.classList.add("show");clearTimeout(showToast.t);showToast.t=setTimeout(()=>toast.classList.remove("show"),1800);}
renderPosts();
