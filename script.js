(() => {
    "use strict";

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function createSlider({
        rootSelector,
        slideSelector,
        dotSelector,
        prevSelector,
        nextSelector,
        interval = 4500
    }) {
        const root = document.querySelector(rootSelector);
        if (!root) return;

        const slides = [...root.querySelectorAll(slideSelector)];
        const dots = [...root.querySelectorAll(dotSelector)];
        const prev = root.querySelector(prevSelector);
        const next = root.querySelector(nextSelector);

        if (!slides.length) return;

        let index = 0;
        let timer = null;
        let touchStartX = 0;

        const show = (nextIndex) => {
            index = (nextIndex + slides.length) % slides.length;
            slides.forEach((slide, i) => slide.classList.toggle("active", i === index));
            dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
        };

        const stop = () => {
            if (timer) window.clearInterval(timer);
            timer = null;
        };

        const start = () => {
            stop();
            if (!reducedMotion) timer = window.setInterval(() => show(index + 1), interval);
        };

        prev?.addEventListener("click", () => { show(index - 1); start(); });
        next?.addEventListener("click", () => { show(index + 1); start(); });
        dots.forEach((dot, i) => dot.addEventListener("click", () => { show(i); start(); }));

        root.addEventListener("mouseenter", stop);
        root.addEventListener("mouseleave", start);
        root.addEventListener("focusin", stop);
        root.addEventListener("focusout", start);

        root.addEventListener("touchstart", (event) => {
            touchStartX = event.touches[0].clientX;
        }, { passive: true });

        root.addEventListener("touchend", (event) => {
            const difference = touchStartX - event.changedTouches[0].clientX;
            if (Math.abs(difference) >= 45) {
                show(index + (difference > 0 ? 1 : -1));
                start();
            }
        }, { passive: true });

        show(0);
        start();
    }

    createSlider({
        rootSelector: '[data-slider="main"]',
        slideSelector: ".mini-slide",
        dotSelector: ".mini-dot",
        prevSelector: ".slider-prev",
        nextSelector: ".slider-next",
        interval: 4000
    });

    createSlider({
        rootSelector: '[data-slider="chebureki"]',
        slideSelector: ".partner-slide",
        dotSelector: ".partner-dot",
        prevSelector: ".partner-prev",
        nextSelector: ".partner-next",
        interval: 4500
    });

    const header = document.getElementById("siteHeader");
    const headerTrigger = document.getElementById("headerTrigger");
    let headerTimer = null;

    const setHeader = (open) => {
        header?.classList.toggle("visible", open);
        headerTrigger?.setAttribute("aria-expanded", String(open));
    };

    headerTrigger?.addEventListener("click", () => setHeader(!header?.classList.contains("visible")));
    headerTrigger?.addEventListener("mouseenter", () => { clearTimeout(headerTimer); setHeader(true); });
    header?.addEventListener("mouseenter", () => clearTimeout(headerTimer));
    [headerTrigger, header].forEach((element) => element?.addEventListener("mouseleave", () => {
        headerTimer = window.setTimeout(() => setHeader(false), 300);
    }));
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") setHeader(false);
    });

    const HOURLY_RATE = 16;
    const MONTH_MULTIPLIER = 4.33;
    const BONUS_MULTIPLIER = 1.10;

    const hoursInput = document.getElementById("hoursPerDay");
    const daysInput = document.getElementById("daysPerWeek");
    const bonusInput = document.getElementById("includeBonus");

    const plural = (value, forms) => {
        const mod10 = value % 10;
        const mod100 = value % 100;
        if (mod10 === 1 && mod100 !== 11) return forms[0];
        if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return forms[1];
        return forms[2];
    };

    const formatIncome = (value) => Math.round(value).toLocaleString("ru-RU");

    const calculateIncome = () => {
        if (!hoursInput || !daysInput) return;

        const hours = Number(hoursInput.value);
        const days = Number(daysInput.value);
        const multiplier = bonusInput?.checked ? BONUS_MULTIPLIER : 1;

        const daily = hours * HOURLY_RATE * multiplier;
        const weekly = daily * days;
        const monthly = weekly * MONTH_MULTIPLIER;

        document.getElementById("hoursValue").textContent = String(hours);
        document.getElementById("daysValue").textContent = String(days);
        document.getElementById("dailyIncome").textContent = formatIncome(daily);
        document.getElementById("weeklyIncome").textContent = formatIncome(weekly);
        document.getElementById("monthlyIncome").textContent = formatIncome(monthly);
        document.getElementById("scheduleSummary").textContent =
            `${hours} ${plural(hours, ["час", "часа", "часов"])} в день, ` +
            `${days} ${plural(days, ["день", "дня", "дней"])} в неделю`;
    };

    [hoursInput, daysInput].forEach((input) => input?.addEventListener("input", calculateIncome));
    bonusInput?.addEventListener("change", calculateIncome);
    calculateIncome();

    document.querySelectorAll(".video-card").forEach((card) => {
        const video = card.querySelector("video");
        const frame = card.querySelector(".video-frame");
        const button = card.querySelector("button");
        if (!video || !frame) return;

        const update = () => frame.classList.toggle("playing", !video.paused);
        const toggle = () => {
            if (video.paused) video.play().catch(() => {});
            else video.pause();
        };

        button?.addEventListener("click", toggle);
        video.addEventListener("click", toggle);
        video.addEventListener("play", update);
        video.addEventListener("pause", update);
    });

    const revealElements = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && !reducedMotion) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.12 });
        revealElements.forEach((element) => revealObserver.observe(element));
    } else {
        revealElements.forEach((element) => element.classList.add("visible"));
    }

    const mustangLane = document.querySelector(".mustang-lane");
    const mustangCar = document.querySelector(".mustang-car");
    if (mustangLane && mustangCar) {
        if ("IntersectionObserver" in window && !reducedMotion) {
            const mustangObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => mustangCar.classList.toggle("visible", entry.isIntersecting));
            }, { threshold: 0.2 });
            mustangObserver.observe(mustangLane);
        } else {
            mustangCar.classList.add("visible");
        }
    }

    const applicationForm = document.getElementById("applicationForm");
    const notification = document.getElementById("notification");
    applicationForm?.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!applicationForm.reportValidity()) return;
        notification?.classList.add("show");
        window.setTimeout(() => notification?.classList.remove("show"), 3200);
        applicationForm.reset();
    });

    const backToTop = document.getElementById("backToTop");
    const updateBackToTop = () => backToTop?.classList.toggle("visible", window.scrollY > 700);
    window.addEventListener("scroll", updateBackToTop, { passive: true });
    backToTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" }));
    updateBackToTop();
})();
