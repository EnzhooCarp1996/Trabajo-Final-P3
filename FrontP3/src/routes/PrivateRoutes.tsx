import { Routes, Route } from "react-router-dom";
import { UserProfile } from "../components/UserProfile/UserProfile";
import { CompanyView } from "../components/Company/CompanyView";
import { EntrepreneurView } from "../components/Entrepreneur/EntrepreneurView";
import { ChallengesView } from "../components/Challenge/ChallengesView";
import { ProposalsView } from "../components/Proposal/ProposalsView";
import { ProposalsViewById } from "../components/Proposal/ProposalById/ProposalViewById";
import { ChallengesById } from "../components/Challenge/ChallengeById/ChallengeById";
import { ChallengesViewByEntrepreneurs } from "../components/Challenge/ChallengeViewByEntrepreneurs";
import { ProfileEdit } from "../components/UserProfile/ProfileEdit";

export const PrivateRoutes: React.FC = () => {

    return (
        <Routes>
            <Route path="/UserProfile" element={<UserProfile />} />
            <Route path="/ProfileEdit" element={<ProfileEdit />} />
            <Route path="/Company" element={<CompanyView />} />
            <Route path="/Challenge" element={<ChallengesView />} />
            <Route path="/ChallengesByEntrepreneur" element={<ChallengesViewByEntrepreneurs />} />
            <Route path="/Entrepreneur" element={<EntrepreneurView />} />
            <Route path="/Proposal" element={<ProposalsView />} />
            <Route path="/ChallengeById" element={<ChallengesById />} />
            <Route path="/ProposalById" element={<ProposalsViewById />} />
        </Routes>
    );
};
