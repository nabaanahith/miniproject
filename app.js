import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import firebase from 'firebase';
import styled from 'styled-components'
import { Button, Autocomplete, TextInput } from 'evergreen-ui'

import Context from './context';

var config = {
    apiKey: "AIzaSyDiEdheYYptR8jqM1skd1JWLF_fIoqmIp8",
    authDomain: "fikrajob-c5adb.firebaseapp.com",
    databaseURL: "https://fikrajob-c5adb.firebaseio.com",
    projectId: "fikrajob-c5adb",
    storageBucket: "fikrajob-c5adb.appspot.com",
    messagingSenderId: "638394804035"
};
firebase.initializeApp(config);


let Textinput = styled.input`

margain-top:2%;
  width: 100%;

  font-size: 1.4rem;
`





class Header extends React.Component {

    constructor() {
        super()
        this.state = {

        }
    }

    render() {
        return (
            <Context.Consumer>
                {
                    (ctx) => {
                        return (
                            <div>
                                <div className="containerw3layouts-agileits">
                              
   <form action="/" enctype="multipart/form-data" method="post">
        <input type="file" name="pdf" />
        <input type="file" name="img" />
     
     
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input type="text" class="form-control email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="bookname"/>
          <input type="text" class="form-control email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="author"/>
          <input type="text" class="form-control email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="year"/>
          <input type="text" class="form-control email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="pages"/>
          <input type="text" class="form-control email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="language"/>
          <input type="text" class="form-control email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="fileSize"/>
          <input type="text" class="form-control email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="fileFormat"/>
          <input type="text" class="form-control email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="img"/>
          <input type="text" class="form-control email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="description"/>
          <input type="text" class="form-control  email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="category"/>

        
     <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
        </div>
        <div class="form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
          <label class="form-check-label" for="exampleCheck1">Check me out</label>
        </div>
        <input type="submit" />
      </form>

                                </div>
                            </div>

                        )
                    }
                }
            </Context.Consumer>
        )
    }
}

/*function Input() {


    return <div>
        <Context.Consumer>
            {
                (ctx) => {
                    // console.log("ctx.state.drug",ctx.state.drug)
                    let d = []
                    d = ctx.state.drug
                    console.log("ctx.state.drug", d)
                    return (
                        <Autocomplete
                            title="Drugs"
                            onChange={(changedItem) =>ctx.actions.changedItm(changedItem)}
                            items={d}
                        >

                            {(props) => {
                                const { getInputProps, getRef, inputValue } = props
                                console.log("getRef: ",getRef,"inputValue: ",inputValue,"getInputProps",getInputProps,"props")
                                return (
                                    <TextInput
                                        placeholder=""
                                    
                                        value={inputValue}
                                        innerRef={getRef}
                                        {...getInputProps()}
                                    />
                                )

                            }
                            }


                        </Autocomplete>

                    )
                }
            }
        </Context.Consumer>

    </div>
}

*/
export class App extends Component {
    constructor() {

        super()


        this.state = {
          
           
            name1: '',
            name2: '',
            sd: [],
            adress:"",
            notes:"",
            age: 0,
            drg:[{}]
        }

    }

    render() {


        return (
            <Context.Provider value={{
                state: this.state,

                actions: {
                   

                    },
                    onChangenote: (value) => {
                        this.setState({
                          notes: value
                        })
                    },
                    onChangenamed: (value) => {
                        this.setState({
                            name1: value
                        })
                    },
                    onChangeage: (value) => {
                        this.setState({
                            age: value
                        })
                    },
                    onChangenamep: (value) => {
                        this.setState({
                            name2: value
                        })
                    },
                    changedItm: (value) => {
                        console.log("value value",value)
                        this.setState({
                            drg: value
                        })
                    },
                    sorting:(e)=>{
                       
                    this.setState({
                  adress:e.target.value
                      })
                    }









            
            }}>

                <React.Fragment>
                    <Header />
                </React.Fragment>
            </Context.Provider>
        )


    }


}



ReactDOM.render(<App />, document.getElementById('root'))
