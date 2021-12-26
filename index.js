var msgs = []		
		function NewMsg(msg) {
			msgs.push(msg)
			document.getElementById('messages').innerHTML = msgs.join("")
		}
		var peer = new Peer()
		var conn
		peer.on('open', function(peerID) {
			document.getElementById('myid').innerHTML = peerID		
		})
		peer.on('connection', function(cnct) { 
			conn = cnct
			CreateConnection()
		})
		function ConnectToOther(otnerPeer) {
			conn = peer.connect(otnerPeer)
			CreateConnection()
		}
		function CreateConnection() {
			conn.on('open', function() { 
				  NewMsg("<div><h4>CONNECTION ESTABLISHED</h4></div>")
				  conn.on ('data', function(data) { 
				      NewMsg("<div><b>Other peer: </b>"+data+"</div>")
				  })
			})
			conn.on('close', function() {
                NewMsg('CONNECTION BROKEN!')
            })
		}
		function Send(myMsg) {
			NewMsg("<div><b>Me: </b>"+myMsg.value+"</div>")
			conn.send(myMsg.value)
        }