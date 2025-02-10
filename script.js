function openPopup() {
  document.getElementById("popupOverlay").style.display = "flex";
}

function closePopup() {
  document.getElementById("popupOverlay").style.display = "none";
}

document
  .getElementById("bookDemoBtn")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default action
    document.getElementById("demoForm").scrollIntoView({ behavior: "smooth" });
  });

// Smooth Scrolling for Navbar Links
document.querySelectorAll(".nav-link").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    if (this.hash !== "") {
      e.preventDefault();
      document.querySelector(this.hash).scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  function handleDropdownBehavior() {
    document
      .querySelectorAll(".nav-item.dropdown")
      .forEach(function (dropdown) {
        const menu = dropdown.querySelector(".dropdown-menu");
        const toggle = dropdown.querySelector(".nav-link");

        // Reset event listeners
        dropdown.onmouseenter = null;
        dropdown.onmouseleave = null;
        toggle.onclick = null;

        if (window.innerWidth >= 992) {
          // Desktop: Open on Hover
          dropdown.addEventListener("mouseenter", function () {
            menu.classList.add("show");
          });
          dropdown.addEventListener("mouseleave", function () {
            menu.classList.remove("show");
          });
        } else {
          // Mobile: Open on Click
          toggle.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();

            // Close other open dropdowns
            document.querySelectorAll(".nav-item.dropdown").forEach((item) => {
              if (item !== dropdown) {
                item.classList.remove("show");
                item.querySelector(".dropdown-menu").classList.remove("show");
              }
            });

            // Toggle current dropdown
            menu.classList.toggle("show");
            dropdown.classList.toggle("show");
          });
        }
      });
  }

  // Initial call to set behavior
  handleDropdownBehavior();

  // Adjust behavior on window resize
  window.addEventListener("resize", handleDropdownBehavior);

  // Close dropdown when clicking outside
  document.addEventListener("click", function (event) {
    document.querySelectorAll(".dropdown-menu.show").forEach(function (menu) {
      if (!menu.parentElement.contains(event.target)) {
        menu.classList.remove("show");
        menu.parentElement.classList.remove("show");
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const navbarToggler = document.querySelector(".navbar-toggler");

  navbarToggler.addEventListener("click", function () {
    this.classList.toggle("open");
  });
});

window.addEventListener("scroll", function () {
  let navbar = document.querySelector(".navbar");
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});

document.querySelectorAll(".faq-item").forEach((item) => {
  item.addEventListener("click", () => {
    item.classList.toggle("active");
    const toggle = item.querySelector(".faq-toggle");
    toggle.textContent = toggle.textContent === "+" ? "-" : "+";
  });
});

function appmarketPlace(event, sectionId) {
  document.querySelectorAll(".marketplace_tab").forEach((tab) => {
    tab.classList.remove("active");
  });

  document.querySelectorAll(".tabcontent").forEach((content) => {
    content.classList.remove("active");
  });

  event.currentTarget.classList.add("active");

  document.getElementById(sectionId).classList.add("active");
}



document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("consultationForm")
    .addEventListener("submit", async function (event) {
      event.preventDefault(); // Stop form from reloading

      // Fetch values using event.target instead of document.getElementById
      const formData = new FormData(event.target);
      const name = formData.get("name").trim();
      const email = formData.get("email").trim();
      const phone = formData.get("phone").trim();
      const city = formData.get("city").trim();
      const restaurant = formData.get("restaurant").trim();

      console.log("📋 Form Values:");
      console.log("Name:", name);
      console.log("Email:", email);
      console.log("Phone:", phone);
      console.log("City:", city);
      console.log("Restaurant:", restaurant);

      // Check if any field is empty
      if (!name || !email || !phone || !city || !restaurant) {
        alert("⚠️ All fields are required!");
        return;
      }

      const requestData = { name, email, phone, city, restaurant };
      console.log("🚀 Sending Data:", requestData);

      try {
        const response = await fetch(
          "http://localhost:5000/api/submit-consultation",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestData),
          }
        );

        const data = await response.json();
        console.log("📨 Response Data:", data);

        const responseMessage = document.getElementById("responseMessage");
        if (response.ok) {
          responseMessage.style.color = "green";
          responseMessage.textContent = data.message;
          event.target.reset(); // Reset the form
        } else {
          responseMessage.style.color = "red";
          responseMessage.textContent = data.error;
        }
      } catch (error) {
        console.error("❌ Fetch Error:", error);
        responseMessage.style.color = "red";
        responseMessage.textContent = "Error submitting form. Try again later.";
      }
    });
});
