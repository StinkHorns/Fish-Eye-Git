 // LIGHTBOX things

//openLightBox.addEventListener("click",e=>{
//    lightboxModal.style.display = "block";
//   console.log("vvvv");
//  return false
//  })

closeLightBox.addEventListener("click",e=>{
    lightboxModal.style.display = "none";
    return false
})

export function openLB(current, pictures, path) {

    lightboxModal.style.display = "block";
    const titleLBPic=document.createElement("span")
    titleLBPic.id="picCaption";
    titleLBPic.innerText=current.title;

    if (current.image){
        const img=document.createElement("img");
        img.src = path + current.image;
        img.id="picLightBox";
        contentLB.innerHTML="";
        
        contentLB.appendChild(img);
    }
    else {
        console.log(current)

        const video=document.createElement("video");
        const videoSource=document.createElement("source");
        videoSource.src=path +current.video;
        videoSource.type="video/mp4"

        video.appendChild(videoSource)
        video.controls=true
        contentLB.innerHTML="";
        contentLB.appendChild(video);
    }
   contentLB.appendChild(titleLBPic);


    let index=pictures.indexOf(current);
    console.log("index nr=  " + index)

//Sliding images Left 
    let previous=document.getElementById("previous");
    previous.addEventListener("click", functionE=> {
        if (index > 0) {
        openLB(pictures[index-1], pictures, path)
        }
        else {
        openLB(pictures[pictures.length-1], pictures, path)
        }
    
    })

//Sliding images  Right


let next=document.getElementById("next");
next.addEventListener("click", functionE=> {
    if ( index< pictures.length-1) {
    openLB(pictures[index+1], pictures, path)
    }
    else {
    openLB(pictures[0], pictures, path)
    }

})



}

 const contentLB=document.getElementById("contentLB");






 