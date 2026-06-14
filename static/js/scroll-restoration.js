if (sessionStorage.getItem("scrollY")) {
        window.scrollTo(0, sessionStorage.getItem("scrollY"));
    }

    window.addEventListener("beforeunload", () => {
        sessionStorage.setItem("scrollY", window.scrollY);
    });