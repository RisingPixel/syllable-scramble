import { Loader2 } from 'lucide-react';

interface AdOverlayProps {
  isVisible: boolean;
}

const AdOverlay = ({ isVisible }: AdOverlayProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center">
      <div className="text-center space-y-6 animate-scale-in">
        <Loader2 className="w-16 h-16 animate-spin mx-auto text-accent" />
        <div className="space-y-2">
          <h2 className="text-3xl font-bold">Advertisement</h2>
          <p className="text-muted-foreground">Please wait...</p>
        </div>
      </div>
    </div>
  );
};

export default AdOverlay;
