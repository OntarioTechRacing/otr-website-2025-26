type SponsorTier = 'diamond' | 'platinum' | 'gold' | 'silver' | 'bronze' | 'general';

interface SponsorCardProps {
  logo: string;
  name: string;
  tier: SponsorTier;
  url?: string;
}

const tierStyles: Record<SponsorTier, { border: string; bg: string; shadow: string }> = {
  diamond: { 
    border: 'border-[#0078ca]', 
    bg: 'bg-gradient-to-br from-[rgb(40,40,45)] to-[rgb(30,30,35)]',
    shadow: 'hover:shadow-[#0078ca]/20'
  },
  platinum: { 
    border: 'border-[#E5E4E2]', 
    bg: 'bg-gradient-to-br from-[rgb(40,40,45)] to-[rgb(30,30,35)]',
    shadow: 'hover:shadow-[#E5E4E2]/20'
  },
  gold: { 
    border: 'border-[#FFD700]', 
    bg: 'bg-gradient-to-br from-[rgb(40,40,45)] to-[rgb(30,30,35)]',
    shadow: 'hover:shadow-[#FFD700]/20'
  },
  silver: { 
    border: 'border-[#C0C0C0]', 
    bg: 'bg-gradient-to-br from-[rgb(40,40,45)] to-[rgb(30,30,35)]',
    shadow: 'hover:shadow-[#C0C0C0]/20'
  },
  bronze: { 
    border: 'border-[#CD7F32]', 
    bg: 'bg-gradient-to-br from-[rgb(40,40,45)] to-[rgb(30,30,35)]',
    shadow: 'hover:shadow-[#CD7F32]/20'
  },
  general: { 
    border: 'border-gray-500', 
    bg: 'bg-gradient-to-br from-[rgb(40,40,45)] to-[rgb(30,30,35)]',
    shadow: 'hover:shadow-gray-500/20'
  },
};

const tierSizes: Record<SponsorTier, string> = {
  diamond: 'w-[280px] md:w-[320px] h-[140px] md:h-[160px]',
  platinum: 'w-[260px] md:w-[300px] h-[130px] md:h-[150px]',
  gold: 'w-[240px] md:w-[280px] h-[120px] md:h-[140px]',
  silver: 'w-[220px] md:w-[260px] h-[110px] md:h-[130px]',
  bronze: 'w-[200px] md:w-[240px] h-[100px] md:h-[120px]',
  general: 'w-[200px] md:w-[240px] h-[100px] md:h-[120px]',
};

export default function SponsorCard({ logo, name, tier, url }: SponsorCardProps) {
  const styles = tierStyles[tier];
  const size = tierSizes[tier];
  
  const cardContent = (
    <div 
      className={`
        p-4 md:p-5 rounded-xl border-2 ${styles.border} ${styles.bg}
        flex items-center justify-center ${size}
        hover:scale-105 hover:-translate-y-2 
        transition-all duration-300 ease-out
        shadow-lg ${styles.shadow} hover:shadow-2xl
        group
      `}
    >
      <img 
        src={logo} 
        alt={name} 
        className="w-full h-full object-contain filter brightness-100 group-hover:brightness-110 transition-all duration-300" 
      />
    </div>
  );

  if (url) {
    return (
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block"
        title={name}
      >
        {cardContent}
      </a>
    );
  }

  return cardContent;
}
