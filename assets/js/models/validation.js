function Validation() {
    this.checkEmplty = function (value, spanId, mess) {
        if (value === "") {
            getEle(spanId).style.display = "block";
            getEle(spanId).innerHTML = mess;
            return false
        }
        getEle(spanId).style.display = "none";
        getEle(spanId).innerHTML = "";
        return true
    }
    this.checkEmpltySelect = function (value, spanId, mess) {
        if (value == 0) {
            getEle(spanId).style.display = "block";
            getEle(spanId).innerHTML = mess;
            return false
        }
        getEle(spanId).style.display = "none";
        getEle(spanId).innerHTML = "";
        return true
    }
    this.checkLength = function( value , spanId , mess , min , max){
        if(value.length < min && value.length < max){
            getEle(spanId).style.display = "block";
            getEle(spanId).innerHTML = mess;
            return false;
        }
        getEle(spanId).style.display = "none";
        getEle(spanId).innerHTML = "";
        return true
    }
    this.checkName = function(name , spanId , mess){
        var letter = "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
        if(name.match(letter)){
            getEle(spanId).style.display = "none";
            getEle(spanId).innerHTML = "";
            return true;
        }
        getEle(spanId).style.display = "block";
        getEle(spanId).innerHTML = mess;
        return false;
    }
    this.checkSalary = function(salary,spanId,mess,min,max){
        if(salary < min || salary > max){
            getEle(spanId).style.display = "block";
            getEle(spanId).innerHTML = mess;
            return false
        }
        getEle(spanId).style.display = "none";
        getEle(spanId).innerHTML = "";
        return true
    }
    this.CheckTime = function(time , spanId , mess,min,max){
        if(time < min || time > max){
            getEle(spanId).style.display = "block";
            getEle(spanId).innerHTML = mess;
            return false
        }
         getEle(spanId).style.display = "none";
        getEle(spanId).innerHTML = "";
        return true;
    }
}