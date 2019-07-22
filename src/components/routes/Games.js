import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig.js'
import { Link } from 'react-router-dom'

class Games extends Component {
  constructor(props) {
  super(props)

  this.state = {
    games: [],
    loaded: false

  }
  }
 componentDidMount() {
    axios(`${apiUrl}/games`)
    .then(res => this.setState({ games: res.data.games, loaded: true}))
    .catch(err => this.setState({ error: err.message}))

  }
  render () {
    const { games, loaded, error} = this.state
    const gamesList = games.map(game =>(
      <li key={game.id}>
      <Link to={`/games/${games.id}`}>{game.id}</Link>
      </li>
    ))
    if (!loaded) {
      return <p> One sec... </p>
    }
    if (error) {
      return <p> Error: {error}</p>
    }
    return (
      <div>
      <h4>Games</h4>
          <ul>
            {gamesList}
          </ul>
        </div>
    )
  }
}
 export default Games
