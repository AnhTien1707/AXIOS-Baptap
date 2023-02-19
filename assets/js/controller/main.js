function getEle (id){
    return document.getElementById(id);
}

var callApi = new callAPI()
var validator = new Validation();
var formatNumber = new Intl.NumberFormat('vi-VN', 
{ style: 'currency', 
currency: 'VND' })

function getListStaff(){
   var promise =  callApi.fetchListStaff()
    promise
    .then(function(result){
        console.log(result.data)
        renderListStaff(result.data);
    })
    .catch(function(error){
        console.log(error)
    })
}
getListStaff()

function checkInfor(){
    
    var maNv = getEle('MaNV').value
    var name = getEle('Name').value;
    var Office = getEle('office').options[getEle('office').selectedIndex].text;
    var numberOffice = getEle('office').value;
    var salary = getEle('Salary').value;
    var timeWork = getEle('TimeWork').value;
    
    var isValid = true;
//Check MaNV
    isValid &= 
    validator.checkEmplty(maNv,"notifyMaNV","Không được để trống")
    &&
    validator.checkLength(maNv,"notifyMaNV","Nhập tối đa từ 4-6 kí tự",4,6)
// Check Name
    isValid &= 
    validator.checkEmplty(name,"notifyName","Không được để trống") &&
    validator.checkName(name,"notifyName","Vui lòng nhập vào là chữ");
// Check Select
    isValid &= validator.checkEmpltySelect(numberOffice,"notifyOffice","Không được để trống vị trí");
// Check lương
    isValid &= validator.checkEmplty(salary,"notifySalary","Không được để trống") &&
    validator.checkSalary(salary,"notifySalary","Mức lương phải trong khoảng từ 1.000.000 VNĐ đến 20.000.000 VNĐ ",1000000,20000000);
// Check Thời gian làm việc
    isValid &= validator.checkEmplty(timeWork,"notifyTimework","Không được để trống") &&
    validator.CheckTime(timeWork , "notifyTimework" , "Số giờ làm phải trong tháng phải từ 50 giờ đến 150 giờ" , 50,150)


    if (!isValid) return null;
    var staff = new Staff(maNv,name,Office,numberOffice,salary,timeWork);
    return staff;
}



function renderListStaff(data){
    var content = "";
    var rating = "";
    
    data.forEach(items => {
        if(items.soGioLamTrongThang >= 130){
            rating = "Nhân viên xuất sắc"
        }else if(items.soGioLamTrongThang >= 100){
            rating = "Nhân viên giỏi"
        }else if(items.soGioLamTrongThang >= 70){
            rating = "Nhân viên khá"
        }else if(items.soGioLamTrongThang <= 50){
            rating = "Nhân viên trung bình"
        }
    content += `<tr class ="text-center">
    <td>${items.maNhanVien}</td>
    <td>${items.tenNhanVien}</td>
    <td>${items.chucVu}</td>
    <td>${formatNumber.format(parseFloat(items.luongCoBan))}</td>
    <td>${formatNumber.format(parseFloat(items.luongCoBan*items.heSoChucVu))}</td>
    <td>${items.soGioLamTrongThang}</td>
    <td>${rating}</td>
    <td>
    <button class = "btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="handleEdit(${items.maNhanVien})">Edit</button>
    </td>
    <td>
    <button class = "btn btn-danger" onclick ="handldeDelete(${items.maNhanVien})">Delete</button>
    </td>
    </tr>`
    });
    getEle('tblList').innerHTML = content;
    
}



function addlistStaff(){
    var maNv = getEle('MaNV').value
    var name = getEle('Name').value;
    var Office = getEle('office').options[getEle('office').selectedIndex].text;
    var numberOffice = getEle('office').value;
    var salary = getEle('Salary').value;
    var timeWork = getEle('TimeWork').value;
    var staff = new Staff(maNv , name , Office , numberOffice , salary , timeWork);
    var checkForm = checkInfor();
    if(checkForm){
        var promise = callApi.addStaff(staff);
        promise
        .then(function(result){
            console.log(result.data)
            getListStaff()
            getEle('form').reset();
        })
        .catch(function(error){
            console.log(error);
        })
    }
    
}

function handldeDelete(id){
    callApi.deleteStaff(id)
    .then(function(result){
        console.log(result.data)
        getListStaff()
    })
}

function handleEdit(id){
    var btnUpdate = `<button class ="btn btn-primary" onclick="handUpdate()">Cập nhật</button>`
    document.getElementsByClassName("modal-footer")[0].innerHTML = btnUpdate
   callApi.getStaff(id)
   .then(function(result){
    console.log(result.data);
    var staff = result.data;
    getEle('MaNV1').value = staff.maNhanVien;
    getEle('Name1').value = staff.tenNhanVien;
    getEle('office1').value = staff.heSoChucVu;
    getEle('Salary1').value = staff.luongCoBan;
    getEle('TimeWork1').value = staff.soGioLamTrongThang;
    getEle('office1').options[getEle('office1').selectedIndex].text = staff.chucVu;
   })
   .catch(function(error){
    console.log(error);
   })
}
function handUpdate(){
     var maNv1 = getEle('MaNV1').value;
     var Name1 = getEle('Name1').value;
     var office1 = getEle('office1').value;
     var office2 = getEle('office1').options[getEle('office1').selectedIndex].text
     var Salary1 = getEle('Salary1').value;
     var TimeWork1 = getEle('TimeWork1').value;
     var staff = new Staff(maNv1,Name1,office2,office1,Salary1,TimeWork1);
     console.log(staff)
        callApi.updateStaff(staff)
        .then(function(result){
           console.log(result.data);
           getListStaff()
           document.getElementsByClassName("btn-close")[0].click();
        })
        .catch(function(error){
           console.log(error);
        })
    
}





