import { Achievement } from '@/types/achievements';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';
import { getTierColor } from '@/utils/achievements';
import { cn } from '@/lib/utils';

interface AchievementUnlockProps {
  achievement: Achievement;
}

const AchievementUnlock = ({ achievement }: AchievementUnlockProps) => {
  const { toast } = useToast();

  useEffect(() => {
    toast({
      title: `🎉 ${achievement.name}`,
      description: `${achievement.description} (+${achievement.points} pts)`,
      duration: 4000,
    });
  }, [achievement, toast]);

  return null;
};

export default AchievementUnlock;
