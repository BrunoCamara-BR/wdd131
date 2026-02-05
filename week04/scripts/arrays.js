let names = ["Nancy", "Blessing", "Jorge", "Svetlana", "Bob"];

// let namesB = names.filter(name => name.charAt(0) == "B")

let namesB = names.filter(function (name) {
  return name.charAt(0) == "B";
});

let mesLength = names.map((name) => name.length);

avgNames = names.reduce((total, name) => total + name.length , 0);


console.log(avgNames)



