if (localStorage.getItem("User") == null){
    localStorage.getItem("User", "newUser");
    localStorage.getItem("money", 100000);
    let list =[];
    list[0]="nonexistent";
    localStorage.setItem("itemList", JSON.stringify(list));
}else{
}

const user = {
    checkItem : function (id){
        let listItem = JSON.parse(localStorage.getItem("itemList"));
        for (let data of listItem){
            if (data === id){
                return "own";
            }
        }
        return "nope";
    },

buyingMovie: function(id, price){
    if(localStorage.getItem("money") < price){
        return "Eweuh duit beak";
    } else {
        let listItem = JSON.parse(localStorage.getItem("itemList"));
        listItem.push(id);
        localStorage.setItem("itemList",JSON.stringify(listItem));
    
        let money = localStorage.getItem("money");
        money -= price;
        localStorage.setItem("money", money);
        return 'geus dibeli.';
        }
    }
};

export default user;





