import React from "react";

import { useParams } from "react-router-dom";

const TopicDetails = () => {
  const params = useParams();

  return <div>TopicDetails {params.topicId}</div>;
};

export default TopicDetails;
