let runnerElement;
let activeElement;
function startRunnerElement() {
    let list = document.querySelector(".header__list");
    let items = list.querySelectorAll(".header__list-item");
    activeElement = list.querySelector(".header__list-item.active");
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
    for (i; i < pos; i++) {
        left += items[i].offsetWidth;
    }
    left += (items[i].offsetWidth - runner.offsetWidth) / 2;
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

startRunnerElement();

// burger-menu appends from width <= 450
if (window.screen.width > 450) {
    document.querySelectorAll(".header__list-item").forEach((elem) => {
        elem.addEventListener("mouseenter", headerRunnerEnter);
        elem.addEventListener("mouseleave", headerRunnerLeave);
    });
}

// * ------- * //

function scrollTo(event) {
    let pos = event.currentTarget.parentNode.offsetHeight;
    window.scroll(0, pos);
}
document.querySelectorAll("#scroller").forEach((elem) => {
    elem.addEventListener("pointerdown", scrollTo);
});

// * --------------------------- * //

function burger() {
    // burger-menu appends from width <= 450
    if (window.screen.width > 450) return;

    let burger = document.getElementById("burger");
    let burgerModal = document.getElementById("burger-menu");
    function onBurgerClick(event) {
        if (burger.dataset.opened == "true") {
            burger.dataset.opened = false;
            burgerModal.dataset.opened = false;
        } else {
            burger.dataset.opened = true;
            burgerModal.dataset.opened = true;
        }
    }
    burger.addEventListener("pointerdown", onBurgerClick);
}

burger();

// * --------------------------- * //
function hideHeaderOnScroll() {
    let currentScroll = 0;
    let header = document.getElementById("header");
    let burger = document.getElementById("burger");
    let burgerTop = burger.offsetTop;
    let burgerModal = document.getElementById("burger-menu");
    function onScroll(event) {
        console.log("scroll");
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
hideHeaderOnScroll();
