
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

export default left;