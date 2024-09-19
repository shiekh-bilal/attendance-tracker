const authForm = document.getElementById('auth-form');
const trackerForm = document.getElementById('tracker-form');
const uploadForm = document.getElementById('upload-form');
const remainingTimeEl = document.getElementById('remaining-time');

let token = '';

function showElement(id) {
    document.getElementById(id).style.display = 'block';
}

function hideElement(id) {
    document.getElementById(id).style.display = 'none';
}

async function signup() {
  console.log(1);

    const email = authForm.email.value;
  console.log(2);

    const password = authForm.password.value;
    console.log(email, password)

    const res = await fetch('/api/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
        alert('User signed up successfully');
    } else {
        alert(data.error);
    }
}

async function signin() {
    console.log(11)
    const email = authForm.email.value;
    const password = authForm.password.value;
    const res = await fetch('/api/user/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
        token = data.token;
        hideElement('auth');
        showElement('tracker');
        showElement('upload');
    } else {
        alert(data.error);
    }
}

async function calculateTime() {
    const checkin = trackerForm.checkin.value;
    const checkout = trackerForm.checkout.value;
    const res = await fetch('/api/attendance/calculate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ checkin, checkout }),
    });
    const data = await res.json();
    if (res.ok) {
        remainingTimeEl.innerText = `Remaining Time: ${data.remainingTime} hours`;
    } else {
        alert(data.error);
    }
}

async function uploadFile() {
    const formData = new FormData(uploadForm);
    const res = await fetch('/api/attendance/upload', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: formData,
    });
    const data = await res.json();
    if (res.ok) {
        alert('File uploaded successfully');
    } else {
        alert(data.error);
    }
}
