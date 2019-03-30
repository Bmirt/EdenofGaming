let push="chat";
function left(){
    if(push==="chat"){ 
    document.getElementById('chat').style.right="0";
    document.getElementById("btn").style.transform="rotate3d(0, 1, 0, 180deg)"
    document.getElementById("btn").style.right="285px";
    document.getElementById("awesome").style.color="#931f65";
    document.getElementById("headchat").style.backgroundColor="#931f65";

    push="button";
    }
    else if(push==="button"){
        document.getElementById('chat').style.right="-270px";
        document.getElementById("btn").style.transform="rotate3d(0,0,0,0)";
        document.getElementById("btn").style.right="260px";
        document.getElementById("awesome").style.color="#292b2c";
         document.getElementById("headchat").style.backgroundColor="#292b2c";
        
         push="chat";
    }   
}

// document.getElementById("btn").addEventListener("click",left)
// export default left;
