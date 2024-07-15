import React from 'react';

const LoadingSpinner = ({ overlay = false }) => {
    return (
        <div style={{height: `100%`}} className={`${overlay ? 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50' : `flex items-center justify-center`}`}>
            <div className="loader"></div>
            <style jsx>{`
                .loader {
                    border: 8px solid #f3f3f3;
                    border-top: 8px solid #f14310;
                    border-radius: 50%;
                    width: 60px;
                    height: 60px;
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default LoadingSpinner;
