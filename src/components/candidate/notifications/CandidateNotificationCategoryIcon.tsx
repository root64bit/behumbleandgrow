import React from 'react';
import {
  Briefcase,
  FileCheck,
  Calendar,
  Award,
  Plane,
  User,
  MessageSquare,
  Shield,
  Info,
} from 'lucide-react';
import { CandidateNotificationCategory } from '../../../lib/candidate/notificationCategory';

interface CandidateNotificationCategoryIconProps {
  category: CandidateNotificationCategory;
  className?: string;
}

export function CandidateNotificationCategoryIcon({
  category,
  className = 'w-5 h-5',
}: CandidateNotificationCategoryIconProps) {
  switch (category) {
    case 'application':
      return <Briefcase className={className} />;
    case 'document':
      return <FileCheck className={className} />;
    case 'interview':
      return <Calendar className={className} />;
    case 'offer':
      return <Award className={className} />;
    case 'placement':
      return <Plane className={className} />;
    case 'profile':
      return <User className={className} />;
    case 'support':
      return <MessageSquare className={className} />;
    case 'account':
      return <Shield className={className} />;
    case 'system':
    default:
      return <Info className={className} />;
  }
}
