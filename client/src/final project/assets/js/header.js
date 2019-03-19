document.getElementById("button").addEventListener("click",left);
let eat="burger";
function left(){
    if(eat==="burger"){ 
    document.getElementById('nav').style.right="0";
    document.getElementById('nav').style.transition="1s";
    document.getElementById('a').style.transform="rotate(32deg)"
    document.getElementById('b').style.display="none"
    document.getElementById('c').style.transform="rotate(-32deg)"
    eat="koko";
    }
    else if(eat==="koko"){
        document.getElementById('nav').style.right="-164px";
        document.getElementById('a').style.transform="rotate(0)"
        document.getElementById('b').style.display="block"
        document.getElementById('c').style.transform="rotate(0)"
        eat="burger";
    }   
}

