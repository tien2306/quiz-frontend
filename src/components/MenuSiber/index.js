import { Menu } from "antd";
import {
  AppstoreOutlined,
  HistoryOutlined,
  ReadOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getListTopic } from "../../services/topicService";
import { useSelector } from "react-redux";

function MenuSider() {
  const [topics, setTopics] = useState([]);
  const isLogin = useSelector((state) => state.loginReducer);

  useEffect(() => {
    const fetchApi = async () => {
      const res = await getListTopic();
      setTopics(res);
    };
    fetchApi();
  }, [isLogin]);

  const items = [
    {
      key: "home",
      label: <Link to="/">DashBoard</Link>,
      icon: <AppstoreOutlined />,
    },
    ...(isLogin
      ? [
          {
            label: "Topic",
            key: "topic",
            icon: <ReadOutlined />,

            children: topics.map((item) => ({
              key: `topic-${item.id}`,
              label: <Link to={`/quiz/${item.id}`}>{item.name}</Link>,
            })),
          },
          {
            key: "answers",
            label: <Link to="/answers">Answers</Link>,
            icon: <HistoryOutlined />,
          },
        ]
      : []),
  ];

  return (
    <>
      <Menu defaultSelectedKeys={["home"]} mode="inline" items={items} />
    </>
  );
}

export default MenuSider;
