import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { gql, useQuery } from '@apollo/client'

// const  BOOKS = gql`
// query {
//   test {
//     title
//     author
//   }
// }
// `;

/**改造後 */
const BOOKS = gql`
  query {
    search {
      ... on Book {
        title
        author
      }
      ... on Movie {
        title
        author
      }
    }
  }
`;

function Books() {
  const { loading, error, data } = useQuery(BOOKS);
  console.log(data);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return data.search.map(d => {
    return (
      <div key={d.title}>
        <h1>{d.title}</h1>
        <h2>{d.author || d.director}</h2>
      </div>
    )
  })
}


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h2>GraphQL Client</h2>
      <Books />
    </div>
  )
}

export default App
