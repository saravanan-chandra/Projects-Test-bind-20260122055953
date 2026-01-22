// Replace with your Supabase credentials
const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_KEY = 'your-anon-key';

const form = document.getElementById('contactForm');
const messageDiv = document.getElementById('message');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  const submitBtn = form.querySelector('.submit-btn');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Submitting...';

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
      },
      body: JSON.stringify({
        name,
        email,
        message,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to submit form');
    }

    messageDiv.textContent = 'Form submitted successfully!';
    messageDiv.className = 'message success';
    form.reset();

    setTimeout(() => {
      messageDiv.className = 'message';
      messageDiv.textContent = '';
    }, 3000);
  } catch (error) {
    messageDiv.textContent = 'Error: ' + error.message;
    messageDiv.className = 'message error';
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Submit';
  }
});
