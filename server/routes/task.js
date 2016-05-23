var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/mu';


router.post('/', function(req, res) {
    var values = req.body;

    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            res.sendStatus(500);
        }

        client.query('INSERT INTO tasks (tasks_not_completed) ' +
            'VALUES ($1)', [values.task],
            function(err, result) {
                done();

                if (err) {
                    res.sendStatus(500);
                    return;
                }

                res.sendStatus(201);
            });
    });
});

router.get('/', function(req, res) {
    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            res.sendStatus(500);
        }

        client.query('SELECT * FROM tasks', function(err, result) {
            done();



            res.send(result.rows);
        });
    });
});


router.delete('/:id', function(req, res) {
    var id = req.params.id;

    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }

        client.query('DELETE FROM tasks ' +
            'WHERE id = $1', [id],
            function(err, result) {
                done();

                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                    return;
                }

                res.sendStatus(200);
            });
    });
});

router.put('/', function(req, res){
    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            res.sendStatus(500);
        }
    var value = parseInt(req.body.id);
        client.query('UPDATE tasks SET completed_tasks = $1 where id =' + value, [true],
         function(err, result) {
            done();


            if (err) {
                res.sendStatus(500);
                return;
            }
            res.send(result.rows);

        });
    });
});




module.exports = router;
