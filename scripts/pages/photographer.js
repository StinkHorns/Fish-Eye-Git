import { getFotos } from "../templates/mediafactory.js";

const triSelectValue = document.getElementById ("triMenu");
let medias = [];
let photographers = [];
const gallery = document.getElementById("photographerGallery");


//Mettre le code JavaScript lié à la page photographer.html
async function getPhotographers() {
    let data = await fetch ("./data/photographers.json");
    let photographers = await data.json(); //retrives all file

    // et bien retourner le tableau photographers seulement une fois récupéré
   return photographers;
}



async function displayData(photographers, media) {
 
    const photographerHeader = document.getElementById("photographerHeader");
    let addedTotalLikes = 0;

    //let params = new URLSearchParams (document.location.search)
    //params.get("id")
    let idSelected = getIdSelected();

 
    let idPhotographer=document.getElementById("id");
    idPhotographer.value= idSelected


    //console.log ("id=" +idSelected)

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer,idSelected);
        const userCardDOM = photographerModel.photographerInfo();
        //photographerHeader.appendChild(userCardDOM);

    });

    const totalCounter = document.getElementById("totalCounter");
    //tri
    //triSortingImages(media, triSelected);
    

    media.forEach((singlePhoto)=> {
        const imageModel = getFotos(singlePhoto,media);
        const imageCardDOM = imageModel.getImageInfo();
        if (imageCardDOM) {
            gallery.appendChild(imageCardDOM);
            addedTotalLikes +=singlePhoto.likes;
            //console.log("added" + addedTotalLikes)
            
        }

    })

    totalCounter.textContent = addedTotalLikes;
    
}

async function init() {
    // Récupère les datas des photographes { photographers } only Json file, not { media}, but {photographers,media}récupère tout
    

    let { photographers, media } = await getPhotographers();
    //const { media } = await getPhotographers();
    let idSelect=getIdSelected();
   
    media=media.filter(item=>item.photographerId==idSelect);
    medias = media;
    //console.log (media);
    displayData(photographers, media);
    addingHeartLikes(); // adding clicks on hearts function
    addClickHomepage(); //adding the click for homepage

    

}




// FISHEYE logo Link to homepage
function addClickHomepage() {
    let logoLink  = document.getElementById ("logo")
    logoLink.alt = "Fisheye Home page";
    logoLink.addEventListener("click", goHomePage);

    function goHomePage () {
        document.location.href = "/";
    }
}

//Adding likes function
function addingHeartLikes(){

   let heartIconList = document.getElementsByName("heartClick");

   heartIconList.forEach((singleHeart)=> {
        singleHeart.addEventListener("click" , addOneLike);
        function addOneLike () {
            //console.log(singleHeart.id);
            const spanValueLikes = document.getElementById("likesId"+singleHeart.id);
            const totalCounter = document.getElementById("totalCounter");
            spanValueLikes.textContent = parseInt (spanValueLikes.textContent) +1;
            totalCounter.textContent = parseInt (totalCounter.textContent) +1;
            singleHeart.removeEventListener("click", addOneLike); //only one click, then stops click
        }

    
})
}




function getIdSelected () {
    let params = new URLSearchParams (document.location.search)
    let idSelected = params.get("id")
    return idSelected;

}



function photographerTemplate(data,idSelect) {

    const {id, name, city, country, tagline, portrait, price } = data;

    const picture = `assets/photographers/${portrait}`;
    
    function photographerInfo() {
        const contentLeft = document.getElementById("contentLeft");
        const contentRight = document.getElementById("contentRight");
        const h2 = document.createElement( 'h2' );
        const line2 = document.createElement( 'p' );
        const line3 = document.createElement( 'p' );
        const img = document.createElement( 'img' );

        //console.log("id="+ id)

        if (id == idSelect){
            h2.textContent = name;
            h2.className="h2photographers";
                    
            line2.textContent = city + ", "+ country;
            line2.className="line2p";
            line3.textContent = tagline;
            line3.className="line3p";

            img.setAttribute("src", picture)
            img.alt ="Image " + name 
            img.classList.add ("fotoImg")

           

            contentLeft.appendChild(h2);
            contentLeft.appendChild(line2);
            contentLeft.appendChild(line3);
            contentRight.appendChild(img); 

   // Modal with Potographers name

        const modalName = document.createElement("section");
        modalName.classList.add("modalName");
        modalName.innerHTML = name;

    
        document.querySelector("#contact_modal > div > div").appendChild(modalName);
       

        // Counter Likes and Price

        const counterLikesAndPrice = document.createElement("div");
        counterLikesAndPrice.classList.add("styleCounter");

        const priceDay = document.createElement("div");
        priceDay.classList.add("stylePriceDay");

        const totalCounter = document.createElement("div");
        totalCounter.classList.add("totalCounter");
        


        totalCounter.innerHTML = "<span id=\"totalCounter\">  </span>" + " <i class=\"fa-solid fa-heart\"></i>";
        priceDay.innerHTML = price + "€ &nbsp;" +"/ jour";

        document.body.appendChild(counterLikesAndPrice);
        counterLikesAndPrice.appendChild(totalCounter);
        counterLikesAndPrice.appendChild(priceDay);

        
     }
    }

    return { name, city, country, tagline, picture, price, photographerInfo }
}

// Tri Functions

/*function getTriMenu () {
    let params = new URLSearchParams (document.location.search)
    let triMenu = params.get("triMenu")
    
    if (triMenu == null || triMenu== "") {
    triMenu="date";
    }


    return triMenu;

}*/



function triSortingImages (media, triSelected){
    console.log(media);

    if (triSelected === "popularite" ){
        media.sort(function (a, b) {
            return b.likes - a.likes;
        });
    }
    if (triSelected === "date" ){
        media.sort(function (a, b) {
            if (a.date < b.date) {
                return -1;
            }
            if (a.date > b.date) {
                return 1;
            }
            return 0;
        });
    }
    if (triSelected === "titre" ){

        let result= media.sort(function (a, b) {
            if (a.title < b.title) {
                return -1;
            }
            if (a.title > b.title) {
                return 1;
            }
            return 0;      

        });
        console.log(result);

    }
    console.log(media);
gallery.innerHTML="";

    media.forEach((singlePhoto)=> {
        const imageModel = getFotos(singlePhoto,media);
        const imageCardDOM = imageModel.getImageInfo();
        if (imageCardDOM) {
            gallery.appendChild(imageCardDOM);
           // addedTotalLikes +=singlePhoto.likes;
            //console.log("added" + addedTotalLikes)
            
        }

    })
}

function selectTriOption(triSelected){
     let optionsTriMenu = document.getElementById("triMenu").options;
     //optionsTriMenu.forEach(optionTriMenu=>{
        for(let i=0;i<optionsTriMenu.length;i++){
          
            if(optionsTriMenu[i].value==triSelected){
                optionsTriMenu[i].selected=true
        }
        }

    // } )
}

triSelectValue.addEventListener("change", ()=>{
    console.log(triSelectValue.value);
    triSortingImages(medias, triSelectValue.value);

})







// calling the init of the photographer page
init();



