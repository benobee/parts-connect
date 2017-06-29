(function() {
    const Site = {
        init() {
            this.bindEvents();
        },
        bindEvents() {
            this.toggleMenu({
                container: "#part-search",
                pages: "#your-company-and-brand, #parts-search, #your-parts"
            });
            this.toggleMenu({
                container: "#take-control-of-your-content-business",
                pages: "#design, #parts-content, #analytics, #ecommerce",
                dark: true
            });
        },
        toggleMenu(config) {
            const targetPages = this.toArray(document.querySelectorAll(config.pages));

            const links = this.toArray(document.querySelectorAll(config.container + " a"));

            links.forEach((item) => {
                item.addEventListener("click", (e) => {
                    e.preventDefault();
                    let link = e.currentTarget.attributes["href"].nodeValue;
                    this.togglePages(targetPages, config.dark);
                    this.toggleLinks(links, e);
                    this.addActiveState(config.container, link.replace("/", ""));
                });
            });
        },
        toArray(collection) {

            /*
              @desc: create a true array from collection of elements
            */

            return Array.prototype.slice.call(collection);
        },
        toggleLinks(links, e) {
            links.forEach((item) => {
                item.classList.remove("active");
                item.classList.add("static");
            });

            const targets = this.toArray(document.querySelectorAll("a[href='" + e.currentTarget.attributes.href.value + "']"));

            targets.forEach((item) => {
                item.classList.remove("static");
                item.classList.add("active");
            });
        },
        togglePages(pages, darkBackground) {
            const contentWrapper = document.querySelector(".Content-outer");

            if (darkBackground) {
                contentWrapper.classList.add("dark-background");
            } else {
                contentWrapper.classList.remove("dark-background");
            }

            pages.forEach((page) => {
                var images = page.querySelectorAll('img[data-src]');
                for (var i = 0; i < images.length; i++) {
                    ImageLoader.load(images[i], { load: true });
                }
                page.classList.add("hidden");
                page.classList.remove("active");
            });
        },
        addActiveState(section, link) {
            const target = document.getElementById(link);

            target.classList.remove("hidden");
            target.classList.add("active");
        }
    };

    Site.init();
})();
