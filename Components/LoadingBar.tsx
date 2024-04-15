import React from 'react';
import { LinearProgress} from "@mui/material";

const LoadingBar: React.FC = () => {
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999 }}>
            <LinearProgress color="secondary" />
        </div>
    );
};

export default LoadingBar;
