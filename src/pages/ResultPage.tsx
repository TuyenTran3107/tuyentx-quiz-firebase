import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get, ref } from "firebase/database";
import { db } from "../firebaseConfig";
import type { AnswerData, ResultItem } from "../types";



const ResultPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [resultData, setResultData] = useState<ResultItem[]>([]);
  const [loading, setLoading] = useState(true);
  console.log(id)
  useEffect(() => {
    const fetchResults = async () => {
      try {
        // Fetch answer data
        const answerRef = ref(db, `answers/${id}`);
        const answerSnapshot = await get(answerRef);
        if (!answerSnapshot.exists()) return;
        const answerData: AnswerData = answerSnapshot.val();

        // Fetch questions
        const questionsRef = ref(db, "questions");
        const questionsSnapshot = await get(questionsRef);
        if (!questionsSnapshot.exists()) return;
        const questionsData = questionsSnapshot.val();

        // Merge answers with questions
        const mergedResults = Object.values(questionsData)
          .filter((q: any) => q.topicId === answerData.topicId)
          .map((question: any) => ({
            ...question,
            ...answerData.answers.find(a => a.questionId === question.id)
          }));

        setResultData(mergedResults);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching results:", error);
        setLoading(false);
      }
    };

    fetchResults();
  }, [id]);

  const correctAnswers = resultData.reduce((count, item) =>
    item.correctAnswer === item.answer ? count + 1 : count, 0);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-8">
            Result: {correctAnswers}/{resultData.length}
          </h2>

          <div className="space-y-6">
            {resultData.map((item, index) => (
              <div key={item.id} className="p-6 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <p className="text-lg font-semibold">
                    Câu {index + 1}: {item.questions}
                  </p>
                  {item.correctAnswer === item.answer ? (
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                      Correct
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                      Wrong
                    </span>
                  )}
                </div>

                <div className="space-y-3">
                  {item.answers.map((answer, ansIndex) => {
                    const isSelected = item.answer === ansIndex;
                    const isCorrect = item.correctAnswer === ansIndex;
                    const className = `p-3 rounded-lg ${isSelected ? 'bg-blue-50 border-blue-200' : ''
                      } ${isCorrect ? 'border-green-500 border-2' : ''}`;

                    return (
                      <div key={ansIndex} className="flex items-center">
                        <input
                          type="radio"
                          checked={isSelected}
                          disabled
                          className="h-4 w-4 mr-3"
                        />
                        <label className={className}>
                          {answer}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;