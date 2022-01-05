//Client [suscriber]: dont forget to include this module into the home.ejs
//this class will send a request for connection to backend
class ChatEngine{
    constructor(chatBoxId,userEmail){
        this.chatBox=$(`#${chatBoxId}`);
        this.userEmail=userEmail;
        this.CHATROOM='myRoom';

        this.socket=io.connect("http://localhost:5000");

        if(this.userEmail){
            this.connectHandler();
        }
    }

    connectHandler(){
        let self=this;

        this.socket.on("connect",function(){
            console.log("connection established using Web-sockets....!");

            self.socket.emit('joinRoom',{
                user_email: self.userEmail,
                chatRoom: self.CHATROOM
            });
        });

        $('#send-message').on('click',()=>{
            let msg=$('#chat-message-input').val();

            if(msg!=''){
                $('#chat-message-input').val("");
                self.socket.emit('send_message',{
                    msg: msg,
                    userEmail:self.userEmail,
                    chatRoom: self.CHATROOM
                });
            }
        });

        self.socket.on('rcvd_msg',(data)=>{
            // console.log(data); //now show the message in chatBox
            // steps: make new li, add InputMessage to it, add its className, append to the chatBox 
            let li=$('<li>').html(`<span>${data.msg}<span/>`);
            
            let className;
            if(data.userEmail!=self.userEmail){
                className='other-message';
            }
            else{
                className='self-message';
            }
            li.addClass(className);

            $('#chat-messages-list').append(li);
        })

    }
}

// io is global function, made available by including the cdn file of socket.io[imported in home.ejs].
// we call io() to establish the connection with the backend
// emit only has event_name and event_obj. on has event_name and a callback func
// on is event detection. Only when the userEmail is verified/SignedIn we allow for connection. 

/*
connection is initiated via frontEnd, io.connect('....') will try to connect to the backend (chat_socket in config). In backend, this connection req is recieved and is acknowledged back to the 
frontend, this connection is recieved by the frontend, via already runnning function named connectHandler.[It was running already since the user was signed-In, incase not signed-in this chatHandler would never run, hence no connection from the backend would be recieved]. 

2 check levels are established: 
check-1 : If the user is logged-in i.e, req.user or locals.user is valid; then only make an object of the class chatEngine and try to send the connection req to backend. [home.ejs]
check-2 : If the user is signed-in i.e, userEmail is defined, then only call the connectHandler method which recieves the connection req emitted(automatically) from the backend[after we initiated from frontEnd]. [this file]
*/

/*
creating chat rooms:-
self=this is aliasing the this
*/

/*
SUMMARY:-
1. On successful connection, create a chatRoom [ self.socket.emit('joinRoom'...)]
2. When send button is clicked, extract the input_message, make the input-message-area empty and emit the send_message event with the data
3. Recieve the rcvd_msg event from backend and display the message on the frontend
*/