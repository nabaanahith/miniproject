import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Popup from "reactjs-popup";
import firebase from 'firebase';
import styled from 'styled-components'

import { Button, Autocomplete, TextInput } from 'evergreen-ui'
const axios=require('axios')
import Context from './context';
const mongoses =require('mongoose')
import { RSA_SSLV23_PADDING } from 'constants';


let Img = require('react-image')
var config = {
    apiKey: "AIzaSyDiEdheYYptR8jqM1skd1JWLF_fIoqmIp8",
    authDomain: "fikrajob-c5adb.firebaseapp.com",
    databaseURL: "https://fikrajob-c5adb.firebaseio.com",
    projectId: "fikrajob-c5adb",
    storageBucket: "fikrajob-c5adb.appspot.com",
    messagingSenderId: "638394804035"
};
firebase.initializeApp(config);
function Input() {


    return <div>
        <Context.Consumer>
            {
                (ctx) => {
                    // console.log("ctx.state.drug",ctx.state.drug)
                    let d = []
                    d = ctx.state.books
                    console.log("ctx.state.drug", d)
                    return (
                        <Autocomplete
                            title="books"
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
class Bb extends React.Component{


		componentDidMount() {
			// fetch data and update state
			fetch('http://localhost:5000/api/user/adduser')
			.then(response =>response.json()).then(data=>{console.log(data);
			}
			).catch(err=>{
				console.log(err);
				
			})
		 }
		
	
	
render(){
	
return(

	<Context.Consumer>
{
		(ctx)=>{
return <div>

  

<div>


    <div id="page-top" data-spy="scroll" data-target=".navbar-custom">
	<div class="col-md-2 first-item tty">
                                    <fieldset>
										<input name="email" type="text" class="form-control" id="name" placeholder="user name..." 
										required=""   
										onChange={(event)=>{ctx.actions.onChangeemail(event.target.value)}} 
                  placeholder="user name..." type="text"/>
                                    </fieldset>
                                </div>
								<div class="col-md-2 first-item tty" >
                                    <fieldset>
										<input name="password" type="text" class="form-control" id="name" placeholder="password"
										 required=""onChange={(event)=>{ctx.actions.onChangeepassword(event.target.value)}} />
                                    </fieldset>
                                </div>

<div id="wrapper">
	
    <nav class="navbar navbar-custom navbar-fixed-top" role="navigation">
		<div class="top-area">
			<div class="container">
				<div class="row">
					<div class="col-sm-6 col-md-6">
					<p class="bold text-left"></p>
					</div>
					<div class="col-sm-6 col-md-6">
					<p class="bold text-right">Call us now +964 123 456 789</p>
					</div>
				</div>
			</div>
		</div>
        <div class="container navigation">
		
            <div class="navbar-header page-scroll">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-main-collapse">
                    <i class="fa fa-bars"></i>
                </button>
                <a class="navbar-brand" href="index.html">
                    <img src="img/logo.png" alt="" width="150" height="40" />
                </a>
            </div>

           
            <div class="collapse navbar-collapse navbar-right navbar-main-collapse">
			  <ul class="nav navbar-nav">
				<li class="active"><a href="#intro">Home</a></li>
				<li><a href="#service">Service</a></li>
				
				<li><a href="#facilities">Facilities</a></li>
				<li><a href="#pricing">Pricing</a></li>
				<li class="dropdown">
				 
				</li>
			  </ul>
            </div>
           
        </div>
        
    </nav>
</div>
</div>
  <section id="intro" class="intro">
 
  <div class="intro-content">
      <div class="container text-center">
          <div class="row " id="mar">
              <div class="col-lg-12">
              <div class="wow fadeInDown" data-wow-offset="0" data-wow-delay="0.1s">
              <h2 class="h-ultra text">SELF-PUBLISHING</h2>
              </div>
              <div class="wow fadeInUp " data-wow-offset="0" data-wow-delay="0.1s">
              <h4 class="h-light text">CAN BE YOUR PATHWAY TO SUCCESS!</h4>
              </div>
	
			  <div class="row">

			  <a href="#" class=" col-md-3 btn btn-skin btn-lg ii"//felds
		 onClick={()=>{
			fetch(`http://localhost:2000/api/user/login/${ctx.state.email}/${ctx.state.password}/`)
			.then(ress=>ress.json())
		.then(da=>{console.log("da",da.message);
	   },
	   
	   console.log("ctx.state.email",ctx.state.email)
	  
	   ).catch(err=>{console.log(err)})
	   


	   }} >Login </a>
			  <a href="#" class=" col-md-3 btn btn-skin btn-lg " 
			 	   onClick={()=>{
					fetch(`http://localhost:2000/api/user/regester/${ctx.state.email}/${ctx.state.password}/`)
					.then(ress=>ress.json())
				.then(da=>{console.log("da",da.message);
			   },
			   
			   console.log("ctx.state.email",ctx.state.email)
			  
			   ).catch(err=>{console.log(err)})
			   
 
 
			   }}>Register </a>
</div>
              </div>
              <div class="col-lg-6">
                  <div class="wow fadeInUp" data-wow-duration="2s" data-wow-delay="0.2s">
                  <img src="img/dummy/img-1.png" class="img-responsive" alt="" />
                  </div>
              </div>					
          </div>		
      </div>
  </div>		
</section>








<section id="pricing" class="home-section bg-gray paddingbot-60">
<div>
                                  
                                </div>
								<a href="http://localhost:7000/" class="btn btn-skin btn-lg " id="mm">Add Book </a>


		<div class="container marginbot-50">
			<div class="row">
				<div class="col-lg-8 col-lg-offset-2">
					<div class="wow lightSpeedIn" data-wow-delay="0.1s">
					<div class="section-heading  ">
				
					<h1 id="hstory">avalible books</h1>
					</div>
					</div>
					<div class="divider-short"></div>
				</div>
			</div>
		</div>
           
		   <div class="container" id="print">
			
			<div class="row">
<Prescriptions/>
</div>
</div>

	</section>	 
	
	

	<footer>
	
		<div class="container">
			<div class="row">
				<div class="col-sm-6 col-md-4">
					<div class="wow fadeInDown" data-wow-delay="0.1s">
					<div class="widget">
						<h5>About Clinic</h5>
						<p>
						Lorem ipsum dolor sit amet, ne nam purto nihil impetus, an facilisi accommodare sea
						</p>
					</div>
					</div>
					<div class="wow fadeInDown" data-wow-delay="0.1s">
					<div class="widget">
						<h5>Information</h5>
						<ul>
							<li><a href="#">Home</a></li>
							
							<li><a href="#">Medical treatment</a></li>
							<li><a href="#">Terms & conditions</a></li>
						</ul>
					</div>
					</div>
				</div>
				<div class="col-sm-6 col-md-4">
					<div class="wow fadeInDown" data-wow-delay="0.1s">
					<div class="widget">
						<h5>Medicio center</h5>
						<p>
						Nam leo lorem, tincidunt id risus ut, ornare tincidunt naqunc sit amet.
						</p>
						<ul>
							<li>
								<span class="fa-stack fa-lg">
									<i class="fa fa-circle fa-stack-2x"></i>
									<i class="fa fa-calendar-o fa-stack-1x fa-inverse"></i>
								</span> Monday - Saturday, 8am to 10pm
							</li>
							<li>
								<span class="fa-stack fa-lg">
									<i class="fa fa-circle fa-stack-2x"></i>
									<i class="fa fa-phone fa-stack-1x fa-inverse"></i>
								</span> +974 556 346 55
							</li>
							<li>
								<span class="fa-stack fa-lg">
									<i class="fa fa-circle fa-stack-2x"></i>
									<i class="fa fa-envelope-o fa-stack-1x fa-inverse"></i>
								</span> nabaa@gmail.com
							</li>

						</ul>
					</div>
					</div>
				</div>
				<div class="col-sm-6 col-md-4">
					<div class="wow fadeInDown" data-wow-delay="0.1s">
					<div class="widget">
						<h5>Our location</h5>
						<p>Bahgdad, Al-saydea</p>		
						
					</div>
					</div>
					<div class="wow fadeInDown" data-wow-delay="0.1s">
					<div class="widget">
						<h5>Follow us</h5>
						<ul class="company-social">
								<li class="social-facebook"><a href="#"><i class="fa fa-facebook"></i></a></li>
								<li class="social-twitter"><a href="#"><i class="fa fa-twitter"></i></a></li>
								<li class="social-google"><a href="#"><i class="fa fa-google-plus"></i></a></li>
								<li class="social-vimeo"><a href="#"><i class="fa fa-vimeo-square"></i></a></li>
								<li class="social-dribble"><a href="#"><i class="fa fa-dribbble"></i></a></li>
						</ul>
					</div>
					</div>
				</div>
			</div>	
		</div>
		<div class="sub-footer">
		<div class="container">
			<div class="row">
				<div class="col-sm-6 col-md-6 col-lg-6">
					<div class="wow fadeInLeft" data-wow-delay="0.1s">
					<div class="text-left">
					<p>&copy;Copyright 2018 - All rights reserved.</p>
					</div>
					</div>
				</div>
				<div class="col-sm-6 col-md-6 col-lg-6">
					<div class="wow fadeInRight" data-wow-delay="0.1s">
					<div class="text-right">
					
					</div>
                
					</div>
				</div>
			</div>	
		</div>
		</div>
	</footer>
    <a href="#" class="scrollup"><i class="fa fa-angle-up active"></i></a>
</div>












</div>

		}
	}
	</Context.Consumer>
)


}



}

class Prescriptions extends React.Component {
	constructor() {
	  super()
	}
	render() {
	  return (
		<Context.Consumer>
		  {
			
			(ctx) => {
				
			return <div>
			  {

	
	 
				ctx.state.books.map((item, i) => {
					
					if(i>0){
				  return <div id={i} key={i}>
				  <div class="col-sm-4 pricing-box">
				  <div class="wow bounceInUp" data-wow-delay="0.2s">
				  <div class="pricing-content general last">
				  <h2>name : {item.author}</h2>
				  <img width="100%;" src={`http://localhost:7000/${item.img}`}/>
				  <h3><span>auther :  {item.author} </span><br/>
				  <span> publishAt :  {item.publishAt}</span>
				</h3>
				  <div class="divider-short"></div>
				  <ul>
				  <li>describtion :  {item.description} <i class="fa fa-check icon-success"></i></li>
				  </ul>
				  
				  <div class="price-bottom">
				
				   
					  <a   href={`http://localhost:7000/${item.pdf}`} class="btn btn-skin btn-sm" onClick={()=>{
					  }}
					
					>download</a>
				  </div>
				  </div>
				  </div>
				  </div>
				  
				  </div>
					}
				})
			  }
			</div>


		  }}
		</Context.Consumer>
	  )
	}

}


class Body extends Component{
	

	constructor() {
		let redm =[]	
		fetch('http://localhost:7000/book')
		.then(response =>response.json()).then(result=>{console.log("result",result);
	
	console.log("data of user is",result);
	let redm = result
	window.tt=redm
	redm.forEach(element => {
		window.ele=element
		
		
	//	v.push(element.volumeInfo.title)
	this.state.books.push(element)


	});

	let stringArray = this.state.books
	this.setState({
		books: stringArray

	})
	window.s = this.state.books;
	console.log('stringArraylen', stringArray.length)
	console.log('stringArray', stringArray)

	
	}).catch(err=>{
	
		console.log("err on feting request",err);
		
	})

		super()
		this.state = {
			books:[{}],
			drg: [{}],
			email:'',
			password:'',
			toggle:0,
			title:'',
			auther:'',
			publishdate:'',
			img:'',
		
		}
	
		firebase.firestore().collection('prescription').onSnapshot((snapshot)=>{
		  let pes = []
	
		  snapshot.forEach((doc)=>{
			pes.push(doc.data())
			this.setState({
			  drg: pes
			})
		  })
		})
	
	  }
		/*super()
		this.state = {
			email:'',
			password:''

		
		}
	
	
	  }*/
	
 	
	  render() {
		return (
		  <Context.Provider value={{
			state: this.state,
			
			
			actions:{
		
				onChangeemail:(event)=>{
					console.log(event);
					
					this.setState({
						email: event
					})


				},
				changedItm:(event)=>{
					console.log(event);
					
					this.setState({
						books: event
					})


				},
				onChangeepassword:(event)=>{
					console.log(this.state.email);
					
					this.setState({
						password: event
					})


				},
			
						}
					
			
			
			}}>
			<Bb/>
    

</Context.Provider>
)


    }

    }
    ReactDOM.render(<Body />, document.getElementById('root2'))

