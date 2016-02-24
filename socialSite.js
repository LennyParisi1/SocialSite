var email,pass;

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
        }
    });
    
    Template.register.events({
        "submit form":function(event){
            event.preventDefault();
            email = $('[name=registerEmail]').val();
            pass = $('[name=registerPassword]').val();
            event.target.registerEmail.value = "";
            event.target.registerPassword.value = "";
            Accounts.createUser({
                email:email,
                password:pass
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
