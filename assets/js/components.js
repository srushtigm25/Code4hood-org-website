async function loadComponent(id, file) {
    try {
        const response = await fetch(file);
        if (!response.ok) {
            throw new Error(`Could not load ${file}`);
        }

        const html = await response.text();
        document.getElementById(id).innerHTML = html;

        markActiveNav();
    } catch (error) {
        console.error(error);
    }
}

function markActiveNav() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(".navbar .nav-link, .navbar .dropdown-item");
    const donateBtn = document.querySelector(".donate-btn");

    navLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (href === currentPage) {
            link.classList.add("active");

            // If this is a dropdown item, also highlight parent dropdown toggle
            if (link.classList.contains("dropdown-item")) {
                const parentDropdown = link.closest(".dropdown");
                if (parentDropdown) {
                    const parentToggle = parentDropdown.querySelector(".dropdown-toggle");
                    if (parentToggle) {
                        parentToggle.classList.add("active");
                    }
                }
            }
        } else {
            link.classList.remove("active");
        }
    });

    // Handle donate button
    if (donateBtn) {
        const href = donateBtn.getAttribute("href");
        if (href === currentPage) {
            donateBtn.classList.add("active");
        } else {
            donateBtn.classList.remove("active");
        }
    }
}

document.addEventListener("DOMContentLoaded", async function () {
    await loadComponent("navbar-placeholder", "navbar.html");
    await loadComponent("footer-placeholder", "footer.html");
});