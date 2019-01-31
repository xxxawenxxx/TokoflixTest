const helper = {
    checkPrice: function(vote) {
      if (vote >= 0 && vote < 3) {
        return 3500;
      } else if (vote >= 3 && vote < 6) {
        return 8250;
      } else if (vote >= 3 && vote < 6) {
        return 16350;
      } else {
        return 21250;
      }
    },
    replaceSpace: function(str) {
      let tempStr;
      let strLength = str.length;
  
      for (let i = 0; i < strLength; i++) {
        //tempStr = str.replace(/[^A-Z0-9]/ig, "-");
        tempStr = str.replace(/\s/g, "-");
      }
  
      return tempStr;
    },
    formatString: function(data) {
      let tempstring = "";
      for (let i = 0; i < data.length; i++) {
        if (i < data.length) {
          tempstring += data[i].name + ", ";
        } else {
          tempstring += data[i].name;
        }
      }
  
      return tempstring;
    },
    checkPage: function(str) {
      str.replace(/\D+/g, "");
      return str;
    }
  };
  
  export default helper;