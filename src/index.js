import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

const ShowList = (props)=>{
  const shows = props.shows
  const deleteShow = props.deleteShow
  return(
      shows.map(show=>{
      return(
        <li key = {show.id}>{show.name} is on {show.platform} <button onClick={()=>deleteShow(show.id)}>Delete</button></li>
      )
    })
  ) 
}

class Show extends React.Component{
  constructor(){
    super()
    this.state = {
      shows: []
    }
    this.deleteShow = this.deleteShow.bind(this)
  }

  async deleteShow(showId){
    try{
      const response = await axios.delete(`/api/shows/${showId}`)
      const shows = response.data
      this.setState({shows})
    }catch(ex){
      console.log('There was an error deleting a show')
    }
  }

  async addShow(){
    try{
      const response = await axios.post('/api/shows')
      const shows = response.data
      this.setState({shows})
    }catch(err){
      console.log('There was an error adding a show')
    }
  }

  async componentDidMount(){
    try{
      const response = await axios.get('/api/shows')
      const shows = response.data
      this.setState({shows})
    }catch(err){
      console.log('There was an error retrieving the shows')
    }
  }

  render(){
    const shows = this.state.shows
    return(
      <div>
        <h1>My shows ({this.state.shows.length})</h1>
        <button onClick = {()=> this.addShow()}>Add a show</button>
        <div><ShowList shows={shows} deleteShow = {this.deleteShow}/> </div>
      </div>
    )
  }
}

ReactDOM.render(<Show/>, document.querySelector('#root'))

