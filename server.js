var express = require('express'); 
var app = express(); 
var router = express.Router(); 
var bodyParser = require('body-parser')

var server = require('http').createServer(app)
var io = require('socket.io')(server);


var projects = [{'id':0,'sid':'A123','name': 'Iphone','price':'200'},
                {'id':1,'sid':'A124','name': 'Nokia','price':'25'},
                {'id':2,'sid':'B225','name': 'Samsung','price':'150'},
                {'id':3,'sid':'B226','name': 'camera','price':'250'},
                {'id':4,'sid':'C327','name': 'bike','price':'120'},
                {'id':5,'sid':'C328','name': 'computer','price':'320'}
                ]

var tmp0 = projects[0].price;
var tmp1 = projects[1].price;
var tmp2 = projects[2].price;
var tmp3 = projects[3].price;
var tmp4 = projects[4].price;
var tmp5 = projects[5].price;


app.use(express.static(__dirname+'/public'))

server.listen(8000)

console.log("Server is running")
io.sockets.on('connection', function (socket) {

      
    
      

      // listen to incoming bids
      socket.on('bid', function(content) {

           // echo to the sender
      console.log(content)
           socket.emit('bid',{ amount : content.amount });
     

        // broadcast the bid to all clients
           socket.broadcast.emit('other bid', 'admin : '  + content.amount);
           

      });
});




var idx = 2;

router.route('/projects') 	  
    .get(function(req, res) {    	
    	res.json(projects);
    })


	.post(function(req, res) { 
		var project = {}; 
		project.id = idx++;
		project.sid = req.body.sid
		console.log(req.body.sid)
		project.name = req.body.name
		project.price = req.body.price
		projects.push(project); 
		res.json({message : 'Success'})
    
	}) 


router.route('/projects/:project_id')
	.get (function(req,res) {
    	res.json(projects[req.params.project_id])
    })

	.put (function(req,res) {
		var id = req.params.project_id

        projects[id].sid = req.body.sid;  
        projects[id].name = req.body.name;
        
        

      
          if(tmp0<req.body.price){            
             projects[id].price = req.body.price
             console.log(req.body.name +' price max :'+ projects[id].price)
             tmp0 = projects[id].price
          }
          else if(tmp1<req.body.price){            
             projects[id].price = req.body.price
             console.log(req.body.name +' price max :'+ projects[id].price)
             tmp1 = projects[id].price
          }
          else if(tmp2<req.body.price){            
            projects[id].price = req.body.price
            console.log(req.body.name +' price max :'+ projects[id].price)
            tmp2 = projects[id].price
          }
          else if(tmp3<req.body.price){
            projects[id].price = req.body.price
            console.log(req.body.name +' price max :'+ projects[id].price)
            tmp3 = projects[id].price
             
          }
          else if(tmp4<req.body.price){
            projects[id].price = req.body.price
            console.log(req.body.name +' price max :'+ projects[id].price)
            tmp4 = projects[id].price
             
          }
          else if(tmp5<req.body.price){

              projects[id].price = req.body.price
              console.log(req.body.name +' price max :'+ projects[id].price)
              tmp5 = projects[id].price
               
            }
            else{
              console.log(req.body.name +' Less than price')
            }
          
            res.json({ message: 'project updated!' });    
     })

	.delete (function(req,res) {
		var id = req.params.project_id
		delete 	projects[id]
        res.json({ message: 'project deleted!' });        
    })
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' }) 
});

app.use('/api', bodyParser.json(), router);  
 
app.use("*",function(req,res){
  res.status(404).send('404 Not found');
});


/*app.listen(8000, function() {
	console.log("Server is running")

});
*/
    


	