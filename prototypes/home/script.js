const slides = [
{
title:"Future of Artificial Intelligence",
desc:"Discover how AI is reshaping business, creativity and humanity.",
image:"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600"
},
{
title:"The Creator Economy Revolution",
desc:"How creators are building million dollar businesses.",
image:"https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600"
},
{
title:"Building Global SaaS Products",
desc:"Learn the frameworks behind the fastest growing startups.",
image:"https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600"
}
];

let current = 0;

const heroTitle = document.getElementById("heroTitle");
const heroDesc = document.getElementById("heroDescription");
const heroImage = document.getElementById("heroImage");

function updateHero() {

heroTitle.textContent = slides[current].title;
heroDesc.textContent = slides[current].desc;
heroImage.src = slides[current].image;

document.querySelectorAll(".dot").forEach(dot=>{
dot.classList.remove("active");
});

document.querySelectorAll(".dot")[current]
.classList.add("active");
}

setInterval(()=>{
current++;

if(current >= slides.length){
current = 0;
}

updateHero();

},5000);

document.querySelectorAll(".follow-btn")
.forEach(btn=>{

btn.addEventListener("click",()=>{

if(btn.textContent==="Follow"){
btn.textContent="Following";
btn.style.background="#22C55E";
}else{
btn.textContent="Follow";
btn.style.background="#7C3AED";
}

});

});

const notificationBtn =
document.getElementById("notificationBtn");

notificationBtn.addEventListener("click",()=>{

const badge =
notificationBtn.querySelector(".badge");

let count = parseInt(badge.textContent);

if(count > 0){
count--;
badge.textContent = count;
}

});

document.querySelectorAll(".topic")
.forEach(topic=>{

topic.addEventListener("click",()=>{

document.querySelectorAll(".topic")
.forEach(t=>t.style.background=
"rgba(124,58,237,.12)");

topic.style.background=
"rgba(124,58,237,.4)";

});

});

document.getElementById("searchInput")
.addEventListener("keyup",(e)=>{

const value = e.target.value.toLowerCase();

document.querySelectorAll(".episode-card")
.forEach(card=>{

const title =
card.querySelector("h3")
.textContent.toLowerCase();

card.style.display =
title.includes(value)
? "block"
: "none";

});

});