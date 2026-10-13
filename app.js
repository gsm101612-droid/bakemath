const $ = (id) => document.getElementById(id);
const fmt = (n, digits=2) => Number(n.toFixed(digits)).toLocaleString("en-US", {maximumFractionDigits:digits});
const ingredientGrams = { flour:120, sugar:200, brown:220, powdered:120, butter:227, cocoa:85, water:240 };
const ingredientNames = { flour:"all-purpose flour", sugar:"granulated sugar", brown:"packed brown sugar", powdered:"powdered sugar", butter:"butter", cocoa:"cocoa powder", water:"water" };

function convertCups(){
  const amount = Number($("cups").value), ingredient = $("ingredient").value;
  if (!Number.isFinite(amount) || amount < 0) { $("cups-result").textContent = "Enter a valid non-negative cup amount."; return; }
  $("cups-result").textContent = `${fmt(amount,3)} US cup${amount===1?"":"s"} ≈ ${fmt(amount*ingredientGrams[ingredient],1)} g ${ingredientNames[ingredient]}`;
}
$("convert-cups").addEventListener("click",convertCups);
$("ingredient").addEventListener("change",convertCups);
$("cups").addEventListener("input",convertCups);

function fromF(){ const f=Number($("fahrenheit").value); if(!Number.isFinite(f)){ $("temp-result").textContent="Enter a valid Fahrenheit temperature."; return; } $("celsius").value=((f-32)*5/9).toFixed(1); $("temp-result").textContent=`${fmt(f,1)}°F = ${fmt((f-32)*5/9,1)}°C`; }
function fromC(){ const c=Number($("celsius").value); if(!Number.isFinite(c)){ $("temp-result").textContent="Enter a valid Celsius temperature."; return; } $("fahrenheit").value=(c*9/5+32).toFixed(1); $("temp-result").textContent=`${fmt(c,1)}°C = ${fmt(c*9/5+32,1)}°F`; }
$("fahrenheit").addEventListener("input",fromF); $("celsius").addEventListener("input",fromC);

function convertSpoons(){
 const n=Number($("spoon-amount").value), dir=$("spoon-direction").value;
 if(!Number.isFinite(n)||n<0){$("spoon-result").textContent="Enter a valid non-negative amount.";return;}
 if(dir==="tbsp-tsp") $("spoon-result").textContent=`${fmt(n,3)} tablespoon${n===1?"":"s"} = ${fmt(n*3,3)} teaspoon${n*3===1?"":"s"}`;
 else $("spoon-result").textContent=`${fmt(n,3)} teaspoon${n===1?"":"s"} = ${fmt(n/3,3)} tablespoon${n/3===1?"":"s"}`;
}
$("convert-spoon").addEventListener("click",convertSpoons); $("spoon-amount").addEventListener("input",convertSpoons); $("spoon-direction").addEventListener("change",convertSpoons);

function scaleRecipe(){
 const oldS=Number($("original-servings").value), newS=Number($("new-servings").value), amount=Number($("original-amount").value);
 if(!Number.isFinite(oldS)||!Number.isFinite(newS)||!Number.isFinite(amount)||oldS<=0||newS<=0||amount<0){$("scale-result").textContent="Enter positive serving counts and a non-negative amount.";return;}
 const scaled=amount*newS/oldS;
 $("scale-result").textContent=`${fmt(amount,3)} units for ${oldS} servings → ${fmt(scaled,3)} units for ${newS} servings`;
}
$("scale-recipe").addEventListener("click",scaleRecipe);
["original-servings","new-servings","original-amount"].forEach(id=>$(id).addEventListener("input",scaleRecipe));
$("year").textContent = new Date().getFullYear();
convertCups(); fromF(); convertSpoons(); scaleRecipe();
