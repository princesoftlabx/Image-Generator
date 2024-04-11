const searchForm = document.querySelector(".generate-form");
const searchBox = document.querySelector(".prompt-input");
const searchResult = document.querySelector(".image-gallery");
const showMoreBtn = document.querySelector("#show-more-btn");
const downBtn = document.getElementsByClassName("download-btn");

let keyword = "";
let page = 1;
const ACCESS_KEY = "KR4-HCiHrtlZeiJLd2spYEmv74MuHgvrDKO4QDMwZVU";

async function searchImages(){
    keyword = searchBox.value;
    const per_page= document.getElementsByClassName("image-quantity");
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${ACCESS_KEY}&per-page=12`;

    const response = await fetch(url);
    const data = await response.json()
    
    const results = data.results;
    results.map((results)=>{
        const image =  document.createElement("img");
        image.classList.add("img-card");
        image.setAttribute("id", "myImage");
        // console.log(image);
        image.src = results.urls.small;
        const imgLink = document.createElement("a");
        imgLink.href= results.links.html;
        imgLink.target = '_blank';

        imgLink.appendChild(image);
        searchResult.appendChild(imgLink);
        // const imgCard = document.getElementsByClassName('img-card');
        // imgCard.image.src = results.urls.small
        // image.onload= () =>{
            
            
        // }
    })

    showMoreBtn.style.display = "block";
    // downBtn.style.display = "block";
}

searchForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    page = 1;
    searchImages();
})

showMoreBtn.addEventListener("click", ()=>{
    page++;
    searchImages();
    console.log("add another page");
})

// downBtn.addEventListener("click", ()=>{
//     searchImages();
//     downBtn.setAttribute("href", image.src);
//     downBtn.setAttribute("download", `${new Date().getTime()}.jpg`);
//     console.log("image is downloaded");
// })



