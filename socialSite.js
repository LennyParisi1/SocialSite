var email,pass,firstName,lastName, birthMonth, birthYear;

if (Meteor.isClient) {
    
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
    
    Router.route('/', function() {
        this.render("login")
    });
    
    Template.login.events({
        "click .logOut":function(event){
            event.preventDefault();
            Meteor.logout();
            Router.go("login");
        },
        "click .delete":function(event){
            Meteor.users.remove({ _id: Meteor.userId()}, function (error, result) {
                if (error) {
                    console.log("Error removing user: ", error);
                } else {
                    console.log("Number of users removed: " + result);
                }
            })    
        }
    });
    
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
    
    Accounts.onLoginFailure(function(){
        console.log("failed to log in");  
    });
    
    Accounts.onLogin(function(){
        console.log("logged in");
    });   
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        
    });
}
