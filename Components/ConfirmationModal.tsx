import { useEffect } from "react";

interface ConfirmationModalProps {
    handleKonfirmasi: (confirm: boolean) => void | Promise<void>
    message: string
}

const ConfirmationModal = ({ handleKonfirmasi, message}: ConfirmationModalProps) => {

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-md shadow-md w-[80%] lg:w-[50%]">
                <p className="text-[12px] lg:text-[16px] font-semibold mb-7 text-justify">{message}</p>
                <div className="flex justify-end">
                    <button onClick={() => handleKonfirmasi(true)} className="px-4 py-2 bg-green-700 hover:bg-green-900 text-white rounded-md mr-4 text-[12px] lg:text-[16px]">Ya</button>
                    <button onClick={() => handleKonfirmasi(false)} className="px-4 py-2 bg-red-700 hover:bg-red-900 text-white rounded-md text-[12px] lg:text-[16px]">Tidak</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal