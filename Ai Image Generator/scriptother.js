const generateForm = document.querySelector(".generate-form");
const imgGallery = document.querySelector(".image-gallery");
// const userPrompt = document.querySelector(".prompt-input");
const showMoreBtn = document.querySelector("#show-more-btn");
// const updateImageCard = (imgDataArray)=>{
//     imgDataArray.forEach((imgObj, index)=>{
//         let imgCard = imgGallery.querySelectorAll(".img-card")[index];
//         let imgElement = imgCard.querySelector("img");
//         //set the image sourece to the ai generated image data
//         let aiGenerator = `data:image/jpeg;base64,${imgObj.b64_json}`;
//         imgElement.src = aiGenerator;
//         //When the image is loaded remove the loading class
//         imgElement.onload= () =>{
//             imgCard.classList.remove("loading");
//         }

//     });
// }

const ACCESS_KEY = "KR4-HCiHrtlZeiJLd2spYEmv74MuHgvrDKO4QDMwZVU";

const generateAiImages = async (userPrompt, userImgQuantity)=>{
    try{
        // Send a request to the OpenAi API to generate images based on user inputs
        const response = await fetch(`https://api.unsplash.com/search/photos?page=${userImgQuantity}&query=${userPrompt}&client_id=${ACCESS_KEY}`); //, {
        //     method: "GET",
        //     headers: {
        //         "Content-Type": "application/json",
        //         'client_id': `${ACCESS_KEY}`,
        //     },
        //     body: JSON.stringify({
        //         prompt: userPrompt,
        //         n: userImgQuantity,
        //     }),
        // });

        if(!response.ok) throw new Error("Failed to generate images! Please try again.");

        const  data  = await response.json(); //Get data from the response
        json_data = json.parse(data);
        console.log(data);
    } catch(error){
        console.log(error)
    }
}

const handleFormSubmission = (e) =>{
    e.preventDefault();
    // console.log(e.srcElement);

    //Get user input and image quantity from the form 
    const userPrompt = e.srcElement[0].value;
    const userImgQuantity = e.srcElement[1].value;

    // console.log(userPrompt, userImgQuantity);

    //Creating HTML markup for image cards with loading state
    const imgCardMarkup = Array.from({length: userImgQuantity}, () =>
        `<div class="img-card loading">
        <img src="images/loader.svg" alt="image">
        <a href="#" class="download-btn">
            <img src="images/download.svg" alt="download icon">
        </a>
    </div>`
    ).join("");

    imgGallery.innerHTML = imgCardMarkup;
    generateAiImages(userPrompt, userImgQuantity);
}

generateForm.addEventListener("submit", handleFormSubmission);