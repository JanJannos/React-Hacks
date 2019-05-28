import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { name: 'James', age: 28 },
      { name: 'Jonas', age: 29 },
      { name: 'Jimmi', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false
  }

  switchNameHandler = (newName) => {
    this.setState( {
      persons: [
        { name: newName, age: 28 },
        { name: 'Mimi', age: 29 },
        { name: 'Momo', age: 27 }
      ]
    } )
  }

  nameChangedHandler = (event) => {
    this.setState( {
      persons: [
        { name: 'Mario', age: 28 },
        { name: event.target.value, age: 29 },
        { name: 'Miriam', age: 26 }
      ]
    } )
  }


  deletePersonsHandler = (index) => {
      const personsState = this.state.persons;
      personsState.splice(index , 1);
      this.setState({persons : personsState });       
  }

  togglePersonsHandler = () => {
        const doesShow = this.state.showPersons;
        this.setState({showPersons: !doesShow});
  }

  render () {

    const myBtnStyle = {
      backgroundColor: 'white' , 
      font: 'inherit' , 
      border: '1x solid blue' ,
      padding: '8px'
    };




    // Now we can automate everything using MAP 
    // Take a look below 

    let persons = null;
    if (this.state.showPersons) {
        persons = (
          <div>
                  {this.state.persons.map((per , index) => {
                      return <Person 
                                click={() => this.deletePersonsHandler(index)}
                                name={per.name} 
                                age={per.age}
                                key={index}/>  
                  })}

              {/* <Person       
              name={this.state.persons[0].name} 
              age={this.state.persons[0].age} />
              <Person 
              name={this.state.persons[1].name} 
              age={this.state.persons[1].age}
              click={this.switchNameHandler.bind(this, 'Rocko!')}
              changed={this.nameChangedHandler} >My Hobbies: Racing</Person>
              <Person 
              name={this.state.persons[2].name} 
              age={this.state.persons[2].age} /> */}
         </div> 
        );
    }

    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p>This is really working!</p>
        {/* <button style={myBtnStyle} onClick={() => this.switchNameHandler('Ricki!!')}>Switch Name</button>*/}
        <button style={myBtnStyle} onClick={this.togglePersonsHandler}>Toggle Names</button>  
        {persons}
      </div>      
    );
  }
}

export default App;
