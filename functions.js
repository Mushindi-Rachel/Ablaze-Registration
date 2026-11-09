// ============================================================
//  Youth Ablaze 2026 — registration form logic
// ============================================================

// 1) After deploying your Google Apps Script as a web app, paste its /exec URL here.
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxk6uBLvuKnDw_a1SkU5dMX4nVezbGjFB1eb8J8p-wOPY_0fhLEDKO4pO3zw4KLdUkL/exec";

const REQUEST_TIMEOUT_MS = 30000;

// Kenyan mobile numbers: 07xx, 01xx, +2547xx, 2547xx (9 digits after the prefix)
const PHONE_REGEX = /^(?:\+?254|0)[17]\d{8}$/;
const MPESA_REGEX = /^[A-Z0-9]{10}$/;

// ---------- Element references ----------
const form = document.getElementById("registrationForm");
const submitBtn = document.getElementById("submitBtn");
const accommodation = document.getElementById("accommodation");
const paymentSection = document.getElementById("payment-section");
const paymentMethod = document.getElementById("payment-method");
const receiptField = document.getElementById("receipt-field");
const mpesaField = document.getElementById("mpesa-field");
const receiptNo = document.getElementById("receipt_no");
const mpesaCode = document.getElementById("mpesa-code");

// Phone fields: [input id, required?]
const PHONE_FIELDS = [
    ["phone", true],
    ["pastornumber", false],
    ["Ephone", true],
];

// ---------- Helpers ----------
const normalizePhone = (value) => value.replace(/[\s-]/g, "");

function setFieldError(input, message) {
    const field = input.closest(".field");
    if (!field) return;
    field.classList.toggle("has-error", Boolean(message));

    let note = field.querySelector(".error-text");
    if (message) {
        if (!note) {
            note = document.createElement("p");
            note.className = "error-text";
            note.setAttribute("role", "alert");
            field.appendChild(note);
        }
        note.textContent = message;
        input.setAttribute("aria-invalid", "true");
    } else {
        if (note) note.remove();
        input.removeAttribute("aria-invalid");
    }
}

function resetPaymentUI() {
    paymentSection.hidden = true;
    receiptField.hidden = true;
    mpesaField.hidden = true;
    paymentMethod.required = false;
    paymentMethod.value = "";
    receiptNo.value = "";
    mpesaCode.value = "";
}

function showAlert(options) {
    // Fall back to a plain alert if SweetAlert failed to load (e.g. offline CDN)
    if (window.Swal) return Swal.fire(options);
    alert(`${options.title || ""}\n${options.text || ""}`.trim());
    return Promise.resolve();
}

// ---------- Show / hide payment fields ----------
accommodation.addEventListener("change", () => {
    const isBoarder = accommodation.value === "boarder";
    if (isBoarder) {
        paymentSection.hidden = false;
        paymentMethod.required = true; // boarders must choose how they paid
    } else {
        resetPaymentUI();
    }
});

paymentMethod.addEventListener("change", () => {
    const method = paymentMethod.value;
    receiptField.hidden = method !== "cash";
    mpesaField.hidden = method !== "mpesa";
    receiptNo.required = method === "cash";
    mpesaCode.required = method === "mpesa";
    if (method !== "cash") receiptNo.value = "";
    if (method !== "mpesa") mpesaCode.value = "";
});

// M-Pesa codes are always uppercase
mpesaCode.addEventListener("input", () => {
    mpesaCode.value = mpesaCode.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
});

// Mark fields as "touched" once left, so red borders don't appear before the user starts typing
form.addEventListener(
    "blur",
    (e) => {
        const field = e.target.closest && e.target.closest(".field");
        if (field) field.classList.add("touched");
    },
    true
);

// Clear a field's custom error as soon as the user edits it
form.addEventListener("input", (e) => {
    if (e.target.matches("input, select")) setFieldError(e.target, "");
});

// ---------- Validation ----------
function validateForm() {
    let firstInvalid = null;
    const fail = (input, message) => {
        setFieldError(input, message);
        const wrapper = input.closest(".field");
        if (wrapper) wrapper.classList.add("touched");
        if (!firstInvalid) firstInvalid = input;
    };
    // Required fields and basic constraints (age range, etc.)
    form.querySelectorAll("input, select").forEach((input) => {
        if (input.name === "website") return; // honeypot
        if (input.hidden || input.closest("[hidden]")) return;
        if (!input.checkValidity()) {
            let msg = "Please fill in this field.";
            if (input.validity.rangeUnderflow || input.validity.rangeOverflow) {
                msg = `Please enter a valid age (${input.min}–${input.max}).`;
            }
            fail(input, msg);
        } else {
            setFieldError(input, "");
        }
    });

    // Phone numbers
    PHONE_FIELDS.forEach(([id, required]) => {
        const input = document.getElementById(id);
        const value = normalizePhone(input.value.trim());
        if (!value) return; // empty handled by `required` above
        if (!PHONE_REGEX.test(value)) {
            fail(input, "Enter a valid Kenyan number, e.g. 0712345678.");
        }
    });

    // Payment details for boarders
    if (accommodation.value === "boarder") {
        if (paymentMethod.value === "mpesa" && mpesaCode.value && !MPESA_REGEX.test(mpesaCode.value)) {
            fail(mpesaCode, "M-Pesa codes have 10 letters/numbers, e.g. SJK4XXXXXX.");
        }
    }

    if (firstInvalid) {
        firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
        firstInvalid.focus({ preventScroll: true });
        return false;
    }
    return true;
}

// ---------- Submit ----------
let isSubmitting = false;

form.addEventListener("submit", async(e) => {
    e.preventDefault();
    if (isSubmitting) return; // blocks accidental double-taps

    if (!validateForm()) return;

    // Honeypot: bots fill the hidden field. Pretend success, send nothing.
    if (form.elements["website"].value) {
        form.reset();
        return;
    }

    if (!SCRIPT_URL || SCRIPT_URL.startsWith("PASTE_")) {
        showAlert({
            icon: "error",
            title: "Setup incomplete",
            text: "The registration endpoint has not been configured yet.",
        });
        return;
    }

    isSubmitting = true;
    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting…";

    // Normalise phone numbers before sending
    const formData = new FormData(form);
    formData.delete("website");
    PHONE_FIELDS.forEach(([id]) => {
        const value = normalizePhone(formData.get(id) || "");
        formData.set(id, value);
    });

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
        const resp = await fetch(SCRIPT_URL, {
            method: "POST",
            body: formData,
            signal: controller.signal,
        });

        const raw = await resp.text();
        let result;
        try {
            result = JSON.parse(raw);
        } catch {
            throw new Error("The server sent an unexpected response. Please try again.");
        }

        if (result && result.result === "success") {
            await showAlert({
                icon: "success",
                title: "🎉 Registration successful!",
                text: "Thank you — your registration has been received.",
                confirmButtonColor: "#e25909",
            });
            form.reset();
            resetPaymentUI();
            form.querySelectorAll(".touched").forEach((el) => el.classList.remove("touched"));
        } else {
            throw new Error(
                (result && typeof result.message === "string" && result.message) ||
                "Your registration could not be saved. Please try again."
            );
        }
    } catch (err) {
        const message =
            err.name === "AbortError" ?
            "The request timed out. Check your connection and try again." :
            err.message || "Something went wrong. Please try again.";

        // `text` (not `html`) so server output can never inject markup
        showAlert({
            icon: "error",
            title: "Could not submit",
            text: message,
            confirmButtonColor: "#e25909",
        });
    } finally {
        clearTimeout(timer);
        isSubmitting = false;
        submitBtn.disabled = false;
        submitBtn.textContent = "Register Now";
    }
});