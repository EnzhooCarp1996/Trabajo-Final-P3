import { Routes, Route } from "react-router-dom";
import { UserProfile } from "../components/UserProfile/UserProfile";
import { CompanyView } from "../components/Company/CompanyView";
import { EntrepreneurView } from "../components/Entrepreneur/EntrepreneurView";
import { ChallengesView } from "../components/Challenge/ChallengesView";
import { ProposalsView } from "../components/Proposal/ProposalsView";
import { useAuth } from "../context/Auth/useAuth";

export const PrivateRoutes: React.FC = () => {
    const { role } = useAuth();

    return (
        <Routes>
            <Route path="/UserProfile" element={<UserProfile />} />
            <Route path="/Company" element={<CompanyView />} />
            <Route path="/Challenge" element={<ChallengesView readOnly showButtonNew={role === "emprendedor"} />} />
            <Route path="/Entrepreneur" element={<EntrepreneurView />} />
            <Route path="/Proposal" element={<ProposalsView titulo="Propuestas" readOnly />} />
            <Route path="/Challenge/:empresaId" element={<ChallengesView />} />
            <Route path="/Proposal/:entrepreneurId" element={<ProposalsView titulo="Mis Propuestas" />} />
        </Routes>
    );
};
