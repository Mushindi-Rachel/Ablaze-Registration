const form = document.getElementById("registrationForm");
const accommodation = document.getElementById("accommodation");
const paymentSection = document.getElementById("payment-section");
const paymentMethod = document.getElementById("payment-method");
const receiptNo = document.getElementById("receipt_no");
const mpesaCode = document.getElementById("mpesa-code");

// ---- Submit to Google Apps Script ----
form.addEventListener("submit", async(e) => {
    e.preventDefault();

    // Tiny front-end validation for boarders:
    if (accommodation.value === "boarder") {
        if (paymentMethod.value === "mpesa" && !mpesaCode.value.trim()) {
            Swal.fire({ icon: "warning", title: "M-Pesa code required", text: "Please enter your M-Pesa code." });
            return;
        }
        if (paymentMethod.value === "cash" && !receiptNo.value.trim()) {
            Swal.fire({ icon: "warning", title: "Receipt number required", text: "Please enter your cash receipt number." });
            return;
        }
    }

    const formData = new FormData(form);

    // Nice "submitting..." modal
    Swal.fire({
        title: "Submitting...",
        text: "Please wait a moment.",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading()
    });

    try {
        const resp = await fetch("https://script.google.com/macros/s/AKfycbwLCsfFzsymg5MJemJsBgGb0JvkgyD8qUHURF_CODKOnaTSG3l9XP2QVbuk11n1PCfEkw/exec", {
            method: "POST",
            body: formData,
        });

        const text = await resp.text();
        let result;
        try {
            result = JSON.parse(text);
        } catch {
            throw new Error(`Unexpected response from server: ${text.substring(0, 200)}`);
        }

        if (result.result === "success") {
            Swal.fire({
                icon: "success",
                title: "🎉 Registration Successful!",
                text: "Thank you for registering for Youth Ablaze - 2025!",
                confirmButtonColor: "#e25909"
            });
            form.reset();
            paymentSection.style.display = "none";
            receiptNo.style.display = "none";
            mpesaCode.style.display = "none";
        } else {
            // result.message can be any type; render safely
            Swal.fire({
                icon: "error",
                title: "Oops...",
                html: `<pre style="text-align:left;white-space:pre-wrap;">${(typeof result.message === "string" ? result.message : JSON.stringify(result.message, null, 2))}</pre>`,
                confirmButtonColor: "#e25909"
            });
        }
    } catch (err) {
        Swal.fire({
            icon: "error",
            title: "❌ Network / CORS Error",
            html: `<pre style="text-align:left;white-space:pre-wrap;">${err.message}</pre>`,
            confirmButtonColor: "#e25909"
        });
    }
});