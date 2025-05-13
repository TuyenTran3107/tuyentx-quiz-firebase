import type React from "react";
import { Link } from "react-router-dom";



interface QuizCartProps {
  topic: {
    id: string;
    name: string
  };

}

const QuizCart: React.FC<QuizCartProps> = ({ topic }) => {

  const getTopicStyle = (name: string) => {
    const styles = {
      "HTML5": { color: "from-orange-400 to-orange-600" },
      "CSS3": { color: "from-blue-400 to-blue-600" },
      "JavaScript": { color: "from-yellow-400 to-yellow-600" },
      "ReactJS": { color: "from-cyan-400 to-cyan-600" },
    };
    return styles[name as keyof typeof styles] || { color: "from-gray-400 to-gray-600" };
  };
  const topicStyle = getTopicStyle(topic.name);

  return (
    <div className={`bg-gradient-to-r ${topicStyle.color} p-6 rounded-xl shadow-lg 
                transform hover:scale-105 transition-all duration-300 cursor-pointer`}
    >
      <div className="text-center text-white">
        <h3 className="text-xl font-semibold mb-4">{topic.name}</h3>
        <Link
          key={topic.id}
          to={`/quiz/${topic.id}`}
          className="inline-flex items-center px-4 py-2 bg-white/20 
            rounded-lg text-sm font-medium backdrop-blur-sm
            hover:bg-white/30 transition-all duration-300">
          Bắt đầu
        </Link>
      </div>
    </div>
  )
}
export default QuizCart;