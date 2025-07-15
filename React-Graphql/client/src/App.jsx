import './App.css'
import { useQuery, useMutation, gql } from '@apollo/client' 

const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      name
      age
      isMarried
  }
}

`

function App() {
  const {data, error, loading} = useQuery(GET_USERS)

  if (loading) return <p>Data loading</p>

  if ( error ) return <p> Error: {error.message}</p>
 
  return (
    <>
    <h1>Users</h1>
    <div> 
      {""}
      {data.getUsers.map((user) => (
        <div>
          <p>Id: {user.id}</p>
          <p>Name: {user.name}</p>
          <p>Age: {user.age} </p>
          <p> IS this User Married: {user.isMarried ? "Yes" : "No" } </p>
        </div>
      )
      )}{""}
    </div>
    </>
  )
}

export default App
