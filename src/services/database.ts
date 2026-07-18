import { databases, APPWRITE_DATABASE_ID, APPWRITE_PROFILES_COLLECTION_ID, APPWRITE_CAMPAIGNS_COLLECTION_ID, APPWRITE_CLICKS_COLLECTION_ID } from '../lib/appwrite';
import { Query, ID } from 'appwrite';

export const databaseService = {
    // --- Profile Methods ---
    async getProfile(email: string) {
        try {
            const response = await databases.listDocuments(
                APPWRITE_DATABASE_ID,
                APPWRITE_PROFILES_COLLECTION_ID,
                [Query.equal('email', email)]
            );
            return response.documents[0] || null;
        } catch (error) {
            console.error('Error fetching profile:', error);
            throw error;
        }
    },

    async getProfileById(userId: string) {
        try {
            return await databases.getDocument(
                APPWRITE_DATABASE_ID,
                APPWRITE_PROFILES_COLLECTION_ID,
                userId
            );
        } catch (error) {
            console.error('Error fetching profile by ID:', error);
            return null;
        }
    },

    async createProfile(userId: string, email: string, name: string, referralCode: string, referredBy: string = '') {
        try {
            return await databases.createDocument(
                APPWRITE_DATABASE_ID,
                APPWRITE_PROFILES_COLLECTION_ID,
                userId,
                {
                    email,
                    name,
                    points: referredBy ? 50 : 0, // Bonus 50 for new user if referred
                    role: email === 'deepak246124@gmail.com' ? 'admin' : 'user',
                    referralCode,
                    referredBy,
                    plan: 'free',
                    lastDailyClaim: '',
                    isVIP: false
                }
            );
        } catch (error) {
            console.error('Error creating profile:', error);
            throw error;
        }
    },

    async getProfileByReferralCode(code: string) {
        try {
            const response = await databases.listDocuments(
                APPWRITE_DATABASE_ID,
                APPWRITE_PROFILES_COLLECTION_ID,
                [Query.equal('referralCode', code)]
            );
            return response.documents[0] || null;
        } catch (error) {
            console.error('Error fetching referrer:', error);
            return null;
        }
    },

    async updatePoints(documentId: string, newPoints: number) {
        try {
            return await databases.updateDocument(
                APPWRITE_DATABASE_ID,
                APPWRITE_PROFILES_COLLECTION_ID,
                documentId,
                {
                    points: newPoints
                }
            );
        } catch (error) {
            console.error('Error updating points:', error);
            throw error;
        }
    },

    async updatePlan(documentId: string, plan: string) {
        try {
            return await databases.updateDocument(
                APPWRITE_DATABASE_ID,
                APPWRITE_PROFILES_COLLECTION_ID,
                documentId,
                {
                    plan
                }
            );
        } catch (error) {
            console.error('Error updating plan:', error);
            throw error;
        }
    },

    async claimDailyBonus(documentId: string, currentPoints: number) {
        try {
            const profile = await databases.getDocument(
                APPWRITE_DATABASE_ID,
                APPWRITE_PROFILES_COLLECTION_ID,
                documentId
            );
            const lastClaim = profile.lastDailyClaim;

            if (lastClaim) {
                const lastClaimDate = new Date(lastClaim).toDateString();
                const today = new Date().toDateString();

                if (lastClaimDate === today) {
                    throw new Error("You have already claimed your Daily Bonus today!");
                }
            }

            return await databases.updateDocument(
                APPWRITE_DATABASE_ID,
                APPWRITE_PROFILES_COLLECTION_ID,
                documentId,
                {
                    points: currentPoints + 100,
                    lastDailyClaim: new Date().toISOString()
                }
            );
        } catch (error) {
            console.error('Error claiming daily bonus:', error);
            throw error;
        }
    },

    async updateVIPStatus(documentId: string, isVIP: boolean) {
        try {
            return await databases.updateDocument(
                APPWRITE_DATABASE_ID,
                APPWRITE_PROFILES_COLLECTION_ID,
                documentId,
                {
                    isVIP
                }
            );
        } catch (error) {
            console.error('Error updating VIP status:', error);
            throw error;
        }
    },

    // --- Campaign Methods ---
    async createCampaign(data: {
        userId: string;
        url: string;
        title: string;
        pointsAllocated: number;
    }) {
        try {
            return await databases.createDocument(
                APPWRITE_DATABASE_ID,
                APPWRITE_CAMPAIGNS_COLLECTION_ID,
                ID.unique(),
                {
                    ...data,
                    pointsRemaining: data.pointsAllocated,
                    status: 'active',
                    clicks: 0
                }
            );
        } catch (error) {
            console.error('Error creating campaign:', error);
            throw error;
        }
    },

    async getUserCampaigns(userId: string) {
        try {
            const response = await databases.listDocuments(
                APPWRITE_DATABASE_ID,
                APPWRITE_CAMPAIGNS_COLLECTION_ID,
                [Query.equal('userId', userId)]
            );
            return response.documents;
        } catch (error) {
            console.error('Error fetching user campaigns:', error);
            throw error;
        }
    },

    async getAllCampaigns() {
        try {
            const response = await databases.listDocuments(
                APPWRITE_DATABASE_ID,
                APPWRITE_CAMPAIGNS_COLLECTION_ID
            );
            return response.documents;
        } catch (error) {
            console.error('Error fetching all campaigns:', error);
            throw error;
        }
    },

    async updateCampaignStatus(documentId: string, status: 'active' | 'rejected') {
        try {
            return await databases.updateDocument(
                APPWRITE_DATABASE_ID,
                APPWRITE_CAMPAIGNS_COLLECTION_ID,
                documentId,
                { status }
            );
        } catch (error) {
            console.error('Error updating campaign status:', error);
            throw error;
        }
    },

    async updateCampaignProgress(documentId: string, pointsRemaining: number, clicks: number) {
        try {
            return await databases.updateDocument(
                APPWRITE_DATABASE_ID,
                APPWRITE_CAMPAIGNS_COLLECTION_ID,
                documentId,
                {
                    pointsRemaining,
                    clicks
                }
            );
        } catch (error) {
            console.error('Error updating campaign progress:', error);
            throw error;
        }
    },

    async deleteCampaign(documentId: string) {
        try {
            return await databases.deleteDocument(
                APPWRITE_DATABASE_ID,
                APPWRITE_CAMPAIGNS_COLLECTION_ID,
                documentId
            );
        } catch (error) {
            console.error('Error deleting campaign:', error);
            throw error;
        }
    },

    // --- Click Tracking Methods ---
    async logClick(userId: string, campaignId: string, statusSuffix: 'initiated' | 'completed' = 'completed') {
        try {
            return await databases.createDocument(
                APPWRITE_DATABASE_ID,
                APPWRITE_CLICKS_COLLECTION_ID,
                ID.unique(),
                {
                    userId,
                    campaignId,
                    timestamp: `${new Date().toISOString()}|${statusSuffix}`
                }
            );
        } catch (error) {
            console.error('Error logging click:', error);
            throw error;
        }
    },

    async completeClick(documentId: string, rewardPoints: number) {
        try {
            return await databases.updateDocument(
                APPWRITE_DATABASE_ID,
                APPWRITE_CLICKS_COLLECTION_ID,
                documentId,
                {
                    timestamp: `${new Date().toISOString()}|completed|${rewardPoints}`
                }
            );
        } catch (error) {
            console.error('Error completing click:', error);
            throw error;
        }
    },

    async getClickById(clickId: string) {
        try {
            return await databases.getDocument(
                APPWRITE_DATABASE_ID,
                APPWRITE_CLICKS_COLLECTION_ID,
                clickId
            );
        } catch (error) {
            console.error('Error fetching click by ID:', error);
            throw error;
        }
    },

    async hasClickedToday(userId: string, campaignId: string) {
        try {
            // Get today's date in YYYY-MM-DD
            const today = new Date().toISOString().split('T')[0];

            const response = await databases.listDocuments(
                APPWRITE_DATABASE_ID,
                APPWRITE_CLICKS_COLLECTION_ID,
                [
                    Query.equal('userId', userId),
                    Query.equal('campaignId', campaignId),
                    Query.startsWith('timestamp', today)
                ]
            );
            // Only count as completed if it doesn't end with '|initiated'
            return response.documents.some(doc => !doc.timestamp.endsWith('|initiated'));
        } catch (error) {
            console.error('Error checking click history:', error);
            return false;
        }
    },

    async getCampaignById(campaignId: string) {
        try {
            return await databases.getDocument(
                APPWRITE_DATABASE_ID,
                APPWRITE_CAMPAIGNS_COLLECTION_ID,
                campaignId
            );
        } catch (error) {
            console.error('Error fetching campaign by ID:', error);
            return null;
        }
    },

    async getRecentClicks(limit: number = 5) {
        try {
            const response = await databases.listDocuments(
                APPWRITE_DATABASE_ID,
                APPWRITE_CLICKS_COLLECTION_ID,
                [
                    Query.orderDesc('timestamp'),
                    Query.limit(limit * 2) // Fetch double the amount to account for initiated clicks
                ]
            );
            return response.documents
                .filter((d: any) => !d.timestamp.endsWith('|initiated'))
                .slice(0, limit);
        } catch (error) {
            console.error('Error fetching recent clicks:', error);
            return [];
        }
    },

    async getTodayClicksCount(userId: string) {
        try {
            const today = new Date().toISOString().split('T')[0];
            const response = await databases.listDocuments(
                APPWRITE_DATABASE_ID,
                APPWRITE_CLICKS_COLLECTION_ID,
                [
                    Query.equal('userId', userId),
                    Query.startsWith('timestamp', today),
                    Query.limit(100) // Increase limit to fetch all today's clicks and filter
                ]
            );
            return response.documents.filter((d: any) => !d.timestamp.endsWith('|initiated')).length;
        } catch (error) {
            console.error('Error fetching today clicks count:', error);
            return 0;
        }
    },

    async getTodayClickedCampaignIds(userId: string) {
        try {
            const today = new Date().toISOString().split('T')[0];
            const response = await databases.listDocuments(
                APPWRITE_DATABASE_ID,
                APPWRITE_CLICKS_COLLECTION_ID,
                [
                    Query.equal('userId', userId),
                    Query.startsWith('timestamp', today),
                    Query.limit(100)
                ]
            );
            return response.documents
                .filter((d: any) => !d.timestamp.endsWith('|initiated'))
                .map((d: any) => d.campaignId);
        } catch (error) {
            console.error('Error fetching today clicked campaigns:', error);
            return [];
        }
    },

    async getCampaignCompletedClicksCount(campaignId: string) {
        try {
            const response = await databases.listDocuments(
                APPWRITE_DATABASE_ID,
                APPWRITE_CLICKS_COLLECTION_ID,
                [
                    Query.equal('campaignId', campaignId),
                    Query.limit(1000) // Support counting up to 1000 completed clicks safely
                ]
            );
            return response.documents.filter((d: any) => !d.timestamp.endsWith('|initiated')).length;
        } catch (error) {
            console.error('Error counting campaign completed clicks:', error);
            throw error;
        }
    },

    async getCampaignPointsSpent(campaignId: string) {
        try {
            const response = await databases.listDocuments(
                APPWRITE_DATABASE_ID,
                APPWRITE_CLICKS_COLLECTION_ID,
                [
                    Query.equal('campaignId', campaignId),
                    Query.limit(1000) // Support counting up to 1000 completed clicks safely
                ]
            );
            
            const completedClicks = response.documents.filter((d: any) => !d.timestamp.endsWith('|initiated'));
            const totalPointsSpent = completedClicks.reduce((sum, d) => {
                const parts = d.timestamp.split('|');
                const pts = parts[2] ? parseInt(parts[2], 10) : 10; // Default to 10 for legacy completed clicks
                return sum + pts;
            }, 0);
            
            return {
                pointsSpent: totalPointsSpent,
                clicksCount: completedClicks.length,
                completedClicksDocs: completedClicks
            };
        } catch (error) {
            console.error('Error calculating campaign points spent:', error);
            throw error;
        }
    },

    async getCampaignClicks(campaignIds: string[], limit: number = 200) {
        try {
            const response = await databases.listDocuments(
                APPWRITE_DATABASE_ID,
                APPWRITE_CLICKS_COLLECTION_ID,
                [
                    Query.equal('campaignId', campaignIds),
                    Query.limit(limit)
                ]
            );
            return response.documents.filter((d: any) => !d.timestamp.endsWith('|initiated'));
        } catch (error) {
            console.error('Error fetching campaign clicks:', error);
            return [];
        }
    }
};
