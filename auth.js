// auth.js - Skeleton methods for server communication

// Simulate login state with localStorage
const isLoggedIn = () => {
    return localStorage.getItem('loggedIn') === 'true';
};

const setLoggedIn = (status) => {
    localStorage.setItem('loggedIn', status ? 'true' : 'false');
};

const getUserEmail = () => {
    return localStorage.getItem('userEmail') || '';
};

const setUserEmail = (email) => {
    localStorage.setItem('userEmail', email);
};

// Skeleton API methods - to be filled in later

const apiLogin = async (email, password) => {
    const response = await fetch('http://127.0.0.1:4000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (data.success) {
        console.log('Login successful');
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
    }
    return data;
};

const apiSignup = async (email, password) => {

    const response = await fetch('http://127.0.0.1:4000/create-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    // TODO: Implement actual API call to server
    const data = await response.json();
    if (data.success) {
        console.log('Signup successful');
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
    }
    return data;
};

const apiGetLicenses = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) return [];
    const response = await fetch(`http://127.0.0.1:4000/user-licenses?userId=${userId}`, {
        headers: { 'x-api-key': 'b158dc9a19bae0f140e4990e2b199c8ad85aa67349b98188c76fcc8467bb90ec' }
    });
    const data = await response.json();
    if (data.success) {
        return data.licenses.map(license => ({
            id: license.id,
            name: `License ${license.id}`,
            status: new Date(license.expiry_date) > new Date() ? 'Active' : 'Expired',
            seatsTotal: license.maxEmails,
            expiry: license.expiry_date
        }));
    }
    return [];
};

const apiValidateEmailLicense = async (email) => {
    const response = await fetch('http://127.0.0.1:4000/validate-email-license', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    });
    const data = await response.json();
    return data;
};

const apiAddLicenseEmail = async (licenseKey, email) => {
    const response = await fetch('http://127.0.0.1:4000/add-license-email', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'x-api-key': 'b158dc9a19bae0f140e4990e2b199c8ad85aa67349b98188c76fcc8467bb90ec'
        },
        body: JSON.stringify({ licenseKey, email })
    });
    const data = await response.json();
    return data;
};

const apiRemoveLicenseEmail = async (licenseKey, email) => {
    const response = await fetch('http://127.0.0.1:4000/remove-license-email', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'x-api-key': 'b158dc9a19bae0f140e4990e2b199c8ad85aa67349b98188c76fcc8467bb90ec'
        },
        body: JSON.stringify({ licenseKey, email })
    });
    const data = await response.json();
    return data;
};

const apiRevokeLicense = async (licenseKey) => {
    const response = await fetch('http://127.0.0.1:4000/revoke-license', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'x-api-key': 'b158dc9a19bae0f140e4990e2b199c8ad85aa67349b98188c76fcc8467bb90ec'
        },
        body: JSON.stringify({ licenseKey })
    });
    const data = await response.json();
    return data;
};

const apiGenerateLicense = async (userId, maxEmails, expiryDate) => {
    const response = await fetch('http://127.0.0.1:4000/generate-license', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'x-api-key': 'b158dc9a19bae0f140e4990e2b199c8ad85aa67349b98188c76fcc8467bb90ec'
        },
        body: JSON.stringify({ userId, maxEmails, expiry_date: expiryDate })
    });
    const data = await response.json();
    return data;
};

const apiLogout = async () => {
    // TODO: Implement actual API call to logout
    console.log('Logging out');
    return { success: true };
};

// Export for use in other scripts
window.Auth = {
    isLoggedIn,
    setLoggedIn,
    getUserEmail,
    setUserEmail,
    apiLogin,
    apiSignup,
    apiGetLicenses,
    apiLogout,
    apiValidateEmailLicense,
    apiAddLicenseEmail,
    apiRemoveLicenseEmail,
    apiRevokeLicense,
    apiGenerateLicense
};