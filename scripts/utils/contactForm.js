function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}



//First Name Validation

function validFirstName() {
    const firstName = document.querySelector("#first").value;
    const errorMessage = document.querySelector("#errorFirstName");

    if(firstName.length>=2){
        errorMessage.style.display="none"
      return true
    }
    
    errorMessage.style.display="block"
    errorMessage.innerHTML="Not the right format: Firstname"
    return false
    }

//Surname Validation

function validSurname() {
    const surname = document.querySelector("#surname").value;
    const errorMessage = document.querySelector("#errorSurname");
  console.log(surname)
    if(surname.length>=2){
        errorMessage.style.display="none"
      return true
    }
    
    errorMessage.style.display="block"
    errorMessage.innerHTML="Not the right format: surname"
    return false
    }

//Email Validation

  function validEmail() {
 
  const error = document.querySelector("#errorEmail");
  const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const emailok = document.querySelector("#email").value.match(emailPattern);
 
  console.log(emailok)
 
 
 if(emailok){
   error.style.display="none"
   return true
 }
 
 console.log("error")
 error.style.display="block"
 error.innerHTML="Adresse e-mail invalide"
 return false
 }

// start valitation function

function checkContactForm(){
    }

    // Send button function

    function addClickModal () {
      const buttonModal = document.querySelector("#buttonModal");
      buttonModal.addEventListener("click",() =>{
      event.preventDefault();
      const formValid = validFirstName() && validSurname() && validEmail();
      
      if (formValid) {
          console.log("hola Conditions")
          closeModal()
           }

      else {        
         }

      });
      
    }

    addClickModal();
    
  
