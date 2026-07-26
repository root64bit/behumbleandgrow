import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../lib/auth/AuthContext';
import { CandidatePlacement, CandidatePlacementPayload, CandidatePlacementService } from '../../services/candidate-placement.service';
import { PlacementRoadmapStage } from '../../lib/candidate/placementRoadmap';
import { PlacementTimelineEvent } from '../../lib/candidate/placementTimeline';
import { PlacementCandidateAction, resolveNextActionPriority } from '../../lib/candidate/placementNextAction';

export type ResourceState<T> =
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'empty'; data: T }
  | { status: 'error'; message: string };

export interface CandidatePlacementHookResult {
  placementState: ResourceState<CandidatePlacement | null>;
  roadmapState: ResourceState<PlacementRoadmapStage[]>;
  timelineState: ResourceState<PlacementTimelineEvent[]>;
  actionsState: ResourceState<PlacementCandidateAction[]>;
  nextAction: PlacementCandidateAction | null;
  acknowledgementMutation: {
    status: 'idle' | 'submitting' | 'success' | 'conflict' | 'error';
    actionId?: string;
    error?: string;
  };
  refreshPlacement: () => Promise<void>;
  completeAcknowledgement: (actionId: string, expectedVersion: number) => Promise<void>;
}

export function useCandidatePlacement(): CandidatePlacementHookResult {
  const { user } = useAuth();
  const userId = user?.id || 'usr-cand-101';

  const [placementState, setPlacementState] = useState<ResourceState<CandidatePlacement | null>>({ status: 'loading' });
  const [roadmapState, setRoadmapState] = useState<ResourceState<PlacementRoadmapStage[]>>({ status: 'loading' });
  const [timelineState, setTimelineState] = useState<ResourceState<PlacementTimelineEvent[]>>({ status: 'loading' });
  const [actionsState, setActionsState] = useState<ResourceState<PlacementCandidateAction[]>>({ status: 'loading' });
  const [nextAction, setNextAction] = useState<PlacementCandidateAction | null>(null);

  const [acknowledgementMutation, setAcknowledgementMutation] = useState<{
    status: 'idle' | 'submitting' | 'success' | 'conflict' | 'error';
    actionId?: string;
    error?: string;
  }>({ status: 'idle' });

  const fetchPlacement = useCallback(async () => {
    setPlacementState({ status: 'loading' });
    setRoadmapState({ status: 'loading' });
    setTimelineState({ status: 'loading' });
    setActionsState({ status: 'loading' });

    try {
      const payload: CandidatePlacementPayload = await CandidatePlacementService.loadMyPlacement(userId);

      if (!payload.placement) {
        setPlacementState({ status: 'empty', data: null });
        setRoadmapState({ status: 'empty', data: [] });
        setTimelineState({ status: 'empty', data: [] });
        setActionsState({ status: 'empty', data: [] });
        setNextAction(null);
        return;
      }

      setPlacementState({ status: 'success', data: payload.placement });
      setRoadmapState({ status: 'success', data: payload.roadmap });
      setTimelineState({ status: 'success', data: payload.timeline });
      setActionsState({ status: 'success', data: payload.actions });

      setNextAction(resolveNextActionPriority(payload.actions));
    } catch (err: any) {
      const msg = err.message || 'Could not load your placement and relocation status.';
      setPlacementState({ status: 'error', message: msg });
      setRoadmapState({ status: 'error', message: msg });
      setTimelineState({ status: 'error', message: msg });
      setActionsState({ status: 'error', message: msg });
    }
  }, []);

  useEffect(() => {
    fetchPlacement();
  }, [fetchPlacement]);

  const completeAcknowledgement = useCallback(
    async (actionId: string, expectedVersion: number) => {
      if (placementState.status !== 'success' || !placementState.data) return;

      setAcknowledgementMutation({ status: 'submitting', actionId });

      try {
        await CandidatePlacementService.completeMyAcknowledgement(
          placementState.data.id,
          actionId,
          expectedVersion,
          userId
        );

        setAcknowledgementMutation({ status: 'success', actionId });
        await fetchPlacement();
      } catch (err: any) {
        const msg = err.message || 'Failed to submit acknowledgement.';
        if (msg.includes('concurrently') || msg.includes('updated')) {
          setAcknowledgementMutation({ status: 'conflict', actionId, error: msg });
        } else {
          setAcknowledgementMutation({ status: 'error', actionId, error: msg });
        }
      }
    },
    [placementState, fetchPlacement]
  );

  return {
    placementState,
    roadmapState,
    timelineState,
    actionsState,
    nextAction,
    acknowledgementMutation,
    refreshPlacement: fetchPlacement,
    completeAcknowledgement,
  };
}
