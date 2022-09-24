import { createContext } from "react";
import { Feature } from "../../interfaces/llocs";

interface LLocsContextProps {
    isLoading: boolean;
    userLocation?: [ number, number ];
    isLoadingLlocs: boolean;
    llocs: Feature[];
    // Metodes
    cercarLlocsPerNom: (query: string) => Promise<Feature[]>;
}

export const LlocsContext = createContext({} as LLocsContextProps );