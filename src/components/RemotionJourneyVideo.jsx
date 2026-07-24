import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { 
  ShieldCheck, 
  UserCheck, 
  FileCheck, 
  Video, 
  Award 
} from 'lucide-react';

export const JourneyComposition = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Calculate active step based on frame (total 300 frames = 10s at 30fps)
  const currentStep = Math.min(4, Math.floor(frame / 60));

  const steps = [
    { title: "Eligibility Assessment", status: "Verified & Approved", icon: ShieldCheck, color: "#10B981" },
    { title: "Candidate Profile", status: "100% Profile Complete", icon: UserCheck, color: "#078A5B" },
    { title: "Document Review", status: "Certificates Verified", icon: FileCheck, color: "#0B2342" },
    { title: "Employer Interview", status: "Interview Passed", icon: Video, color: "#102A4C" },
    { title: "Placement & Visa Status", status: "Conditional Offer Received", icon: Award, color: "#F5B942" },
  ];

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#0B2342',
      color: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '32px',
      fontFamily: 'Inter, sans-serif',
      boxSizing: 'border-box',
    }}>
      {/* Top Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#10B981' }} />
          <span style={{ fontSize: '14px', fontWeight: '700', color: '#DFF8ED', letterSpacing: '0.5px' }}>
            BE HUMBLE & GROW — RECRUITMENT PIPELINE
          </span>
        </div>
        <span style={{ fontSize: '12px', backgroundColor: 'rgba(255,255,255,0.1)', padding: '4px 12px', borderRadius: '20px' }}>
          Live Process Demo
        </span>
      </div>

      {/* Main Dynamic Step Card */}
      <div style={{
        backgroundColor: 'rgba(255,255,255,0.06)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: '20px',
        padding: '28px',
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
      }}>
        {/* Step Icon */}
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '16px',
          backgroundColor: steps[currentStep].color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
        }}>
          {React.createElement(steps[currentStep].icon, { size: 32, color: '#ffffff' })}
        </div>

        {/* Step Text Details */}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '12px', color: '#10B981', fontWeight: '800', textTransform: 'uppercase', tracking: '1px' }}>
            Stage {currentStep + 1} of 5
          </div>
          <div style={{ fontSize: '22px', fontWeight: '800', margin: '4px 0', color: '#ffffff' }}>
            {steps[currentStep].title}
          </div>
          <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', fontWeight: '500' }}>
            Status: <span style={{ color: '#DFF8ED', fontWeight: '700' }}>{steps[currentStep].status}</span>
          </div>
        </div>
      </div>

      {/* Progress Line */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>
          <span>Candidate Pipeline Progress</span>
          <span>{Math.round(((currentStep + 1) / 5) * 100)}%</span>
        </div>

        <div style={{ width: '100%', height: '8px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{
            width: `${((currentStep + 1) / 5) * 100}%`,
            height: '100%',
            backgroundColor: '#10B981',
            transition: 'width 0.4s ease',
          }} />
        </div>
      </div>
    </div>
  );
};
