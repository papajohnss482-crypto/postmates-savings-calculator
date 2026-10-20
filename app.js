function money(n){ return "$" + n.toFixed(2); }

function calc(){
  var subtotal = parseFloat(document.getElementById("subtotal").value) || 0;
  var delivery = parseFloat(document.getElementById("delivery").value) || 0;
  var servicePct = parseFloat(document.getElementById("servicePct").value) || 0;
  var type = document.getElementById("promoType").value;
  var value = parseFloat(document.getElementById("promoValue").value) || 0;
  var min = parseFloat(document.getElementById("promoMin").value) || 0;
  var uber = document.getElementById("uberOne").checked;

  var serviceFee = subtotal * servicePct / 100;
  var baseTotal = subtotal + delivery + serviceFee;

  var discount = 0, codeNote = "";
  if (type !== "none") {
    if (subtotal < min) {
      codeNote = "Your order is below this code's " + money(min) + " minimum, so the code gives $0 here.";
    } else if (type === "percent") {
      discount = subtotal * value / 100;
    } else {
      discount = Math.min(value, subtotal);
    }
  }
  var withCode = baseTotal - discount;
  var withUber = subtotal + serviceFee; // delivery fee waived
  var withBoth = withUber - discount;

  var options = [
    {name: "No code, no membership", total: baseTotal},
    {name: "With your code", total: withCode},
    {name: "With Uber One", total: withUber},
    {name: "Code and Uber One (estimate, stacking is set by the app)", total: withBoth}
  ];
  var best = options[0];
  options.forEach(function(o){ if (o.total < best.total) best = o; });

  var rows = options.map(function(o){
    var mark = (o === best) ? " <strong>(best)</strong>" : "";
    return "<p>" + o.name + ": <strong>" + money(o.total) + "</strong>" + mark + "</p>";
  }).join("");

  var save = baseTotal - best.total;
  var html = rows +
    "<p class='big'>You save " + money(save) + " with: " + best.name + "</p>" +
    "<p class='small'>Breakdown of your base total: subtotal " + money(subtotal) +
    " + delivery " + money(delivery) + " + service fee " + money(serviceFee) +
    " = " + money(baseTotal) + " before any discount.</p>";
  if (codeNote) html += "<p class='warn'>" + codeNote + "</p>";

  var box = document.getElementById("result");
  box.innerHTML = html;
  box.hidden = false;
}

document.getElementById("go").addEventListener("click", calc);

// Uber One break-even tool (uber-one-break-even.html)
var beBtn = document.getElementById("beGo");
if (beBtn) {
  beBtn.addEventListener("click", function(){
    var orders = parseFloat(document.getElementById("beOrders").value) || 0;
    var fee = parseFloat(document.getElementById("beFee").value) || 0;
    var monthlyFees = orders * fee;
    var net = monthlyFees - 9.99;
    var verdict;
    if (orders <= 0) verdict = "Enter how many times you order in a month.";
    else if (net > 0) verdict = "Worth it on fees alone. You would pay " + money(monthlyFees) +
      " in delivery fees, against $9.99 for membership, a gain of " + money(net) + " per month before any percentage discounts.";
    else verdict = "Not worth it on fees alone. You would pay " + money(monthlyFees) +
      " in delivery fees, less than the $9.99 membership price. It only pays if the percentage discounts on your orders close a gap of " + money(-net) + ".";
    var box = document.getElementById("beResult");
    box.innerHTML = "<p class='big'>" + verdict + "</p>";
    box.hidden = false;
  });
}
