let eat = "burger";
function left() {
  if (eat === "burger") {
    document.getElementById("nav").style.display = "flex";

    let list = document.getElementsByClassName(
      "header__bottom__navigation__list"
    );
    for (let i = 0; i < list.length; i++) {
      list[i].style.margin = "0";
    }

    document.getElementById("a").style.transform = "rotate(22deg)";
    document.getElementById("b").style.display = "none";
    document.getElementById("c").style.transform = "rotate(-22deg)";

    eat = "koko";
  } else if (eat === "koko") {
    document.getElementById("nav").style.display = "none";
    document.getElementById("a").style.transform = "rotate(0)";
    document.getElementById("b").style.display = "block";
    document.getElementById("c").style.transform = "rotate(0)";

    eat = "burger";
  }
}

export default left;
