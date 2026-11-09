// API service for zStudio
export interface LoginResponse {
    success: boolean;
    token?: string;
    userId?: string;
    error?: string;
}

export interface User {
    email: string;
}

//'https://zstudiolicenseserver-staging.onrender.com';//
const API_BASE = 'https://zstudiolicenseserver.onrender.com';//'http://127.0.0.1:4000'; | 'https://zstudiolicenseserver.onrender.com'


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
        const response = await fetch(`${API_BASE}/register`, {
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

export const apiForgotPassword = async (email: string): Promise<{ success: boolean; message?: string; rateLimited?: boolean }> => {
    try {
        const response = await fetch(`${API_BASE}/forgot-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        if (response.status === 429) {
            return { success: false, rateLimited: true, message: 'Too many attempts. Please wait a few minutes and try again.' };
        }
        return await response.json();
    } catch (error) {
        console.error('Forgot password error:', error);
        return { success: false, message: 'Network error' };
    }
};

export const apiResetPassword = async (token: string, newPassword: string): Promise<{ success: boolean; message?: string }> => {
    try {
        const response = await fetch(`${API_BASE}/reset-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, newPassword })
        });
        if (response.status === 429) {
            return { success: false, message: 'Too many attempts. Please wait a few minutes and try again.' };
        }
        const data = await response.json();
        return { success: data.success, message: data.message || data.error };
    } catch (error) {
        console.error('Reset password error:', error);
        return { success: false, message: 'Network error' };
    }
};

// ─── AI Credits ───────────────────────────────────────────────────────────────

export interface CreditPack {
    id: string;
    credits: number;
    priceUsdCents: number;
    label: string;
}

export interface CreditModelInfo {
    name: string;
    modelId: string;
    credits: number;
}

export const apiGetCreditsBalance = async (): Promise<{ success: boolean; credits?: number; error?: string; unauthorized?: boolean }> => {
    try {
        const response = await fetch(`${API_BASE}/credits/balance`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (response.status === 401) return { success: false, unauthorized: true, error: 'Session expired' };
        const data = await response.json();
        return { success: data.success, credits: data.balance, error: data.error };
    } catch (error) {
        console.error('Get credits balance error:', error);
        return { success: false, error: 'Network error' };
    }
};

export const apiGetCreditPacks = async (): Promise<{ success: boolean; packs?: CreditPack[]; error?: string }> => {
    try {
        const response = await fetch(`${API_BASE}/credits/packs`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        return await response.json();
    } catch (error) {
        console.error('Get credit packs error:', error);
        return { success: false, error: 'Network error' };
    }
};

export interface ChatModelInfo {
    modelId: string;
    label: string;
    provider: string;
    inputCreditsPerMillion: number;
    outputCreditsPerMillion: number;
    typicalStepCredits: number;
}

export const apiGetChatModels = async (): Promise<{ success: boolean; models?: ChatModelInfo[]; defaultModelId?: string; error?: string }> => {
    try {
        const response = await fetch(`${API_BASE}/mcp-chat/models`);
        return await response.json();
    } catch (error) {
        console.error('Get chat models error:', error);
        return { success: false, error: 'Network error' };
    }
};

export const apiGetCreditModels = async (): Promise<{ success: boolean; models?: CreditModelInfo[]; transparentBackgroundCredits?: number; error?: string }> => {
    try {
        const response = await fetch(`${API_BASE}/credits/models`);
        return await response.json();
    } catch (error) {
        console.error('Get credit models error:', error);
        return { success: false, error: 'Network error' };
    }
};

export const apiPurchaseCreditsCheckout = async (packId: string): Promise<{ success: boolean; url?: string; error?: string }> => {
    try {
        const response = await fetch(`${API_BASE}/credits/purchase-checkout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ packId })
        });
        return await response.json();
    } catch (error) {
        console.error('Purchase credits checkout error:', error);
        return { success: false, error: 'Network error' };
    }
};

export const apiDeleteAccount = async (password: string): Promise<{ success: boolean; message?: string; error?: string }> => {
    try {
        const response = await fetch(`${API_BASE}/delete-account`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ password })
        });
        return await response.json();
    } catch (error) {
        console.error('Delete account error:', error);
        return { success: false, error: 'Network error' };
    }
};

export const apiChangePassword = async (oldPassword: string, newPassword: string): Promise<{ success: boolean; error?: string }> => {
    try {
        const response = await fetch(`${API_BASE}/change-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ oldPassword, newPassword })
        });
        return await response.json();
    } catch (error) {
        console.error('Change password error:', error);
        return { success: false, error: 'Network error' };
    }
};

