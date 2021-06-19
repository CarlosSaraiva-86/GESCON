const express = require("express");
const cookieSession = require("cookie-session");
const passport = require("passport");
const cors = require("cors");
const axios = require("axios");

//criando uma instância do express
const app = express();

//getting the local authentication type
const LocalStrategy = require("passport-local").Strategy;

app.use(express.json());
// app.use(cors());
app.use(cors({ credentials: true, origin: "http://localhost:8080" }));

app.use(
    cookieSession({
        name: "S3CreT",
        keys: ["vueauthrandomkey"],
        maxAge: 100,
    })
);


passport.use(new LocalStrategy({
    usernameField: "usuario",
    passwordField: "senha"
},
    (username, password, done) => {
       axios.post("http://localhost:8888/api/login", {usuario: username, senha: password})
        .then(response => {
            done(null, response.data);
        }).catch(error => { done(null, false, { message: "Usuário ou senha incorreto!" }); });
    })
);


app.use(passport.initialize());
app.use(passport.session());



app.post("/api/login", (request, response, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) return next(err);  
      if (!user)
        return response.status(400).send([user, "Não foi possível logar!", info]);
      request.login(user, (err) => {
        response.send(user);
      });
    })(request, response, next);
  });

  
  app.get("/api/logout", function (request, response) {
    req.logout();
  
    console.log("logged out");
  
    return res.send();
  });
  
  const authMiddleware = (request, response, next) => {
    if (!request.isAuthenticated()) {
        console.log("Não está logado!");
      response
        .status(401)
        .send("Você não está autorizado à acessar este recurso!");
    } else {
      next();
    }
  };
  
  app.get("/api/user", authMiddleware, (request, response) => {
    axios.get("http://localhost:8888/api/login/" + request.session.passport.user)
    .then(object => {
      response.send({ userid: object.data.idlogin, username: object.data.usuario });
    }).catch(error => console.log(error));  
  });
  
  //Chamado na direção back-end->front-end
  passport.serializeUser((user, done) => {
    done(null, user.idlogin);
  });
  
  //Chamado na direção front-end->back-end
  passport.deserializeUser((id, done) => {
    let user = axios.get("http://localhost:8888/api/login/" + id)
    .then(response => {
        return response.data;
    }).catch(error => console.log(error));
  
    done(null, user);
  });
  
  app.listen(3030, () => {
    console.log("Servidor auth está ouvindo na porta 3030!");
  });
  