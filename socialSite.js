if (Meteor.isClient) {
    
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
    
    
    Handlebars.registerHelper('user',function(){
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
    
    Accounts.onLoginFailure(function(){
        Router.go("login"); 
    });
    
    Accounts.onLogin(function(){
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
        console.log("Started Server!");
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