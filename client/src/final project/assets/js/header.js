
document.getElementById("button").addEventListener("click",left);
let eat="burger";
function left(){
    if(eat==="burger"){ 
    document.getElementById('nav').style.display="flex";
    document.getElementById('a').style.transform="rotate(23deg)"
    document.getElementById('b').style.display="none"
    document.getElementById('c').style.transform="rotate(-23deg)"
    document.getElementById("button").style.marginTop="10px";
    eat="koko";
    }
    else if(eat==="koko"){
        document.getElementById('nav').style.display="none";
        document.getElementById('a').style.transform="rotate(0)"
        document.getElementById('b').style.display="block"
        document.getElementById('c').style.transform="rotate(0)"
        document.getElementById("button").style.marginTop="0";
        eat="burger";
    }  
}





// var hamburgerButton = document.getElementById("button");
// var mobileNav = document.getElementById("nav");

// function openMobile() {
//     mobileNav.classList.add('open');
// }
// function closeMobile() {
//     mobileNav.classList.remove('open');
// }

// hamburgerButton.addEventListener('click', openMobile);
// mobileNav.addEventListener('click', closeMobile);

