var express = require('express');
var connect = require('connect');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var url = require("url");
var url1 = require("url");
//var app     = express();
var http=require ('http');
var links=[];
var latlngcity=[];
var urlcity=[];
var jpg=[];
var location=[];
var lattitude1=[];
var longitude1=[];
var city1=[];
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
				//console.log(data2);
				
			})
			$('.tfp-top-ten-title').filter(function(){
				data3=$(this).text();
				//console.log(data3);
				
			})
			$('.tfp-top-ten-author').filter(function(){
				data4=$(this).text();
				//console.log(data4);
				
			})
			$('.tfp-date').filter(function(){
				data5=$(this).text();
				//console.log(data5);
				
			})
			$('.thumbnail-group-body').filter(function(){
				var data6=$(this).children('p').text();
				location.push(data6);
				
			})
			
					       
		} 
		for (i=0;i<location.length;i++)
		{
			var place=location[i].toString();
			var city=place.split(",");
			//console.log(city[0]);
			city1.push(city[0]);
		};
			
			for (i=0;i<city1.length;i++)
			{
				
		url1="http://open.mapquestapi.com/geocoding/v1/address?location="+city1[i]+"&key=Fmjtd%7Cluu82q6bnl%2Cbn%3Do5-94t256";
		request(url1, function(error, response){
			if(!error){
				//console.log(i);
				 var data=response.body;
				 //console.log(data);
				var obj=JSON.parse(data);
				var obj1=obj.results[0];
				var obj2=JSON.stringify(obj1);
				var desiredlocation=obj2.split("providedLocation");
				desiredlocation1=desiredlocation[1].split('location":"');
				actuallocation=desiredlocation1[1].split('"');
				console.log(actuallocation[0]);
				latlngcity.push('"'+actuallocation[0]+'"');
				var res=obj2.split("lng");
				var lng=res[1].split(",");
				var lat=lng[1].split(":");
				var lat1=lat[1].split("}");
				var lattitude=lat1[0];
				lattitude1.push(lattitude);
				//console.log(city[0]);
				console.log(lattitude);
				var lng1=(lng[0].split(":"));
				var longitude=lng1[1];
				console.log(longitude);
				longitude1.push(longitude);
			}
			else
			{
				console.log(error);
			}
			
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
											 // console.log(data1);
											  
										  }
										  k++;
									})
									$('.tfp-meta-info').filter(function(){
										var data1 = $(this).text();
										var data=data1.split('in ');
										var d=data[1].split(',');
										urlcity.push('"'+d[0]+'"');
										//console.log(d[0]);
										
									})
									
								}
		  })
		  
	  }	
	  
	})
	  
	  flag=false;
	}
	
	var parsed_url = url.parse(req.url);
		var uri = parsed_url.pathname;
		if(uri === "/test"){
			//x=random(0,jpg.length);
			
	   res.writeHead(200, {"Content-Type": "text/plain"});	
	   if(i<10)
	   {					
		res.end(jpg[i]);
		console.log(urlcity[i]);		
		console.log(jpg[i]);
		//console.log(i);
		for(j=0;j<latlngcity.length;j++)
		  {
			   if(latlngcity[j]==urlcity[i])
		   {
			   console.log(latlngcity[j]);
			   console.log(lattitude1[j]);
			   console.log(longitude1[j]);
		   }
		  }
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
console.log('Magic happens on port 3600');
exports = module.exports = app; 