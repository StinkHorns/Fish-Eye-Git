//2 photos renommées pour photograph 195

// Affichage fotos
//attention pas de async on this function
function getFotos(data, idSelect) {
  
    const {id, photographerId, title, image, video, likes, date, price} = data;

    //console.log(idSelect + " id select and photoid = " + photographerId);

    function getImageInfo() {
        
        if (photographerId == idSelect){

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
            likesAndHeart.innerHTML = likes +"&nbsp; <i class=\"fa-solid fa-heart\"></i>";
          
           
            captionAndLikes.appendChild(figCaption);
            captionAndLikes.appendChild(likesAndHeart);
            
           
            

            if (image) {
                img.src = "./assets/photographers/" + photographerId + "/" + image ;
                figure.appendChild(img);
                img.classList.add("portfolio");
            }

            if (video) { 
                videoSource.src = "./assets/photographers/" + photographerId + "/" + video ;
                videoSource.type="video/mp4";
                videoHtml.controls=true;
                videoHtml.appendChild(videoSource);
                figure.appendChild(videoHtml);
            }    

         figure.appendChild(captionAndLikes);
           
            
            return (figure);
        }
        else {
            //not the right photo
            return null;
        }
    }
      
    return { photographerId, title, image, video, likes, idSelect, getImageInfo }

}






