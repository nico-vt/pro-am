import { useTranslation } from "react-i18next";

type NavigationButtonsProps = {
  onBack: () => void;
  onNext: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
};

const NavigationButtons = ({
  onBack,
  onNext,
  isFirstStep,
  isLastStep,
}: NavigationButtonsProps) => {
  const { t } = useTranslation();

  return (
    <div className="mt-4 d-flex justify-content-center gap-3">
      <button
        onClick={onBack}
        disabled={isFirstStep}
        className="btn btn-secondary m-0"
        type="button"
      >
        {t("navigation.back", "Atrás")}
      </button>
      <button onClick={onNext} className="btn btn-primary m-0" type="button">
        {isLastStep ? t("navigation.finish", "Finalizar") : t("navigation.next", "Siguiente")}
        <i className="feather-arrow-right-circle ms-2" />
      </button>
    </div>
  );
};

export default NavigationButtons;
