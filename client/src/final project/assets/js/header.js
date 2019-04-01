let list = document.getElementsByClassName(
    "header__bottom__navigation__list"
  );
  for (let i = 0; i < list.length; i++) {
    list[i].style.margin = "0";
  }


 $(document).ready(function(){
     $("#button").click(function(){
         $("#nav").toggle("400ms");
        
     });
    });
     $(window).resize(function(){
        if($(window).width()>800){
             $('#nav').removeAttr('style');        
   }
});
    //  $(".header__bottom__navigation__list ").click(function(){
    //     // $(".header__bottom__navigation__list--item").toggle("400ms");
    //      $('.header__bottom__navigation__list--item', this).toggle("200ms");  
    // });
  
 

 $(function() {
    $('.header__bottom__navigation__list').click(function() {
      $('.header__bottom__navigation__list--item').hide("300ms");
      $('#list' + $(this).attr('target')).show("300ms");
    });
  });


  let mouse_is_inside = false;
  $("body").mouseup(function(){ 
    if(!mouse_is_inside) $('.header__bottom__navigation__list--item').hide("300ms");
});


