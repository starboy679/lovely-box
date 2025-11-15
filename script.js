// Mock data
const readyMadeGifts = [
    { id: 'LB001', name: 'Signature Luxe Collection', description: 'This is a pre-curated box designed for ultimate impact, featuring a sophisticated mix of high-end essentials.', price: '750', imageUrl: 'images/lux box.jpg' },
    { id: 'LB002', name: 'Timeless Blush Collection', description: 'A truly breathtaking arrangement combining romance and luxury.', price: '600', imageUrl: 'images/Blush Collection.jpg' },
    { id: 'LB003', name: 'Golden Bouquet', description: 'A decadent, edible twist on the traditional bouquet!.', price: '900', imageUrl: 'images/Golden Bouquet.jpg' },
    { id: 'LB004', name: 'Luxury Unboxing', description: 'Present a cherished gift in a style they won\'t forget.', price: '1200', imageUrl: 'images/Luxury Unboxing.jpg' },
    { id: 'LB005', name: 'Black & White Elegance', description: 'A sophisticated and luxurious choice, this gift is presented in a textured black box.', price: '450', imageUrl: 'images/Black & White Elegance.jpg' },
    { id: 'LB006', name: 'Personalized Vows Card', description: 'Elevate your engagement or wedding gift with a deeply personal touch.', price: '850', imageUrl: 'images/Personalized Vows Card.jpg' },
    { id: 'LB007', name: 'Modern Black & Gold Curator', description: 'The ultimate statement of luxury and style. This signature curated box is designed for the modern woman.', price: '850', imageUrl: 'images/Modern Black & Gold Curator.jpg' },
    { id: 'LB008', name: 'Warm Embrace Box', description: 'This heartfelt gift box is designed for comfort, sweetness, and a deeply personal touch.', price: '850', imageUrl: 'images/Warm Embrace Box1.jpg' },
    { id: 'LB009', name: 'Dream & Relax Pampering Kit', description: 'Relax, unwind, and prioritize self-care with this delightful spa-themed box.', price: '850', imageUrl: 'images/Dream & Relax Pampering Kit.jpg' },
    { id: 'LB010', name: 'Celebration Timepiece Box', description: 'Make a grand statement with our Contemporary Celebration Box.', price: '850', imageUrl: 'images/Celebration Timepiece Box (1).jpg' },
];

// WhatsApp config
const WHATSAPP_NUMBER = "201558823438";

// Current page
let currentPage = 'home';

// Quiz state
let quizStep = 1;
let quizAnswers = { occasion: '', recipient: '', vibe: '' };
let quizLoading = false;
let quizResult = null;
let quizError = '';

// Page navigation
function setPage(page) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    // Show selected page
    document.getElementById(page).classList.add('active');
    // Update nav active
    document.querySelectorAll('.nav-link').forEach(nav => nav.classList.remove('active'));
    document.getElementById('nav-' + page).classList.add('active');
    currentPage = page;
}

// Quiz modal
function openQuizModal() {
    quizStep = 1;
    quizAnswers = { occasion: '', recipient: '', vibe: '' };
    quizLoading = false;
    quizResult = null;
    quizError = '';
    renderQuiz();
    document.getElementById('quiz-modal').style.display = 'flex';
}

function closeQuizModal() {
    document.getElementById('quiz-modal').style.display = 'none';
}

function renderQuiz() {
    const content = document.getElementById('quiz-content');
    let html = '';

    if (quizStep === 1) {
        html = `
            <h3>What's the occasion?</h3>
            <div class="quiz-options">
                <button onclick="handleQuizAnswer('occasion', 'Birthday')">Birthday</button>
                <button onclick="handleQuizAnswer('occasion', 'Anniversary')">Anniversary</button>
                <button onclick="handleQuizAnswer('occasion', 'Thank You')">Thank You</button>
                <button onclick="handleQuizAnswer('occasion', 'Get Well Soon')">Get Well Soon</button>
            </div>
        `;
    } else if (quizStep === 2) {
        html = `
            <h3>Who is this special gift for?</h3>
            <div class="quiz-options">
                <button onclick="handleQuizAnswer('recipient', 'Partner')">Partner</button>
                <button onclick="handleQuizAnswer('recipient', 'Friend')">Friend</button>
                <button onclick="handleQuizAnswer('recipient', 'Family Member')">Family Member</button>
                <button onclick="handleQuizAnswer('recipient', 'Colleague')">Colleague</button>
            </div>
        `;
    } else if (quizStep === 3) {
        html = `
            <h3>What's the vibe you're going for?</h3>
            <div class="quiz-options">
                <button onclick="handleQuizAnswer('vibe', 'Relaxing & Cozy')">Relaxing & Cozy</button>
                <button onclick="handleQuizAnswer('vibe', 'Fun & Celebratory')">Fun & Celebratory</button>
                <button onclick="handleQuizAnswer('vibe', 'Elegant & Classic')">Elegant & Classic</button>
                <button onclick="handleQuizAnswer('vibe', 'Modern & Unique')">Modern & Unique</button>
            </div>
        `;
    } else if (quizStep === 4) {
        html = `<h3>Here are some ideas for you...</h3>`;
        if (quizLoading) {
            html += `<p>Thinking of the perfect gift...</p>`;
        } else if (quizError) {
            html += `<p style="color: red;">${quizError}</p>`;
        } else if (quizResult) {
            quizResult.forEach(item => {
                const gift = readyMadeGifts.find(g => g.id === item.id);
                html += `
                    <div class="suggestion-card">
                        <img src="${gift.imageUrl}" alt="${item.name}" class="suggestion-image"/>
                        <div>
                            <h4>${item.name}</h4>
                            <p><em>"${item.reason}"</em></p>
                            <a href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi Lovely Box, I'd like to ask about the "${item.name}" (Ref: ${item.id})`)}" class="btn" target="_blank" rel="noopener noreferrer" style="font-size: 0.8rem; padding: 0.4rem 0.8rem;">
                                Order this one
                            </a>
                        </div>
                    </div>
                `;
            });
        }
    }

    content.innerHTML = html;
}

function handleQuizAnswer(field, value) {
    quizAnswers[field] = value;
    if (quizStep < 3) {
        quizStep++;
        renderQuiz();
    } else {
        handleQuizSubmit();
    }
}

async function handleQuizSubmit() {
    quizStep = 4;
    quizLoading = true;
    quizError = '';
    quizResult = null;
    renderQuiz();

    try {
        // Note: In a real implementation, you'd need to handle API key securely
        // This is a placeholder - Google GenAI requires server-side implementation for security
        // For demo purposes, we'll simulate a response
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call

        // Mock response
        quizResult = [
            { id: 'LB001', name: 'The Classic Birthday Box', reason: 'Perfect for celebrating with joy and sweetness.' },
            { id: 'LB002', name: 'Pamper Yourself Pouch', reason: 'Ideal for relaxation and self-care.' }
        ];

    } catch (err) {
        console.error("AI suggestion error:", err);
        quizError = "Oops! I had a little trouble thinking of ideas. Please try again.";
    } finally {
        quizLoading = false;
        renderQuiz();
    }
}

// Custom form
function handleCustomSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const style = formData.get('style');
    const occasion = formData.get('occasion');
    const message = formData.get('message');
    const fileCount = formData.getAll('files').length;

    const whatsAppMessage = `Hello Lovely Box, I'd like a custom gift box with the following details:
- Style: ${style || 'Not specified'}
- Occasion: ${occasion || 'Not specified'}
- My Message/Notes: ${message || 'Not specified'}
- Images to share: ${fileCount > 0 ? `${fileCount} image(s)` : 'None'}

Please let me know the next steps!`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsAppMessage)}`;
    window.open(url, '_blank');
}

function updateFileCount(input) {
    // Optional: Update UI to show file count
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setPage('home');
});