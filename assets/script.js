let runnerElement;
let activeElement;
function startRunnerElement() {
    let list = document.querySelector(".header__list");
    let items = list.querySelectorAll(".header__list-item");
    activeElement = list.querySelector(".header__list-item.active");
    console.log("startRunnerElement");
    console.log(list);
    console.log(items);
    console.log(activeElement);
    console.log("/startRunnerElement");
    console.log("  ");

    let i = 0;
    Array.prototype.find.apply(items, [
        (elem) => {
            if (elem.isEqualNode(activeElement)) return true;
            i++;
        },
    ]);
    runnerElement = i;
    moveRunner(runnerElement);
}
function moveRunner(pos) {
    let list = document.querySelector(".header__list");
    let items = list.querySelectorAll(".header__list-item");
    let runner = document.querySelector(".header__runner");
    let left = 0;
    let i = 0;
    console.log("moveRunner for");
    for (; i < pos; i++) {
        left += items[i].offsetWidth;
    }
    left += (items[i].offsetWidth - runner.offsetWidth) / 2;
    console.log(`left = ${left}`);
    console.log("/moveRunner for");
    runner.style.left = left + "px";

    runner.style.transform = "scalex(1.5)";
    setTimeout(() => (runner.style.transform = "scalex(1)"), 300);
}

function headerRunnerEnter(event) {
    let list = document.querySelector(".header__list");
    let items = list.querySelectorAll(".header__list-item");
    let i = 0;
    Array.prototype.find.apply(items, [
        (elem) => {
            if (elem.isEqualNode(event.target)) return true;
            i++;
        },
    ]);
    activeElement.classList.remove("active");
    moveRunner(i);
}

function headerRunnerLeave(event) {
    activeElement.classList.add("active");
    moveRunner(runnerElement);
}

document.querySelectorAll(".header__list-item").forEach((elem) => {
    elem.addEventListener("mouseenter", headerRunnerEnter);
    elem.addEventListener("mouseleave", headerRunnerLeave);
});

// * ------- * //

function scrollToElem(selector) {
    console.log(selector);
    let pos =
        document.querySelector(selector).getBoundingClientRect().top +
        document.documentElement.scrollTop +
        10;
    console.log(pos);
    window.scroll(0, pos);
}

// * --------------------------- * //

function toggleBurger(event) {
    let burger = document.getElementById("burger");
    let burgerModal = document.getElementById("burger-menu");
    if (burger.dataset.opened == "true") {
        burger.dataset.opened = false;
        burgerModal.dataset.opened = false;
    } else {
        burger.dataset.opened = true;
        burgerModal.dataset.opened = true;
    }
}

function burger() {
    let burger = document.getElementById("burger");
    burger.addEventListener("pointerdown", toggleBurger);
}

// * --------------------------- * //
function hideHeaderOnScroll() {
    let currentScroll = 0;
    let header = document.getElementById("header");
    let burger = document.getElementById("burger");
    let burgerTop = burger.offsetTop;
    let burgerModal = document.getElementById("burger-menu");
    function onScroll(event) {
        let nowScroll = document.documentElement.scrollTop;
        if (nowScroll > currentScroll && burgerModal.dataset.opened != "true") {
            header.style.top = "-100%";
            burger.style.top = "-100%";
        } else if (
            nowScroll < currentScroll &&
            burgerModal.dataset.opened != "true"
        ) {
            header.style.top = "0";
            burger.style.top = burgerTop + "px";
        }
        currentScroll = nowScroll;
    }
    // when site was loaded, user start scroll and he may not see that header exists, so I set 2s delay
    setTimeout(() => window.addEventListener("scroll", onScroll), 2000);
}

// * ------------------- * //

function showWork(button) {
    console.log("showed");
    console.log(button);
    let item = button.closest(".work__item");
    let img = item.querySelector(".item__img");
    console.log(img);
    let imgCopy = img.cloneNode();
    let present = document.getElementById("work-present");
    console.log(present);

    present.firstElementChild.prepend(imgCopy);
    present.dataset.active = true;
}

function closeWork(button) {
    let work = document.querySelector(".work");
    let present = work.querySelector(".work__present");
    let imgbox = document.getElementById("work-present-img");
    present.dataset.active = false;
    imgbox.innerHTML = "";
}

window.onload = () => {
    startRunnerElement();
    burger();
    hideHeaderOnScroll();
};
