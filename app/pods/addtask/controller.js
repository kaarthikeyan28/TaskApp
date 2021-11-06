import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		logout : function(){
			$("#whole").css("margin-top", "0px");
			this.transitionToRoute('login');
		},
	    assignto: function() {
		Ember.$.ajax({
			url:'http://localhost:8080/BackendTask/assignUser',
			type:'GET',
			dataType:'json',
			success:function(data){		
				var datastring=$.parseJSON(JSON.stringify(data));
				console.log(datastring);
				var student=' ';
				student += '<select id="userassign">';
				$(datastring).each(function (index, item){
					var name=item.username;
					student += '<option value="'+name+'">';
					student += name;
					student += '</option>';
				});
				student += '</select>';
				$('#assignuser').append(student);
			},
			error:function(error){
			  alert(error);
		    }
		})
	},

    createtask: function() {
      var taskname = this.get('taskname');
      var taskdescription = this.get('taskdescription');
	  var taskassign = $('#userassign').val();
      let taskdata = {
        'taskname' : taskname,
        'taskdescription' : taskdescription,
		'taskassign' : taskassign,
    };
	
	 var s1="false";
	 var self=this;

	Ember.$.ajax({
          url:'http://localhost:8080/BackendTask/addtask',
          type:'POST',
		  dataType:'text',
          data:taskdata,
		  success:function(data){
			 var datastring=$.parseJSON(JSON.stringify(data));
			 var res=datastring[0].result;
			 var res1 = $.trim(res);
			 search1();
		  },
		  error:function(error){
			  alert(error);
		  }
      });
    
	function search1(){
			  $("#whole").css("margin-top", "-155px");
			self.transitionToRoute('mytask');	  
		  }
    }
  }
});

