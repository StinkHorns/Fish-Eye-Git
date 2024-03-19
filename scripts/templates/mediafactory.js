import {openLB} from "../utils/lightbox.js";


//2 photos renommées pour photograph 195

// Affichage fotos
//attention pas de async on this function
export function getFotos(data, media) {
  
    const {id, photographerId, title, image, video, likes} = data;

//console.log(data)

    function getImageInfo() {
        
     

            //the right photo
            const figure = document.createElement("figure");
            figure.classList.add("stylesgallery");

            const img = document.createElement("img");
            const videoHtml = document.createElement("video");
            const videoSource = document.createElement("source");

            const captionAndLikes = document.createElement("div");
            captionAndLikes.classList.add("captionAndLikes");

            const figCaption = document.createElement("div"); 
            figCaption.classList.add("figCaption");

            const likesAndHeart = document.createElement("div"); 
            likesAndHeart.classList.add("styleLikesHeart");
           
            figCaption.textContent = title;
            likesAndHeart.innerHTML = "<span id=\"likesId" +id+"\" >" + likes + "</span> <i name=\"heartClick\" id= " + id +" class=\"fa-solid fa-heart pointerHover\"  > </i>";
          
           
            captionAndLikes.appendChild(figCaption);
            captionAndLikes.appendChild(likesAndHeart);
            
           
            const path="./assets/photographers/" + photographerId + "/";

            if (image) {
                img.src = "./assets/photographers/" + photographerId + "/" + image ;
                figure.appendChild(img);
                img.classList.add("portfolio");
                img.classList.add("allMediaPortfolio");
                img.alt=title;
            
                img.addEventListener("click" , ()=>{openLB(data, media, path)});

            }



            if (video) { 
                videoSource.src = "./assets/photographers/" + photographerId + "/" + video ;
                videoSource.type="video/mp4";
                videoSource.alt=title;
                videoHtml.classList.add("allMediaPortfolio");
                videoHtml.alt=title;
                videoHtml.appendChild(videoSource);
                videoHtml.addEventListener("click" , ()=>{openLB(data, media, path)});


                //videoHtml.classList.add("allMediaPortfolio");
                figure.appendChild(videoHtml);
            }    

         figure.appendChild(captionAndLikes);
           
            
            return (figure);
      
    }
      
    return { photographerId, title, image, video, likes, getImageInfo }

}








