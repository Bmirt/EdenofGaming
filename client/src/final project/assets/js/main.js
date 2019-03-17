let slider = {
    container:document.getElementById("slider"),
    items: document.getElementsByClassName("main__top__slider__image"),
    itemIndex: 0,
    prevbtn:document.getElementById("prev"),
    nextbtn:document.getElementById("next"),
    nextslide: function(){
        slider.items[slider.itemIndex].classList.remove("active");
        if (slider.itemIndex==slider.items.length-1) {
            slider.itemIndex=0;
        }
        else{
            slider.itemIndex++;
        }
        slider.items[slider.itemIndex].classList.add("active");
    },
    prevslide: function(){
        slider.items[slider.itemIndex].classList.remove("active");
        if(slider.itemIndex==0){
            slider.itemIndex = slider.items.length-1;
        }
        else{
            slider.itemIndex--;
        }
        slider.items[slider.itemIndex].classList.add("active");    
    }
}
slider.prevbtn.addEventListener("click",slider.prevslide);
slider.nextbtn.addEventListener("click",slider.nextslide);




