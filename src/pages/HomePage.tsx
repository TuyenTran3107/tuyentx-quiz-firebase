import { get, ref } from "firebase/database";
import type React from "react";
import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import type { Topic } from "../types";
import QuizCart from "../components/QuizCart";



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
              id: topic.id.toString(),
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
              return (
                <QuizCart key={topic.id} topic={topic} />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;