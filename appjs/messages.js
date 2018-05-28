/**
 * Created by manuel on 5/8/18.
 */

// Load the Visualization API and the piechart package.
google.charts.load('current', {'packages': ['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);

function reformatData(jsonData){
    var temp= jsonData.Message_count;
    console.log("temp: " + JSON.stringify(temp));
    var result = [];
    var i;
    var row;
    for (i=0; i < temp.length; ++i){
        row= temp[i]
        dataElement = [];
        dataElement.push(row.date);
        dataElement.push(row.count);
        result.push(dataElement);
    }
    console.log("Data: " + JSON.stringify(result));
    return result;
}

function drawChart() {
    var jsonData = $.ajax({
        url: "http://localhost:5000/MessageApp/dashboard/dailymessages",
        dataType: "json",
        async: false
    }).responseText;

    console.log("jsonData: " + JSON.parse(jsonData));

    // Create our data table out of JSON data loaded from server.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Date');
    data.addColumn('number', 'Messages');
    data.addRows(reformatData(JSON.parse(jsonData)));

    var options = {
        title: 'Messages Per Day',
        width: 400,
        height: 300,
        chartArea: {width: '50%'},
        hAxis: {
            title: 'Date',
            minValue: 0
        },
        vAxis: {
            title: 'Total Messages Posted'
        }
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('message_chart_div'));

    chart.draw(data, options);

}


google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawChart);


