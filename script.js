"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var html2pdf_js_1 = require("html2pdf.js");
var shareButton = document.getElementById('shareButton');
var downloadButton = document.getElementById('downloadButton');
var resumeContainer = document.getElementById('resumeContainer');
// Function to generate a unique URL
function generateUniqueURL(username) {
    return "https://".concat(username, ".vercel.app/resume");
}
// Handle the share button click
shareButton === null || shareButton === void 0 ? void 0 : shareButton.addEventListener('click', function () {
    var usernameInput = document.getElementById('username');
    if (!usernameInput || usernameInput.value.trim() === '') {
        alert('Please enter a username.');
        return;
    }
    var uniqueURL = generateUniqueURL(usernameInput.value);
    // Use the modern Clipboard API
    navigator.clipboard.writeText(uniqueURL).then(function () {
        alert("Resume URL copied to clipboard: ".concat(uniqueURL));
    }).catch(function (err) {
        console.error('Could not copy text: ', err);
    });
});
// Handle the download button click
downloadButton === null || downloadButton === void 0 ? void 0 : downloadButton.addEventListener('click', function () {
    var options = {
        margin: 1,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    if (typeof html2pdf_js_1.default === 'undefined') {
        alert('html2pdf library not loaded.');
        return;
    }
    if (resumeContainer) {
        (0, html2pdf_js_1.default)().from(resumeContainer).set(options).save();
    }
    else {
        alert('Resume container not found.');
    }
});
