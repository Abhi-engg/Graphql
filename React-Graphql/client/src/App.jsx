import { useState } from "react";
import "./App.css";
import { useQuery, useMutation, gql } from "@apollo/client";

const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      age
      name
      isMarried
    }
  }
`;

const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    getUserById(id: $id) {
      id
      age
      name
      isMarried
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $age: Int!, $isMarried: Boolean!) {
    createUser(name: $name, age: $age, isMarried: $isMarried) {
      name
    }
  }
`;

function App() {
  const [newUser, setNewUser] = useState({});

  const {
    data: getUsersData,
    error: getUsersError,
    loading: getUsersLoading,
  } = useQuery(GET_USERS);

  const {
    data: getUserByIdData,
    loading: getUserByIdLoading,
  } = useQuery(GET_USER_BY_ID, {
    variables: { id: "2" },
  });

  const [createUser] = useMutation(CREATE_USER);

  if (getUsersLoading) return <p className="loading">Data loading...</p>;

  if (getUsersError) return <p className="error">Error: {getUsersError.message}</p>;

  const handleCreateUser = async () => {
    console.log(newUser);
    createUser({
      variables: {
        name: newUser.name,
        age: Number(newUser.age),
        isMarried: false,
      },
    });
  };

  return (
    <div className="container">
      <h1>User Management</h1>

      {/* Form */}
      <div className="form-container">
        <input
          className="input"
          placeholder="Name..."
          onChange={(e) =>
            setNewUser((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <input
          className="input"
          placeholder="Age..."
          type="number"
          onChange={(e) =>
            setNewUser((prev) => ({ ...prev, age: e.target.value }))
          }
        />
        <button className="button" onClick={handleCreateUser}>
          Create User
        </button>
      </div>

      {/* Chosen User */}
      <div className="chosen-user">
        {getUserByIdLoading ? (
          <p className="loading">Loading user...</p>
        ) : (
          <>
            <h2>Chosen User:</h2>
            {getUserByIdData?.getUserById ? (
              <div className="user-card">
                <p><strong>Name:</strong> {getUserByIdData.getUserById.name}</p>
                <p><strong>Age:</strong> {getUserByIdData.getUserById.age}</p>
                <p><strong>Married:</strong> {getUserByIdData.getUserById.isMarried ? "Yes" : "No"}</p>
              </div>
            ) : (
              <p className="error">User not found.</p>
            )}
          </>
        )}
      </div>

      {/* Users List */}
      <h2>Users</h2>
      <div className="user-list">
        {getUsersData.getUsers.map((user) => (
          <div className="user-card" key={user.id}>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Age:</strong> {user.age}</p>
            <p><strong>Married:</strong> {user.isMarried ? "Yes" : "No"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
