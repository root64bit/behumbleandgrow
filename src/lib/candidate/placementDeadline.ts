export interface DeadlineDisplayInfo {
  label: string;
  isOverdue: boolean;
  daysRemaining: number | null;
  formattedDate: string;
}

export function resolveDeadlineDisplay(deadlineIso?: string | null, now: Date = new Date()): DeadlineDisplayInfo {
  if (!deadlineIso) {
    return {
      label: 'No deadline set',
      isOverdue: false,
      daysRemaining: null,
      formattedDate: 'N/A',
    };
  }

  const deadlineDate = new Date(deadlineIso);
  if (isNaN(deadlineDate.getTime())) {
    return {
      label: 'Invalid deadline date',
      isOverdue: false,
      daysRemaining: null,
      formattedDate: 'N/A',
    };
  }

  const diffMs = deadlineDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
  const formattedDate = deadlineDate.toLocaleDateString('en-GB', options);

  if (diffMs < 0) {
    return {
      label: 'Overdue',
      isOverdue: true,
      daysRemaining: diffDays,
      formattedDate,
    };
  }

  if (diffDays === 0) {
    return {
      label: 'Due today',
      isOverdue: false,
      daysRemaining: 0,
      formattedDate,
    };
  }

  if (diffDays === 1) {
    return {
      label: 'Due tomorrow',
      isOverdue: false,
      daysRemaining: 1,
      formattedDate,
    };
  }

  return {
    label: `Due in ${diffDays} days`,
    isOverdue: false,
    daysRemaining: diffDays,
    formattedDate,
  };
}
