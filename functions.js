const form = document.getElementById("registrationForm");
const successMessage = document.getElementById("successMessage");

const accommodation = document.getElementById("accommodation");
const paymentSection = document.getElementById("payment-section");
const paymentMethod = document.getElementById("payment-method");
const receiptNo = document.getElementById("receipt_no");
const mpesaCode = document.getElementById("mpesa-code");

// Show/hide payment fields
accommodation.addEventListener("change", function() {
    paymentSection.style.display = this.value === "boarder" ? "block" : "none";
});

paymentMethod.addEventListener("change", function() {
    if (this.value === "cash") {
        receiptNo.style.display = "block";
        mpesaCode.style.display = "none";
    } else if (this.value === "mpesa") {
        mpesaCode.style.display = "block";
        receiptNo.style.display = "none";
    } else {
        receiptNo.style.display = "none";
        mpesaCode.style.display = "none";
    }
});

// Submit to Google Script
form.addEventListener("submit", async(e) => {
    e.preventDefault();

    const formData = new FormData(form);

    try {
        await fetch("https://script.google.com/macros/s/AKfycby_2fU5SruHA8Y6KjgUqbBX477OLIPUxTm99QN2vLzlHUbO0XczV0cpqFuxPf9iFM5vbA/exec", {
            method: "POST",
            body: formData, // 👈 still sending as FormData
        });

        successMessage.style.display = "block";
        form.reset();
        paymentSection.style.display = "none";
    } catch (err) {
        alert("❌ Error: " + err.message);
    }
});