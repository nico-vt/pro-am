import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import "./step-progress.css";

export type StepProgressProps = {
  steps: readonly string[];
  currentStep: string;
  stepLabels?: Record<string, string>;
  className?: string;
};

const StepProgress = ({ 
  steps, 
  currentStep, 
  stepLabels = {},
  className = "" 
}: StepProgressProps) => {
  const { t } = useTranslation();
  
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Filter out 'welcome' and 'success' steps from display
  const visibleSteps = steps.filter(step => step !== 'welcome' && step !== 'success');
  
  const getCurrentStepIndex = () => {
    return visibleSteps.findIndex(step => step === currentStep);
  };

  const getStepLabel = (step: string, index: number) => {
    if (stepLabels[step]) {
      return stepLabels[step];
    }
    
    // Fallback labels with translation support
    const defaultLabels: Record<string, string> = {
      welcome: t("stepProgress.welcome", "Bienvenida"),
      personalData: t("stepProgress.personalData", "Datos Personales"),
      professionalData: t("stepProgress.professionalData", "Datos Profesionales"),
      proAmOffer: t("stepProgress.proAmOffer", "Oferta ProAm"),
      promotionalMaterial: t("stepProgress.promotionalMaterial", "Material Promocional"),
      contactAndPayment: t("stepProgress.contactAndPayment", "Contacto y Pago")
    };
    
    return defaultLabels[step] || `Step ${index + 1}`;
  };

  const currentStepIndex = getCurrentStepIndex();

  // Responsive spacing based on window width
  const getSpacing = () => {
    if (windowWidth <= 480) return 60;
    if (windowWidth <= 768) return 70;
    return 120;
  };

  const getCircleRadius = () => {
    if (windowWidth <= 480) return 14;
    if (windowWidth <= 768) return 16;
    return 20;
  };

  const spacing = getSpacing();
  const circleRadius = getCircleRadius();

  // Don't render if current step is 'welcome' or 'success'
  if (currentStep === 'welcome' || currentStep === 'success') {
    return null;
  }

  return (
    <div className={`step-progress mb-4 ${className}`}>
      <div className="d-flex justify-content-center align-items-center position-relative step-progress-container">
        {/* Steps */}
        <div className="d-flex align-items-center position-relative step-container" style={{ zIndex: 3 }}>
          {/* Progress Line Background */}
          <div 
            className="bg-light position-absolute" 
            style={{ 
              height: '3px',
              width: `calc(100% - ${spacing}px)`, // Full width minus first and last circle spacing
              left: `${circleRadius + spacing/2}px`, // Start from center of first circle
              top: `${circleRadius}px`, // Align with circle centers
              zIndex: 1,
            }}
          />
          
          {/* Active Progress Line */}
          {currentStepIndex > 0 && (
            <div 
              className="bg-primary position-absolute transition-all" 
              style={{ 
                height: '3px',
                width: `${currentStepIndex * spacing}px`, // Width grows with each step
                left: `${circleRadius + spacing/2}px`, // Start from center of first circle
                top: `${circleRadius}px`, // Align with circle centers
                zIndex: 2,
                transition: 'width 0.3s ease-in-out',
              }}
            />
          )}
          {visibleSteps.map((step, index) => {
            const isActive = index === currentStepIndex;
            const isCompleted = index < currentStepIndex;

            return (
              <div 
                key={step} 
                className="d-flex flex-column align-items-center position-relative step-item"
                style={{ 
                  minWidth: '120px',
                  zIndex: 3
                }}
              >
                {/* Circle */}
                <div
                  className={`step-circle d-flex align-items-center justify-content-center rounded-circle border ${
                    isCompleted 
                      ? 'bg-success border-success text-white' 
                      : isActive 
                        ? 'bg-primary border-primary text-white' 
                        : 'bg-light border-secondary text-muted'
                  }`}
                  style={{
                    width: '40px',
                    height: '40px',
                    fontSize: '14px',
                    fontWeight: '600',
                    transition: 'all 0.3s ease-in-out'
                  }}
                >
                  {isCompleted ? (
                    <i className="feather-check" style={{ fontSize: '18px' }} />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>

                {/* Label */}
                <div 
                  className={`mt-2 text-center small ${
                    isActive ? 'text-primary fw-semibold' : 
                    isCompleted ? 'text-success' : 'text-muted'
                  }`}
                  style={{ 
                    fontSize: '11px',
                    maxWidth: '110px',
                    lineHeight: '1.2',
                    wordBreak: 'break-word',
                    hyphens: 'auto'
                  }}
                >
                  {getStepLabel(step, index)}
                </div>
              </div>
            );
          })}
        </div>
      </div>


    </div>
  );
};

export default StepProgress;