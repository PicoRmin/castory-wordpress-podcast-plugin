// ==========================================
// PODSTREAM APP.JS
// ==========================================

const categories = [
    "All",
    "Technology",
    "Business",
    "AI",
    "Marketing",
    "Startups",
    "Design",
    "Crypto",
];

// Sample podcast data
const episodes = [
    {
        id:1,
        title:"The Startup Playbook",
        creator:"John Doe",
        verified:true,
        category:"Business",
        views:"2.1M",
        date:"6 hrs ago",
        duration:"52:10",
        thumbnail:"https://source.unsplash.com/random/400x225/?business,startup"
    },
    {
        id:2,
        title:"AI Revolution",
        creator:"Lex Friedman",
        verified:true,
        category:"AI",
        views:"785K",
        date:"1 day ago",
        duration:"45:18",
        thumbnail:"https://source.unsplash.com/random/400x225/?ai,technology"
    },
    {
        id:3,
        title:"Future of SaaS Products",
        creator:"Emma Watson",
        verified:false,
        category:"Technology",
        views:"1.2M",
        date:"2 days ago",
        duration:"1:04:20",
        thumbnail:"https://source.unsplash.com/random/400x225/?technology,software"
    },
    {
        id:4,
        title:"Marketing in 2026",
        creator:"Gary Vee",
        verified:true,
        category:"Marketing",
        views:"500K",
        date:"3 days ago",
        duration:"39:12",
        thumbnail:"https://source.unsplash.com/random/400x225/?marketing"
    },
    {
        id:5,
        title:"Design Thinking",
        creator:"Alice Johnson",
        verified:false,
        category:"Design",
        views:"300K",
        date:"5 days ago",
        duration:"50:30",
        thumbnail:"https://source.unsplash.com/random/400x225/?design"
    },
    {
        id:6,
        title:"Crypto Trends",
        creator:"Satoshi Nakamoto",
        verified:true,
        category:"Crypto",
        views:"1.5M",
        date:"6 hrs ago",
        duration:"42:05",
        thumbnail:"https://source.unsplash.com/random/400x225/?crypto,bitcoin"
    },
    {
        id:7,
        title:"AI & Startups",
        creator:"Elon Musk",
        verified:true,
        category:"Startups",
        views:"900K",
        date:"1 day ago",
        duration:"48:20",
        thumbnail:"https://source.unsplash.com/random/400x225/?startup,ai"
    },
    {
        id:8,
        title:"Blockchain Basics",
        creator:"Vitalik Buterin",
        verified:true,
        category:"Crypto",
        views:"750K",
        date:"3 days ago",
        duration:"35:50",
        thumbnail:"https://source.unsplash.com/random/400x225/?blockchain"
    },
    {
        id:9,
        title:"Public Speaking Mastery",
        creator:"Emma Watson",
        verified:false,
        category:"Business",
        views:"420K",
        date:"2 days ago",
        duration:"46:12",
        thumbnail:"https://source.unsplash.com/random/400x225/?business,speech"
    },
    {
        id:10,
        title:"Designing the Future",
        creator:"Jony Ive",
        verified:true,
        category:"Design",
        views:"680K",
        date:"1 day ago",
        duration:"55:00",
        thumbnail:"https://source.unsplash.com/random/400x225/?design,future"
    },
    {
        id:11,
        title:"Marketing AI Tools",
        creator:"Sarah Lee",
        verified:false,
        category:"Marketing",
        views:"320K",
        date:"6 hrs ago",
        duration:"40:30",
        thumbnail:"https://source.unsplash.com/random/400x225/?ai,marketing"
    },
    {
        id:12,
        title:"Startup Case Studies",
        creator:"Ben Horowitz",
        verified:true,
        category:"Startups",
        views:"890K",
        date:"3 days ago",
        duration:"58:45",
        thumbnail:"https://source.unsplash.com/random/400x225/?startup,business"
    },
    {
        id:13,
        title:"Deep Learning Explained",
        creator:"Andrew Ng",
        verified:true,
        category:"AI",
        views:"1.8M",
        date:"1 day ago",
        duration:"1:10:00",
        thumbnail:"https://source.unsplash.com/random/400x225/?ai,deeplearning"
    },
    {
        id:14,
        title:"Web3 and You",
        creator:"Vitalik Buterin",
        verified:true,
        category:"Crypto",
        views:"620K",
        date:"2 days ago",
        duration:"37:25",
        thumbnail:"https://source.unsplash.com/random/400x225/?web3,crypto"
    },
    {
        id:15,
        title:"UX/UI Trends",
        creator:"Julie Zhuo",
        verified:false,
        category:"Design",
        views:"550K",
        date:"5 days ago",
        duration:"42:15",
        thumbnail:"https://source.unsplash.com/random/400x225/?ux,ui"
    },
    {
        id:16,
        title:"Scaling Startups",
        creator:"Marc Andreessen",
        verified:true,
        category:"Startups",
        views:"980K",
        date:"1 day ago",
        duration:"51:30",
        thumbnail:"https://source.unsplash.com/random/400x225/?startup,scale"
    },
    {
        id:17,
        title:"Tech Innovations",
        creator:"Elon Musk",
        verified:true,
        category:"Technology",
        views:"1.1M",
        date:"6 hrs ago",
        duration:"43:50",
        thumbnail:"https://source.unsplash.com/random/400x225/?technology,innovation"
    },
    {
        id:18,
        title:"Business Strategy",
        creator:"Peter Thiel",
        verified:true,
        category:"Business",
        views:"770K",
        date:"3 days ago",
        duration:"48:40",
        thumbnail:"https://source.unsplash.com/random/400x225/?business,strategy"
    },
    {
        id:19,
        title:"AI for Designers",
        creator:"John Maeda",
        verified:false,
        category:"AI",
        views:"430K",
        date:"2 days ago",
        duration:"39:20",
        thumbnail:"https://source.unsplash.com/random/400x225/?ai,design"
    },
    {
        id:20,
        title:"Crypto Investing",
        creator:"Changpeng Zhao",
        verified:true,
        category:"Crypto",
        views:"1.3M",
        date:"1 day ago",
        duration:"50:10",
        thumbnail:"https://source.unsplash.com/random/400x225/?crypto,investing"
    },
];

// ==========================================
// ELEMENT REFERENCES
// ==========================================

const categoryPills = document.getElementById("categoryPills");
const episodeGrid = document.getElementById("episodeGrid");
const sortSelect = document.getElementById("sortSelect");
const mobileSort = document.getElementById("mobileSort");
const paginationEl = document.getElementById("pagination");
const episodeCount = document.getElementById("episodeCount");

let currentCategory = "All";
let currentPage = 1;
const pageSize = 8;
let currentSort = "Most Popular";

// ==========================================
// INITIALIZATION
// ==========================================

function init(){

    renderCategoryPills();
    renderEpisodes();
    renderPagination();
    updateEpisodeCount();

    sortSelect.addEventListener("change", e=>{
        currentSort = e.target.value;
        currentPage = 1;
        renderEpisodes();
        renderPagination();
    });

    mobileSort.addEventListener("change", e=>{
        currentSort = e.target.value;
        currentPage = 1;
        renderEpisodes();
        renderPagination();
    });

}

// ==========================================
// CATEGORY PILL RENDER
// ==========================================

function renderCategoryPills(){

    categoryPills.innerHTML = "";

    categories.forEach(cat=>{
        const pill = document.createElement("button");
        pill.className = "category-pill";
        if(cat===currentCategory) pill.classList.add("active");

        pill.textContent = cat;

        pill.addEventListener("click", ()=>{
            currentCategory = cat;
            currentPage = 1;
            renderCategoryPills();
            renderEpisodes();
            renderPagination();
        });

        categoryPills.appendChild(pill);
    });
}

// ==========================================
// EPISODE RENDER
// ==========================================

function renderEpisodes(){

    let filtered = episodes.filter(ep=>{
        if(currentCategory==="All") return true;
        return ep.category===currentCategory;
    });

    if(currentSort==="Newest"){
        filtered.sort((a,b)=> new Date(b.date) - new Date(a.date));
    }else if(currentSort==="Oldest"){
        filtered.sort((a,b)=> new Date(a.date) - new Date(b.date));
    }

    const start = (currentPage-1)*pageSize;
    const paginated = filtered.slice(start,start+pageSize);

    episodeGrid.innerHTML = "";

    paginated.forEach(ep=>{
        const card = document.createElement("div");
        card.className = "episode-card";

        card.innerHTML = `
            <div class="thumbnail">
                <img src="${ep.thumbnail}" alt="${ep.title}" />
                <div class="play-overlay">
                    <div class="play-circle">▶</div>
                </div>
                <span class="duration">${ep.duration}</span>
            </div>
            <div class="card-content">
                <h3 class="card-title">${ep.title}</h3>
                <div class="creator">
                    ${ep.creator}
                    ${ep.verified?'<span class="verified">✔</span>':''}
                </div>
                <div class="meta">
                    ${ep.views} views • ${ep.date}
                </div>
            </div>
        `;
        episodeGrid.appendChild(card);
    });

    updateEpisodeCount(filtered.length);
}

// ==========================================
// EPISODE COUNT
// ==========================================

function updateEpisodeCount(total=episodes.length){
    if(episodeCount) episodeCount.textContent = `${total} Episodes`;
}

// ==========================================
// PAGINATION
// ==========================================

function renderPagination(){

    let filtered = episodes.filter(ep=>{
        if(currentCategory==="All") return true;
        return ep.category===currentCategory;
    });

    const totalPages = Math.ceil(filtered.length/pageSize);

    paginationEl.innerHTML = "";

    for(let i=1;i<=totalPages;i++){
        const btn = document.createElement("button");
        btn.className = "page-btn";
        if(i===currentPage) btn.classList.add("active");
        btn.textContent=i;

        btn.addEventListener("click", ()=>{
            currentPage=i;
            renderEpisodes();
            renderPagination();
        });

        paginationEl.appendChild(btn);
    }
}

// ==========================================
// INITIALIZE APP
// ==========================================

document.addEventListener("DOMContentLoaded", init);