import React, { Component } from 'react'
import Layout from '../shared/Layout'
import MovieForm from '../shared/MovieForm'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Redirect } from 'react-router-dom'

class GameEdit extends Component {
  constructor (props) {
    super(props)
    this.state = {
      game: {
        title: '',
        company: '',
        year: ''

      },
      updated: false
    }
  }

  componentDidMount () {
    axios(`${apiUrl}/movies/${this.props.match.params.id}`)
      .then(res => this.setState({ movie: res.data.movie }))
      .catch(console.error)
  }
  handleSubmit = event => {
    event.prevent.Default()
    axios.patch(`${apiUrl}/games/${apiUrl}/games/${this.props.match.params.id}`,
      {
        movie: this.state.movie
      })
      .then(res => this.setState({
        movie: res.data.movie,
        edited: true
      }))
      .catch(console.error)
  }

  handleChange = event => {
    // create an object with just the update field name and the updated value =>
    // updated =. {title: 'My Mo'}
    const updatedField = {
      [event.target.name]: event.target.value
    }
    const updatedMovie = Object.assign(this.state.movie, updatedField)
    this.setState({ movie: updatedMovie })
  }

  render () {
    const { movie, edited } = this.state
    const { handleChange, handleSubmit } = this



    if (edited) {
      return <Redirect to={
        {
          pathname: `/games/${this.props.match.params.id}`,
          state: {
            msg: 'Game updated!'
          }
        }
      }/>
    }
    return (
      <Layout>
        <h3>Edit your movie</h3>
        <MovieForm
          movie={movie}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cancelPath={`/games/${this.props.match.params.id}`}
        />
      </Layout>
    )
  }
}
export default GameEdit
