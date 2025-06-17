// components/ui/PageBanner.tsx
interface PageBannerProps {
  title: string;
  imageUrl: string;
  subtitle?: string;
}

export default function PageBanner({
  title,
  imageUrl,
  subtitle,
}: PageBannerProps) {
  return (
    <div className="relative h-64">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-full object-cover brightness-75"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
        <h1 className="text-4xl font-bold">{title}</h1>
        {subtitle && <p className="mt-2 max-w-2xl">{subtitle}</p>}
      </div>
    </div>
  );
}
