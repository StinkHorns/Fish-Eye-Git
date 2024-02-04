function photographerTemplate(data) {
    const {id, name, city, country, tagline, price, portrait } = data;

    console.log( "data " + id)

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );

        const photographerFoto = document.createElement( 'a' );
        photographerFoto.setAttribute ('href', "photographer.html?id=" + id )

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.alt ="Image " + name
        photographerFoto.appendChild (img);

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        photographerFoto.appendChild (h2);

        const line2 = document.createElement( 'p' );
        line2.textContent = city + ", "+ country;
        line2.className="line2";

        const line3 = document.createElement( 'p' );
        line3.textContent = tagline;
        line3.className="line3";

        const line4 = document.createElement( 'p' );
        line4.textContent = price + "€/jour";
        line4.className="line4";

        article.appendChild(photographerFoto);
        article.appendChild(line2);
        article.appendChild(line3);
        article.appendChild(line4);
      
        return (article);
        
    }
    return { name, city, country, tagline, price, picture, getUserCardDOM }
}





