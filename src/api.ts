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
    status: 'active' | 'expired' | 'cacelled';
    seatsTotal: number;
    expiry: string;
    licenseKey: string;
}

export interface User {
    email: string;
}

const API_BASE = 'http://127.0.0.1:4000';

//login and sign up. -get jwt token and user id

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

//need to send jwt token

export const apiGenerateLicense = async (userId: string, licenseType: string, licenseDuration: string): Promise<{ success: boolean; licenseKey?: string; id?: string; message?: string }> => {
    try {
        const response = await fetch(`${API_BASE}/generate-license`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId,
                licenseType,
                licenseDuration
            })
        });
        return await response.json();
    } catch (error) {
        console.error('Generate license error:', error);
        return { success: false, message: 'Network error' };
    }
};

export const getLicenseTypes = async (): Promise<{ success: boolean; seatsMap: Record<string, number>; licenseDurations: string[], message?: string }> => {
    try {
        const response = await fetch(`${API_BASE}/license-types`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        return await response.json();
    } catch (error) {
        console.error('Get license types error:', error);
        return { success: false, message: 'Network error', seatsMap: {}, licenseDurations: [] };
    }
};

export const apiGetLicenses = async (): Promise<License[]> => {
    const userId = localStorage.getItem('userId');
    if (!userId) return [];
    try {
        const response = await fetch(`${API_BASE}/user-licenses?userId=${userId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        const data = await response.json();
        if (data.success) {
            return data.licenses.map((license: any) => ({
                id: license.id.toString(),
                name: license.license_key,
                status: license.status,
                seatsTotal: license.max_emails,
                expiry: license.expiry_date,
                licenseKey: license.license_key
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
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
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
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
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
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ licenseKey, email })
        });
        return await response.json();
    } catch (error) {
        console.error('Remove license email error:', error);
        return { success: false, message: 'Network error' };
    }
};

export const apiCencelLicense = async (licenseKey: string): Promise<{ success: boolean; message?: string }> => {
    try {
        const response = await fetch(`${API_BASE}/cancel-license`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ licenseKey })
        });
        return await response.json();
    } catch (error) {
        console.error('Revoke license error:', error);
        return { success: false, message: 'Network error' };
    }
};

export const apiUnrevokeLicense = async (licenseKey: string): Promise<{ success: boolean; message?: string }> => {
    try {
        const response = await fetch(`${API_BASE}/unrevoke-license`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ licenseKey })
        });
        return await response.json();
    } catch (error) {
        console.error('Unrevoke license error:', error);
        return { success: false, message: 'Network error' };
    }
}

export const apiGetLicenseEmails = async (licenseKey: string): Promise<{ success: boolean; emails?: { email: string; added_at: string }[]; error?: string }> => {
    try {
        const response = await fetch(`${API_BASE}/license-emails?licenseKey=${encodeURIComponent(licenseKey)}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        return await response.json();
    } catch (error) {
        console.error('Get license emails error:', error);
        return { success: false, error: 'Network error' };
    }
};

