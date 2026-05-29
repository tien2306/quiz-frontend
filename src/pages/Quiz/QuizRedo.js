import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTopic } from "../../services/topicService";
import { getListQuestion } from "../../services/questionService";
import { getCookie } from "../../helpers/cookie";
import { getAnswers, updateAnswers } from "../../services/answerService";

function QuizRedo() {
  const params = useParams();
  const [dataTopic, setDataTopic] = useState();
  const [dataQuestion, setDataQuestion] = useState([]);
  const navigate = useNavigate();

  //   useEffect(() => {
  //     const fetchApi = async () => {
  //       const result = await getTopic(params.id);
  //       setDataTopic(result);
  //     };

  //     fetchApi();
  //   }, []);

  //   useEffect(() => {
  //     const fetchApi = async () => {
  //       const result = await getListQuestion(params.id);
  //       setDataQuestion(result);
  //     };

  //     fetchApi();
  //   }, []);

  useEffect(() => {
    const fetchApi = async () => {
      const oldAnswers = await getAnswers(params.id);

      if (oldAnswers && oldAnswers.topicId) {
        const topicRes = await getTopic(oldAnswers.topicId);
        setDataTopic(topicRes);

        const questionRes = await getListQuestion(oldAnswers.topicId);
        setDataQuestion(questionRes);
      }
    };

    fetchApi();
  }, [params.id]);

  // console.log(dataTopic);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(e);

    let selectedAnswers = [];

    for (let i = 0; i < e.target.elements.length; i++) {
      // console.log(e.target.elements[i].checked);
      if (e.target.elements[i].checked) {
        const name = e.target.elements[i].name;
        const value = e.target.elements[i].value;

        selectedAnswers.push({
          questionId: parseInt(name),
          answer: parseInt(value),
        });
      }
    }

    let options = {
      userId: getCookie("id"),
      topicId: parseInt(dataTopic.id),
      answers: selectedAnswers,
    };

    const res = await updateAnswers(options, params.id);

    if (res) {
      navigate(`/result/${params.id}`);
    }
  };

  return (
    <>
      <h2>Bài Quiz chủ đề: {dataTopic && dataTopic.name}</h2>

      <div className="from-quiz">
        <form onSubmit={handleSubmit}>
          {dataQuestion.map((item, index) => (
            <div className="form-quiz__item" key={item.id}>
              <p>
                Câu {index + 1}: {item.question}
              </p>
              {item.answers.map((itemAns, indexAns) => (
                <div className="form-quiz__answers" key={indexAns}>
                  <input
                    type="radio"
                    name={item.id}
                    value={indexAns}
                    id={`quiz-${item.id}-${indexAns}`}
                  />
                  <label htmlFor={`quiz-${item.id}-${indexAns}`}>
                    {itemAns}
                  </label>
                </div>
              ))}
            </div>
          ))}

          <button>Nộp bài</button>
        </form>
      </div>
    </>
  );
}

export default QuizRedo;
