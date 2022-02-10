$(document).ready(function () {
  // global data
  products = [
    { id: 101, name: "pc", brand: "dell", os: "windowOs" },
    { id: 102, name: "laptop", brand: "dell", os: "windowOs" },
    { id: 103, name: "pc", brand: "lenovo", os: "windowOs" },
    { id: 104, name: "laptop", brand: "lenovo", os: "windowOs" },
    { id: 105, name: "pc", brand: "dell", os: "linux" },
    { id: 106, name: "laptop", brand: "lenovo", os: "linux" },
    { id: 107, name: "pc", brand: "sony", os: "linux" },
    { id: 108, name: "laptop", brand: "apple", os: "ios" },
    { id: 109, name: "laptop", brand: "hp", os: "cromebook" },
    { id: 110, name: "laptop", brand: "hp", os: "windowOs" },
    { id: 210, name: "laptop", brand: "sony", os: "cromebook" },
  ];
  removed_row = [];
  //Append options for filter
  $.fn.appendOption = function (filterValue) {
    let str = "";
    for (let i = 0; i < filterValue.length; i++) {
      str +=
        "<option value=" +
        "'" +
        filterValue[i] +
        "'>" +
        filterValue[i] +
        "</option>";
    }

    return str;
  };

  //load basic html (table)
  $.fn.loadHtml = function () {
    let Wrapperdiv = $("#wrapper");
    Wrapperdiv.empty();
    removed_row.length = 0;

    Wrapperdiv.append(
      '<input type="button" value="Reset table" onclick="$.fn.loadHtml()">'
    );
    Wrapperdiv.append('<input id="search" type=text placeholder="Search">');
    Wrapperdiv.append(
      '<div id="product_list"><table id="product-table"></table></div>'
    );
    let table = $("#product-table");
    //options for drop down
    var brandOption = $.fn.appendOption([
      "dell",
      "lenovo",
      "sony",
      "apple",
      "hp",
    ]);
    var osOption = $.fn.appendOption(["windowOs", "cromebook", "linux", "ios"]);

    var preTemplate =
      ' onchange="$.fn.filterText()"' +
      '><option selected value="all">All</option>';

    var postTemplate = "</select>";
    // appending table header
    table.append(
      "<thead>" +
        "<tr>" +
        " <th>Product Id" +
        "</th>" +
        " <th>Product Name" +
        "</th>" +
        " <th>Product Brand" +
        '<select id="filterbrand"' +
        preTemplate +
        brandOption +
        postTemplate +
        "</th>" +
        " <th>Operating System" +
        '<select id="filteros"' +
        preTemplate +
        osOption +
        postTemplate +
        "</th>" +
        "<th>Hide</th>" +
        "</tr></thred>"
    );
    //append table data
    var current;
    for (let i = 0; i < products.length; i++) {
      current = products[i];
      table.append(
        "<tr class='visible'><td>" +
          current.id +
          "</td><td>" +
          current.name +
          "</td><td>" +
          current.brand +
          "</td><td>" +
          current.os +
          "</td><td><a href='#' class='remove' data-id='" +
          current.id +
          "'>X</a></td></tr>"
      );
    }
  };
  //filter data by drop down
  $.fn.filterText = function () {
    var rex_os = new RegExp($("#filteros").val());
    var rex_brand = new RegExp($("#filterbrand").val());
    $(".visible").hide();
    var visible;
    $(".filterText").val("");
    // if os == all and brand == all
    if (rex_brand == "/all/" && rex_os == "/all/") {
      visible = $(".visible").filter(function () {
        var c = parseInt($(this).find(">:nth-child(1)").text());
        return jQuery.inArray(c, removed_row) == -1;
      });
    }
    //if  os == all and brand =='value'
    else if (rex_os == "/all/") {
      visible = $(".visible").filter(function () {
        return rex_brand.test($(this).find(">:nth-child(3)").text());
      });
    }
    //if  os == 'value' and brand == all
    else if (rex_brand == "/all/") {
      visible = $(".visible").filter(function () {
        return rex_os.test($(this).find(">:nth-child(4)").text());
      });
    }
    //if  os == 'value' and brand =='value'
    else {
      visible = $(".visible").filter(function () {
        return (
          rex_os.test($(this).find(">:nth-child(4)").text()) &&
          rex_brand.test($(this).find(">:nth-child(3)").text())
        );
      });
    }
    visible.show();
  };

  // remove row xxxxxxx
  $("body").on("click", ".remove", function () {
    let pid = $(this).data("id");
    removed_row.push(pid);
    var currentRow = $(this).closest("tr");
    currentRow.hide();
  });

  // search bar for live search
  $("body").on("keyup", "#search", function () {
    var input = $("#search").val();
    var c;
    $(".visible").hide();
    //if inputBox == empty
    if (input == "") {
      var result = $(".visible").filter(function () {
        c = parseInt($(this).children(":first").text());
        return jQuery.inArray(c, removed_row) == -1;
      });
    }
    //if inputBox == 'value'
    else {
      console.log("not empty");
      var result = $(".visible").filter(function () {
        return $(this).find("td").text().search(input.toLowerCase()) >= 0;
      });
    }

    result.show();
  });

  // calling function to load page
  $.fn.loadHtml();

  //end script
});
