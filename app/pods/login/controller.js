import Ember from 'ember';

$.ajaxSetup({
	xhrFields: {
	  withCredentials: true
	}
  });
  
export default Ember.Controller.extend({
	
	d:'lo',

	actions: {
	fetch : function(){
		Ember.$.ajax({
			url:'http://localhost:8080/BackendTask/Fetch',
			type:'GET',
			dataType:'json',
			data:{'param':'Fetch'},
			 success:function(data){
				var datastring=$.parseJSON(JSON.stringify(data));
			 var res=datastring[0].result;
			 var res1 = $.trim(res);
			 if(res1=="true"){
				 var uname=datastring[0].uname;
				 var uname1 = $.trim(uname);
				 var upass=datastring[0].upass;
				 var upass1 = $.trim(upass);
				 $('#luname').val(uname1);
				 $('#lupass').val(upass1);
			 }
			 else{
				 alert("Please login");
			 }
			},
			error: function(error){
				alert("error");
			}
		});
	},

    login: function() {
      var loginUsername = $('#luname').val();
      var loginPassword = $('#lupass').val();
	  var parameter = 'Login';
	var check=$("#check").prop('checked')	
	console.log(check);

      let Loginaccountdata = {
        'loginUsername' : loginUsername,
        'loginPassword' : loginPassword,
		'remember' : check,
		'param':parameter
    };
	var s="false";
	var self=this;
    Ember.$.ajax({
          url:'http://localhost:8080/BackendTask/taskcore/',
          type:'POST',
		  dataType:'json',
          data:Loginaccountdata,
		  xhrFields: {
			withCredentials: true
		},
		  success:function(data){
			  var datastring=$.parseJSON(JSON.stringify(data));
			  var loginUsername = datastring[0].loginusername;
               var loginPassword = datastring[0].loginpassword;
               var res = datastring[0].result;
			   var result = $.trim(res);
			   
			   $('.loginresponse').html(result);
			  const s1= result;
			  const s2="Successfullogin";
			  const s3="Userinvalid";
			  const s4="Passinvalid";
			  s="true";
			  if(s1==s2)
			  {
				  console.log(datastring[0].loginusername+"------------>");
				  console.log(datastring[0].remember+"------------>");
				  console.log(datastring[0].loginpassword+"------------>");
				  console.log(datastring[0]);
				  search();
			  }
		  },
		   error:function(error){
			  alert(error);
		  }
      });
	  	  function search(){
			  $("#whole").css("margin-top", "-155px");
			self.transitionToRoute('mytask');	  
		  }
    }
  }
});

