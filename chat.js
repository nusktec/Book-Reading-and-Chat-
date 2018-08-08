var you_name="";
var count = 0;

var time = new Date();
time = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();

var myref = firebase.database().ref();

//send has joined
myref.child("chat").child("info").set("iphone_users~`i`~An iOS user has joined at "+time);


myref.child("chat").child("info").on('value', function(e){
	var ap = "<center><i style='width: 100%; color: grey;'>"+e.val().toString().split("~`i`~")[1]+"</i></center><br>";
$('#chat-box').append(ap);
	
var objDiv = document.getElementById("chat-box");
objDiv.scrollTop = objDiv.scrollHeight;
});

//Show is typing
myref.child("chat").child("typing").on('value', function(e){
	if(e.val()&&e.val()!=you_name){
		document.getElementById('istyping').innerHTML=e.val().toString().split("~`i`~")[1]+" is typing...";
	}else{
		document.getElementById('istyping').innerHTML=you_name;
	}
});

var inMSG = myref.child("chat").child("message");


inMSG.on('child_added', function(e){
	//alert(e.val());
	$("#txt_msg").val("");
				
	count++;
	addmsg(e);
});

var tmp_topic;
var fr = false;

function addmsg(e){
	var sender = e.val().toString().split("~`i`~")[1].split(":")[0];
	var date = e.val().toString().split("~~``ii``~~")[1];
	var msg = e.val().toString().split("~`i`~")[1].split("~~``ii``~~")[0].split(":")[1];
	
	var chat = "<div style='font-family: arial' class='clearfix'><div class='message-data'><span class='message-data-name' >"+sender+"</span></div><div class='message my-message'>"+msg+"</div></div>";
	
	if(tmp_topic==date){
		tmp_topic = date;;
	}else{
		$('#chat-box').append("<span class='align-right' style='color: red; font-size: 10px; width:100%; float: right;' class='message-data-time'>"+date+"</span> &nbsp; &nbsp;");
		tmp_topic = date;
	}
	
	
$('#chat-box').append(chat);
	
var objDiv = document.getElementById("chat-box");
objDiv.scrollTop = objDiv.scrollHeight;
}

$( "#txt_msg" ).keypress(function() {
  if($( "#txt_msg" ).val().length>3){
	 if(you_name==""){
		 
	 }else{
		 myref.child("chat").child("typing").set("iphone_useres~`i`~"+you_name);
		 setTimeout(function(){
			 myref.child("chat").child("typing").set("");
		 },10000);
	 }
  }
});

function send_msg(){
	if(you_name==""){
		alertify.prompt("Enter your desired Username", function(e1,e2){
			you_name = e2;
		});
	}else{
		//now you can send.........
		//First checked if message not empty....
		//alert(you_name + " " + count + date_use);
		if($("#txt_msg").val().length>0){
			var time2 = new Date();
			time2 = time2.getHours() + ":" + time2.getMinutes() + ":" + time2.getSeconds();

			//count++;
			myref.child("chat").child("message").child(count+1).set("iOS_USER~`i`~"+you_name+": "+$("#txt_msg").val()+"~~``ii``~~"+topic_use.toLowerCase()+"-"+date_use+" "+time2);
		}
	}
}





/*

    <div class="clearfix">
            <div class="message-data align-right">
              <span class="message-data-time" >10:10 AM, Today</span> &nbsp; &nbsp;
              <span class="message-data-name" >Olia</span>
            </div>
            <div class="message other-message float-right">
              Hi Vincent, how are you? How is the project coming along?
            </div>
          </div>
		  
		  
		  
		  <div class="clearfix">
		 
            <div class="message-data">
              <span class="message-data-name">Vincent</span>
              <span class="message-data-time">10:12 AM, Today</span>
            </div>
            <div class="message my-message">
              Are we meeting today? Project has been already finished and I have results to show you.
            </div>
        
		  </div>
		  
*/
