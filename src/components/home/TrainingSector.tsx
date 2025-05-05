
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface TrainingSectorProps {
  title: string;
  icon: ReactNode;
  link: string;
}

const TrainingSector = ({ title, icon, link }: TrainingSectorProps) => {
  return (
    <Link to={link} className="block">
      <div className="sector-icon group">
        <div className="mb-4 text-blue-600 text-4xl group-hover:text-blue-700 transition-colors">
          {icon}
        </div>
        <h3 className="text-center font-medium text-gray-800 group-hover:text-blue-700 transition-colors">
          {title}
        </h3>
      </div>
    </Link>
  );
};

export default TrainingSector;
