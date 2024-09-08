interface EducationProps {
  education: {
    school: string;
    degree: string;
    fieldOfStudy: string;
    grade: string;
    fromDate: string;
    toDate: string;
  };
}

export const Education = ({
  education: { school, degree, fieldOfStudy, grade, fromDate, toDate },
}: EducationProps) => {
  return (
    <div className="d-flex flex-column flex-md-row justify-content-between mb-5">
      <div className="flex-grow-1">
        <h3 className="mb-0">{school}</h3>
        <div className="subheading mb-3">{degree}</div>
        <div>{fieldOfStudy}</div>
        <p>{grade}</p>
      </div>
      <div className="flex-shrink-0">
        <span className="text color-primary">
          {fromDate} - {toDate}
        </span>
      </div>
    </div>
  );
};
