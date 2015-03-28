var express = require('express');
var connect = require('connect');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var url = require("url");
//var app     = express();
var http=require ('http');
var links=[];
var jpg=[];
var flag=true;
var data2;
var data3;
var data4;
var data5;
var i=0;
var app = connect()
	.use(connect.bodyParser())
	.use(connect.static('public'))
	.use(function (req, res) {

	// Let's scrape Anchorman 2
	
	//url = 'http://www.newseum.org/todaysfrontpages/?tfp_show=100';
	if (flag==true)
	{
	request("http://www.newseum.org/todaysfrontpages/?tfp_display=topten", function(error, response, html){
		if(!error){
			var $ = cheerio.load(html);
			var count=0;
			var i=0;
			$('a').filter(function(){
		        var data = $(this).attr('href');
                count++;
				
				if(count>24&&count<45)
				{
					if(count%2!=0)
					{
						links.push("http://www.newseum.org"+data);
						url2 = links[i]; 
						i++;		
					}		
				}
				
				
		         
	        })
			$('.tfp-top-ten-body').filter(function(){
				data2=$(this).text();
				console.log(data2);
				
			})
			$('.tfp-top-ten-title').filter(function(){
				data3=$(this).text();
				console.log(data3);
				
			})
			$('.tfp-top-ten-author').filter(function(){
				data4=$(this).text();
				console.log(data4);
				
			})
			$('.tfp-date').filter(function(){
				data5=$(this).text();
				console.log(data5);
				
			})
			
					       
		} 
		for (i=0;i<links.length;i++)
	  {
		  url2=links[i];		  
		  request(url2, function(error, response, html){
								if(!error){
									var $ = cheerio.load(html);
									var k=0;
									$('.colorbox-1230').filter(function(){
										  var data1 = $(this).attr('src');
										  //var k=''+data1+'';
										    
										  /**if(k.match('.pdf'))
										  jpg.push('"'+k+'"');
										  kl++;**/
										  
										  if(k%2!=0)
										  {
											  jpg.push('"'+data1+'"');
											  console.log(data1);
											  
										  }
										  k++;
									})
									
								}
		  })
		  
	  }	
	  
	})
	  
	  flag=false;
	}
	
	function random(high,low) {
    high++;
    return Math.floor((Math.random())*(high-low))+low;
	}
	var parsed_url = url.parse(req.url);
		var uri = parsed_url.pathname;
		if(uri === "/test"){
			x=random(0,jpg.length);
			
	   res.writeHead(200, {"Content-Type": "text/plain"});	
	   if(i<10)
	   {					
		res.end(jpg[i]);
		console.log(i);
		i++
	   }
	   else
	   {
		   i=0;
		   res.end(jpg[i]);
		   i++;
	   }
		//console.log(jpg.length);
	   
		}
		if(uri === "/author"){
			
	   res.writeHead(200, {"Content-Type": "text/plain"});						
		res.end(data4);
		//console.log(jpg.length);
	   
		}
		if(uri === "/details"){
	   res.writeHead(200, {"Content-Type": "text/plain"});						
		res.end(data2);
		//console.log(jpg.length);
	   
		}
		if(uri === "/date"){
	   res.writeHead(200, {"Content-Type": "text/plain"});						
		res.end(data5);
		//console.log(jpg.length);
	   
		}
		if(uri === "/title"){
	   res.writeHead(200, {"Content-Type": "text/plain"});						
		res.end(data3);
		//console.log(jpg.length);
	   
		}
})

app.listen('3600')
console.log('Magic happens on port 8081');
exports = module.exports = app; 