/* ===========================
   Слайдер
=========================== */

const slides = document.querySelectorAll(".mini-slide");
const dots = document.querySelectorAll(".mini-dot");

const prevBtn = document.querySelector(".slider-prev");
const nextBtn = document.querySelector(".slider-next");

let currentSlide = 0;
let sliderInterval;

function showSlide(index) {

    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;

    currentSlide = index;

    slides[currentSlide].classList.add("active");

    if (dots[currentSlide]) {
        dots[currentSlide].classList.add("active");
    }
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function startSlider() {

    clearInterval(sliderInterval);

    sliderInterval = setInterval(() => {
        nextSlide();
    }, 4000);

}

showSlide(0);
startSlider();

nextBtn?.addEventListener("click", () => {
    nextSlide();
    startSlider();
});

prevBtn?.addEventListener("click", () => {
    prevSlide();
    startSlider();
});

dots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        showSlide(index);
        startSlider();

    });

});

/* ===========================
   Выдвижная шапка
=========================== */

const header = document.getElementById("siteHeader");
const trigger = document.getElementById("headerTrigger");

let headerTimeout;

function showHeader() {

    clearTimeout(headerTimeout);

    header?.classList.add("visible");

}

function hideHeader() {

    headerTimeout = setTimeout(() => {

        header?.classList.remove("visible");

    },250);

}

trigger?.addEventListener("mouseenter",showHeader);
header?.addEventListener("mouseenter",showHeader);

trigger?.addEventListener("mouseleave",hideHeader);
header?.addEventListener("mouseleave",hideHeader);

/* ===========================
   Видео
=========================== */

const videos = document.querySelectorAll(".video-card video");

videos.forEach(video=>{

    video.muted = true;
    video.loop = true;

    video.play().catch(()=>{});

    video.addEventListener("click",()=>{

        if(video.paused){

            video.play();

        }else{

            video.pause();

        }

    });

});

/* ===========================
   Калькулятор дохода
=========================== */

const hours = document.getElementById("hoursPerDay");
const days = document.getElementById("daysPerWeek");
const rate = document.getElementById("hourlyIncome");

const hoursValue = document.getElementById("hoursValue");
const daysValue = document.getElementById("daysValue");
const rateValue = document.getElementById("rateValue");

const weeklyIncome = document.getElementById("weeklyIncome");
const monthlyIncome = document.getElementById("monthlyIncome");

function formatNumber(number){

    return number.toLocaleString("ru-RU");

}

function calculateIncome(){

    if(!hours || !days || !rate) return;

    const h = Number(hours.value);
    const d = Number(days.value);
    const r = Number(rate.value);

    const week = h * d * r;
    const month = Math.round(week * 4.33);

    hoursValue.textContent = h;
    daysValue.textContent = d;
    rateValue.textContent = r;

    weeklyIncome.textContent = formatNumber(week);
    monthlyIncome.textContent = formatNumber(month);

}

hours?.addEventListener("input",calculateIncome);
days?.addEventListener("input",calculateIncome);
rate?.addEventListener("input",calculateIncome);

calculateIncome();

/* ===========================
   Форма
=========================== */

const form = document.getElementById("applicationForm");
const notification = document.getElementById("notification");

form?.addEventListener("submit",(e)=>{

    e.preventDefault();

    notification?.classList.add("show");

    setTimeout(()=>{

        notification?.classList.remove("show");

    },3000);

    form.reset();

});

/* ===========================
   Машины на дорогах
=========================== */

const leftCar = document.querySelector(".side-car-left");
const rightCar = document.querySelector(".side-car-right");

function driveCar(car){

    if(!car) return;

    car.classList.remove("drive");

    void car.offsetWidth;

    car.classList.add("drive");

}

driveCar(leftCar);
driveCar(rightCar);

setInterval(()=>{

    driveCar(leftCar);
    driveCar(rightCar);

},10000);

