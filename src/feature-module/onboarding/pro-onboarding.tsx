import { useForm, type SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./language-switch";

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
};

const ProOnboarding = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProOnboardingInputs>( {shouldUnregister: false});

  const { t} = useTranslation();

  const onSubmit: SubmitHandler<ProOnboardingInputs> = (data) =>
    console.log(data);
  return (
    <div>
      <div className="main-wrapper contact-us-page">
        <section className="section dull-bg">
          <div className="container">
            <form className="contact-us" onSubmit={handleSubmit(onSubmit)}>
              <h2 className="text-center">
                {t("proOnboarding.welcome", "Welcome!")}
              </h2>
              <LanguageSwitcher/>

              {/* ---------------- Datos Personales ---------------- */}
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
                    <span className="form-error">
                      {t("proOnboarding.formError")}
                    </span>
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
                    <span className="form-error">
                      {t("proOnboarding.formError")}
                    </span>
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
                    <span className="form-error">
                      {t("proOnboarding.formError")}
                    </span>
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
                    <span className="form-error">
                      {t("proOnboarding.formError")}
                    </span>
                  )}
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="height" className="form-label">
                    {t("proOnboarding.height.label")}
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="height"
                    placeholder={t("proOnboarding.height.placeholder")}
                    {...register("height", {
                      required: true,
                      valueAsNumber: true,
                    })}
                  />
                  {errors.height && (
                    <span className="form-error">
                      {t("proOnboarding.formError")}
                    </span>
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
                    <span className="form-error">
                      {t("proOnboarding.formError")}
                    </span>
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
                    <span className="form-error">
                      {t("proOnboarding.formError")}
                    </span>
                  )}
                </div>
              </div>

              {/* ---------------- Datos Profesionales ---------------- */}
              <h4 className="mb-3 mt-4">
                {t(
                  "proOnboarding.professionalInformation",
                  "Professional Information"
                )}
              </h4>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="sportDiscipline" className="form-label">
                    {t(
                      "proOnboarding.sportDiscipline.label",
                      "Sport Discipline"
                    )}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="sportDiscipline"
                    defaultValue="Tennis"
                    readOnly
                    {...register("sportDiscipline")}
                  />
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

              <button
                type="submit"
                className="btn btn-secondary d-flex align-items-center"
              >
                {t("proOnboarding.submit")}
                <i className="feather-arrow-right-circle ms-2" />
              </button>
            </form>
          </div>
        </section>

        {/* /Page Content */}
      </div>
    </div>
  );
};

export default ProOnboarding;
