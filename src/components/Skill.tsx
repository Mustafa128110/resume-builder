interface SkillProps {
  skill: string;
}

export const Skill = ({ skill }: SkillProps) => {
  return (
    <li>
      <span className="fa-li">
        <i className="fas fa-check"></i>
      </span>
      {skill}
    </li>
  );
};
