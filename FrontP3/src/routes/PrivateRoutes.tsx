import { ChallengesToEntrepreneurs } from '../components/Challenge/ChallengeToEntrepreneur/ChallengeToEntrepreneurs'
import { ProposalsByChallenge } from '../components/Challenge/ChallengeToEntrepreneur/ProposalsByChallenge'
import { ProposalsByEntrepreneur } from '../components/Proposal/ProposalById/ProposalsByEntrepreneur'
import { ChallengesByProfile } from '../components/Challenge/ChallengeToCompany/ChallengeByProfile'
import { ProposalsToEditing } from '../components/Proposal/ProposalById/ProposalsToEditing'
import { ProposalsViewById } from '../components/Proposal/ProposalById/ProposalViewById'
import { ChallengesByCompanyId } from '../components/Challenge/ChallengesByCompanyId'
import { EntrepreneurView } from '../components/Entrepreneur/EntrepreneurView'
import { EntrepreneurPage } from '../components/Entrepreneur/EntrepreneurPage'
import { ProposalsView } from '../components/Proposal/ProposalsView'
import { UserProfile } from '../components/UserProfile/UserProfile'
import { ProfileEdit } from '../components/UserProfile/ProfileEdit'
import { CompanyView } from '../components/Company/CompanyView'
import { Routes, Route } from 'react-router-dom'

export const PrivateRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/UserProfile" element={<UserProfile />} />
      <Route path="/ProfileEdit" element={<ProfileEdit />} />
      <Route path="/Company" element={<CompanyView />} />
      <Route path="/ChallengesByEntrepreneur" element={<ChallengesToEntrepreneurs />} />
      <Route path="/Entrepreneur" element={<EntrepreneurView />} />
      <Route path="/Proposal" element={<ProposalsView />} />
      <Route path="/ChallengeById" element={<ChallengesByProfile />} />
      <Route path="/ProposalById" element={<ProposalsViewById />} />
      <Route path="/proposals/challenge/:id" element={<ProposalsByChallenge />} />
      <Route path="/proposals/entrepreneur/:id" element={<ProposalsByEntrepreneur />} />
      <Route path="/challenges" element={<ChallengesByProfile />} />
      <Route path="/ProposalsEditing/:id" element={<ProposalsToEditing />} />
      <Route path="/ChallengesByCompany/:id" element={<ChallengesByCompanyId />} />
      <Route path="/perfil/:id" element={<EntrepreneurPage />} />
    </Routes>
  )
}
