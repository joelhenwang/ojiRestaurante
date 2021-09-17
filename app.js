const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const nodemailer = require("nodemailer");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.get("/ementa-rodizio", function (req, res) {
    res.sendFile(__dirname + "/ementa-rodizio.html");
});

app.get("/takeaway", function (req, res) {
    res.sendFile(__dirname + "/takeaway.html");
});

app.get("/bebidas", function (req, res) {
    res.sendFile(__dirname + "/bebidas.html");
});


app.post("/send", function (req, res) {
    
    var nome = req.body.name;
    var eMail = req.body.emailto;
    var contacto = req.body.contact;
    var nPessoas = req.body.info_2;
    var diaReserva = req.body.info_1;
    var horaReserva = req.body.info_3;

    var transporter = nodemailer.createTransport({

        service: 'gmail',
        auth: {
            user: 'oji.reserva@gmail.com',
            pass: 'OjiSakura20'
        }
    });

    var mailOptions = {
        from: eMail,
        to: 'oji.restaurante@gmail.com',
        subject: 'Novo pedido de reserva: ' + nome,
        text:'Nome: ' + nome + '\nEmail: ' + eMail + '\nContacto: ' + contacto + '\nPessoas: ' + nPessoas + '\nData: ' + diaReserva + '\nHora: ' + horaReserva
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.sendFile(__dirname + "/success");
        }
        transporter.close();
    });
})


app.listen(process.env.PORT ||3000, function () {
    console.log("Server is running in port 3000.");
});

