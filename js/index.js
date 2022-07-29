const   menuIcon                = document.querySelector('.nav__hamburger');
const   closeIcon               = document.querySelector(".nav__close");
const   cartBtn                 = document.querySelector(".header__cart-icon");
const   nextBtnMob              = document.querySelector(".slider-mob__next-btn");
const   prevBtnMob              = document.querySelector(".slider-mob__prev-btn");
const   incQtyBtn               = document.querySelector(".product-buy__increase-icon");
const   decQtyBtn               = document.querySelector(".product-buy__decrease-icon");
const   inpQty                  = document.getElementById("product-quantity");
const   addToCartBtn            = document.querySelector(".product-buy__add-cart");
const   cartContent             = document.querySelector(".cart-content");
const   desktopSliderThumbs     = Array.from(document.querySelectorAll('.slider-desktop__thumb'));
const   desktopSliderImg        = document.querySelector(".slider-desktop__active-photo img");
let     emptyCartBtn;
let     currentImgIndex         = 0;


menuIcon.addEventListener("click", () => {
    alterClass(document.querySelector(".nav__menu"), "nav__menu--visible", "add");
    addOverlay();
});


closeIcon.addEventListener("click", () => {
    alterClass(document.querySelector(".nav__menu"), "nav__menu--visible", "remove")
    removeOverlay();
});


cartBtn.addEventListener("click", () => {
    const cartContent = document.querySelector(".cart-content");
    alterClass(cartContent, "cart-content--visible", "toggle");
});


nextBtnMob.addEventListener("click", ()=>slide("next"));


prevBtnMob.addEventListener("click", ()=>slide("previous"));


incQtyBtn.addEventListener("click", incQty);


decQtyBtn.addEventListener("click", decQty);



addToCartBtn.addEventListener("click", addToCart);


if(emptyCartBtn){emptyCartBtn.addEventListener("click", emptyCart)};


desktopSliderThumbs.forEach(element => {
    element.addEventListener("click", function(){
        showClickedPhoto(element, desktopSliderThumbs, desktopSliderImg, "slider-desktop__thumb--active");
        sliderTracker(element, lightBoxSliderThumbs, lightBoxSliderImg, "slider-lightbox__thumb--active");
    });
});



function alterClass(element, class_name, processName){
    if(processName === "add"){
        element.classList.add(class_name);
    }else if(processName === "remove"){
        if(element.classList.contains(class_name)){
            element.classList.remove(class_name);
        }
    }else if(processName === "toggle"){
        element.classList.toggle(class_name);
    }
}
function addOverlay(){
    if(!document.body.contains(document.querySelector(".overlay"))){
        const overlayElement = document.createElement("div");
        overlayElement.classList.add("overlay");
        document.body.append(overlayElement);
    }
}
function removeOverlay(){
    if(document.body.contains(document.querySelector(".overlay"))){
        document.querySelector(".overlay").remove();
    }
}
function slide(slideTo){
    const sliderBar         = document.querySelector(".slider-mob__bar");
    const slideWidth        = document.querySelector('.slider-mob__item').offsetWidth;
    const sliderItemsNum    = Array.from(document.querySelectorAll(".slider-mob__item"))
    if(slideTo === "next"){
        if(sliderBar.scrollLeft < (sliderItemsNum.length - 1) * slideWidth){
            sliderBar.scrollLeft += slideWidth;
        }
    }else if(slideTo === "previous"){
        if(sliderBar.scrollLeft > 0){
            sliderBar.scrollLeft -= slideWidth;
        }
    }
}
function incQty(){
    inpQty.value++;
}
function decQty(){
    if(inpQty.value > 0){
        inpQty.value--;
    }
}
function addToCart(){

    const cartIcon = document.querySelector(".header__cart-icon");

    const qtyDom = document.createElement("span");

    const qtyValue = Number(inpQty.value);
    if(typeof qtyValue === "number" && qtyValue > 0){
        qtyDom.innerHTML = qtyValue;
        if(cartIcon.contains(cartIcon.querySelector("span"))){
            console.log("it contains");
            Array.from(cartIcon.querySelectorAll("span")).map((e)=>{
                e.remove();
            });
        }
        
        cartIcon.appendChild(qtyDom);
        
        cartContent.innerHTML = `
        <h3 class="cart-content__heading">Cart</h3>
        <div class="cart-content__full">
            <div class="cart-content__product">
                <div class="cart-content__prod-img"><img src="images/image-product-1-thumbnail.jpg" alt="Product"></div>
                <div class="cart-content__prod-text">
                    <h6>Autumn Limited Edition...</h6>
                    <div class="cart-content__prod-price">$125.00 * ${qtyValue} <span>$${125.00 * qtyValue}</span></div>
                </div>
                <div class="cart-content__bin-icon">
                    <svg width="14" height="16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" id="a"/></defs><use fill-rule="nonzero" xlink:href="#a"/></svg>
                </div>
            </div>
            <button class="cart-content__btn">Checkout</button>
        </div>`;
        emptyCartBtn    = document.querySelector(".cart-content__bin-icon");
        if(emptyCartBtn){emptyCartBtn.addEventListener("click", emptyCart)};
    }else{
        alert(`You can't Buy ${inpQty.value} Products`);
    }
}
function emptyCart(){
    const cartIcon = document.querySelector(".header__cart-icon");
    
    
    if(cartIcon.contains(cartIcon.querySelector("span"))){
        console.log("it contains");

        Array.from(cartIcon.querySelectorAll("span")).map((e)=>{

            e.remove();
        });
    }
    cartContent.innerHTML = `
        <h3 class="cart-content__heading">Cart</h3>
        <div class="cart-content__empty">
            Your cart is empty.
        </div>
    `;
}
function showClickedPhoto (element, siblings, visibleImg, class_name){
    const srcImg = element.getAttribute("data-src");
    visibleImg.setAttribute("src", srcImg);
    siblings.forEach((e)=>{
        if(e.classList.contains(class_name)){
            e.classList.remove(class_name);
        }
    });
    element.classList.add(class_name);
}

function sliderTracker(element, siblings, visibleImg, class_name){
    const srcImg = element.getAttribute("data-src");
    visibleImg.setAttribute("src", srcImg);
    siblings.forEach((e)=>{
        alterClass(e, class_name, "remove");
        if(element.getAttribute("data-src") === e.getAttribute("data-src")){
            alterClass(e, class_name, "add");
        }
    });
}
