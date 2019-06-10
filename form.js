function submitForm(e) {
  e.preventDefault()
  var URL = "Enter API Gateway URL (staging url)"

  var validFormat = /^\d{4}-\d{2}-\d{2}$/
  if (!validFormat.test($("#recordDate").val())) {
    alert("Invalid Date Format. Please correct and submit again.")
  }
  else {
    var data = {
      userName : $("#userName").val(),
      weight : $("#weight").val(),
      recordDate : $("#recordDate").val(),
    }

   $.ajax({
      type : "POST",
      url : URL,
      crossDomain : true,
      data : JSON.stringify(data),
      xhrFields : {
        withCredentials : true
      },
      success : function () {
        alert("Weight recorded!")
        document.getElementById("weightForm").reset()
      },
      error : function () {
        alert("Error - something went wrong")
      }
    })
  }
}

function getProgress(e) {
  e.preventDefault()

  var userName = $("#user").val();

  var URL = "https://cjvol1xll8.execute-api.us-east-1.amazonaws.com/DEV/weightwatcher/";
  url1 = URL + userName;

  CHART = document.getElementById('chartdiv');
  Plotly.purge(CHART);

  var x1 = [];
  var y1 = [];

  $.ajax({
    type : "GET",
    url : url1,
    crossDomain : true,
    xhrFields : {
        withCredentials : true
    },
    success : function (response) {
      for(var i =0; i < response.Items.length; i++)
      {
        var item = response.Items[i];
        x1.push(item.recordDate);
        y1.push(item.weight);
      }

      Plotly.plot( CHART, [{
	       x: x1,
	       y: y1 }], {
	          margin: { t: 0 } } );
    },
    error: function () {
      alert("Error - something went wrong")
    }
  })
}
