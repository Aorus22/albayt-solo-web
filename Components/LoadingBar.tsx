import React from 'react';
import { LinearProgress} from "@mui/material";

const LoadingBar: React.FC = () => {
    return (
        <div className={"z-[100]"}>
            <LinearProgress color="secondary" />
        </div>
    );
};

export default LoadingBar;
