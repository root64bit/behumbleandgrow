export type JoinAccessState =
  | 'not_confirmed'
  | 'available_soon'
  | 'available_now'
  | 'access_closed'
  | 'cancelled';

export interface JoinWindowInfo {
  state: JoinAccessState;
  label: string;
  canClick: boolean;
  minutesUntilOpen?: number;
}

const PRE_INTERVIEW_WINDOW_MINUTES = 15;
const POST_INTERVIEW_GRACE_PERIOD_MINUTES = 30;

export function calculateInterviewAccessWindow(
  utcScheduledStart?: string | null,
  durationMinutes: number = 30,
  isConfirmed: boolean = false,
  isCancelled: boolean = false,
  nowServerOrClientTime?: Date
): JoinWindowInfo {
  if (isCancelled) {
    return {
      state: 'cancelled',
      label: 'Interview Cancelled',
      canClick: false,
    };
  }

  if (!isConfirmed) {
    return {
      state: 'not_confirmed',
      label: 'Confirmation Required',
      canClick: false,
    };
  }

  if (!utcScheduledStart) {
    return {
      state: 'access_closed',
      label: 'Schedule Pending',
      canClick: false,
    };
  }

  const startTime = new Date(utcScheduledStart).getTime();
  if (isNaN(startTime)) {
    return {
      state: 'access_closed',
      label: 'Schedule Pending',
      canClick: false,
    };
  }

  const now = (nowServerOrClientTime || new Date()).getTime();
  const openTime = startTime - PRE_INTERVIEW_WINDOW_MINUTES * 60 * 1000;
  const closeTime = startTime + (durationMinutes + POST_INTERVIEW_GRACE_PERIOD_MINUTES) * 60 * 1000;

  if (now < openTime) {
    const diffMinutes = Math.ceil((openTime - now) / (60 * 1000));
    return {
      state: 'available_soon',
      label: diffMinutes > 60 ? `Opens ${Math.round(diffMinutes / 60)}h Before` : `Opens in ${diffMinutes}m`,
      canClick: false,
      minutesUntilOpen: diffMinutes,
    };
  }

  if (now >= openTime && now <= closeTime) {
    return {
      state: 'available_now',
      label: 'Join Interview Room',
      canClick: true,
    };
  }

  return {
    state: 'access_closed',
    label: 'Interview Access Closed',
    canClick: false,
  };
}
