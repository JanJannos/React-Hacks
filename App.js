import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { id: 'x1' , name: 'James', age: 28 },
      { id: 'x2' ,name: 'Jonas', age: 29 },
      { id: 'x3' ,name: 'Jimmi', age: 26 }
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

  nameChangedHandler = (event , id) => {
    
    // get the person index
    const personIndex = this.state.persons.findIndex(person =>{ 
        return person.id === id;
      });

    // get the person object
    // but here we get a pointer !!!
    
    const badApproachPerson = this.state.persons[personIndex];    // !! BAD

    // There is a another GOOD approach like this 
    const goodApproachPerson = Object.assign({} , this.state.persons[personIndex]);

    // a better approach is to create a new JS Object
    // here we're not manipulating the original object , but the COPY

    const updatedPerson = {
      ...this.state.persons[personIndex]
    };

    updatedPerson.name = event.target.value;

    const personsArrayUpdated = [...this.state.persons];
    personsArrayUpdated[personIndex] = updatedPerson;


    // And now we can remove this piece of Hardcoded code

    // this.setState( {
    //   persons: [
    //     { name: 'Mario', age: 28 },
    //     { name: event.target.value, age: 29 },
    //     { name: 'Miriam', age: 26 }
    //   ]
    // } )

    this.setState( {
      persons: personsArrayUpdated});
  }


  deletePersonsHandler = (index) => {
      
      // this is a BAD practice - we get a pointer , a reference to the persons array

      // const personsState = this.state.persons;
      // personsState.splice(index , 1);
      // this.setState({persons : personsState });       
      

      // this approach creates a new array
      const personsState = [...this.state.persons];
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

    let persons = null;
    if (this.state.showPersons) {
        persons = (
          <div>
                  {this.state.persons.map((per , index) => {
                      return <Person 
                                click={() => this.deletePersonsHandler(index)}
                                name={per.name} 
                                age={per.age}
                                key={per.id}
                                changes={(event) => this.nameChangedHandler(event , per.id)}/>  
                  })}       
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
