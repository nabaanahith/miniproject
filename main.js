
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
				ctx.state.drug.map((item, i) => {
				  return <div key={i}>
				  <div class="col-sm-4 pricing-box">
				  <div class="wow bounceInUp" data-wow-delay="0.2s">
				  <div class="pricing-content general last">
				  <h2>Dr.{item.named}</h2>
				  <h3><span>Pationt Name :  {item.namep} </span><br/>
				  <span> Address :  {item.adress}</span>
				  
				  <br/>
				  <span> Age :  {item.age}</span></h3>
				  <div class="divider-short"></div>
				  <ul>
				 
				  <li>Dtugs :  {item.drag} <i class="fa fa-check icon-success"></i></li>
				  <li>Notes :  {item.notes}<i class="fa fa-check icon-success"></i></li>
				
				  </ul>
				  
				  <div class="price-bottom">
				  <a href="#" class="btn btn-skin btn-lg"  onClick={()=>{
					  var prtContent = document.getElementById('print');
					  var WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
					  WinPrint.document.write(prtContent.innerHTML);
					  WinPrint.document.close();
					  WinPrint.focus();
					  WinPrint.print();
					  WinPrint.close();

				  }}
				  >Print</a>
				  </div>
				  </div>
				  </div>
				  </div>
				  
				  </div>
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
		super()
		this.state = {
			drug: [{}],
		
		}
	
		firebase.firestore().collection('prescription').onSnapshot((snapshot)=>{
		  let pes = []
	
		  snapshot.forEach((doc)=>{
			pes.push(doc.data())
			this.setState({
			  drug: pes
			})
		  })
		})
	
	  }
	
	  render() {
		return (
		  <Context.Provider value={{
			state: this.state}}>
    <div>
    <body id="page-top" data-spy="scroll" data-target=".navbar-custom">


<div id="wrapper">
	
    <nav class="navbar navbar-custom navbar-fixed-top" role="navigation">
		<div class="top-area">
			<div class="container">
				<div class="row">
					<div class="col-sm-6 col-md-6">
					<p class="bold text-left">Monday - Saturday, 8am to 10pm </p>
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
				<li><a href="#doctor">Doctors</a></li>
				<li><a href="#facilities">Facilities</a></li>
				<li><a href="#pricing">Pricing</a></li>
				<li class="dropdown">
				 
				</li>
			  </ul>
            </div>
           
        </div>
        
    </nav>
</div>
</body>
  <section id="intro" class="intro">
  <div class="intro-content">
      <div class="container text-center">
          <div class="row">
              <div class="col-lg-12">
              <div class="wow fadeInDown" data-wow-offset="0" data-wow-delay="0.1s">
              <h2 class="h-ultra">Fikra Clinic</h2>
              </div>
              <div class="wow fadeInUp" data-wow-offset="0" data-wow-delay="0.1s">
              <h4 class="h-light">Provide best quality healthcare for you</h4>
              </div>
              <div id="btnn">
              <a href="./main.html" class="btn btn-skin btn-lg " id="mm">Create Prescription </a>


<a href="#hstory" class="btn btn-skin btn-lg">View Prescriptions </a>
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
		<div class="container marginbot-50">
			<div class="row">
				<div class="col-lg-8 col-lg-offset-2">
					<div class="wow lightSpeedIn" data-wow-delay="0.1s">
					<div class="section-heading  ">
				
					<h1 id="hstory">History Of Prescription</h1>
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

</Context.Provider>
)


    }

    }
    ReactDOM.render(<Body />, document.getElementById('root2'))

