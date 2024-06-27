/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";

const AddUserForm = () => {
  const AddUser = async (payload: any) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({ payload }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log("response: " + JSON.stringify(json));
      });

    console.log(response, payload);
  };

  const {  mutate } = useMutation({
    mutationFn: (payload: any) => AddUser(payload),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <div>
      <h1>Add User</h1>
      <button
        onClick={() =>
          mutate({
            title: "new_title",
            body: "new_body",
            userId: 1000,
          })
        }
      >
        ADD
      </button>
    </div>
  );
};

export default AddUserForm;
