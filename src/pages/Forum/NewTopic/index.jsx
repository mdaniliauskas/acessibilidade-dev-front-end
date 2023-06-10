import React from "react";
import NewTopicForm from "./NewTopicForm";

import { withAuthenticationRequired } from "@auth0/auth0-react";
import LoginRedirect from "../../LoginRedirect";

const NewTopic = () => {
  return <NewTopicForm />;
};

export default withAuthenticationRequired(NewTopic, {
  onRedirecting: () => <LoginRedirect />,
});
