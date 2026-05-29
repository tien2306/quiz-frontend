import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getListTopic } from "../../services/topicService";

function Topic() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getListTopic();
      setData(result);
    };

    fetchApi();
  }, []);

  // console.log(data);

  return (
    <>
      <h2>Danh sách chủ đề</h2>
      {data.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên chủ đề</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                  <Link to={`/quiz/${item.id}`}>Làm Bài</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default Topic;
