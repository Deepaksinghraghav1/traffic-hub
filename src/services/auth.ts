import { account, generateId } from '../lib/appwrite';
import { databaseService } from './database';
import { ID } from 'appwrite';

export const authService = {
    // Create a new user account and its database profile
    async signUp(email: string, password: string, name: string, referralByCode: string = '') {
        try {
            const response = await account.create(ID.unique(), email, password, name);
            
            // Generate a unique referral code for the new user
            const myReferralCode = Math.random().toString(36).substring(2, 8).toUpperCase();
            
            let referredBy = '';
            if (referralByCode) {
                const referrer = await databaseService.getProfileByReferralCode(referralByCode);
                if (referrer) {
                    // Reward the referrer with 100 points
                    await databaseService.updatePoints(referrer.$id, referrer.points + 100);
                    referredBy = referrer.email;
                }
            }

            // Create profile with referral data
            await databaseService.createProfile(response.$id, email, name, myReferralCode, referredBy);
            
            // Automatically sign in
            return await this.signIn(email, password);
        } catch (error: any) {
            console.error('Sign up error:', error);
            throw error;
        }
    },

    // Sign in user
    async signIn(email: string, password: string) {
        try {
            return await account.createEmailPasswordSession(email, password);
        } catch (error: any) {
            console.error('Sign in error:', error);
            throw error;
        }
    },

    // Sign out user
    async signInWithGoogle() {
        try {
            // This will redirect the user to Google login page
            // After login, it will redirect back to your app
            return await account.createOAuth2Session(
                'google' as any, // Cast to any to bypass strict enum if needed
                window.location.origin, // Success redirect
                window.location.origin + '/login' // Failure redirect
            );
        } catch (error) {
            console.error('Google Sign In error:', error);
            throw error;
        }
    },

    async signOut() {
        try {
            await account.deleteSession('current');
        } catch (error: any) {
            console.error('Sign out error:', error);
            throw error;
        }
    },

    // Get current logged in user
    async getCurrentUser() {
        try {
            return await account.get();
        } catch (error: any) {
            return null;
        }
    }
};
