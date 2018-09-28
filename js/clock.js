//get current browser size
var w = window.innerWidth;
var h = window.innerHeight;
w = 0.7 * w;




var emt
var flv


//append an svg in container as a canvas or sth     
var svg = d3.select("#bg_svg").append("svg") 
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("z-index","300")
            .attr("viewBox", "0 0 "+w+" "+h )



//get the recommended cocktail name

var svg1 = d3.select(".clock").append("svg")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 350 200")
            .attr("z-index","300")
       

var amtPerSec = 3600;

var margin = {
	top: 20,
    right: 100,
    bottom: 0,
    left: 90
}

var radians = 0.0174532925;

//size of the clock
var r = 80;

var secR = r + 16;
var hourR = r - 40;

//length of hands
var hourHandLength = r;
var minuteHandLength = 0;
var secondHandLength = 0;

w=220
h=300


var drag = d3.behavior.drag()
	.on('dragstart', dragstart)
	.on('drag', drag)
	.on('dragend', dragend);


// define values for time
var handData = [
	{
		type:'hour',
		value:0,
		length:-hourHandLength,
		// scale:hourScale
	},
	{
		type:'minute',
		value:0,
		length:-minuteHandLength,
		// scale:minuteScale
	},
	{
		type:'second',
		value:0,
		length:-secondHandLength,
		// scale:secondScale
	}
];


// Get current time 
function updateData(){
	var t = new Date();
    handData[1].value = t.getMinutes();
	handData[2].value = t.getSeconds();
	handData[0].value = t.getHours() + t.getMinutes()/60 ;

}
 // Display current time
updateData();
var a  = new Date()
console.log(a.getHours())
console.log(a.getMinutes())


var g = svg1.append('g')
	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

var face = g.append('g')
	.attr('transform', 'translate(' + r + ',' + r + ')');


face.append("text")
    .attr('x',0)
    .attr('y',-1.1*r)
    .text("12 PM")
    .attr('text-anchor', 'middle')
    .attr('fill','white')
face.append("text")
    .attr('x',1.3*r)
    .attr('y',5)
    .text("6 PM")
    .attr('text-anchor', 'middle')
    .attr('fill','white')
face.append("text")
    .attr('x',0)
    .attr('y',1.2*r)
    .text("24 AM")
    .attr('text-anchor', 'middle')
    .attr('fill','white')
face.append("text")
    .attr('x',-1.3*r)
    .attr('y',5)
    .text("6 AM")
    .attr('text-anchor', 'middle')
    .attr('fill','white');

var morning = face.append("svg:image")
            .attr('x',-r)
            .attr('y',-r)
            .attr('width', r)
            .attr('height', r)
            .attr("xlink:href", "timezone/morning.png")
            .style('opacity',0.4)
var afternoon = face.append("svg:image")
                .attr('x',0)
                .attr('y',-r)
                .attr('width', r)
                .attr('height', r)
                .attr("xlink:href", "timezone/afternoon.png")
                .style('opacity',0.4)
var evening = face.append("svg:image")
                .attr('x',0)
                .attr('y',0)
                .attr('width', r)
                .attr('height', r)
                .attr("xlink:href", "timezone/evening.png")
                .style('opacity',0.4)
var crazytime = face.append("svg:image")
                .attr('x',-r)
                .attr('y',0)
                .attr('width', r)
                .attr('height', r)
                .attr("xlink:href", "timezone/crazytime.png")
                .style('opacity',0.4)

// initiate status
var status
var a = new Date()
crt_h = a.getHours()
crt_m = a.getMinutes()
crt_h += crt_m/60


// initial: assign to status and change opacity
if (crt_h>=0 && crt_h<=6){
    status = 'Crazytime'
    crazytime.style('opacity',1.0)
} 
if  (crt_h>6 && crt_h<=12)
{
    status = 'Morning'
    morning.style('opacity',1.0)

   
}

if (crt_h>12 && crt_h<18){
    status = 'Afternoon'
    afternoon.style('opacity',1.0)
 
}
if (crt_h>=18 && crt_h <24){
    status = 'Evening'
    evening.style('opacity',1.0)
   
}
console.log(status)
// color of the clock, just styling
face.append('circle')
	.attr({
		class: 'outline',
		r: r,
		cx: 0,
		cy: 0,
		fill: '#f7f7f7',
        opacity: 0.0
	});


var hands = face.append('g');


//define the lines of the three hands
hands.selectAll('line')
	.data(handData)
    
    .enter().append('line')
	.attr({
		class: function(d) { return d.type + '-hand'; },
		x1: 0, //starting point
		y1: 0, //ending point
		x2: function(d) {

			return -d.length * Math.cos(Math.PI*(d.value+6)/12);

		},
		y2: function(d) {

			return -d.length * Math.sin(Math.PI * (d.value+6)/12);
		}
	})
	.call(drag);


// small circle in middle to cover hands, just styling
face.append('circle')
	.attr({
		cx: 0,
		cy: 0,
		r: 10,
		fill: 'white',
		
	});

function dragstart() {
}

var rad


function daysegs(x,y){
    if (x>0 && x<100 && y>-100 && y <0)
        {
        return 'Afternoon';
        }
    if (x>0 && x<100 && y>0 && y <100)
        {
        return 'Evening';
        }
    if (x>-100 && x<0 && y>0 && y <100)
        {
        return 'Crazytime';
        }
    if (x>-100 && x<0 && y >-100 && y<0) {
        return 'Morning';
        }
    if (x == 100 && y ==0){
        return 'Evening';
    }
    if (x == 0 && y ==100){
        return 'Crazytime';
    }
    if (x == 0 && y ==-100){
        return 'Afternoon';
    }
    if (x == 100 && y ==0){
        return 'Evening';
    }
    if (x == -100 && y ==0){
        return 'Morning';
    }
}


function show_hour(angle){
    if (angle>-15 && angle<=0){
        return "6pm";
    }
    if (angle<=180 && angle>165){
        return "6 AM";
    }
    if (angle<=165 && angle>150){
        return "7 AM";
    }
    if (angle<=150 && angle>135){
        return "8 AM";
    }
    if (angle<=135 && angle>120){
        return "9 AM";
    }
    if (angle<=120 && angle>105){
        return "10 AM";
    }
    if (angle<=105 && angle>90){
        return "11 AM";
    }
    if (angle<=90 && angle>75){
        return "12 PM";
    }
    if (angle<=75 && angle>60){
        return "1 PM";
    }
    if (angle<=60 && angle>45){
        return "2 PM";
    }
    if (angle<=45 && angle>30){
        return "3 PM";
    }
    if (angle<=30 && angle>15){
        return "4 PM";
    }
    if (angle<=15 && angle>0){
        return "5 PM";
    }
    if (angle<=0 && angle>-15){
        return "6 PM";
    }
    if (angle<=-15 && angle>-30){
        return "7 PM";
    }
    if (angle<=-30 && angle>-45){
        return "8 PM";
    }
    if (angle<=-45 && angle>-60){
        return "9 PM";
    }
    if (angle<=-60 && angle>-75){
        return "10 PM";
    }
    if (angle<=-75 && angle>-90){
        return "11 PM";
    }
    if (angle<=-90 && angle>-105){
        return "24 AM";
    }
    if (angle<=-105 && angle>-120){
        return "1 AM";
    }
    if (angle<=-120 && angle>-135){
        return "2 AM";
    }
    if (angle<=-135 && angle>-150){
        return "3 AM";
    }
    if (angle<=-150 && angle>-165){
        return "4 AM";
    }
    if (angle<=-165 && angle>-180){
        return "5 AM";
    }
}

var crt_status



function drag() {
	
	rad = Math.atan2(d3.event.y, d3.event.x);	
	d3.select(this)
		.attr({
			x2: function(d) {
				return r * Math.cos(rad);
                console.log(r * Math.cos(rad))
			},
			y2: function(d) {
				return r * Math.sin(rad);
			}
		}); 

    var angle = d3.format(".1f")(-180/Math.PI*Math.atan2(d3.event.y, d3.event.x));
    
    
        var drag_x = 95*Math.cos(angle*Math.PI/180);
        var drag_y = -95*Math.sin(angle*Math.PI/180);
   
    console.log(angle);
    console.log(drag_x);
    console.log(drag_y);

    
    crt_status = daysegs(r * Math.cos(rad),r * Math.sin(rad))
//    console.log(angle);
    console.log(crt_status)
    
    if (d3.select('.crt_info')){
        d3.select('.crt_info').remove();
         d3.select('.crt_status').remove();
        face.append("text")
        .attr('x',drag_x)
        .attr('y',drag_y)
        .attr('class',"crt_info")
        .style('font-size', "8px")
    
        .text(show_hour(angle))
        .attr('text-anchor', 'middle')
        .attr('fill','white')
        
       
        
      
       
        
    }
      
    else{
        
        face.append("text")
        .attr('x',drag_x)
        .attr('y',drag_y)
        .attr('class',"crt_info")
        .text(show_hour(angle))
        .style('font-size', "8px")
        .attr('text-anchor', 'middle')
        .attr('fill','white')
        
        
    }
    if (crt_status!= status){
       if (status == 'Morning'){
           morning.style('opacity',0.4)
       }
       if (status == 'Afternoon'){
           afternoon.style('opacity',0.4)
       }
       if (status == 'Evening'){
           evening.style('opacity',0.4)
       }
       if (status == 'Crazytime'){
           crazytime.style('opacity',0.4)
       }
       
       if (crt_status == 'Morning'){
           morning.style('opacity',1.0)
       }
       if (crt_status == 'Afternoon'){
           afternoon.style('opacity',1.0)
       }
       if (crt_status == 'Evening'){
           evening.style('opacity',1.0)
       }
       if (crt_status == 'Crazytime'){
           crazytime.style('opacity',1.0)
       }
       
    }
    status = crt_status
    
    
    
}

function dragend() {

}


var svgname
var explanation
var prv_cocktail = null
// just claim
var crtimg = svg.append("svg:image")
var bbox = svg.append("svg:image")
var crttext = svg.append("text")


var prv_status  = status

//cocktail image
var x_cocktail = w *0.2
var ini_posimg = [w*0.1,h*0.8]
var pos_img = [w*0.5,h*0.8]
var size_img = [w*1.3,w*1.3]

//text in bubble
var ini_postxt = [w*2.4,200]
var postxt = [w*2.7,200]


var g_exp = svg.append('g')

var crtexp = g_exp.append("text")
            .attr('width', "100")
            .attr('height',"100")
            

var ini_posexp = [w,290]
var posexp =  [w*1.6,450]

//bubble
var ini_posbox = [w,200]
var posbox = [w*1.8,120]
var size_box = [370,350]

var desc = svg.append("svg:image")

var repmsg = svg.append('text')
                .attr("text","‘Meh you are too boring. Try with different combinations of mood, time and flavor!’")
                .attr('x',300)
                .attr('y',500)
             



function findDrink(name)
{
    return "/donut.html?" + encodeURI(name);
}
    
    