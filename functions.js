// Reusable dropdown function
function setupDropdown(btnId, contentId, placeholder) {
    const btn = document.getElementById(btnId);
    const content = document.getElementById(contentId);
    const checkboxes = content.querySelectorAll("input[type=checkbox]");

    btn.addEventListener("click", () => {
        content.style.display = content.style.display === "block" ? "none" : "block";
    });

    checkboxes.forEach(cb => {
        cb.addEventListener("change", () => {
            let selected = [];
            checkboxes.forEach(c => {
                if (c.checked) selected.push(c.value)
            });
            btn.textContent = selected.length ? selected.join(", ") : placeholder;
        });
    });

    document.addEventListener("click", (e) => {
        if (!btn.contains(e.target) && !content.contains(e.target)) {
            content.style.display = "none";
        }
    });
}

// Init dropdowns
setupDropdown("roleDropdownBtn", "roleDropdownContent", "Select roles...");
setupDropdown("heardDropdownBtn", "heardDropdownContent", "Select...");

// Payment toggle
const accommodation = document.getElementById("accommodation");
const paymentSection = document.getElementById("payment-section");
const paymentMethod = document.getElementById("payment-method");
const mpesaCode = document.getElementById("mpesa-code");

accommodation.addEventListener("change", function() {
    paymentSection.style.display = this.value === "boarder" ? "block" : "none";
    if (this.value !== "boarder") {
        paymentMethod.value = "";
        mpesaCode.value = "";
        mpesaCode.style.display = "none";
    }
});

paymentMethod.addEventListener("change", function() {
    mpesaCode.style.display = this.value === "mpesa" ? "block" : "none";
    if (this.value !== "mpesa") mpesaCode.value = "";
});

// Submit to Google Script
const scriptURL = "YOUR_GOOGLE_SCRIPT_URL_HERE"; // replace with your Google Apps Script URL
const form = document.getElementById("registrationForm");
const successMessage = document.getElementById("successMessage");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch(scriptURL, {
            method: "POST",
            body: new FormData(form)
        })
        .then(() => {
            successMessage.style.display = "block";
            form.reset();
            document.getElementById("roleDropdownBtn").textContent = "Select roles...";
            document.getElementById("heardDropdownBtn").textContent = "Select...";
        })
        .catch((error) => alert("Error: " + error.message));
});