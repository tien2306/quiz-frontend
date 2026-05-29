import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAnswersByUserId } from "../../services/answerService";
import { getListTopic } from "../../services/topicService";
import { getCookie } from "../../helpers/cookie";

function Answers() {
  const [dataAnswers, setDataAnswers] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const currentUserId = getCookie("id");
      const answersByUserId = await getAnswersByUserId(currentUserId);
      const topics = await getListTopic();

      let result = [];

      for (let i = 0; i < answersByUserId.length; i++) {
        const currentTopic = topics.find(
          (topic) => String(topic.id) === String(answersByUserId[i].topicId),
        );

        // console.log(currentTopic);

        result.push({
          ...currentTopic,
          ...answersByUserId[i],
        });
      }

      // console.log(result);
      setDataAnswers(result.reverse());
    };

    fetchApi();
  }, []);

  // console.log(data);

  return (
    <>
      <h2>Danh sách bài đã luyện tập</h2>
      {dataAnswers.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên chủ đề</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {dataAnswers.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                  <Link to={`/result/${item.id}`}>Xem chi tiết</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default Answers;
