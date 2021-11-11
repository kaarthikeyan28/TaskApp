import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    signup: function() {
              var createname = this.get('createname');
                var createusername = this.get('createusername');
                //var createuseremail = this.get('createuseremail');
                var createpassword = this.get('createpassword');
                
                let Createaccountdata = {
                  'createusername' : createusername,
                  'createpassword' : createpassword,
                  //'createuseremail' : createuseremail,
                  'createname' : createname
              };

            console.log(Createaccountdata);

            var self=this;
              Ember.$.ajax({
                    url:'http://localhost:8080/BackendTask/registerBackend',
                    type:'POST',
                    data:Createaccountdata,
                success:function(data){
                  search();
                  console.log("Success");
                },
                error:function(error){
                  alert(error);
                }
                });
                function search(){
                self.transitionToRoute('login');	  
		            }
    } 
  }
});
