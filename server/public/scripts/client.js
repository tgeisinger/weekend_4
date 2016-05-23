$(document).ready(function() {
    postTasks();
    $('#dataDisplay').on('click', '.remove', deleteTask);
    $('#dataDisplay').on('click', '.complete', function() {

        completeTask($(this).data('id') + '');

    });



    //$(e.currentTarget).parent().removeClass('incomplete');
    //$(e.currentTarget).addClass('complete');




    $('#task').on('submit', function() {
        event.preventDefault();
        var values = {};
        $.each($('#task').serializeArray(), function(i, field) {
            values[field.name] = field.value;
        });

        $.ajax({
            type: 'POST',
            url: '/task',
            data: values,
            success: function() {
                $('#dataDisplay').empty();
                postTasks();
                console.log('post complete');
            }
        });

    });

    function postTasks() {
        $.ajax({
            type: 'get',
            url: '/task',
            success: function(data) {
                console.log(data);
                data.forEach(function(task) {

                    $('#dataDisplay').append('<tr>' +
                        '<td class = "row">' + task.tasks_not_completed + '</td>' +

                        '<td>' + '<button class="complete" data-id =' + task.id + ' >Complete</button>' + '</td>' + '<td>' + '<button class="remove" data-id =' + task.id + ' >Remove</button>' + '</td>' +
                        '</tr>');

                });
            }
        })
    }

    function deleteTask() {
        var Id = getId($(this));
        var button = $(this);
        $.ajax({
            type: 'delete',
            url: '/task/' + Id,
            success: function() {
                $(button).parent().parent().remove();

            }
        });

    }

    function getId(button) {
        //get the ID
        var taskId = button.data('id');
        console.log('getId', taskId);
        return taskId;
    }

    function completeTask(updateData) {
        var updateId = {};
        updateId.id = updateData;
        console.log(updateId);

        $.ajax({
            type: 'PUT',
            url: '/task',
            data: updateId,
            success: function(data) {


                console.log(data);
                console.log('this ran');

            }


        });


    }

});
