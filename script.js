
/* =========================================================
   HOUSE OF MANZUNA
   MASTER JAVASCRIPT
   Desktop + Mobile Responsive
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       HEADER
    ===================================================== */

    const header =
        document.querySelector(".header") ||
        document.querySelector(".site-header");

    const updateHeader = () => {
        if (!header) return;

        header.classList.toggle(
            "scrolled",
            window.scrollY > 30
        );
    };

    updateHeader();

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });


    /* =====================================================
       HAMBURGER / MOBILE NAVIGATION
    ===================================================== */

    const menuButton =
        document.getElementById("menuButton") ||
        document.querySelector(".menu-button") ||
        document.querySelector(".hamburger-button");

    const mobileNavigation =
        document.getElementById("mobileNavigation") ||
        document.querySelector(".mobile-navigation") ||
        document.querySelector(".mobile-collection-panel");

    const dotsButton =
        document.getElementById("dotsButton") ||
        document.querySelector(".dots-button");

    const socialNavigation =
        document.getElementById("socialNavigation") ||
        document.querySelector(".social-navigation") ||
        document.querySelector(".social-panel");


    /* =====================================================
       MENU HELPERS
    ===================================================== */

    const closeMobileNavigation = () => {
        if (mobileNavigation) {
            mobileNavigation.classList.remove("active");
        }

        if (menuButton) {
            menuButton.classList.remove("active");
            menuButton.setAttribute("aria-expanded", "false");
        }

        document.body.classList.remove("menu-open");
    };


    const closeSocialNavigation = () => {
        if (socialNavigation) {
            socialNavigation.classList.remove("active");
        }

        if (dotsButton) {
            dotsButton.classList.remove("active");
            dotsButton.setAttribute("aria-expanded", "false");
        }
    };


    const openMobileNavigation = () => {
        if (!mobileNavigation) return;

        closeSocialNavigation();

        mobileNavigation.classList.add("active");

        if (menuButton) {
            menuButton.classList.add("active");
            menuButton.setAttribute("aria-expanded", "true");
        }

        document.body.classList.add("menu-open");
    };


    const openSocialNavigation = () => {
        if (!socialNavigation) return;

        closeMobileNavigation();

        socialNavigation.classList.add("active");

        if (dotsButton) {
            dotsButton.classList.add("active");
            dotsButton.setAttribute("aria-expanded", "true");
        }
    };


    /* =====================================================
       HAMBURGER BUTTON
    ===================================================== */

    if (menuButton && mobileNavigation) {

        menuButton.setAttribute("type", "button");

        menuButton.setAttribute(
            "aria-controls",
            mobileNavigation.id || "mobileNavigation"
        );

        menuButton.setAttribute(
            "aria-expanded",
            String(mobileNavigation.classList.contains("active"))
        );

        menuButton.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();

            const isOpen =
                mobileNavigation.classList.contains("active");

            if (isOpen) {
                closeMobileNavigation();
            } else {
                openMobileNavigation();
            }
        });


        /* Close after selecting a mobile navigation link */

        mobileNavigation.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                closeMobileNavigation();
            });
        });
    }


    /* =====================================================
       THREE-DOT SOCIAL MENU
    ===================================================== */

    if (dotsButton && socialNavigation) {

        dotsButton.setAttribute("type", "button");

        dotsButton.setAttribute(
            "aria-controls",
            socialNavigation.id || "socialNavigation"
        );

        dotsButton.setAttribute(
            "aria-expanded",
            String(socialNavigation.classList.contains("active"))
        );

        dotsButton.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();

            const isOpen =
                socialNavigation.classList.contains("active");

            if (isOpen) {
                closeSocialNavigation();
            } else {
                openSocialNavigation();
            }
        });


        /* Close after selecting a social link */

        socialNavigation.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                closeSocialNavigation();
            });
        });
    }


    /* =====================================================
       CLOSE PANELS WHEN CLICKING OUTSIDE
    ===================================================== */

    document.addEventListener("click", (event) => {

        const target = event.target;

        const clickedInsideMenu =
            mobileNavigation &&
            mobileNavigation.contains(target);

        const clickedMenuButton =
            menuButton &&
            menuButton.contains(target);

        const clickedInsideSocial =
            socialNavigation &&
            socialNavigation.contains(target);

        const clickedDots =
            dotsButton &&
            dotsButton.contains(target);


        if (!clickedInsideMenu && !clickedMenuButton) {
            closeMobileNavigation();
        }

        if (!clickedInsideSocial && !clickedDots) {
            closeSocialNavigation();
        }
    });


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key !== "Escape") return;

        closeMobileNavigation();
        closeSocialNavigation();

    });


    /* =====================================================
       FOLDABLE ALL COLLECTIONS
    ===================================================== */

    const foldHeaders =
        document.querySelectorAll(".fold-header");


    foldHeaders.forEach((headerButton) => {

        headerButton.setAttribute("type", "button");

        const collection =
            headerButton.closest(".fold-collection");

        if (!collection) return;

        const content =
            collection.querySelector(".fold-content");

        /* Set up accessible accordion attributes */

        if (content) {

            if (!content.id) {
                content.id =
                    "collection-content-" +
                    Math.random().toString(36).slice(2, 10);
            }

            headerButton.setAttribute(
                "aria-controls",
                content.id
            );
        }

        headerButton.setAttribute(
            "aria-expanded",
            String(collection.classList.contains("active"))
        );


        headerButton.addEventListener("click", () => {

            const wasActive =
                collection.classList.contains("active");


            /* Close other open collection cards */

            document
                .querySelectorAll(".fold-collection.active")
                .forEach((openCollection) => {

                    if (openCollection === collection) return;

                    openCollection.classList.remove("active");

                    const openButton =
                        openCollection.querySelector(".fold-header");

                    if (openButton) {
                        openButton.setAttribute(
                            "aria-expanded",
                            "false"
                        );
                    }

                });


            /* Toggle the selected collection */

            if (wasActive) {

                collection.classList.remove("active");

                headerButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            } else {

                collection.classList.add("active");

                headerButton.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }

        });

    });


    /* =====================================================
       REVEAL EFFECTS
       IMPORTANT CONTENT REMAINS VISIBLE
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            (entries, currentObserver) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) return;

                    entry.target.classList.add("visible");

                    currentObserver.unobserve(entry.target);

                });

            },
            {
                threshold: 0.08
            }
        );


        revealElements.forEach((element) => {
            observer.observe(element);
        });

    } else {

        revealElements.forEach((element) => {
            element.classList.add("visible");
        });

    }


    /* =====================================================
       INTERNAL PAGE LINKS
       CLOSE MOBILE MENU BEFORE NAVIGATING
    ===================================================== */

    document.querySelectorAll(
        ".mobile-navigation a[href^='#'], " +
        ".mobile-collection-panel a[href^='#']"
    ).forEach((link) => {

        link.addEventListener("click", () => {

            const href = link.getAttribute("href");

            if (!href || href === "#") return;

            const target = document.querySelector(href);

            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

        });

    });


    /* =====================================================
       INITIALISE HEADER AND MENU STATES
    ===================================================== */

    closeMobileNavigation();
    closeSocialNavigation();

});
