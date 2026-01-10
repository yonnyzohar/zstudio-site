// API service for zStudio
export interface LoginResponse {
    success: boolean;
    token?: string;
    userId?: string;
    error?: string;
}

export interface License {
    id: string;
    name: string;
    status: 'Active' | 'Expired';
    seatsTotal: number;
    expiry: string;
    licenseKey: string;
}

export interface User {
    email: string;
}

const API_BASE = 'http://127.0.0.1:4000';

export const apiLogin = async (email: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await fetch(`${API_BASE}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (data.success) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId);
        }
        return data;
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, error: 'Network error' };
    }
};

export const apiSignup = async (email: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await fetch(`${API_BASE}/create-user`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (data.success) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId);
        }
        return data;
    } catch (error) {
        console.error('Signup error:', error);
        return { success: false, error: 'Network error' };
    }
};

export const apiGenerateLicense = async (userId: string, maxEmails: number, expiryDate: string): Promise<{ success: boolean; licenseKey?: string; id?: string; message?: string }> => {
    try {
        const response = await fetch(`${API_BASE}/generate-license`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId,
                maxEmails,
                expiry_date: expiryDate
            })
        });
        return await response.json();
    } catch (error) {
        console.error('Generate license error:', error);
        return { success: false, message: 'Network error' };
    }
};

export const apiGetLicenses = async (): Promise<License[]> => {
    const userId = localStorage.getItem('userId');
    if (!userId) return [];
    try {
        const response = await fetch(`${API_BASE}/user-licenses?userId=${userId}`);
        const data = await response.json();
        if (data.success) {
            return data.licenses.map((license: any) => ({
                id: license.id.toString(),
                name: license.license_key,
                status: new Date(license.expiry_date) > new Date() ? 'Active' : 'Expired',
                seatsTotal: license.max_emails,
                expiry: license.expiry_date,
                licenseKey: license.license_key || license.id.toString()
            }));
        }
        return [];
    } catch (error) {
        console.error('Get licenses error:', error);
        return [];
    }
};

export const apiValidateEmailLicense = async (email: string): Promise<{ success: boolean }> => {
    try {
        const response = await fetch(`${API_BASE}/validate-email-license`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        return await response.json();
    } catch (error) {
        console.error('Validate email error:', error);
        return { success: false };
    }
};

export const apiAddLicenseEmail = async (licenseKey: string, email: string): Promise<{ success: boolean; message?: string }> => {
    try {
        const response = await fetch(`${API_BASE}/add-license-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ licenseKey, email })
        });
        return await response.json();
    } catch (error) {
        console.error('Add license email error:', error);
        return { success: false, message: 'Network error' };
    }
};

export const apiRemoveLicenseEmail = async (licenseKey: string, email: string): Promise<{ success: boolean; message?: string }> => {
    try {
        const response = await fetch(`${API_BASE}/remove-license-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ licenseKey, email })
        });
        return await response.json();
    } catch (error) {
        console.error('Remove license email error:', error);
        return { success: false, message: 'Network error' };
    }
};

export const apiRevokeLicense = async (licenseKey: string): Promise<{ success: boolean; message?: string }> => {
    try {
        const response = await fetch(`${API_BASE}/revoke-license`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ licenseKey })
        });
        return await response.json();
    } catch (error) {
        console.error('Revoke license error:', error);
        return { success: false, message: 'Network error' };
    }
};

export const apiGetLicenseEmails = async (licenseKey: string): Promise<{ success: boolean; emails?: { email: string; added_at: string }[]; error?: string }> => {
    try {
        const response = await fetch(`${API_BASE}/license-emails?licenseKey=${encodeURIComponent(licenseKey)}`);
        return await response.json();
    } catch (error) {
        console.error('Get license emails error:', error);
        return { success: false, error: 'Network error' };
    }
};

