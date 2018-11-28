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
                                    <div className="w3layoutscontactagileits">
                                        <div id="wrapper">
                                            <form action="#" method="post">
                                                <div id="login" className="animate w3layouts agileits form">
                                                    <div className="ferry ferry-from">
                                                        <label>Doctor Name :</label>
                                                        <Textinput value={ctx.state.name1} 
                  onChange={(event)=>{ctx.actions.onChangenamed(event.target.value)}} 
                  placeholder="" type="text"/>
                                                    </div>
                                                    <div className="ferry ferry-from">

                                                        <label>paitiont Name :</label>
                                                        <Textinput 
                  onChange={(event)=>{ctx.actions.onChangenamep(event.target.value)}} 
                  value={ctx.state.name2}
                  placeholder=""  
                  type="text"/>


                                                    </div>
                                                    <div className="tickets">
                                                        <div className="persons">
                                                            <label>age :</label>
                                                            <Textinput 
                  onChange={(event)=>{ctx.actions.onChangeage(event.target.value)}} 
                  value={ctx.state.age}
                  placeholder=""  
                  type="text"/>
                                                        </div>
                                                    </div>
                                                    <div class="book-pag agileits w3layouts">
                                                        <div class="book-pag-frm1 agileits w3layouts">


                                                            <label>draugs :</label>
                                                            <Input />
                                                        </div>

                                                        <div class="clear">


                                                        </div>




                                                        <div class="book-pag agileits w3layouts">





                                                            <div class="clear"></div>
                                                        </div>
                                                        <div className="tickets">
                                                            <div className="ferry ferry-from">


                                                                <label>Address :</label>
                                                                <select name="from" onChange={ctx.actions.sorting}>
                                                                
                                                                    <option value=""></option>
                                                                    <option value="almansour">almansour</option>
                                                                    <option value="alsedia">alsedia</option>
                                                                    <option value="hafa street"> hafa street</option>
                                                                    <option value="alharthea">alharthea</option>
                                                                    <option value="almamoon">almamoon</option>
                                                                    <option value="alkrada">alkrada</option>
                                                                    <option value="albea">albea</option>
                                                                    <option value="aldora">aldora</option>
                                                                </select>
                                                            </div>



                                                         


                                                            <div class="clear"></div>
                                                        </div>
                                                        <div class="ferry ferry-from m">
                                                            <label>Notes :</label>
                                                            <textarea id="message" name="message" placeholder="" onChange={(event)=>{ctx.actions.onChangenote(event.target.value)}}  ></textarea>
                                                        </div>
                                                        <div class="wthreesubmitaits">
                                                            <a  class="btn btn-skin btn-lg " id="mb"  onClick={()=>{
                                                                alert("done!")

firebase.firestore().collection('prescription').add({
  named: ctx.state.name1,
 namep: ctx.state.name2,
 age:ctx.state.age,
 adress:ctx.state.adress,
 drag:ctx.state.drug,
 notes:ctx.state.notes,
  date: Date.now()
})
                                                             }} >Save  </a>
                                                        </div></div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        )
                    }
                }
            </Context.Consumer>
        )
    }
}

function Input() {


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


export class App extends Component {
    constructor() {

        super()


        this.state = {
            drug: [{}],
            listdrugs: [],
            name1: '',
            name2: '',
            sd: [],
            adress:"",
            notes:"",
            age: 0
        }



        firebase.firestore().collection('prescription').onSnapshot((snapshot)=>{
         
             

      snapshot.forEach((doc)=>{
        pre.push(doc.data())
        this.setState({
          drug: pre

                }
                )
      
            })

        })







        fetch(`https://api.fda.gov/drug/label.json?count=openfda.brand_name.exact&limit=1000`)
            .then((response) => {
                window.res = response;
                console.log('resp :', response)
                return response.json()
            })
            .then((data) => {
                window.dat = data;
                console.log('data :', data.results)
                let redm = data.results
                redm.forEach(element => {
                    let v = this.state.drug
                    v.push(element.term)



                });

                let stringArray = this.state.drug.splice('\n')
                this.setState({
                    drug: stringArray

                })
                window.s = this.state.drug;
                console.log('stringArraylen', stringArray.length)
                console.log('stringArray', stringArray)

            });

    }

    render() {


        return (
            <Context.Provider value={{
                state: this.state,

                actions: {
                    addprescribtion: () => {

                        firebase.firestore().collection('prescription').add({
                            age: 0,
                            drugs: [{}, {}],
                            named: "",
                            namep: "",
                            adress:"",
                            notes:"",
                            date: Date.now()
                        })

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
                            drug: value
                        })
                    },
                    sorting:(e)=>{
                       
                    this.setState({
                  adress:e.target.value
                      })
                    }









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
