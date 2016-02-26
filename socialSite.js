FriendsList = new Mongo.Collection("FriendsList");

if (Meteor.isClient) {
    
    Meteor.subscribe("users");
    
    var email,pass,firstName,lastName, birthMonth, birthYear;
    
    routeAll();
    
    Template.register.events({
        "submit form":function(event){
            event.preventDefault();
            email = $('[name=registerEmail]').val();
            pass = $('[name=registerPassword]').val();
            firstName = $('[name=firstName]').val();
            lastName = $('[name=lastName]').val();
            birthMonth = $('[name=month]').val();
            birthYear = $('[name=year]').val();
            console.log(birthMonth + ", " + birthYear);
            event.target.registerEmail.value = "";
            event.target.registerPassword.value = "";
            Meteor.call("_registerNewUser",email,pass,firstName,lastName,birthMonth,birthYear);
            Meteor.loginWithPassword(email, pass);
            Router.go("profile");
        }
    });
    
    Template.login.events({
        'submit #logInForm': function(event) {
            event.preventDefault();
            email = $('[name=loginEmail]').val();
            pass = $('[name=loginPassword]').val();
            event.target.loginEmail.value = "";
            event.target.loginPassword.value = "";
            Meteor.loginWithPassword(email, pass);
        }
    });
    
    
    Handlebars.registerHelper('currentUser',function(){
        return Meteor.user();
    });
    
    Template.main.events({
        //MAKE SURE THE ID OF THE SIDE BAR ELEMENT MATCHES THE ROUTER
        "click .sideBarElement":function(event){
            event.preventDefault();
            if(event.currentTarget.id!="logOut"){
                Router.go(event.currentTarget.id);
            }else{
                Meteor.logout();
                Router.go("login");
            }
        }
    });
    
    Template.friends.helpers({
        users:function(){
            return Meteor.users.find().fetch();    
        },
        user:function(){
            return Meteor.users.find({}, {sort: {firstName: 1}});    
        }
    });
    
    Template.friends.events({
        "click .user":function(event){
            console.log(event.currentTarget.id);
            //GO TO THAT PERSONS PROFILE
        }
    });
    
    Accounts.onLoginFailure(function(){
        Router.go("login"); 
    });
    
    Accounts.onLogin(function(){
        Router.go("profile");
    });  
    
    function routeAll(){
        console.log("USERS: " + Meteor.users.find().fetch());
        Router.configure({
            layoutTemplate:"main"    
        });

        Router.route("/login",{
            name: 'login',
            template: 'login'            
        });
        Router.route("/register",{
            name: 'register',
            template: 'register'
        });
        
        Router.route("/profile",{
            name: 'profile',
            template: 'profile'
        });  
        
        
        Router.route("/feed",{
            name: 'feed',
            template: 'feed'
        });  
        
        Router.route("/friends",{
            name: 'friends',
            template: 'friends'
        }); 

        Router.route('/', function() {
            this.render("login")
        });    
    }
}

if (Meteor.isServer) {
    
    console.log("USERS: " + Meteor.users.find().fetch());
    
    var currentUserId;
    
    Meteor.startup(function () {
        console.log("Started Server!");
    });
    
    /*
    Meteor.publish("friends",function(){
        currentUserId = this.userId;
        return FriendsList.find({createdBy: currentUserId})
    });
    */
    
    Meteor.publish("users",function(){
        return Meteor.users.find();
    });
    
    
    Meteor.methods({
        _registerNewUser:function(email,pass,firstName,lastName,birthMonth,birthYear){
            Accounts.createUser({
                email:email,
                password:pass,
                profile: {
                    firstName: firstName,
                    lastName: lastName,
                    birthMonth: birthMonth,
                    birthYear: birthYear
                },
            });    
        }
    });
}