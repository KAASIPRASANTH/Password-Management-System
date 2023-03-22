
//if it's add_user js file
$("#add_user").submit(function(event){
    alert("Data Inserted successfully!");
})


//if it's update_user js file
$("#update_user").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}
    $.map(unindexed_array,function(n,i){
        data[n['name']] = n['value']
    })

    //ajax for passing parameter with url method
    var request = {
        "url":`http://localhost:5500/api/users/${data.id}`,
        "method":"PUT",
        "data":data
    }
    $.ajax(request).done(function(response){
        alert("Data Updated Successfully!");
        location.reload();
    })
})


if(window.location.pathname == "/index1"){

    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url":`http://localhost:5500/api/users/${id}`,
            "method":"DELETE",
        }
        if(confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function(response){
                alert('Data Deleted Successfully!');
                location.reload();
            })
        }
    })

}