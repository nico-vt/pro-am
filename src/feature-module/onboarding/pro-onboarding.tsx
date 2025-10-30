import { useForm, type SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./language-switch";
import StepProgress from "./step-progress";
import { useSteps } from "../../hooks/useSteps";

export type ProOnboardingInputs = {
  //  Datos personales
  firstName: string;
  lastName: string;
  nationality: string;
  birthDate: string; // formato ISO (YYYY-MM-DD)
  height: number; // en cm
  city: string;
  country: string;

  // Datos profesionales
  sportDiscipline: "Tennis"; // fijo según tu descripción, pero se deja por claridad
  professionalLevel: "ATP" | "ITF" | "Coach" | "Senior Player" | "Club Pro";
  currentClub: string;
  playStyle: {
    hand: "Right-handed" | "Left-handed";
    backhand: "One-handed" | "Two-handed";
  };
  languages: string[]; // ej: ["English", "Spanish"]
  certifications: string[]; // ej: ["ITF", "PTR", "RPT"]

  // Oferta ProAm
  experienceType: string; // entrenamiento 1:1, sesión de sparring, etc.
  typicalDuration: string; // duración típica de la experiencia
  location: string; // ubicación donde ofrece la experiencia
  baseFee: number; // tarifa base en USD/EUR
  currency: "USD" | "EUR";
  includes: {
    equipment: boolean;
    court: boolean;
    transport: boolean;
    videoAnalysis: boolean;
  };

  // Material Promocional
  professionalPhoto: FileList | null; // foto profesional o retrato
  introVideo: string; // link a YouTube o Vimeo (opcional)
  socialLinks: {
    website: string;
    instagram: string;
    twitter: string;
    linkedin: string;
    youtube: string;
  };
};

const ProOnboarding = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProOnboardingInputs>({ shouldUnregister: false });
  const steps = ["welcome", "personalData", "professionalData", "proAmOffer", "promotionalMaterial"] as const;
  const { step, next, back, isFirstStep, isLastStep } = useSteps({ steps });

  const onSubmit: SubmitHandler<ProOnboardingInputs> = (data) =>
    console.log(data);

  // Función para hacer scroll hacia arriba
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Funciones de navegación con scroll
  const handleNext = () => {
    next();
    scrollToTop();
  };

  const handleBack = () => {
    back();
    scrollToTop();
  };

  return (
    <div>
      <div className="main-wrapper contact-us-page">
        <section className="">
          <div className="container">
            <form
              className="contact-us position-relative"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* Step Progress - Solo mostrar después del step de bienvenida */}
              {step !== "welcome" && (
                <StepProgress 
                  steps={steps} 
                  currentStep={step}
                />
              )}

              {/* ---------------- Step 1: Bienvenida ---------------- */}
              {step === "welcome" && (
                <WelcomeSection />
              )}

              {/* ---------------- Datos Personales ---------------- */}
              {step === "personalData" && (
                <PersonalDataSection register={register} errors={errors} />
              )}

              {/* ---------------- Datos Profesionales ---------------- */}
              {step === "professionalData" && (
                <ProfessionalDataSection register={register} errors={errors} />
              )}

              {/* ---------------- Oferta ProAm ---------------- */}
              {step === "proAmOffer" && (
                <ProAmOfferSection register={register} errors={errors} />
              )}

              {/* ---------------- Material Promocional ---------------- */}
              {step === "promotionalMaterial" && (
                <PromotionalMaterialSection register={register} errors={errors} />
              )}

              <div className="mt-4 d-flex justify-content-center gap-3">
                <button
                  onClick={handleBack}
                  disabled={isFirstStep}
                  className="btn btn-secondary m-0"
                  type="button"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={isLastStep}
                  className="btn btn-secondary m-0"
                  type={isLastStep ? "submit" : "button"}
                >
                  {isLastStep ? "Finish" : "Next"}
                  <i className="feather-arrow-right-circle ms-2" />
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* /Page Content */}
      </div>
    </div>
  );
};

export default ProOnboarding;

type DataSectionProps = {
  register: ReturnType<typeof useForm<ProOnboardingInputs>>["register"];
  errors: ReturnType<
    typeof useForm<ProOnboardingInputs>
  >["formState"]["errors"];
};

const PersonalDataSection = ({ register, errors }: DataSectionProps) => {
  const { t } = useTranslation();
  return (
    <>
      <h4 className="mb-3">{t("proOnboarding.personalInformation")}</h4>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="firstName" className="form-label">
            {t("proOnboarding.firstName.label")}
          </label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            placeholder={t("proOnboarding.firstName.placeholder")}
            {...register("firstName", { required: true })}
          />
          {errors.firstName && (
            <span className="form-error">{t("proOnboarding.formError")}</span>
          )}
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="lastName" className="form-label">
            {t("proOnboarding.lastName.label")}
          </label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            placeholder={t("proOnboarding.lastName.placeholder")}
            {...register("lastName", { required: true })}
          />
          {errors.lastName && (
            <span className="form-error">{t("proOnboarding.formError")}</span>
          )}
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="nationality" className="form-label">
            {t("proOnboarding.nationality.label")}
          </label>
          <select
            className="form-control"
            id="nationality"
            {...register("nationality", { required: true })}
          >
            <option value="">
              {t("proOnboarding.nationality.placeholder")}
            </option>
            <option>Argentina</option>
            <option>USA</option>
            <option>Uruguay</option>
          </select>
          {errors.nationality && (
            <span className="form-error">{t("proOnboarding.formError")}</span>
          )}
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="birthDate" className="form-label">
            {t("proOnboarding.birthDate.label")}
          </label>
          <input
            type="date"
            className="form-control"
            id="birthDate"
            placeholder={t("proOnboarding.birthDate.placeholder")}
            {...register("birthDate", { required: true })}
          />
          {errors.birthDate && (
            <span className="form-error">{t("proOnboarding.formError")}</span>
          )}
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="height" className="form-label">
            {t("proOnboarding.height.label")}
          </label>
          <input
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            className="form-control"
            id="height"
            placeholder={t("proOnboarding.height.placeholder")}
            {...register("height", {
              required: true,
              valueAsNumber: true,
            })}
          />
          {errors.height && (
            <span className="form-error">{t("proOnboarding.formError")}</span>
          )}
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="city" className="form-label">
            {t("proOnboarding.city.label")}
          </label>
          <input
            type="text"
            className="form-control"
            id="city"
            placeholder={t("proOnboarding.city.placeholder")}
            {...register("city", { required: true })}
          />
          {errors.city && (
            <span className="form-error">{t("proOnboarding.formError")}</span>
          )}
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="country" className="form-label">
            {t("proOnboarding.country.label")}
          </label>
          <input
            type="text"
            className="form-control"
            id="country"
            placeholder={t("proOnboarding.country.placeholder")}
            {...register("country", { required: true })}
          />
          {errors.country && (
            <span className="form-error">{t("proOnboarding.formError")}</span>
          )}
        </div>
      </div>
    </>
  );
};

const ProfessionalDataSection = ({ register, errors }: DataSectionProps) => {
  const { t } = useTranslation();
  return (
    <>
      <h4 className="mb-3 mt-4">
        {t("proOnboarding.professionalInformation", "Professional Information")}
      </h4>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="sportDiscipline" className="form-label">
            {t("proOnboarding.sportDiscipline.label", "Sport Discipline")}
          </label>
          <input
            type="text"
            className="form-control"
            id="sportDiscipline"
            defaultValue="Tennis"
            readOnly
            {...register("sportDiscipline")}
          />
          {errors.sportDiscipline && (
            <span className="form-error">{t("proOnboarding.formError")}</span>
          )}
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="professionalLevel" className="form-label">
            {t("proOnboarding.professionalLevel.label")}
          </label>
          <select
            className="form-control"
            id="professionalLevel"
            {...register("professionalLevel", { required: true })}
          >
            <option value="">
              {t("proOnboarding.professionalLevel.placeholder")}
            </option>
            {Object.entries(
              t("proOnboarding.professionalLevel.options", {
                returnObjects: true,
              })
            ).map(([key, label]) => (
              <option key={key} value={key}>
                {label as string}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="currentClub" className="form-label">
            {t(
              "proOnboarding.currentClub.label",
              "Current Club or Institution"
            )}
          </label>
          <input
            type="text"
            className="form-control"
            id="currentClub"
            placeholder={t(
              "proOnboarding.currentClub.placeholder",
              "Enter your current club"
            )}
            {...register("currentClub")}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">
            {t("proOnboarding.playStyle.label", "Play Style")}
          </label>
          <div className="d-flex gap-2">
            <select
              className="form-control"
              {...register("playStyle.hand", { required: true })}
            >
              <option value="">
                {t(
                  "proOnboarding.playStyle.hand.placeholder",
                  "Select hand..."
                )}
              </option>
              {Object.entries(
                t("proOnboarding.playStyle.hand.options", {
                  returnObjects: true,
                })
              ).map(([key, label]) => (
                <option key={key} value={key}>
                  {label as string}
                </option>
              ))}
            </select>

            <select
              className="form-control"
              {...register("playStyle.backhand", { required: true })}
            >
              <option value="">
                {t(
                  "proOnboarding.playStyle.hand.placeholder",
                  "Select hand..."
                )}
              </option>
              {Object.entries(
                t("proOnboarding.playStyle.backhand.options", {
                  returnObjects: true,
                })
              ).map(([key, label]) => (
                <option key={key} value={key}>
                  {label as string}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="languages" className="form-label">
            {t("proOnboarding.languages.label", "Languages")}
          </label>
          <select
            multiple
            className="form-control"
            id="languages"
            {...register("languages")}
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="Portuguese">Portuguese</option>
            <option value="French">French</option>
            <option value="Italian">Italian</option>
          </select>
          <small className="text-muted">
            {t(
              "proOnboarding.multiSelectHint",
              "Use Ctrl/Cmd to select multiple"
            )}
          </small>
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="certifications" className="form-label">
            {t(
              "proOnboarding.certifications.label",
              "Licenses or Certifications"
            )}
          </label>
          <select
            multiple
            className="form-control"
            id="certifications"
            {...register("certifications")}
          >
            <option value="ITF">ITF</option>
            <option value="PTR">PTR</option>
            <option value="RPT">RPT</option>
            <option value="USPTA">USPTA</option>
          </select>
        </div>
      </div>
    </>
  );
};

const ProAmOfferSection = ({ register, errors }: DataSectionProps) => {
  const { t } = useTranslation();
  return (
    <>
      <h4 className="mb-3 mt-4">
        {t("proOnboarding.proAmOffer", "Oferta ProAm")}
      </h4>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="experienceType" className="form-label">
            {t(
              "proOnboarding.experienceType.label",
              "Tipo de experiencia ofrecida"
            )}
          </label>
          <select
            className="form-control"
            id="experienceType"
            {...register("experienceType", { required: true })}
          >
            <option value="">
              {t(
                "proOnboarding.experienceType.placeholder",
                "Selecciona el tipo de experiencia"
              )}
            </option>
            <option value="training1on1">
              {t("proOnboarding.experienceType.training1on1", "Entrenamiento 1:1")}
            </option>
            <option value="sparringSession">
              {t("proOnboarding.experienceType.sparringSession", "Sesión de sparring")}
            </option>
            <option value="clinic">
              {t("proOnboarding.experienceType.clinic", "Clínica")}
            </option>
            <option value="meetAndPlay">
              {t("proOnboarding.experienceType.meetAndPlay", "Meet & Play")}
            </option>
            <option value="proAmTournament">
              {t("proOnboarding.experienceType.proAmTournament", "Torneo ProAm")}
            </option>
          </select>
          {errors.experienceType && (
            <span className="form-error">{t("proOnboarding.formError")}</span>
          )}
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="typicalDuration" className="form-label">
            {t(
              "proOnboarding.typicalDuration.label",
              "Duración típica de la experiencia"
            )}
          </label>
          <select
            className="form-control"
            id="typicalDuration"
            {...register("typicalDuration", { required: true })}
          >
            <option value="">
              {t(
                "proOnboarding.typicalDuration.placeholder",
                "Selecciona la duración"
              )}
            </option>
            <option value="30min">30 minutos</option>
            <option value="1hour">1 hora</option>
            <option value="1.5hours">1.5 horas</option>
            <option value="2hours">2 horas</option>
            <option value="halfDay">Medio día</option>
            <option value="fullDay">Día completo</option>
          </select>
          {errors.typicalDuration && (
            <span className="form-error">{t("proOnboarding.formError")}</span>
          )}
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="location" className="form-label">
            {t(
              "proOnboarding.location.label",
              "Ubicación donde ofrece la experiencia"
            )}
          </label>
          <input
            type="text"
            className="form-control"
            id="location"
            placeholder={t(
              "proOnboarding.location.placeholder",
              "Club, ciudad o área geográfica"
            )}
            {...register("location", { required: true })}
          />
          {errors.location && (
            <span className="form-error">{t("proOnboarding.formError")}</span>
          )}
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">
            {t("proOnboarding.baseFee.label", "Tarifa base")}
          </label>
          <div className="d-flex gap-2">
            <input
              type="number"
              className="form-control"
              placeholder={t(
                "proOnboarding.baseFee.placeholder",
                "Ingresa la tarifa"
              )}
              {...register("baseFee", {
                required: true,
                valueAsNumber: true,
                min: 0,
              })}
            />
            <select
              className="form-control"
              style={{ maxWidth: "100px" }}
              {...register("currency", { required: true })}
            >
              <option value="">
                {t("proOnboarding.currency.placeholder", "Moneda")}
              </option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
          </div>
          {(errors.baseFee || errors.currency) && (
            <span className="form-error">{t("proOnboarding.formError")}</span>
          )}
        </div>

        <div className="col-12 mb-3">
          <label className="form-label">
            {t("proOnboarding.includes.label", "¿Qué incluye?")}
          </label>
          <div className="row">
            <div className="col-md-3 mb-2">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="includeEquipment"
                  {...register("includes.equipment")}
                />
                <label className="form-check-label" htmlFor="includeEquipment">
                  {t("proOnboarding.includes.equipment", "Equipamiento")}
                </label>
              </div>
            </div>
            <div className="col-md-3 mb-2">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="includeCourt"
                  {...register("includes.court")}
                />
                <label className="form-check-label" htmlFor="includeCourt">
                  {t("proOnboarding.includes.court", "Cancha")}
                </label>
              </div>
            </div>
            <div className="col-md-3 mb-2">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="includeTransport"
                  {...register("includes.transport")}
                />
                <label className="form-check-label" htmlFor="includeTransport">
                  {t("proOnboarding.includes.transport", "Transporte")}
                </label>
              </div>
            </div>
            <div className="col-md-3 mb-2">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="includeVideoAnalysis"
                  {...register("includes.videoAnalysis")}
                />
                <label className="form-check-label" htmlFor="includeVideoAnalysis">
                  {t("proOnboarding.includes.videoAnalysis", "Videoanálisis")}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const PromotionalMaterialSection = ({ register, errors }: DataSectionProps) => {
  const { t } = useTranslation();
  return (
    <>
      <h4 className="mb-3 mt-4">
        {t("proOnboarding.promotionalMaterial", "Material Promocional")}
      </h4>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="professionalPhoto" className="form-label">
            {t(
              "proOnboarding.professionalPhoto.label",
              "Foto profesional o retrato"
            )}
          </label>
          <input
            type="file"
            className="form-control"
            id="professionalPhoto"
            accept="image/*"
            {...register("professionalPhoto", { required: true })}
          />
          {errors.professionalPhoto && (
            <span className="form-error">{t("proOnboarding.formError")}</span>
          )}
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="introVideo" className="form-label">
            {t(
              "proOnboarding.introVideo.label",
              "Video corto de presentación"
            )}
            <small className="text-muted ms-1">
              {t("proOnboarding.optional", "(opcional)")}
            </small>
          </label>
          <input
            type="url"
            className="form-control"
            id="introVideo"
            placeholder={t(
              "proOnboarding.introVideo.placeholder",
              "Link a YouTube o Vimeo"
            )}
            {...register("introVideo")}
          />
        </div>

        <div className="col-12 mb-3">
          <label className="form-label">
            ✅ {t("proOnboarding.socialLinks.label", "Enlaces a redes o sitio web oficial")}
          </label>
          <div className="row">
            <div className="col-md-6 mb-2">
              <div className="input-group">
                <span className="input-group-text">🌐</span>
                <input
                  type="url"
                  className="form-control"
                  placeholder={t(
                    "proOnboarding.socialLinks.website.placeholder",
                    "Sitio web oficial"
                  )}
                  {...register("socialLinks.website")}
                />
              </div>
            </div>
            <div className="col-md-6 mb-2">
              <div className="input-group">
                <span className="input-group-text">📷</span>
                <input
                  type="url"
                  className="form-control"
                  placeholder={t(
                    "proOnboarding.socialLinks.instagram.placeholder",
                    "Instagram"
                  )}
                  {...register("socialLinks.instagram")}
                />
              </div>
            </div>
            <div className="col-md-6 mb-2">
              <div className="input-group">
                <span className="input-group-text">🐦</span>
                <input
                  type="url"
                  className="form-control"
                  placeholder={t(
                    "proOnboarding.socialLinks.twitter.placeholder",
                    "Twitter/X"
                  )}
                  {...register("socialLinks.twitter")}
                />
              </div>
            </div>
            <div className="col-md-6 mb-2">
              <div className="input-group">
                <span className="input-group-text">💼</span>
                <input
                  type="url"
                  className="form-control"
                  placeholder={t(
                    "proOnboarding.socialLinks.linkedin.placeholder",
                    "LinkedIn"
                  )}
                  {...register("socialLinks.linkedin")}
                />
              </div>
            </div>
            <div className="col-md-6 mb-2">
              <div className="input-group">
                <span className="input-group-text">📺</span>
                <input
                  type="url"
                  className="form-control"
                  placeholder={t(
                    "proOnboarding.socialLinks.youtube.placeholder",
                    "YouTube"
                  )}
                  {...register("socialLinks.youtube")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const WelcomeSection = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center py-4">
      <div className="mb-3">
        <h1 className="display-4 mb-4 text-primary">
          {t("proOnboarding.welcome.title", "¡Bienvenido a ProAm!")}
        </h1>
        <p className="lead text-muted mb-4">
          {t(
            "proOnboarding.welcome.subtitle",
            "Completa tu perfil profesional para comenzar a ofrecer experiencias únicas."
          )}
        </p>
        <div className="mb-4">
          <p className="text-muted">
            {t(
              "proOnboarding.welcome.description",
              "Este proceso te llevará solo unos minutos y te permitirá conectar con jugadores que buscan mejorar su juego."
            )}
          </p>
        </div>
      </div>

      <div className="mb-3">
        <h5 className="mb-3 text-secondary">
          {t("proOnboarding.welcome.selectLanguage", "Selecciona tu idioma preferido")}
        </h5>
        <LanguageSwitcher />
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-2">
              <h6 className="card-title text-secondary mb-3">
                {t("proOnboarding.welcome.stepsTitle", "Pasos a completar:")}
              </h6>
              <div className="row text-start">
                <div className="col-md-6 mb-3">
                  <div className="d-flex align-items-center">
                    <div className="me-3">
                      <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style={{width: '32px', height: '32px', fontSize: '14px'}}>
                        1
                      </div>
                    </div>
                    <div>
                      <small className="fw-semibold">
                        {t("stepProgress.personalData", "Datos Personales")}
                      </small>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="d-flex align-items-center">
                    <div className="me-3">
                      <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style={{width: '32px', height: '32px', fontSize: '14px'}}>
                        2
                      </div>
                    </div>
                    <div>
                      <small className="fw-semibold">
                        {t("stepProgress.professionalData", "Datos Profesionales")}
                      </small>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="d-flex align-items-center">
                    <div className="me-3">
                      <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style={{width: '32px', height: '32px', fontSize: '14px'}}>
                        3
                      </div>
                    </div>
                    <div>
                      <small className="fw-semibold">
                        {t("stepProgress.proAmOffer", "Oferta ProAm")}
                      </small>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="d-flex align-items-center">
                    <div className="me-3">
                      <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style={{width: '32px', height: '32px', fontSize: '14px'}}>
                        4
                      </div>
                    </div>
                    <div>
                      <small className="fw-semibold">
                        {t("stepProgress.promotionalMaterial", "Material Promocional")}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
