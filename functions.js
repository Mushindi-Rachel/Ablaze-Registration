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
        const response = await fetch("https://script.google.com/macros/s/AKfycbxvLYvm5nUvFG-ixvnSEgvBeDBZqJByal_rF05dlAxKsnMaeEeriaUUH4NREQgT_gksjw/exec", {
            method: "POST",
            body: formData,
        });

        const result = await response.json();

        if (result.result === "success") {
            Swal.fire({
                icon: "success",
                title: "🎉 Registration Successful!",
                text: "Thank you for registering for Youth Ablaze - 2025! You are highly welcomed.",
                confirmButtonColor: "#e25909"
            });
            form.reset();
            paymentSection.style.display = "none";
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong: " + result.message,
                confirmButtonColor: "#e25909"
            });
        }
    } catch (err) {
        Swal.fire({
            icon: "error",
            title: "❌ Network Error",
            text: err.message,
            confirmButtonColor: "#e25909"
        });
    }
});