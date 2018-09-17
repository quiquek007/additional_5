module.exports = function check(str, bracketsConfig) {
  if (str.length % 2 == 1) return false;
  // let log = console.log;
  let strLength = str.length;
  let scope = [];
  let level = 0;
  for (let i = 0; i < strLength; i++) {
    for (let j = 0; j < bracketsConfig.length; j++) {
      if (level < 0) return false;
      if (str[i] === bracketsConfig[j][0] && (bracketsConfig[j][0] !== bracketsConfig[j][1])) {
        if (scope[level] == undefined) scope[level] = str[i];
        else {
          // if (bracketsConfig[j][0] === bracketsConfig[j][1]) level++;
          // if (scope[level][scope[level].length-1] === str[i]) log("bu");
          scope[level] += str[i];
        }
        level++;
      } else if (str[i] === bracketsConfig[j][1] && (bracketsConfig[j][0] !== bracketsConfig[j][1])) {
        level--;
        scope[level] += str[i];
      } else if (str[i] === bracketsConfig[j][0] && (bracketsConfig[j][0] === bracketsConfig[j][1])) {
        if (scope[level] == undefined) {
          if (level > 0) {
            if (scope[level - 1][scope[level - 1].length - 1] === str[i]) {
              --level;
              scope[level] += str[i];
            } else {
              scope[level] = str[i];
              ++level;
            }
          } else {
            scope[level] = str[i];
            ++level;
          }
        } else {
          if (level>0) {
            if (scope[level - 1][scope[level - 1].length - 1] === str[i]) {
              --level;
              scope[level] += str[i];
            } else {
              scope[level] += str[i];
              ++level;
            }
          } else {
            scope[level] += str[i];
            ++level;
          }
        }
      }
    }
  }
  for(let i=0;i<scope.length;i++){
    if (scope[i].length %2 == 1) return false;
  }
  // log("scope: " + scope);
  for(let i=0;i<scope.length;i++){
    for(let j=0;j<scope[i].length;j+=2)
      for(let k=0;k<bracketsConfig.length;k++){
        if (scope[i][j] == bracketsConfig[k][0]){
          if (scope[i][j+1] !== bracketsConfig[k][1]) return false;
        }
      }
  }
  return true;
};
