interface ExperienceProps {
  experience: {
    jobTitle: string;
    companyName: string;
    description: string;
    fromDate: string;
    toDate: string;
  };
}

export const Experience = ({
  experience: { jobTitle, companyName, description, fromDate, toDate },
}: ExperienceProps) => {
  return (
    <div className="d-flex flex-column flex-md-row justify-content-between mb-5">
      <div className="flex-grow-1">
        <h3 className="mb-0">{jobTitle}</h3>
        <div className="subheading mb-3">{companyName}</div>
        <p>{description}</p>
      </div>
      <div className="flex-shrink-0">
        <span className="text color-primary">
          {fromDate} - {toDate}
        </span>
      </div>
    </div>
  );
};
