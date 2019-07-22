import React, { Component } from 'react'
import Layout from '../shared/Layout'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Link, Redirect } from 'react-router-dom'

class Game extends Component {
  constructor (props) {
    super(props)
    this.state = {
      game: null,
      error: null,
      deleted: false
    }
  }

  componentDidMount () {
    // index request!!
    axios(`${apiUrl}/games/${this.props.match.params.id}`)
      .then(res => this.setState({ movie: res.data.movie }))
      .catch(err => this.setState({ error: err.stack }))
  }
  // DELETE BLOCK
  destroy = () => {
    // delete request
    axios({
      url: `${apiUrl}/games/${this.props.match.params.id}`,
      method: 'Delete'
    })
      .then(() => this.setState({ deleted: true }))
      .catch(err => this.setState({ error: err.message }))
  }
  render () {
    const { game, error, deleted } = this.state
    if (deleted) {
      return <Redirect to={
        { pathname: '/', state: { msg: 'Game Successfully Deleted!!' } }
      } />
    }
    if (error) {
      return <p>ERROR: {error}</p>
    }
    if (!game) {
      return <p> One sec...</p>
    }

    return (
      <Layout>i
        <h2> Your Game</h2>
        <h4>{Game.title}</h4>
        <p> Date released: {Game.year}</p>
        <p> Directed by: {Game.director}</p>
        <Link to="/movies">Back to Games</Link>
        <button onClick={this.destroy}>Delete Movie</button>
        <Link to={`/movies/${this.props.match.params.id}/edit`}>
          <button>Edit Games</button>
        </Link>
        <Link to="/movies/:id/edit">Back to all Game</Link>
      </Layout>
    )
  }
}
// END DELETE BLOCK
export default Game
