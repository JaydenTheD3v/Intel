/*  register  gsap  first*/
gsap.registerPlugin(ScrollTrigger);


const sections = document.querySelectorAll(".timeline-panel");

const timelineYear =
    document.querySelector(".timeline-year");

const timelineTitle =
    document.querySelector(".timeline-title");

const progressBar =
    document.querySelector(".timeline-progress");

sections.forEach((section, index) => {

    ScrollTrigger.create({

        trigger: section,

        start: "top center",

        end: "bottom center",

        onEnter: () => updateTimeline(section, index),

        onEnterBack: () => updateTimeline(section, index)

    });

});

function updateTimeline(section, index) {

    const year =
        section.dataset.year;

    const title =
        section.dataset.title;

    // Update text
    timelineYear.textContent = year;
    timelineTitle.textContent = title;

    // Animate glow transition
    gsap.fromTo(

        ".timeline-display",

        {
            opacity: 0.6,
            y: 20
        },

        {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out"
        }

    );

    // Move progress bar
    gsap.to(".timeline-progress", {

        height:
            `${((index + 1) / sections.length) * 100}%`,

        duration: 0.6,

        ease: "power2.out"

    });

}

/* =========================================
   TEXT REVEALS
========================================= */

gsap.utils.toArray(".reveal-text")
.forEach((element) => {

    gsap.from(element, {

        opacity: 0,

        y: 60,

        duration: 1.2,

        ease: "power3.out",

        scrollTrigger: {

            trigger: element,

            start: "top 90%",

            toggleActions:
                "play none none reverse"

        }

    });

});


/* =========================================
   PARALLAX EFFECTS
========================================= */
gsap.utils.toArray(".parallax-slow").forEach((element) => {

    gsap.to(element, {

        y: -120,

        ease: "none",

        scrollTrigger: {

            trigger: element,

            start: "top bottom",

            end: "bottom top",

            scrub: true

        }

    });

});

gsap.to(".image-panel", {

    y: -60,

    scrollTrigger: {

        trigger: ".image-panel",

        start: "top bottom",

        end: "bottom top",

        scrub: true

    }

});

gsap.utils.toArray(".timeline-panel")
.forEach((panel) => {

    const image =
        panel.querySelector(".cinematic-image");

    gsap.to(image, {

        scale: 1.2,

        ease: "none",

        scrollTrigger: {

            trigger: panel,

            start: "top top",

            end: "bottom top",

            scrub: true

        }

    });

});

gsap.utils
.toArray(".timeline-card")
.forEach((card) => {

    gsap.from(card, {

        opacity: 0,

        y: 60,

        duration: 1,

        scrollTrigger: {

            trigger: card,

            start: "top 85%"

        }

    });

});



/* =========================================
   circut spine
========================================= */



gsap.to(".progress-spine", {

    height: "100%",

    ease: "none",

    scrollTrigger: {

        trigger: ".circuit-timeline",

        start: "top center",

        end: "bottom bottom",

        scrub: true

    }

});


gsap.from(card, {

    opacity: 0,

    y: 60

});

gsap.utils
.toArray(".timeline-card")
.forEach((card) => {

    gsap.fromTo(

        card,

        {
            clipPath:
                "inset(0 100% 0 0)"
        },

        {
            clipPath:
                "inset(0 0% 0 0)",

            duration: 1.4,

            ease: "power2.out",

            scrollTrigger: {

                trigger: card,

                start: "top 80%"

            }

        }

    );

});

gsap.from(card, {

    filter:
        "brightness(.4)",

    duration: 1.2,

    ease: "power2.out"

});