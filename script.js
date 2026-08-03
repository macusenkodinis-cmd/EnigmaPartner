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

const hoursInput =
    document.getElementById("hoursPerDay");

const daysInput =
    document.getElementById("daysPerWeek");

const bonusInput =
    document.getElementById("includeBonus");

const hoursValue =
    document.getElementById("hoursValue");

const daysValue =
    document.getElementById("daysValue");

const dailyIncome =
    document.getElementById("dailyIncome");

const weeklyIncome =
    document.getElementById("weeklyIncome");

const monthlyIncome =
    document.getElementById("monthlyIncome");

const scheduleSummary =
    document.getElementById("scheduleSummary");

/*
Средняя ставка скрыта от пользователя как ползунок,
но её легко изменить здесь.
*/

const HOURLY_RATE = 16;
const MONTHS_MULTIPLIER = 4.33;
const BONUS_MULTIPLIER = 1.10;

function formatIncome(value) {
    return Math.round(value).toLocaleString("ru-RU");
}

function getDaysWord(value) {

    if (value === 1) {
        return "день";
    }

    if (value >= 2 && value <= 4) {
        return "дня";
    }

    return "дней";
}

function getHoursWord(value) {

    const lastDigit = value % 10;
    const lastTwoDigits = value % 100;

    if (lastDigit === 1 && lastTwoDigits !== 11) {
        return "час";
    }

    if (
        lastDigit >= 2 &&
        lastDigit <= 4 &&
        !(lastTwoDigits >= 12 && lastTwoDigits <= 14)
    ) {
        return "часа";
    }

    return "часов";
}

function calculateIncome() {

    if (!hoursInput || !daysInput) {
        return;
    }

    const hours = Number(hoursInput.value);
    const days = Number(daysInput.value);

    const includeBonus =
        Boolean(bonusInput?.checked);

    const multiplier =
        includeBonus ? BONUS_MULTIPLIER : 1;

    const daily =
        hours * HOURLY_RATE * multiplier;

    const weekly =
        daily * days;

    const monthly =
        weekly * MONTHS_MULTIPLIER;

    if (hoursValue) {
        hoursValue.textContent = hours;
    }

    if (daysValue) {
        daysValue.textContent = days;
    }

    if (dailyIncome) {
        dailyIncome.textContent =
            formatIncome(daily);
    }

    if (weeklyIncome) {
        weeklyIncome.textContent =
            formatIncome(weekly);
    }

    if (monthlyIncome) {
        monthlyIncome.textContent =
            formatIncome(monthly);
    }

    if (scheduleSummary) {

        scheduleSummary.textContent =
            `${hours} ${getHoursWord(hours)} в день, ` +
            `${days} ${getDaysWord(days)} в неделю`;
    }
}

hoursInput?.addEventListener(
    "input",
    calculateIncome
);

daysInput?.addEventListener(
    "input",
    calculateIncome
);

bonusInput?.addEventListener(
    "change",
    calculateIncome
);

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

/* ==================================================
   СЛАЙДЕР CHEBUREKI В HERO
================================================== */

const cheburekiHeroBanner =
    document.querySelector(".chebureki-hero-banner");

const cheburekiHeroSlides =
    document.querySelectorAll(".chebureki-hero-slide");

const cheburekiHeroDots =
    document.querySelectorAll(".chebureki-hero-dot");

const cheburekiHeroPrev =
    document.querySelector(".chebureki-hero-prev");

const cheburekiHeroNext =
    document.querySelector(".chebureki-hero-next");

let cheburekiHeroIndex = 0;
let cheburekiHeroInterval = null;

function showCheburekiHeroSlide(index) {

    if (!cheburekiHeroSlides.length) {
        return;
    }

    if (index < 0) {
        index = cheburekiHeroSlides.length - 1;
    }

    if (index >= cheburekiHeroSlides.length) {
        index = 0;
    }

    cheburekiHeroIndex = index;

    cheburekiHeroSlides.forEach((slide) => {
        slide.classList.remove("active");
    });

    cheburekiHeroDots.forEach((dot) => {
        dot.classList.remove("active");
    });

    cheburekiHeroSlides[cheburekiHeroIndex]
        .classList.add("active");

    if (cheburekiHeroDots[cheburekiHeroIndex]) {
        cheburekiHeroDots[cheburekiHeroIndex]
            .classList.add("active");
    }
}

function nextCheburekiHeroSlide() {
    showCheburekiHeroSlide(cheburekiHeroIndex + 1);
}

function previousCheburekiHeroSlide() {
    showCheburekiHeroSlide(cheburekiHeroIndex - 1);
}

function stopCheburekiHeroSlider() {

    if (cheburekiHeroInterval) {
        clearInterval(cheburekiHeroInterval);
        cheburekiHeroInterval = null;
    }
}

function startCheburekiHeroSlider() {

    stopCheburekiHeroSlider();

    cheburekiHeroInterval = setInterval(() => {
        nextCheburekiHeroSlide();
    }, 4500);
}

cheburekiHeroNext?.addEventListener("click", () => {
    nextCheburekiHeroSlide();
    startCheburekiHeroSlider();
});

cheburekiHeroPrev?.addEventListener("click", () => {
    previousCheburekiHeroSlide();
    startCheburekiHeroSlider();
});

cheburekiHeroDots.forEach((dot) => {

    dot.addEventListener("click", () => {

        const index =
            Number(dot.dataset.cheburekiIndex);

        showCheburekiHeroSlide(index);
        startCheburekiHeroSlider();
    });
});

/* Пауза при наведении */

cheburekiHeroBanner?.addEventListener(
    "mouseenter",
    stopCheburekiHeroSlider
);

cheburekiHeroBanner?.addEventListener(
    "mouseleave",
    startCheburekiHeroSlider
);

/* Свайп на телефоне */

let cheburekiHeroTouchStart = 0;

cheburekiHeroBanner?.addEventListener(
    "touchstart",
    (event) => {

        cheburekiHeroTouchStart =
            event.touches[0].clientX;
    },
    {
        passive: true
    }
);

cheburekiHeroBanner?.addEventListener(
    "touchend",
    (event) => {

        const touchEnd =
            event.changedTouches[0].clientX;

        const difference =
            cheburekiHeroTouchStart - touchEnd;

        if (Math.abs(difference) < 45) {
            return;
        }

        if (difference > 0) {
            nextCheburekiHeroSlide();
        } else {
            previousCheburekiHeroSlide();
        }

        startCheburekiHeroSlider();
    },
    {
        passive: true
    }
);

if (cheburekiHeroSlides.length) {
    showCheburekiHeroSlide(0);
    startCheburekiHeroSlider();
}


/* ===========================
   Mustang при прокрутке
=========================== */

const mustangLane = document.querySelector(".mustang-lane");
const mustangBanner = document.querySelector(".mustang-banner");

if (mustangLane && mustangBanner) {
    if ("IntersectionObserver" in window) {
        const mustangObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    mustangBanner.classList.toggle(
                        "is-visible",
                        entry.isIntersecting
                    );
                });
            },
            { threshold: 0.2 }
        );

        mustangObserver.observe(mustangLane);
    } else {
        mustangBanner.classList.add("is-visible");
    }
}
