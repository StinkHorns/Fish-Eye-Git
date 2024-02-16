//Mettre le code JavaScript lié à la page photographer.html
async function getPhotographers() {
    let data = await fetch ("./data/photographers.json");
    let photographers = await data.json(); //retrives all file

    // et bien retourner le tableau photographers seulement une fois récupéré
   return photographers;
}

async function displayData(photographers, media) {
    const photographerHeader = document.getElementById("photographerHeader");
    const gallery = document.getElementById("photographerGallery");
    let addedTotalLikes = 0;

    //let params = new URLSearchParams (document.location.search)
    //params.get("id")
    let idSelected = getIdSelected();
    
    //console.log ("id=" +idSelected)

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer,idSelected);
        const userCardDOM = photographerModel.photographerInfo();
        //photographerHeader.appendChild(userCardDOM);

    });

    const totalCounter = document.getElementById("totalCounter");

    media.forEach((singlePhoto)=> {
        const imageModel = getFotos(singlePhoto,idSelected);
        const imageCardDOM = imageModel.getImageInfo();
        if (imageCardDOM) {
            gallery.appendChild(imageCardDOM);
            addedTotalLikes +=singlePhoto.likes;
            console.log("added" + addedTotalLikes)
            
        }

    })

    totalCounter.textContent = addedTotalLikes;
    
}

async function init() {
    // Récupère les datas des photographes { photographers } only Json file, not { media}, but {photographers,media}récupère tout
    const { photographers, media } = await getPhotographers();
    //const { media } = await getPhotographers();

    console.log (photographers);
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
            console.log(singleHeart.id);
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
        contentRight = document.getElementById("contentRight");
        const h2 = document.createElement( 'h2' );
        const line2 = document.createElement( 'p' );
        const line3 = document.createElement( 'p' );
        const img = document.createElement( 'img' );

        console.log("id="+ id)

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


// calling the init of the photographer page
init();