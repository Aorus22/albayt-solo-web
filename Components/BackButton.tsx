import { ArrowLeftIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/navigation';
import React from 'react';

const BackButton = ({link, className}: {link?: string, className?: string}) => {
    const router = useRouter();
    
    const handleClick = () => link ? router.push(link) : router.back();

    return (
        <button onClick={handleClick} className={`bg-[#f14310] ${className} px-4 py-2 rounded-lg duration-200 font-medium text-white tracking-wider flexCenter gap-2 hover:bg-black`}>
            <ArrowLeftIcon width={16} height={16} />
            <p>Kembali</p>
        </button>
    );
};

export default BackButton;
