// Import the html2pdf library if using a module bundler, otherwise this will be included via the CDN
import html2pdf from 'html2pdf.js';

// Get references to the share and download buttons
const shareButton = document.getElementById('shareButton') as HTMLButtonElement | null;
const downloadButton = document.getElementById('downloadButton') as HTMLButtonElement | null;
const resumeContainer = document.getElementById('resumeContainer') as HTMLElement | null;

// Function to generate a unique URL
function generateUniqueURL(username: string): string {
    return `https://${username}.vercel.app/resume`;
}

// Handle the share button click
shareButton?.addEventListener('click', () => {
    const usernameInput = document.getElementById('username') as HTMLInputElement | null;
    if (!usernameInput || usernameInput.value.trim() === '') {
        alert('Please enter a username.');
        return;
    }
    const uniqueURL = generateUniqueURL(usernameInput.value);

    // Use the modern Clipboard API to copy the URL
    navigator.clipboard.writeText(uniqueURL).then(() => {
        alert(`Resume URL copied to clipboard: ${uniqueURL}`);
    }).catch(err => {
        console.error('Could not copy text: ', err);
    });
});

// Handle the download button click for PDF generation
downloadButton?.addEventListener('click', () => {
    const options = {
        margin: 1,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // Ensure html2pdf is available and the resumeContainer exists
    if (typeof html2pdf === 'undefined') {
        alert('html2pdf library not loaded.');
        return;
    }

    if (resumeContainer) {
        // Generate PDF from the resume content
        html2pdf().from(resumeContainer).set(options).save();
    } else {
        alert('Resume container not found.');
    }
});
