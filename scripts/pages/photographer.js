//Mettre le code JavaScript lié à la page photographer.html

async function getPhotographers() {
    let data = await fetch ("./data/photographers.json")

let photographers = await data.json()


    // et bien retourner le tableau photographers seulement une fois récupéré
   return photographers
}

async function displayData(photographers) {
    const photographerHeader = document.getElementById("photographerHeader");


    let params = new URLSearchParams (document.location.search)
    let idSelected = params.get("id")
    console.log ("id=" +idSelected)

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer,idSelected);
        const userCardDOM = photographerModel.photographerInfo();
        //photographerHeader.appendChild(userCardDOM);

    });
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    console.log (photographers);
    displayData(photographers);
}


function getIdSelected (){
let params = new URLSearchParams (document.location.search)
let idSelected = params.get("id")
return idSelected

}




function photographerTemplate(data,idSelect) {

    const {id, name, city, country, tagline, portrait } = data;

    const picture = `assets/photographers/${portrait}`;
    
    function photographerInfo() {
    const contentLeft = document.getElementById("contentLeft");
    contentRight = document.getElementById("contentRight");
    const h2 = document.createElement( 'h2' );
    const line2 = document.createElement( 'p' );
    const line3 = document.createElement( 'p' );
    const img = document.createElement( 'img' );

    console.log("id="+ id)

    if (id == idSelect){
        h2.textContent = name;
        h2.className="h2photographers";
        console.log("if")

        
        line2.textContent = city + ", "+ country;
        line2.className="line2";

        
        line3.textContent = tagline;
        line3.className="line3";

        img.setAttribute("src", picture)
        img.alt ="Image " + name 
        img.classList.add ("fotoImg")

 

        
        contentLeft.appendChild(h2);
        contentLeft.appendChild(line2);
        contentLeft.appendChild(line3);
        contentRight.appendChild(img); 
         }


    }

    return { name, city, country, tagline, picture, photographerInfo }
}

init();


// Variables


const gallery = document.getElementById("photographerGallery");

// Retourne le tableau Portfolio Photos

async function portfolioFotos() {
let data = await fetch ("./data/photographers.json");
let media = await data.json();
console.log(media);

return media
}





// Affichage fotos

async function getFotos() {
const { media }  = await portfolioFotos();
console.log(media);

let idSelect = getIdSelected();
console.log(idSelect + " id select");

media.forEach(element => {
    console.log(element.photographerId);

    if (element.photographerId == idSelect){

        console.log("hola");


    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const video = document.createElement("video");
    const videoSource = document.createElement("source");

    const figCaption = document.createElement("figCaption"); 
    figCaption.textContent = element.title
    figure.classList.add("stylesgallery");

    if (element.image) {
    img.src = "./assets/photographers/" + element.photographerId + "/" + element.image ;
    figure.appendChild(img);
    img.classList.add("portfolio");
    }

    if (element.video) { 
    videoSource.src = "./assets/photographers/" + element.photographerId + "/" + element.video ;
    videoSource.type="video/mp4";
    video.controls=true;
    video.appendChild(videoSource);
    figure.appendChild(video);
    }    

   
    
    figure.appendChild(figCaption);
    gallery.appendChild(figure);
     }
});





}
getFotos()




