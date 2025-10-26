type SponsorTier = 'diamond' | 'platinum' | 'gold' | 'silver' | 'bronze' | 'general';

interface SponsorCardProps {
  logo: string;
  name: string;
  tier: SponsorTier;
}

const tierColors: Record<SponsorTier, string> = {
  diamond: 'border-[#0078ca]',
  platinum: 'border-[#E5E4E2]',
  gold: 'border-[#FFD700]',
  silver: 'border-[#C0C0C0]', 
  bronze: 'border-[#CD7F32]', 
  general: 'border-gray-400', 
};

export default function SponsorCard({ logo, name, tier }: SponsorCardProps) {
  return (
    <div className={`p-4 rounded-2xl border-4 ${tierColors[tier]} flex items-center justify-center w-[300px] h-[150px] hover:shadow-xl transition-shadow`}>
      <img src={logo} alt={name} className="w-full h-full object-contain" />
    </div>
  );
}