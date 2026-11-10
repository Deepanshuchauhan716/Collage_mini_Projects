const bodyEl = document.querySelector("body");

bodyEl.addEventListener("mousemove",(eve) => {

    const Xpos = eve.clientX;
    const Ypos = eve.clientY;

    const spanEl = document.createElement("span");

    spanEl.style.left = Xpos + "px";
    spanEl.style.top = Ypos + "px";

    const Size = Math.random() * 80 + 20;
    spanEl.style.height = Size + "px"
    spanEl.style.width = Size + "px"

    bodyEl.append(spanEl);

    setTimeout(()=>{
        spanEl.remove();
    },3000);

})
