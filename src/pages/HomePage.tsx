import { get, ref } from "firebase/database";
import type React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebaseConfig";
import type { Topic } from "../types";



const HomePage: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const topicRef = ref(db, "topics");
        const snapshot = await get(topicRef);
        if (snapshot.exists()) {
          const topicData = snapshot.val();
          const fomattedTopics = Object.values(topicData).map((topic: any) => (
            {
              id: topic.id,
              name: topic.name
            }
          ))
          setTopics(fomattedTopics);
        }
      } catch (error) {
        console.error("Error fetch topics:", error)
      }
    };
    fetchTopics();
  }, [])

  const getTopicStyle = (name: string) => {
    const styles = {
      "HTML5": { color: "from-orange-400 to-orange-600" },
      "CSS3": { color: "from-blue-400 to-blue-600" },
      "JavaScript": { color: "from-yellow-400 to-yellow-600" },
      "ReactJS": { color: "from-cyan-400 to-cyan-600" },
    };
    return styles[name as keyof typeof styles] || { color: "from-gray-400 to-gray-600" };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl font-bold mb-6 text-gray-800 animate-fade-in">
            🧠 Trắc Nghiệm Online
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Luyện tập kỹ năng lập trình với các bài trắc nghiệm về HTML5, CSS3,
            JavaScript và ReactJS!
          </p>
        </div>

        {/* Topics Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            📚 Các Chủ Đề
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topics.map((topic) => {
              const style = getTopicStyle(topic.name);
              return (
                <Link
                  key={topic.id}
                  to={`/quiz/${topic.id}`}
                  className={`bg-gradient-to-r ${style.color} p-6 rounded-xl shadow-lg 
                transform hover:scale-105 transition-all duration-300 cursor-pointer`}
                >
                  <div className="text-center text-white">
                    <h3 className="text-xl font-semibold">{topic.name}</h3>
                    <p className="mt-2 text-sm opacity-90">
                      Bắt đầu làm bài
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;