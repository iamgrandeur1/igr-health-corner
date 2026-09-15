// ========================================
// IGR HEALTH CORNER
// Main Website JavaScript
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    // ----------------------------------------
    // Mobile Navigation
    // ----------------------------------------

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", function () {
            navLinks.classList.toggle("active");

            const expanded =
                menuToggle.getAttribute("aria-expanded") === "true";

            menuToggle.setAttribute("aria-expanded", !expanded);
        });

        // Close mobile menu after clicking a navigation link
        const links = navLinks.querySelectorAll("a");

        links.forEach(function (link) {
            link.addEventListener("click", function () {
                navLinks.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });
    }


    // ----------------------------------------
    // Current Year
    // ----------------------------------------

    const yearElement = document.getElementById("currentYear");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    // ----------------------------------------
    // Product Package Pricing
    // ----------------------------------------

    const pricePerPackage = 20000;

    const quantitySelect = document.getElementById("quantity");
    const totalDisplay = document.getElementById("orderTotal");

    function updateOrderTotal() {

        if (!quantitySelect || !totalDisplay) {
            return;
        }

        const quantity = parseInt(quantitySelect.value, 10) || 1;
        const total = quantity * pricePerPackage;

        totalDisplay.textContent =
            "Total: ₦" + total.toLocaleString("en-NG");
    }

    if (quantitySelect) {
        quantitySelect.addEventListener("change", updateOrderTotal);
        updateOrderTotal();
    }


    // ----------------------------------------
    // Order Form → WhatsApp
    // ----------------------------------------

    const orderForm = document.getElementById("orderForm");

    if (orderForm) {

        orderForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const fullName =
                document.getElementById("fullName")?.value.trim() || "";

            const phone =
                document.getElementById("phone")?.value.trim() || "";

            const state =
                document.getElementById("state")?.value.trim() || "";

            const address =
                document.getElementById("address")?.value.trim() || "";

            const quantity =
                parseInt(document.getElementById("quantity")?.value, 10) || 1;

            const assessmentConfirmed =
                document.getElementById("assessment")?.checked;

            const labelConfirmed =
                document.getElementById("labelInfo")?.checked;

            // ----------------------------------------
            // Basic Validation
            // ----------------------------------------

            if (!fullName || !phone || !state || !address) {
                alert("Please complete all required order details.");
                return;
            }

            if (!assessmentConfirmed) {
                alert(
                    "Please confirm that you understand the assessment requirement before placing your order."
                );
                return;
            }

            if (!labelConfirmed) {
                alert(
                    "Please confirm that you understand the product information provided on the label."
                );
                return;
            }


            // ----------------------------------------
            // Calculate Total
            // ----------------------------------------

            const total = quantity * pricePerPackage;


            // ----------------------------------------
            // Build WhatsApp Message
            // ----------------------------------------

            const message = `
Hello IGR Health Corner,

I would like to place an order for Prostate Wellness.

ORDER DETAILS
-------------------------
Name: ${fullName}
Phone/WhatsApp: ${phone}
State: ${state}
Delivery Address: ${address}

Quantity: ${quantity} package(s)
Each package: 2 bottles
Price per package: ₦20,000
Total: ₦${total.toLocaleString("en-NG")}
-------------------------

I understand that an initial assessment is required before starting the product and that a follow-up assessment is expected after approximately one month.

I have also reviewed the product information provided on the website.

Please send me the next steps for payment and delivery.

Thank you.
            `.trim();


            // ----------------------------------------
            // WhatsApp URL
            // ----------------------------------------

            const whatsappNumber = "2348144001359";

            const whatsappURL =
                "https://wa.me/" +
                whatsappNumber +
                "?text=" +
                encodeURIComponent(message);


            // ----------------------------------------
            // Open WhatsApp
            // ----------------------------------------

            window.open(whatsappURL, "_blank");
        });
    }


    // ----------------------------------------
    // Smooth Scrolling
    // ----------------------------------------

    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const targetElement =
                document.querySelector(targetId);

            if (targetElement) {

                event.preventDefault();

                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    // ----------------------------------------
    // Prevent Empty WhatsApp Button Links
    // ----------------------------------------

    const whatsappButtons =
        document.querySelectorAll(".whatsapp-link");

    whatsappButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const number = "2348144001359";

            const defaultMessage =
                "Hello IGR Health Corner, I would like to make an enquiry about Prostate Wellness.";

            const url =
                "https://wa.me/" +
                number +
                "?text=" +
                encodeURIComponent(defaultMessage);

            if (
                button.tagName.toLowerCase() === "a" &&
                button.getAttribute("href") === "#"
            ) {
                button.setAttribute("href", url);
            }
        });
    });

});
