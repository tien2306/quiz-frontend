import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAnswers } from "../../services/answerService";
import { getListQuestion } from "../../services/questionService";

import "./result.scss";

function Result() {
  const params = useParams();
  const [dataResult, setDataResult] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApi = async () => {
      const dataAnswers = await getAnswers(params.id);
      const dataQuestions = await getListQuestion(dataAnswers.topicId);

      let resultFinal = [];

      for (let i = 0; i < dataQuestions.length; i++) {
        resultFinal.push({
          ...dataQuestions[i],
          ...dataAnswers.answers.find(
            (item) => item.questionId === parseInt(dataQuestions[i].id),
          ),
        });
      }
      // console.log(resultFinal);

      setDataResult(resultFinal);
    };

    fetchApi();
  }, []);

  let correctCount = 0;

  for (let i = 0; i < dataResult.length; i++) {
    if (dataResult[i].answer === dataResult[i].correctAnswer) {
      correctCount++;
    }
  }

  let inCorrectCount = dataResult.length - correctCount;
  let percentCorrect = (correctCount / dataResult.length) * 100;

  const handleRedo = () => {
    navigate(`/quiz-redo/${params.id}`);
  };

  return (
    <>
      <h2>Kết quả: </h2>
      <div className="result__summary">
        <p>
          Số câu đúng: <strong>{correctCount}</strong> / {dataResult.length}
        </p>
        <p>
          Số câu sai: <strong>{inCorrectCount}</strong>
        </p>
        <p>
          Tỷ lệ chính xác: <strong>{percentCorrect}%</strong>
        </p>
      </div>
      <button className="btn btn--redo" onClick={handleRedo}>
        Làm lại bài test
      </button>
      <div className="result__list">
        {dataResult.map((item, index) => (
          <div className="result__item" key={item.id}>
            <p>
              Câu {index + 1}: {item.question}
              {item.correctAnswer === item.answer ? (
                <span className="result__tag result__tag--true">Đúng</span>
              ) : (
                <span className="result__tag result__tag--false">Sai</span>
              )}
            </p>

            {item.answers.map((itemAns, indexAns) => {
              let classname = "";
              let checked = false;

              // 1. Kiểm tra người dùng có chọn ô này không
              if (item.answer === indexAns) {
                checked = true;
                classname = "result__item--selected";
              }

              // 2. SỬA LỖI tại đây: Kiểm tra đây có phải đáp án đúng của câu hỏi không
              if (item.correctAnswer === indexAns) {
                classname = "result__item--result";
              }

              return (
                <div className="result__answers" key={indexAns}>
                  <input
                    type="radio"
                    name={item.id}
                    disabled
                    checked={checked}
                  />
                  <label className={classname}>{itemAns}</label>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}

export default Result;
