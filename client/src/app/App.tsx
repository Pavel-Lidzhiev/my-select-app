import React from "react";
import { Select } from "../features/select/ui/Select";
import { Button } from "../shared/ui/Button/Button";
import { Message } from "../shared/ui/Message/Message";
import { useAppDispatch, useAppSelector } from "../shared/hooks/useAppHooks";
import {
  submitSelectedOption,
  selectSubmitMessage,
  selectSubmitError,
  selectSubmitLoading,
} from "../features/submit/submitThunk";
import { selectValue } from "../features/select/model/selectors";
import "./App.css";

export const App = () => {
  const dispatch = useAppDispatch();
  const selectedValue = useAppSelector(selectValue);
  const responseMessage = useAppSelector(selectSubmitMessage);
  const error = useAppSelector(selectSubmitError);
  const loading = useAppSelector(selectSubmitLoading);

  const handleSubmit = () => {
    if (selectedValue) {
      dispatch(submitSelectedOption(selectedValue));
    }
  };

  return (
    <div className="app-container">
      <div className="app-controls">
        <Select />
        <Button onClick={handleSubmit}>
          {loading ? "Отправка..." : "Отправить"}
        </Button>
      </div>
      {responseMessage && <Message text={responseMessage} />}
      {error && <Message text={error} />}
    </div>
  );
};
