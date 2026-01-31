export interface UserProfile {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    profilePicture?: string;
    bio?: string;
    location?: string;
    company?: string;
    website?: string;
    socialLinks?: {
        twitter?: string;
        linkedin?: string;
        github?: string;
    };
    kyc_status: 'pending' | 'verified' | 'rejected';
    subscription_tier: 'free' | 'basic' | 'premium' | 'enterprise';
    created_at: string;
}
