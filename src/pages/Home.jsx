import React from 'react'
import vulnerabilityScan from '../assets/Images/vulnerabilityScan.avif'

export const Home = () => {
    return (
        <div className="mx-10 my-3 flex flex-wrap gap-8">
            <div className="relative group  h-80 bg-black overflow-hidden rounded-lg shadow-lg cursor-pointer transition-transform duration-300 hover:scale-105 outline-4">
                <img
                    src={vulnerabilityScan}
                    alt="Vulnerability scan preview"
                    className="absolute inset-0 w-full h-full object-cover opacity-70 transition-opacity duration-300 group-hover:opacity-40"
                />
                <div className="relative z-10 flex flex-col justify-end h-full p-6 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                    <h3 className="text-white text-2xl font-semibold mb-2">Vulnerability Scan</h3>
                    <p className="text-white text-sm max-h-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:max-h-40">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis perferendis hic asperiores quibusdam quidem voluptates doloremque reiciendis nostrum harum.
                    </p>
                </div>
            </div>
            <div className="relative group w-80 h-80 bg-black overflow-hidden rounded-lg shadow-lg cursor-pointer transition-transform duration-300 hover:scale-105">
                <img
                    src={vulnerabilityScan}
                    alt="Vulnerability scan preview"
                    className="absolute inset-0 w-full h-full object-cover opacity-70 transition-opacity duration-300 group-hover:opacity-40"
                />
                <div className="relative z-10 flex flex-col justify-end h-full p-6 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                    <h3 className="text-white text-2xl font-semibold mb-2">Vulnerability Scan</h3>
                    <p className="text-white text-sm max-h-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:max-h-40">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis perferendis hic asperiores quibusdam quidem voluptates doloremque reiciendis nostrum harum.
                    </p>
                </div>
            </div>
            <div className="relative group w-80 h-80 bg-black overflow-hidden rounded-lg shadow-lg cursor-pointer transition-transform duration-300 hover:scale-105">
                <img
                    src={vulnerabilityScan}
                    alt="Vulnerability scan preview"
                    className="absolute inset-0 w-full h-full object-cover opacity-70 transition-opacity duration-300 group-hover:opacity-40"
                />
                <div className="relative z-10 flex flex-col justify-end h-full p-6 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                    <h3 className="text-white text-2xl font-semibold mb-2">Vulnerability Scan</h3>
                    <p className="text-white text-sm max-h-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:max-h-40">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis perferendis hic asperiores quibusdam quidem voluptates doloremque reiciendis nostrum harum.
                    </p>
                </div>
            </div>
            <div className="relative group w-80 h-80 bg-black overflow-hidden rounded-lg shadow-lg cursor-pointer transition-transform duration-300 hover:scale-105">
                <img
                    src={vulnerabilityScan}
                    alt="Vulnerability scan preview"
                    className="absolute inset-0 w-full h-full object-cover opacity-70 transition-opacity duration-300 group-hover:opacity-40"
                />
                <div className="relative z-10 flex flex-col justify-end h-full p-6 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                    <h3 className="text-white text-2xl font-semibold mb-2">Vulnerability Scan</h3>
                    <p className="text-white text-sm max-h-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:max-h-40">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis perferendis hic asperiores quibusdam quidem voluptates doloremque reiciendis nostrum harum.
                    </p>
                </div>
            </div>

        </div>
    )
}
