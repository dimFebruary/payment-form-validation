// ===============================
// Grab form & button
// ===============================
const form = document.getElementById("paymentForm");
const submitBtn = document.getElementById("submitBtn");

// ===============================
// Grab inputs
// ===============================
const nameInput = document.getElementById("name");
const addressInput = document.getElementById("address");
const emailInput = document.getElementById("email");
const pincodeInput = document.getElementById("pincode");
const cardTypeInput = document.getElementById("card_type");
const cardNumberInput = document.getElementById("card_number");
const expDateInput = document.getElementById("exp_date");
const cvvInput = document.getElementById("cvv");

const genderInputs = document.querySelectorAll('input[name="gender"]');
const genderError = document.querySelector(".custom-fieldset .error-message");

// ===============================
// Utility functions
// ===============================
function showError(input, message) {
    input.classList.add("error");
    input.classList.remove("success");
    input.nextElementSibling.textContent = message;
}

function showSuccess(input) {
    input.classList.remove("error");
    input.classList.add("success");
    input.nextElementSibling.textContent = "";
}

// ===============================
// Validation functions
// ===============================
function validateName() {
    const value = nameInput.value.trim();
    if (value.length < 3) {
        showError(nameInput, "Name must be at least 3 characters");
        return false;
    }
    showSuccess(nameInput);
    return true;
}

function validateGender() {
    let selected = false;

    genderInputs.forEach(input => {
        if (input.checked) selected = true;
    });

    if (!selected) {
        genderError.textContent = "Please select a gender";
        return false;
    }

    genderError.textContent = "";
    return true;
}

function validateAddress() {
    if (addressInput.value.trim() === "") {
        showError(addressInput, "Address cannot be empty");
        return false;
    }
    showSuccess(addressInput);
    return true;
}

function validateEmail() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(emailInput.value.trim())) {
        showError(emailInput, "Enter a valid email address");
        return false;
    }
    showSuccess(emailInput);
    return true;
}

function validatePincode() {
    if (!/^\d{6}$/.test(pincodeInput.value.trim())) {
        showError(pincodeInput, "Pincode must be 6 digits");
        return false;
    }
    showSuccess(pincodeInput);
    return true;
}

function validateCardType() {
    if (cardTypeInput.value === "") {
        showError(cardTypeInput, "Please select a card type");
        return false;
    }
    showSuccess(cardTypeInput);
    return true;
}

// ===============================
// Card formatting & validation
// ===============================
function formatCardNumber(value) {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
}

function validateCardNumber() {
    const digits = cardNumberInput.value.replace(/\s/g, "");
    if (!/^\d{16}$/.test(digits)) {
        showError(cardNumberInput, "Card number must be 16 digits");
        return false;
    }
    showSuccess(cardNumberInput);
    return true;
}

function validateExpiry() {
    if (expDateInput.value === "") {
        showError(expDateInput, "Select expiry date");
        return false;
    }
    showSuccess(expDateInput);
    return true;
}

function validateCVV() {
    if (!/^\d{3}$/.test(cvvInput.value.trim())) {
        showError(cvvInput, "CVV must be 3 digits");
        return false;
    }
    showSuccess(cvvInput);
    return true;
}

// ===============================
// Overall form validity
// ===============================
function checkFormValidity() {
    const isFormValid =
        validateName() &&
        validateGender() &&
        validateAddress() &&
        validateEmail() &&
        validatePincode() &&
        validateCardType() &&
        validateCardNumber() &&
        validateExpiry() &&
        validateCVV();

    submitBtn.disabled = !isFormValid;
}

// ===============================
// Event listeners
// ===============================
const inputs = [
    nameInput,
    addressInput,
    emailInput,
    pincodeInput,
    cardTypeInput,
    cardNumberInput,
    expDateInput,
    cvvInput
];

inputs.forEach(input => {
    input.addEventListener("input", checkFormValidity);
});

genderInputs.forEach(input => {
    input.addEventListener("change", checkFormValidity);
});

// Card number formatting
cardNumberInput.addEventListener("input", function (e) {
    e.target.value = formatCardNumber(e.target.value);
});

// ===============================
// Form submit
// ===============================
form.addEventListener("submit", function (e) {
    e.preventDefault();
    checkFormValidity();

    if (!submitBtn.disabled) {
        alert("Payment form validated successfully!");
        form.reset();
        submitBtn.disabled = true;
    }
});

// Initial state
checkFormValidity();
