import React from 'react';
import { Plane, Lock } from 'lucide-react';
import { CandidatePlacement } from '../../../services/candidate-placement.service';

interface Props {
  placement: CandidatePlacement;
}

export const CandidatePlacementTravelCard: React.FC<Props> = ({ placement }) => {
  const isConfirmed = placement.flightConfirmed;

  return (
    <div className={`bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4 text-left ${!isConfirmed ? 'opacity-80' : ''}`}>
      <div className="flex justify-between items-center border-b border-slate-100 pb-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center space-x-2">
          <Plane className="w-4 h-4 text-sky-600" />
          <span>Travel & Flight Itinerary</span>
        </h3>
        <span
          className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
            isConfirmed
              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
              : 'bg-slate-100 text-slate-600 border border-slate-200'
          }`}
        >
          {isConfirmed ? 'Itinerary Issued' : 'Awaiting Visa Approval'}
        </span>
      </div>

      {!isConfirmed ? (
        <div className="flex flex-col items-center justify-center py-6 border-2 border-dashed border-slate-200 rounded-xl space-y-2 text-center">
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
            <Lock className="w-5 h-5" />
          </div>
          <p className="text-xs text-slate-500 max-w-xs font-medium">
            Flight arrangements and travel itinerary details will be issued upon completion of UAE Entry Permit issuance.
          </p>
        </div>
      ) : (
        <div className="space-y-2 text-xs text-slate-700">
          <div className="flex justify-between border-b border-slate-100 pb-1.5">
            <span className="text-slate-400 font-medium">Airline</span>
            <span className="font-bold text-slate-900">{placement.flightAirline || 'Emirates Air'}</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-1.5">
            <span className="text-slate-400 font-medium">Departure Airport</span>
            <span className="font-bold text-slate-900">{placement.flightDepartureAirport || 'NBO / JNB'}</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-1.5">
            <span className="text-slate-400 font-medium">Destination Airport</span>
            <span className="font-bold text-slate-900">{placement.flightArrivalAirport || 'DXB International'}</span>
          </div>
          <div className="flex justify-between pt-1">
            <span className="text-slate-400 font-medium">Booking Ref</span>
            <span className="font-mono font-bold text-emerald-800">{placement.flightReference || 'BHG-FLT-8819'}</span>
          </div>
        </div>
      )}
    </div>
  );
};
