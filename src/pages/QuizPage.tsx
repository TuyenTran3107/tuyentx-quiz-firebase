import type React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Topic, Question } from "../types";
import { get, push, ref, set } from "firebase/database";
import { auth, db } from "../firebaseConfig";

const QuizPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [topic, setTopic] = useState<Topic | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const topicRef = ref(db, `topics/${Number(id) - 1}`);
        const snapshot = await get(topicRef);
        if (snapshot.exists()) {
          setTopic(snapshot.val());
        }
      } catch (error) {
        console.error("Error fetching topic:", error);
      }
    };
    fetchTopic();
  }, []);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questionRef = ref(db, "questions");
        const snapshot = await get(questionRef);
        if (snapshot.exists()) {
          const questionData = snapshot.val();
          const filteredQuestions = Object.values(questionData).filter((q: any) => q.topicId.toString() === id).map((q: any) => ({
            id: q.id,
            questions: q.questions,
            answers: q.answers,
            correctAnswer: q.correctAnswer,
            topicId: q.topicId
          }));
          setQuestions(filteredQuestions);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const selectedAnswers = [];
      const formData = new FormData(e.currentTarget);
      const user = auth.currentUser;

      for (const [name, value] of formData.entries()) {
        selectedAnswers.push({
          questionId: parseInt(name),
          answer: parseInt(value as string)
        });
      }

      const answersRef = ref(db, "answers");
      const newAnswerRef = push(answersRef);
      await set(newAnswerRef, {
        id: Date.now(),
        topicId: Number(id),
        answers: selectedAnswers,
        userId: user ? user.uid : null
      });
      navigate(`/result/${newAnswerRef.key}`)
    } catch (error) {
      console.error("Error submitting answers:", error);
    }
  }

  // console.log(topic)
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Topic: {topic?.name}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-8">
            {questions.map((question, index) => (
              <div key={question.id} className="p-6 bg-gray-50 rounded-lg">
                <p className="text-xl font-semibold text-gray-800 mb-4">
                  Câu {index + 1}: {question.questions}
                </p>
                <div className="space-y-3">
                  {question.answers.map((answer, ansIndex) => (
                    <div key={ansIndex} className="flex items-center">
                      <input
                        type="radio"
                        id={`quiz-${question.id}-${ansIndex}`}
                        name={question.id.toString()}
                        value={ansIndex}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <label
                        htmlFor={`quiz-${question.id}-${ansIndex}`}
                        className="ml-3 text-gray-700"
                      >
                        {answer}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold 
              hover:bg-blue-700 transition-colors duration-200"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
export default QuizPage;