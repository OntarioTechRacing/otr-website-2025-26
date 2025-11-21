type SponsorTier = 'diamond' | 'platinum' | 'gold' | 'silver' | 'bronze' | 'general';

interface SponsorCardProps {
  logo: string;
  name: string;
  tier: SponsorTier;
  url?: string;
}

const tierColors: Record<SponsorTier, string> = {
  diamond: 'border-[#0078ca]',
  platinum: 'border-[#E5E4E2]',
  gold: 'border-[#FFD700]',
  silver: 'border-[#C0C0C0]', 
  bronze: 'border-[#CD7F32]', 
  general: 'border-gray-400', 
};

export default function SponsorCard({ logo, name, tier, url }: SponsorCardProps) {
  const cardContent = (
    <div className={`p-4 rounded-2xl border-4 ${tierColors[tier]} flex items-center justify-center w-[300px] h-[150px] hover:shadow-2xl hover:scale-105 hover:-translate-y-1 transition-all duration-300 cursor-pointer`}>
      <img src={logo} alt={name} className="w-full h-full object-contain" />
    </div>
  );

  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer">
        {cardContent}
      </a>
    );
  }

  return cardContent;
}