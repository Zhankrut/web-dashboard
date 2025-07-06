import React, { useState } from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';

const CustomUserProfile = () => {
    const { user, isLoaded } = useUser();
    const { signOut } = useClerk();

    const [fullName, setFullName] = useState(user?.fullName || '');
    const [imageUrl, setImageUrl] = useState(user?.imageUrl);
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    if (!isLoaded) return <div>Loading...</div>;

    const handleNameChange = async () => {
        try {
            setLoading(true);
            await user.update({ fullName });
            setSuccessMsg('Name updated successfully');
        } catch (err) {
            console.error(err);
            setErrorMsg('Failed to update name');
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setLoading(true);
            await user.setProfileImage({ file });
            await user.reload();
            setImageUrl(user.imageUrl); // refresh image
            setSuccessMsg('Profile picture updated!');
        } catch (err) {
            console.error(err);
            setErrorMsg('Failed to upload image');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        if (!confirm('Are you sure you want to delete your account? This action is permanent.')) return;
        try {
            setLoading(true);
            await user.delete();
        } catch (err) {
            console.error(err);
            setErrorMsg('Failed to delete account');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-white shadow-xl rounded-2xl p-6 border border-gray-200 space-y-4">
            <div className="flex items-center space-x-4">
                <img
                    src={imageUrl}
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover border-2 border-indigo-500"
                />
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Update Profile Picture
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="mt-1 text-sm"
                        />
                    </label>
                </div>
            </div>

            <div className="space-y-2">
                <label className="block">
                    <span className="text-gray-700 font-medium">Full Name</span>
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </label>
                <button
                    onClick={handleNameChange}
                    disabled={loading}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                    Save Changes
                </button>
            </div>

            <div className="text-sm text-gray-600">
                <p>
                    <span className="font-semibold">Email:</span>{' '}
                    {user.emailAddresses[0]?.emailAddress}
                </p>
                <p>
                    <span className="font-semibold">User ID:</span> {user.id}
                </p>
                <p>
                    <span className="font-semibold">Created:</span>{' '}
                    {new Date(user.createdAt).toLocaleString()}
                </p>
            </div>

            <div className="flex flex-col gap-3">
                <button
                    onClick={handleDeleteAccount}
                    disabled={loading}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                >
                    Delete Account
                </button>

                <button
                    onClick={() => signOut()}
                    className="border border-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-100"
                >
                    Sign Out
                </button>
            </div>

            {successMsg && (
                <div className="text-green-600 text-sm font-medium">{successMsg}</div>
            )}
            {errorMsg && (
                <div className="text-red-600 text-sm font-medium">{errorMsg}</div>
            )}
        </div>
    );
};

export default CustomUserProfile;
