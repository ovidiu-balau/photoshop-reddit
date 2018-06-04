import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      pictures: [],
    }
  }
  componentDidMount() {
    fetch('https://www.reddit.com/r/all.json')
      .then(results => {
        return results.json();
      }).then(posts => {
        const postList = posts.data.children;
        let data = postList.map((post) => {
          console.log(post.data)
          if (post.data.over_18 === false) {
            return (
              <div className="post" key={post.data.id}>
                <a href={post.data.url} target="_blank">
                  <img className="thumbnail" src={post.data.preview.images[0].source.url} alt={post.data.title} />
                </a>
              </div>
            )
          } else {
            return null;
          }
        });
        this.setState({ pictures: data })
      });
    ;
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Photoshop reddit</h1>
        </header>
        <p className="App-intro">
          {this.state.pictures}
        </p>
      </div>
    );
  }
}

export default App;
