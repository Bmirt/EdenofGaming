let push="chat";
function left(){
    if(push==="chat"){ 
    document.getElementById('chat').style.right="0";
    document.getElementById("btn").style.transform="rotate3d(0, 1, 0, 180deg)"
    document.getElementById("btn").style.right="285px";
    document.getElementById("awesome").style.color="#c70a6b";
    document.getElementById("headchat").style.backgroundColor="#c70a6b";

    push="button";
    }
    else if(push==="button"){
        document.getElementById('chat').style.right="-270px";
        document.getElementById("btn").style.transform="rotate3d(0,0,0,0)";
        document.getElementById("btn").style.right="260px";
        document.getElementById("awesome").style.color="#124484";
         document.getElementById("headchat").style.backgroundColor="#124484";
        
         push="chat";
    }   
}

export default left;