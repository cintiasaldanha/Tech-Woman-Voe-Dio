var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

const Day = require("../models/day").model;
const Reservation = require("../models/reservation").model;

router.post("/", function(req, res, next){
    Day.find({date: req.body.date}, (err, days) => {
        if(!err){
            if(days.length > 0){
                let day = days[0];
                day.tables.forEach(table => {
                    table.reservation = new Reservation({
                        nome: req.body.name,
                        phone: req.body.phone,
                        email: req.body.email
                    });
                    table.isAvailable = false;
                    day.save(err => {
                        if(err){
                            console.log(err)
                        } else{
                            console.log("Reservado");
                            res.status(200).send("Nova reserva cadastrada");
                        }
                    })                    
                });
            }
        } else {
            console.log("Data não encontrada.");
        }
    })
})

module.exports = router;