import { Routes, Route } from "react-router-dom";
import { UserProfile } from "../components/UserProfile/UserProfile";
import { CompanyView } from "../components/Company/CompanyView";
import { EntrepreneurView } from "../components/Entrepreneur/EntrepreneurView";
import { ChallengesView } from "../components/Challenge/ChallengesView";
import { ProposalsView } from "../components/Proposal/ProposalsView";
import { ProposalsViewById } from "../components/Proposal/ProposalById/ProposalViewById";
import { ChallengesByProfile } from "../components/Challenge/ChallengeToCompany/ChallengeByProfile";
import { ChallengesToEntrepreneurs } from "../components/Challenge/ChallengeToEntrepreneur/ChallengeToEntrepreneurs";
import { ProfileEdit } from "../components/UserProfile/ProfileEdit";
import { ProposalsByChallenge } from "../components/Challenge/ChallengeToEntrepreneur/ProposalsByChallenge";
import { ProposalsByEntrepreneur } from "../components/Proposal/ProposalById/ProposalsByEntrepreneur";
import { ProposalsToEditing } from "../components/Proposal/ProposalById/ProposalsToEditing";
import { ChallengeTable } from "../components/Challenge/ChallengeTable";

export const PrivateRoutes: React.FC = () => {

    return (
        <Routes>
            <Route path="/UserProfile" element={<UserProfile />} />
            <Route path="/ProfileEdit" element={<ProfileEdit />} />
            <Route path="/Company" element={<CompanyView />} />
            <Route path="/Challenge" element={<ChallengesView />} />
            <Route path="/ChallengesByEntrepreneur" element={<ChallengesToEntrepreneurs />} />
            <Route path="/Entrepreneur" element={<EntrepreneurView />} />
            <Route path="/Proposal" element={<ProposalsView />} />
            <Route path="/ChallengeById" element={<ChallengesByProfile />} />
            <Route path="/ProposalById" element={<ProposalsViewById />} />
            <Route path="/proposals/challenge/:id" element={<ProposalsByChallenge />} />
            <Route path="/proposals/entrepreneur/:id" element={<ProposalsByEntrepreneur />} />
            <Route path="/challenges" element={<ChallengesByProfile />} />
            <Route path="/ProposalsEditing/:id" element={<ProposalsToEditing />} />
            <Route path="/ChallengesByCompany/:id" element={<ChallengeTable />} />

            {/* <Route path="/challenges/:challengeId/entrepreneur/:entrepreneurId"element={<ProposalsByEntrepreneur />} /> */}
        </Routes>
    );
};
