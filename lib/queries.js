class Mysql{
    insertData(){
        "INSERT INTO employees SET ?", [], function(err,res){
            if (err) throw err;
            console.log("==============================")
            console.table(res)
            console.log("==============================")
        }
    }
    selectData(){
        "SELECT * FROM ?", [],function (err, res){
            if (err) throw err;
            console.log("==============================")
            console.table(res)
            console.log("==============================")
        }
    }
    updateData(){

    }
    deleteData(){

    }
};

module.exports = Mysql;