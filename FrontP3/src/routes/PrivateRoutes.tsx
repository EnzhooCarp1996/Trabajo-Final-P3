import { Routes, Route } from "react-router-dom";
import { UserProfile } from "../components/UserProfile/UserProfile";
import { CompanyView } from "../components/Company/CompanyView";
import { EntrepreneurView } from "../components/Entrepreneur/EntrepreneurView";
import { ChallengesView } from "../components/Challenge/ChallengesView";
import { ProposalsView } from "../components/Proposal/ProposalsView";
import type { IUser } from "../types/types";

export const PrivateRoutes = ({ user }: { user: IUser }) => {
    return (
        <Routes>
            <Route path="/UserProfile" element={<UserProfile user={user} />} />
            <Route path="/Company" element={<CompanyView />} />
            <Route
                path="/Challenge"
                element={<ChallengesView readOnly showButtonNew={user.role === "emprendedor"} />}
            />
            <Route path="/Challenge/:empresaId" element={<ChallengesView />} />
            <Route path="/Entrepreneur" element={<EntrepreneurView />} />
            <Route
                path="/Proposal"
                element={<ProposalsView titulo="Propuestas" readOnly showButtonNew={user.role === "emprendedor"} />}
            />
            <Route
                path="/Proposal/:entrepreneurId"
                element={<ProposalsView titulo="Mis Propuestas" showButtonNew={user.role === "emprendedor"} />}
            />
        </Routes>
    );
};
