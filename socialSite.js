var email,pass,firstName,lastName, birthMonth, birthYear;

if (Meteor.isClient) {
    
    
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
            Router.go("login");
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
    
    Template.main.helpers({
        name:function(){
            return Meteor.user().profile.firstName;    
        }
    });
    
    Template.main.events({
        "click .sideBarElement#profile":function(event){
            event.preventDefault();
            Router.go("profile");
        },
        "click .sideBarElement#feed":function(event){
            event.preventDefault();
            Router.go("feed");
        },
        "click .sideBarElement#logOut":function(event){
            event.preventDefault();
            Meteor.logout();
            Router.go("login");
        },
    });
    
    Accounts.onLoginFailure(function(){
        console.log("failed to log in"); 
        Router.go("login"); 
    });
    
    Accounts.onLogin(function(){
        console.log("logged in");
        Router.go("profile");
    });  
    
    function routeAll(){
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

        Router.route('/', function() {
            this.render("login")
        });    
    }
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        
    });
}
