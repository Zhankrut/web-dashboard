import { SignOutButton } from '@clerk/clerk-react'
import React from 'react'

function Settings() {
    return (
        <div>Settings
            <div>
                <SignOutButton>
                    <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                        Sign Out
                    </button>
                </SignOutButton>
            </div>
        </div>
    )
}

export default Settings